import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { addClientLogos } from './redesign-home.mjs';

const html = fs.readFileSync('index.html', 'utf8');
assert.equal([...html.matchAll(/class="its-client-logo"/g)].length, 26);
assert.equal(addClientLogos(html), html, 'Regeneration must preserve the section without duplication');
const source = fs.readFileSync('assets/js/client-logos.js', 'utf8');

// Exercise the production controller with browser-like scroll geometry at each breakpoint.
for (const width of [320, 375, 600, 768, 1000, 1100, 1440]) {
  const cols = width <= 600 ? 2 : width <= 1000 ? 3 : 6;
  const gap = width <= 600 ? 10 : 14;
  const inner = Math.min(width, 1200) - (width <= 600 ? 32 : 40);
  const cardWidth = (inner - gap * (cols - 1)) / cols;
  assert.ok(cardWidth >= 117, 'Largest logo window must fit within the card border');
  const element = () => ({
    attrs: {}, events: {}, hidden: false,
    setAttribute(k,v) { this.attrs[k] = v; },
    getAttribute(k) { return this.attrs[k]; },
    removeAttribute(k) { delete this.attrs[k]; },
    addEventListener(k,fn) { this.events[k] = fn; },
    focus() {}, scrollIntoView() {},
    getBoundingClientRect() { return {left:0,right:inner,top:100,bottom:144}; }
  });
  const list = Object.assign(element(), {clientWidth:inner,scrollWidth:26*(cardWidth+gap)-gap,scrollLeft:0});
  list.scrollTo = ({left}) => { list.scrollLeft = Math.max(0,Math.min(left,list.scrollWidth-inner)); list.events.scrollend?.(); };
  list.children = Array.from({length:26},(_,index) => ({
    offsetLeft:index*(cardWidth+gap),offsetWidth:cardWidth,
    getBoundingClientRect() { return {left:this.offsetLeft-list.scrollLeft,right:this.offsetLeft-list.scrollLeft+cardWidth}; }
  }));
  const selectors = Object.fromEntries(['controls','arrows','prev','next','expand','status'].map(key=>[`.its-client-${key}`,element()]));
  selectors['.its-client-grid'] = list;
  const section = {querySelector: key=>selectors[key],classList:{add(){},toggle(){}}};
  vm.runInNewContext(source, {
    document:{querySelectorAll:()=>[section]},window:{matchMedia:()=>({matches:true}),innerHeight:800},
    ResizeObserver:class {constructor(fn){this.fn=fn;}observe(){this.fn();}},setTimeout,clearTimeout
  });
  const prev=selectors['.its-client-prev'],next=selectors['.its-client-next'],expand=selectors['.its-client-expand'];
  assert.equal(prev.attrs['aria-disabled'],'true');
  for(let n=0;n<30;n++) next.events.click();
  assert.equal(next.attrs['aria-disabled'],'true');
  assert.equal(list.scrollLeft,list.scrollWidth-inner);
  assert.match(selectors['.its-client-status'].textContent,/26 of 26$/);
  assert.ok(Math.abs(list.children[25].getBoundingClientRect().right-inner)<0.01,'Last logo fully visible');
  const key = key => list.events.keydown({key,preventDefault(){}});
  key('Home'); assert.equal(list.scrollLeft,0);
  key('ArrowRight'); assert.ok(list.scrollLeft>0);
  key('End'); assert.equal(list.scrollLeft,list.scrollWidth-inner);
  expand.events.click(); assert.equal(expand.attrs['aria-expanded'],'true');
  assert.equal(list.children.length,26);
  expand.events.click(); assert.equal(expand.attrs['aria-expanded'],'false');
  assert.equal(list.scrollLeft,list.scrollWidth-inner,'Collapse restores last slide');
  for(let n=0;n<30;n++) prev.events.click();
  assert.equal(list.scrollLeft,0);
  console.log(`${width}px: ${cols} cards, controls, keyboard, last slide, and grid toggle passed`);
}
