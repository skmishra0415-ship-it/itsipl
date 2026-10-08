import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { technologyPartners } from './technology-partners.mjs';
import { solutions, sources } from './portfolio-data.mjs';

const decode = value => value.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
const baseline=JSON.parse(fs.readFileSync('verification/homepage-baseline.json','utf8'));
for(const [file,hash] of Object.entries(baseline)) {
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),hash,`Protected file changed: ${file}`);
}
console.log(`PASS: ${Object.keys(baseline).length} protected files unchanged, including homepage, all original CSS/JS, imagery and legacy generators.`);

const all=fs.readdirSync('.').filter(f=>f.endsWith('.html'));
const htmlByFile=new Map(all.map(f=>[f,fs.readFileSync(f,'utf8')]));
const routes=JSON.parse(fs.readFileSync('verification/portfolio-routes.json','utf8'));
const ids=new Map([...htmlByFile].map(([f,h])=>[f,new Set([...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))]));
let links=0;
for(const [file,html] of htmlByFile) {
  for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href=decode(match[1]);
    if(/^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    const [relative,fragment]=href.split('#');
    const target=relative.split('?')[0] || file;
    assert.ok(fs.existsSync(target),`${file}: missing ${target}`);
    if(fragment && target.endsWith('.html')) assert.ok(ids.get(target)?.has(decodeURIComponent(fragment)),`${file}: missing fragment ${href}`);
    links++;
  }
}
const titles=new Set(), descriptions=new Set();
for(const file of routes) {
  const h=htmlByFile.get(file);
  const stack=[], voids=new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
  for(const m of h.replace(/<script[\s\S]*?<\/script>/g,'').matchAll(/<(\/?)([a-z][a-z0-9]*)\b[^>]*>/gi)) {
    const tag=m[2].toLowerCase();
    if(voids.has(tag)) continue;
    if(m[1]) assert.equal(stack.pop(),tag,`${file}: balanced HTML nesting`); else stack.push(tag);
  }
  assert.equal(stack.length,0,`${file}: unclosed elements`);
  assert.equal((h.match(/<h1[ >]/g)||[]).length,1,`${file}: h1`);
  const pageIds=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(pageIds).size,pageIds.length,`${file}: duplicate ids`);
  const title=h.match(/<title>(.*?)<\/title>/)[1], desc=h.match(/<meta name="description" content="([^"]+)"/)[1];
  assert.ok(!titles.has(title),`${file}: repeated title`);titles.add(title);
  assert.ok(!descriptions.has(desc),`${file}: repeated description`);descriptions.add(desc);
  assert.ok(h.includes(`href="https://www.itsipl.com/${file}"`),`${file}: canonical`);
  assert.ok(fs.readFileSync('sitemap.xml','utf8').includes(`<loc>https://www.itsipl.com/${file}</loc>`),`${file}: sitemap`);
  assert.ok(h.includes('class="portfolio-page'),`${file}: style scope`);
  assert.ok(h.includes('assets/css/portfolio.css'),`${file}: stylesheet`);
  for(const image of h.matchAll(/<img\b[^>]*>/g)) assert.match(image[0],/\balt="[^"]*"/,`${file}: missing alt`);
  for(const control of h.matchAll(/aria-controls="([^"]+)"/g)) assert.ok(ids.get(file).has(control[1]),`${file}: missing control target`);
  if(file!=='contact.html') {
    assert.match(h,/<nav class="pf-breadcrumbs" aria-label="Breadcrumb">/);
    assert.match(h,/<span aria-current="page">/);
    assert.ok(h.includes('Request a Quote') && h.includes('Discuss My Requirements'));
  }
}
const overview=htmlByFile.get('partners.html');
assert.equal((overview.match(/class="pf-partner-card"/g)||[]).length,8);
for(const p of technologyPartners) {
  assert.ok(overview.includes(`id="${p.id}" href="partner-${p.id}.html"`));
  const h=htmlByFile.get(`partner-${p.id}.html`);
  for(const id of ['fit','products','considerations','cost','itsipl-role','related','next-step']) assert.ok(ids.get(`partner-${p.id}.html`).has(id));
  assert.ok(h.includes(`assets/images/partners/${p.file}`));
  const words=h.replace(/<[^>]*>/g,' ').split(/\s+/).length;
  assert.ok(words>500,`${p.name}: substantial content`);
}
assert.ok(!htmlByFile.get('index.html').includes('portfolio.css'));
assert.ok(!htmlByFile.get('index.html').includes('portfolio-enquiry.js'));
const css=fs.readFileSync('assets/css/portfolio.css','utf8').replace(/\/\*[\s\S]*?\*\//g,'');
for(const rule of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
  assert.ok(rule[1].trim().startsWith('.portfolio-page'),`Unscoped CSS rule: ${rule[1]}`);
}
for(const width of [1000,700,420]) assert.ok(css.includes(`@media(max-width:${width}px)`));
assert.ok(css.includes('prefers-reduced-motion:reduce'));
assert.ok(css.includes('focus-visible'));
assert.ok(css.includes('minmax(0,1fr)'));
for(const s of solutions) for(const match of htmlByFile.get(`${s.id}.html`).matchAll(/href="contact.html\?([^"]+)"/g)) {
  const params=new URLSearchParams(decode(match[1]).split('#')[0]);
  assert.equal(params.get('solution'),s.id);
}
for(const [label,url] of Object.values(sources)) assert.ok(new URL(url).protocol==='https:',label);
console.log(`PASS: ${all.length} pages, ${links} local links/assets/fragments, eight internal partner cards, unique metadata and sitemap entries.`);
console.log('PASS: new CSS isolation, responsive rule coverage, reduced-motion and focus styles (static checks, not rendered visual verification).');

// Exercise real enquiry controllers with a minimal DOM harness. This tests behavior,
// not native browser rendering, email-client handling or native validation UI.
const contact=htmlByFile.get('contact.html');
function setup(query='',valid=true) {
  const state={valid, focused:false, prevented:false, fetches:0};
  const status={className:'',textContent:''},context={textContent:''};
  const values={name:'Asha Rao',email:'asha@example.test',phone:'+91 0000000000',company:'Example',users:'25',devices:'30',existing_product:'Existing tool & version 2',budget:'Optional: discuss',timeline:'1–3 months',message:'Need endpoint protection & DLP.\nKeep existing applications working.'};
  const fields=Object.fromEntries(Object.entries(values).map(([k,value])=>[k,{value}]));
  for(const match of contact.matchAll(/<select name="([^"]+)">([\s\S]*?)<\/select>/g)) {
    const options=[...match[2].matchAll(/<option([^>]*)>(.*?)<\/option>/g)].map(([,attrs,text])=>({value:decode(attrs.match(/value="([^"]*)"/)?.[1]??text),dataset:{key:attrs.match(/data-key="([^"]*)"/)?.[1]},textContent:decode(text)}));
    fields[match[1]]={options,value:options[0].value,get selectedOptions(){return options.filter(o=>o.value===this.value);}};
  }
  const handlers={},draft={href:'mailto:sales@itsipl.com',addEventListener:(n,cb)=>{handlers[n]=cb;}};
  const invalid={setAttribute(){},removeAttribute(){},focus(){state.focused=true;}};
  const form={elements:{namedItem:n=>fields[n]},addEventListener:(n,cb)=>{handlers[n]=cb;},checkValidity:()=>state.valid,
    querySelector:s=>({'[data-enquiry-context]':context,'[data-email-draft]':draft,'.form-status':status,':invalid':state.valid?null:invalid}[s]),
    querySelectorAll:s=>s===':invalid'&&!state.valid?[invalid]:[],reset(){throw new Error('Unconfigured form must not reset');}};
  const document={body:{classList:{contains:c=>c==='portfolio-contact'}},querySelector:s=>s==='#contact-form'?form:null};
  const sandbox={document,window:{location:{search:query}},URLSearchParams,encodeURIComponent,setTimeout:cb=>cb(),FormData:class extends Map{constructor(){super(Object.entries(fields).map(([k,v])=>[k,v.value]));}},fetch:()=>{state.fetches++;throw new Error('Unexpected network submission');}};
  vm.runInNewContext(fs.readFileSync('assets/js/contact.js','utf8'),sandbox);
  vm.runInNewContext(fs.readFileSync('assets/js/portfolio-enquiry.js','utf8'),sandbox);
  const event=()=>({currentTarget:form,preventDefault(){state.prevented=true;}});
  return {state,status,context,fields,draft,handlers,event};
}
for(const p of technologyPartners) {
  const x=setup(`?partner=${p.id}&intent=quote`);
  assert.equal(x.fields.partner.value,p.name);assert.equal(x.fields.intent.value,'quote');assert.ok(x.context.textContent.includes(p.name));
}
for(const s of solutions) {
  const x=setup(`?solution=${s.id}`);assert.equal(x.fields.service.value,s.service||s.name);
}
assert.equal(setup('?service=IT%20Infrastructure').fields.service.value,'IT Infrastructure');
const unknown=setup('?partner=%3Cscript%3Ealert(1)%3C/script%3E&solution=unknown&intent=unknown');
assert.equal(unknown.fields.partner.value,'');assert.equal(unknown.fields.service.value,'');assert.equal(unknown.fields.intent.value,'requirements');assert.equal(unknown.context.textContent,'');
const invalid=setup('',false);await invalid.handlers.submit(invalid.event());
assert.ok(invalid.state.prevented && invalid.state.focused);assert.match(invalid.status.textContent,/required/);assert.equal(invalid.state.fetches,0);
const badDraft=setup('',false);badDraft.handlers.click({...badDraft.event(),currentTarget:badDraft.draft});assert.ok(badDraft.state.prevented);assert.equal(badDraft.draft.href,'mailto:sales@itsipl.com');
const valid=setup('?partner=netskope&solution=data-loss-prevention&intent=quote');
await valid.handlers.submit(valid.event());assert.match(valid.status.textContent,/not been sent/);assert.equal(valid.state.fetches,0);
valid.state.prevented=false;valid.handlers.click({...valid.event(),currentTarget:valid.draft});
assert.equal(valid.state.prevented,false);
const mail=new URL(valid.draft.href);assert.equal(mail.pathname,'sales@itsipl.com');
assert.match(mail.searchParams.get('subject'),/quote request.*Netskope/);
for(const expected of ['Asha Rao','Data Loss Prevention','Users: 25','Devices: 30','Existing tool & version 2','Optional: discuss','Need endpoint protection & DLP.\nKeep existing applications working.']) assert.ok(mail.searchParams.get('body').includes(expected),expected);
assert.match(valid.status.textContent,/Nothing has been sent/);
valid.fields.partner.value='Sophos';valid.handlers.change();assert.match(valid.context.textContent,/Sophos/);
assert.equal(valid.state.fetches,0);
console.log('PASS: all partner/solution prefills, legacy service query, unknown-value rejection, invalid input, unsent submission, editable context and encoded email draft. No backend calls.');
fs.writeFileSync('verification/validation-summary.json',JSON.stringify({date:'2026-09-30',protectedFiles:Object.keys(baseline).length,pages:all.length,localLinksAndAssets:links,generatedRoutes:routes.length,partnerCards:8,homepageHash:baseline['index.html'],staticChecks:'passed',enquiryControllerTests:'passed',renderedDesktopMobileComparison:'pending: no connected browser',nativeEmailClientTest:'pending: requires browser and configured mail client'},null,2));
