import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {technologyPartners,renderTechnologyPartners} from './technology-partners.mjs';
const partners=fs.readFileSync('partners.html','utf8');
for(const file of ['index.html','partners.html']) {
 const html=fs.readFileSync(file,'utf8');
 const section=html.match(/<section class="technology-partners"[\s\S]*?<\/section>/)?.[0];
 assert.equal(section,renderTechnologyPartners({home:file==='index.html'}));
 assert.equal([...section.matchAll(/<img /g)].length,8);
 for(const partner of technologyPartners) {
  assert.ok(fs.existsSync(`assets/images/partners/${partner.file}`));
  assert.ok(section.includes(`alt="${partner.name} logo"`));
  assert.ok(partners.includes(`id="${partner.id}"`));
 }
 assert.ok(!section.includes('href="#"'));
 assert.ok(!section.includes('partner-tier'));
}
console.log('Both pages: eight existing logo assets, descriptive alt text, and valid partner anchors.');
const css=fs.readFileSync('assets/css/styles.css','utf8');
assert.match(css,/\.technology-partner-card img\{[^}]*object-fit:contain/);
const marker='// Native scrolling keeps the approved partner cards usable with touch or a trackpad.';
const sharedScript=fs.readFileSync('assets/js/main.js','utf8');
assert.ok(sharedScript.includes(marker), 'The production partner controller must exist');
const controller=sharedScript.slice(sharedScript.indexOf(marker));

// Run the production controller with browser-like geometry. This verifies
// navigation and focus behavior; actual rendering and touch still need a browser.
function makeSlider({container,cardWidth,gap,home,hash=''}) {
 const element=()=>({
  attrs:{},events:{},hidden:true,
  setAttribute(name,value){this.attrs[name]=value;},
  getAttribute(name){return this.attrs[name];},
  addEventListener(name,callback){this.events[name]=callback;}
 });
 const list=Object.assign(element(),{
  clientWidth:container,
  scrollWidth:technologyPartners.length*(cardWidth+gap)-gap,
  scrollLeft:0,
  getBoundingClientRect(){return {left:40,right:40+container};}
 });
 // A nonzero offset parent catches incorrect use of absolute offsets.
 const firstOffset=73;
 const links=technologyPartners.map(()=>({}));
 list.children=technologyPartners.map((partner,index)=>({
  id:home?'':partner.id,
  offsetLeft:firstOffset+index*(cardWidth+gap),
  offsetWidth:cardWidth,
  contains(target){return target===this || (home && target===links[index]);},
  getBoundingClientRect(){
   const left=40+this.offsetLeft-firstOffset-list.scrollLeft;
   return {left,right:left+cardWidth};
  }
 }));
 list.scrollTo=({left,behavior})=>{
  list.scrollLeft=Math.max(0,Math.min(left,list.scrollWidth-list.clientWidth));
  list.lastBehavior=behavior;
  list.events.scrollend?.();
 };
 const selectors=Object.fromEntries(['controls','prev','next','status'].map(name=>[`.technology-partner-${name}`,element()]));
 selectors['.technology-partner-grid']=list;
 const section={querySelector:selector=>selectors[selector]};
 const window={
  events:{},location:{hash},matchMedia:()=>({matches:true}),
  addEventListener(name,callback){this.events[name]=callback;}
 };
 vm.runInNewContext(controller,{
  document:{querySelectorAll:selector=>selector==='.technology-partners'?[section]:[]},
  window,setTimeout,clearTimeout,
  ResizeObserver:class {constructor(callback){this.callback=callback;}observe(){this.callback();}}
 });
 const key=(key,target=list)=>{
  let prevented=false;
  list.events.keydown({key,target,preventDefault(){prevented=true;}});
  return prevented;
 };
 return {list,links,window,key,
  controls:selectors['.technology-partner-controls'],
  prev:selectors['.technology-partner-prev'],
  next:selectors['.technology-partner-next'],
  status:selectors['.technology-partner-status']};
}

for(const width of [320,375,600,768,1000,1200,1440]) {
 const columns=width<=600?2:width<=1000?3:6;
 const gap=0;
 const padding=width<=340?24:width<=820?32:40;
 const container=Math.min(width-padding,1200);
 const card=(container-(columns-1)*gap)/columns;
 assert.ok(card>0);
 assert.ok(card*columns+gap*(columns-1)<=width);
 for(const home of [true,false]) {
  const {list,links,window,key,controls,prev,next,status}=makeSlider({
   container,cardWidth:card,gap,home,hash:home?'':'#forcepoint'
  });
  const maxScroll=list.scrollWidth-list.clientWidth;
  const assertLastVisible=()=>{
   assert.ok(Math.abs(list.scrollLeft-maxScroll)<0.01,'Last slide reaches the scroll boundary');
   const last=list.children.at(-1).getBoundingClientRect();
   const viewport=list.getBoundingClientRect();
   assert.ok(last.left>=viewport.left-0.01 && last.right<=viewport.right+0.01,'Entire final logo card is visible');
   assert.equal(next.attrs['aria-disabled'],'true');
   assert.equal(status.textContent,`${9-columns}\u20138 of 8`);
  };
  assert.equal(controls.hidden,false);
  if(!home) assertLastVisible(); // Direct homepage links must reveal the target.
  assert.equal(key('Home'),true);
  assert.equal(list.scrollLeft,0);
  assert.equal(prev.attrs['aria-disabled'],'true');
  prev.events.click();
  assert.equal(list.scrollLeft,0,'Previous is inert at the start');
  assert.equal(key('ArrowRight'),true);
  assert.ok(list.scrollLeft>0);
  assert.equal(key('ArrowLeft'),true);
  assert.equal(list.scrollLeft,0);
  for(let count=0;count<8;count++) next.events.click();
  assertLastVisible();
  next.events.click();
  assertLastVisible();
  for(let count=0;count<8;count++) prev.events.click();
  assert.equal(list.scrollLeft,0,'Previous returns to the first slide');
  assert.equal(key('End'),true);
  assertLastVisible();
  key('Home');
  if(home) {
   assert.equal(key('End',links.at(-1)),false,'Slider keys do not override link keyboard behavior');
   assert.equal(list.scrollLeft,0);
   list.events.focusin({target:links.at(-1)});
   assertLastVisible();
   assert.equal(list.lastBehavior,'instant','Focus reveals a link immediately');
   list.events.focusin({target:links[0]});
   assert.equal(list.scrollLeft,0,'Reverse tabbing reveals the first card');
  } else {
   window.location.hash='#forcepoint';
   window.events.hashchange();
   assertLastVisible();
   window.location.hash='#sophos';
   window.events.hashchange();
   assert.equal(list.scrollLeft,0);
   window.location.hash='#%';
   assert.doesNotThrow(()=>window.events.hashchange(),'Malformed URL fragments are harmless');
  }
 }
 console.log(`${width}px: ${columns} cards fit; both page controllers passed boundaries, last slide, keyboard, hash links, and focus checks (simulated geometry).`);
}
