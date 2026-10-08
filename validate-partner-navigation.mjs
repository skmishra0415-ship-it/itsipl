import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { partnerDestinations, partnerDestination, partnerLinkAttributes } from './partner-destinations.mjs';
import { renderTechnologyPartners } from './technology-partners.mjs';
const root=process.cwd();
const baseline=JSON.parse(fs.readFileSync('verification/navigation-before-hashes.json'));
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
assert.equal(hash('index.html'),baseline['index.html']);
const oldRenderer=fs.readFileSync('verification/navigation-before/technology-partners.mjs','utf8');
const oldModule=await import('data:text/javascript;base64,'+Buffer.from(oldRenderer.replace("import { statSync } from 'node:fs';",'const statSync=()=>({isFile:()=>true});').replace('new URL(src, import.meta.url)','src')).toString('base64'));
assert.equal(renderTechnologyPartners({home:true}),oldModule.renderTechnologyPartners({home:true}));
const files=fs.readdirSync('.').filter(f=>f.endsWith('.html'));
let count=0;
let localLinks=0;
for(const file of files){
 const html=fs.readFileSync(file,'utf8');
 for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const href=m[1].replaceAll('&amp;','&');
  if(/^(https?:|mailto:|tel:|data:)/.test(href))continue;
  const target=href.split(/[?#]/)[0]||file;
  assert.ok(fs.existsSync(target),`${file}: missing local destination ${target}`);
  localLinks++;
 }
}
for(const [id,d] of Object.entries(partnerDestinations)){
 assert.ok(fs.existsSync(d.localUrl));
 const card=fs.readFileSync('partners.html','utf8').match(new RegExp(`<a class="pf-partner-card" id="${id}"[^>]*>[\\s\\S]*?<\\/a>`))[0];
 assert.ok(card.includes(partnerLinkAttributes(id)));
 assert.ok(card.includes('opens itsipl.com in a new tab'));
}
const anchors=h=>[...h.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(m=>m[0]);
for(const file of files){
 const h=fs.readFileSync(file,'utf8');
 const old=fs.readFileSync(`verification/navigation-before/${file}`,'utf8');
 // Every non-partner anchor, including PDF, official product and enquiry links, stays byte-identical.
 const unrelated=a=>!(/class="pf-partner-card"/.test(a)||/href="partner-[^"]+\.html"/.test(a)||Object.values(partnerDestinations).some(d=>a.includes(`href="${d.url}"`)));
 assert.deepEqual(anchors(h).filter(unrelated),anchors(old).filter(unrelated),`${file}: unrelated links preserved`);
 for(const a of anchors(h)){
  if(file==='index.html') continue;
  if(/Explore [^<]+ with ITSIPL/.test(a)){
   assert.ok(Object.keys(partnerDestinations).some(id=>a.includes(`href="${partnerDestination(id)}"`)),`${file}: mapped exploration`);
   assert.ok(a.includes('target="_blank"')&&a.includes('rel="noopener noreferrer"')&&a.includes('opens itsipl.com in a new tab'));
   count++;
  }
 }
}
// Rebuild in isolation so unrelated generated content cannot overwrite existing PDFs or enquiries.
const dir='verification/navigation-rebuild';
fs.mkdirSync(dir,{recursive:true});
for(const f of fs.readdirSync('.').filter(f=>/\.(mjs|html|xml)$/.test(f)))fs.copyFileSync(f,`${dir}/${f}`);
fs.cpSync('templates',`${dir}/templates`,{recursive:true});
fs.mkdirSync(`${dir}/verification`,{recursive:true});
process.chdir(dir);
try { await import(pathToFileURL(`${process.cwd()}/build-portfolio.mjs`).href); }
finally { process.chdir(root); }
for(const f of JSON.parse(fs.readFileSync(`${dir}/verification/portfolio-routes.json`))){
 const h=fs.readFileSync(`${dir}/${f}`,'utf8');
 for(const a of anchors(h).filter(a=>/class="pf-partner-card"|Explore [^<]+ with ITSIPL/.test(a))){
  assert.ok(Object.keys(partnerDestinations).some(id=>a.includes(partnerLinkAttributes(id))),`${f}: rebuild mapping`);
  assert.ok(a.includes('opens itsipl.com in a new tab'));
 }
}
assert.equal(hash(`${dir}/index.html`),baseline['index.html']);
console.log(`PASS: 8 verified destinations/local fallback files; ${count} exploration links; ${localLinks} local links/assets; unrelated links preserved; isolated rebuild and homepage renderer unchanged.`);
