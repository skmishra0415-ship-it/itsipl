import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { products, productDestinations, productForOffering, availableProductPdf } from './product-data.mjs';
import { solutions } from './portfolio-data.mjs';
import { partnerDestinations } from './partner-destinations.mjs';

const baseline=JSON.parse(fs.readFileSync('verification/products-before-hashes.json'));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const protectedFiles=Object.keys(baseline).filter(f=>f==='index.html'||f==='partner-destinations.mjs'||f.startsWith('assets/css/')||f.startsWith('assets/images/')||f.endsWith('.pdf')||(f.startsWith('assets/js/')&&f!=='assets/js/portfolio-enquiry.js'));
for(const file of protectedFiles)assert.equal(hash(file),baseline[file],`Protected file changed: ${file}`);
const htmlFiles=fs.readdirSync('.').filter(f=>f.endsWith('.html'));
const html=new Map(htmlFiles.map(f=>[f,fs.readFileSync(f,'utf8')]));
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
const ids=new Map([...html].map(([f,h])=>[f,new Set([...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))]));
let localLinks=0,pdfLinks=0,productCards=0;
for(const [file,h] of html){
 const oldFile=`verification/products-before/${file}`;
 if(fs.existsSync(oldFile)){
  const old=fs.readFileSync(oldFile,'utf8');
  for(const tag of ['header','footer'])assert.equal(h.match(new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`))[0],old.match(new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`))[0],`${file}: ${tag} preserved`);
  const partnerLinks=text=>[...text.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(m=>m[0]).filter(a=>Object.values(partnerDestinations).some(d=>a.includes(`href="${d.url}"`))).map(a=>a.match(/<a\b[^>]*>/)[0]);
  assert.deepEqual(partnerLinks(h),partnerLinks(old),`${file}: existing partner links preserved`);
 }
 for(const m of h.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const href=decode(m[1]);
  if(/^(https?:|mailto:|tel:|data:)/.test(href))continue;
  const [relative,fragment]=href.split('#');
  const target=relative.split('?')[0]||file;
  assert.ok(fs.existsSync(target),`${file}: missing ${target}`);
  if(fragment&&target.endsWith('.html'))assert.ok(ids.get(target)?.has(decodeURIComponent(fragment)),`${file}: missing fragment ${href}`);
  if(target.endsWith('.pdf')){assert.equal(fs.readFileSync(target).subarray(0,5).toString(),'%PDF-');pdfLinks++;}
  localLinks++;
 }
}
assert.equal(new Set(products.map(p=>p.page)).size,products.length,'No duplicated product URLs');
const offeringKeys=new Set(solutions.flatMap(s=>s.options.map(([p,i])=>`${p}/${i}`)));
assert.deepEqual(new Set(products.map(p=>p.offeringKey)),offeringKeys,'Exactly one page per distinct solution offering');
const allTitles=new Set(),allDescriptions=new Set();
for(const [file,h] of html){
 const title=h.match(/<title>(.*?)<\/title>/s)?.[1];
 const desc=h.match(/<meta name="description" content="([^"]+)"/)?.[1];
 if(!file.startsWith('product-')){allTitles.add(title);allDescriptions.add(desc);}
}
const missingPdfs=[];
for(const p of products){
 const h=html.get(p.page);
 assert.ok(h,`Missing product page ${p.page}`);
 assert.equal((h.match(/<h1[ >]/g)||[]).length,1);
 assert.equal(decode(h.match(/<h1>(.*?)<\/h1>/s)[1]),p.name);
 const title=h.match(/<title>(.*?)<\/title>/s)[1],desc=h.match(/<meta name="description" content="([^"]+)"/)[1];
 assert.ok(!allTitles.has(title));allTitles.add(title);
 assert.ok(!allDescriptions.has(desc));allDescriptions.add(desc);
 assert.ok(h.includes(`rel="canonical" href="https://www.itsipl.com/${p.page}"`));
 assert.ok(!/noindex|\{\{/.test(h));
 assert.ok(fs.readFileSync('sitemap.xml','utf8').includes(`<loc>https://www.itsipl.com/${p.page}</loc>`));
 for(const id of ['fit','capabilities','how-it-works','compatibility','budget','itsipl-role','alternatives','faq','references','next-step'])assert.ok(ids.get(p.page).has(id));
 for(const [label,url] of p.references)assert.ok(h.includes(`href="${decode(url).replaceAll('&','&amp;')}"`),`${p.id}: reference ${label}`);
 for(const img of h.matchAll(/<img\b[^>]*>/g))assert.match(img[0],/alt="[^"]+"/);
 for(const match of h.matchAll(/href="contact.html\?([^"]+)"/g)){
  const query=new URLSearchParams(decode(match[1]).split('#')[0]);
  assert.equal(query.get('product'),p.id);assert.equal(query.get('partner'),p.partner);
 }
 if(!availableProductPdf(p))missingPdfs.push(p.id);
 // Balanced HTML includes the new body template, not just content strings.
 const stack=[],voids=new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
 for(const m of h.replace(/<script[\s\S]*?<\/script>/g,'').matchAll(/<(\/?)([a-z][a-z0-9]*)\b[^>]*>/gi)){
  const tag=m[2].toLowerCase();if(voids.has(tag))continue;
  if(m[1])assert.equal(stack.pop(),tag,`${p.page}: HTML nesting`);else stack.push(tag);
 }
 assert.equal(stack.length,0);
}
for(const s of solutions){
 const h=html.get(`${s.id}.html`);
 const cards=[...h.matchAll(/<article class="pf-card" data-product="([^"]+)">([\s\S]*?)<\/article>/g)];
 assert.equal(cards.length,s.options.length);
 assert.ok(h.includes('id="compare-products"'));
 for(let i=0;i<cards.length;i++){
  const p=productForOffering(...s.options[i]),card=cards[i][2];
  assert.equal(cards[i][1],p.id);
  const links=[...card.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  assert.ok(links[0][1].includes(`href="${p.page}"`));
  assert.ok(links[0][2].startsWith('Explore Product'));assert.ok(!/target=/.test(links[0][1]));
  if(availableProductPdf(p)){assert.ok(links[1][1].includes(`href="${p.pdf}"`)&&links[1][1].includes('download'));assert.ok(links[1][2].startsWith('Download PDF'));}
  for(const m of card.matchAll(/href="contact.html\?([^"]+)"/g)){
   const q=new URLSearchParams(decode(m[1]).split('#')[0]);
   assert.equal(q.get('product'),p.id);assert.equal(q.get('solution'),s.id);assert.equal(q.get('partner'),p.partner);
  }
  productCards++;
 }
}
// Exercise the actual enquiry controller, including allowlisted product prefill and email context.
const contact=html.get('contact.html');
for(const p of products){
 const fields={};
 for(const m of contact.matchAll(/<select name="([^"]+)">([\s\S]*?)<\/select>/g)){
  const options=[...m[2].matchAll(/<option([^>]*)>(.*?)<\/option>/g)].map(([,attrs,text])=>({value:decode(attrs.match(/value="([^"]*)"/)?.[1]??text),dataset:{key:attrs.match(/data-key="([^"]*)"/)?.[1]},textContent:decode(text)}));
  fields[m[1]]={options,value:options[0].value,get selectedOptions(){return options.filter(o=>o.value===this.value);}};
 }
 const context={textContent:''},status={},handlers={};
 const form={elements:{namedItem:n=>fields[n]},querySelector:s=>s==='[data-enquiry-context]'?context:s==='.form-status'?status:{addEventListener:(type,fn)=>handlers[type]=fn},addEventListener(){},querySelectorAll:()=>[],checkValidity:()=>true};
 const values=new Map(Object.entries(fields).map(([k,f])=>[k,f.value]));
 vm.runInNewContext(fs.readFileSync('assets/js/portfolio-enquiry.js','utf8'),{document:{body:{classList:{contains:()=>true}},querySelector:()=>form},window:{location:{search:`?partner=${p.partner}&solution=${p.solutions[0]}&product=${p.id}`}},URLSearchParams,setTimeout,FormData:class{constructor(){this.data=new Map(Object.entries(fields).map(([k,f])=>[k,f.value]));}get(k){return this.data.get(k);}set(k,v){this.data.set(k,v);}}});
 assert.equal(fields.product.value,p.name);assert.ok(context.textContent.includes(p.name));
 const event={currentTarget:{href:''},preventDefault(){throw new Error('Unexpected invalid form');}};
 handlers.click(event);
 assert.ok(decodeURIComponent(event.currentTarget.href).includes(`Product: ${p.name}`));
}
const result={products:products.length,solutionPages:solutions.length,solutionProductCards:productCards,localLinks,pdfLinks,missingPdfs,protectedFiles:protectedFiles.length,homepageHash:hash('index.html'),status:'passed'};
fs.writeFileSync('verification/product-validation.json',JSON.stringify(result,null,2));
fs.writeFileSync('verification/product-mapping.json',JSON.stringify(products.map(p=>({product:p.name,id:p.id,page:p.page,pdf:availableProductPdf(p),solutions:p.solutions,references:p.references,reviewDate:p.reviewDate})),null,2));
console.log(JSON.stringify(result,null,2));
