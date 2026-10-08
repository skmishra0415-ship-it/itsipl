import fs from 'node:fs';
import { partnerLinkAttributes, partnerNewTabText } from './partner-destinations.mjs';
import crypto from 'node:crypto';
import { technologyPartners } from './technology-partners.mjs';
import { partnerContent, solutions, sources } from './portfolio-data.mjs';
import { normalizeNavigation } from './navigation.mjs';
import { products, productForOffering, availableProductPdf } from './product-data.mjs';
import { renderProduct, renderProductComparison } from './product-page.mjs';

// Separate, explicit output allowlist: never invoke the legacy whole-site generator.
const outputs = new Set(['partners.html', 'contact.html', ...technologyPartners.map(p => `partner-${p.id}.html`), ...solutions.map(s => `${s.id}.html`), ...products.map(p=>p.page)]);
const homeHash = () => crypto.createHash('sha256').update(fs.readFileSync('index.html')).digest('hex');
const before = homeHash();
const e = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const link = (href,label) => `<a href="${e(href)}">${e(label)}</a>`;
const list = items => `<ul class="pf-list">${items.map(i => `<li>${e(i)}</li>`).join('')}</ul>`;
const solution = id => { const item=solutions.find(s=>s.id===id); if(!item) throw new Error(`Unknown solution ${id}`); return item; };
const partner = id => { const item=technologyPartners.find(p=>p.id===id); if(!item) throw new Error(`Unknown partner ${id}`); return item; };
const purl = id => `partner-${id}.html`;
const partnerLink = (id, label) => `<a ${partnerLinkAttributes(id)}>${e(label)}${partnerNewTabText(id)}</a>`;
const enquiry = (context,intent='requirements') => `contact.html?${new URLSearchParams({...context,intent})}#contact-form`;
const actions = context => `<div class="pf-actions"><a class="button" href="${e(enquiry(context,'quote'))}">Request a Quote <span aria-hidden="true">&rarr;</span></a><a class="button pf-secondary" href="${e(enquiry(context))}">Discuss My Requirements</a></div>`;
const sourceLink = key => {if(!sources[key]) throw new Error(`Unknown source ${key}`); return link(sources[key][1], `${sources[key][0]} — official information`);};
const section = (id,kicker,title,content,muted=false) => `<section id="${id}" class="pf-section${muted?' pf-muted':''}"><div class="container"><div class="pf-heading"><p class="eyebrow">${e(kicker)}</p><h2>${e(title)}</h2></div>${content}</div></section>`;
const steps = `<div class="pf-grid pf-three">${[
  ['01 / Understand','Start with requirements','ITSIPL reviews your business need, existing systems and budget to help scope suitable technology. Bring current licences and renewal dates so a replacement is considered in context.'],
  ['02 / Purchase','Make the quote clear','As your reseller and solution partner, ITSIPL helps with product selection and purchasing. The quote should identify the edition, quantities, term, vendor support and separately scoped services.'],
  ['03 / Deliver','Agree responsibilities','The existing ITSIPL portfolio includes solution design, implementation and ongoing support. Confirm the tasks, delivery owner, prerequisites and support boundaries for your project in the proposal.']
].map(([k,t,p])=>`<article class="pf-card"><p class="pf-kicker">${e(k)}</p><h3>${e(t)}</h3><p>${e(p)}</p></article>`).join('')}</div><p class="pf-note">Product licences, vendor-operated services and ITSIPL services are separate scopes. Support hours, response targets, migration work and training are included only when specified in the proposal.</p>`;

function shell(title,description,file,body,active='solutions') {
  let html=fs.readFileSync('templates/portfolio-base.html','utf8').replaceAll(' aria-current="page"','');
  html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${e(title)} | ITSIPL</title>`)
    .replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${e(description)}">`)
    .replace(/<link rel="canonical"[^>]*>/,`<link rel="canonical" href="https://www.itsipl.com/${file}">`)
    .replace(/<meta property="og:title"[^>]*>/,`<meta property="og:title" content="${e(title)} | ITSIPL">`)
    .replace(/<meta property="og:description"[^>]*>/,`<meta property="og:description" content="${e(description)}">`)
    .replace(/<meta property="og:url"[^>]*>/,`<meta property="og:url" content="https://www.itsipl.com/${file}">`)
    .replace('<body>','<body class="portfolio-page">')
    .replace('</head>','<link rel="stylesheet" href="assets/css/portfolio.css"></head>')
    .replace(/<main id="main">[\s\S]*?<\/main>/,`<main id="main">${body}</main>`)
    .replace(/<section class="final-cta">[\s\S]*?<\/section>/,'');
  html=normalizeNavigation(html,file);
  if(active==='partners') html=html.replace('<a  href="partners.html">','<a aria-current="page" href="partners.html">');
  return html;
}


function hero({title,intro,eyebrow,crumbs,context,logo}) {
  return `<section class="pf-hero"><div class="container"><nav class="pf-breadcrumbs" aria-label="Breadcrumb"><ol><li>${link('index.html','Home')}</li>${crumbs.map(([href,label])=>`<li>${href?link(href,label):`<span aria-current="page">${e(label)}</span>`}</li>`).join('')}</ol></nav><div class="pf-hero-grid"><div><p class="eyebrow light">ITSIPL / ${e(eyebrow)}</p><h1>${e(title)}</h1><p class="pf-lead">${e(intro)}</p>${actions(context)}</div>${logo?`<div class="pf-partner-identity"><p>Technology from</p><div class="pf-logo-panel" data-partner="${logo.id}"><img src="assets/images/partners/${e(logo.file)}" alt="${e(logo.name)} logo" width="${logo.width}" height="${logo.height}"></div><p>Selection &amp; solutions with <strong>ITSIPL</strong></p></div>`:`<aside class="pf-hero-aside"><span class="pf-kicker">A practical starting point</span><h2>Your requirement comes first.</h2><p>Existing systems. Essential features. Available budget. People to support it.</p>${link('partners.html','Explore the ITSIPL partner portfolio →')}</aside>`}</div></div></section>`;
}

function cta(context,title='Let ITSIPL help you narrow the choice.',copy='Tell us what needs to work better, what you use today and when you need a decision.') {
  return section('next-step','YOUR NEXT STEP',title,`<div class="pf-cta"><p>${e(copy)}</p>${actions(context)}<p class="pf-note">Prefer a conversation? ${link('tel:+911147695000','+91 11 4769 5000')} · ${link('mailto:sales@itsipl.com','sales@itsipl.com')}</p></div>`,true);
}

function productCard(id,index,heading=3,solutionId) {
  const p=partner(id), item=partnerContent[id].products[index];
  if(!item) throw new Error(`Unknown product ${id}/${index}`);
  const [need,name,description,source]=item;
  const product=productForOffering(id,index), pdf=product&&availableProductPdf(product);
  const productLinks=product?`<a href="${product.page}" aria-label="Explore Product: ${e(product.name)}">Explore Product<span class="sr-only">: ${e(product.name)}</span></a>${pdf?`<a href="${pdf}" download aria-label="Download PDF: ${e(product.name)}">Download PDF<span class="sr-only">: ${e(product.name)}</span></a>`:''}`:'';
  const enquiryLink=product?link(enquiry({partner:id,product:product.id,...(solutionId?{solution:solutionId}:{})}),'Discuss this product'):'';
  return `<article class="pf-card"${product?` data-product="${product.id}"`:''}><p class="pf-kicker">${e(need)}</p><h${heading}>${e(product?.name||name)}</h${heading}><p>${e(description)}</p><div class="pf-card-links">${solutionId ? (product ? `<a href="${product.page}" aria-label="Explore Product: ${e(product.name)}">Explore Product<span class="sr-only">: ${e(product.name)}</span></a>` : '') : `${productLinks}${partnerLink(id,`Explore ${p.name} with ITSIPL →`)}${enquiryLink}${solutionId?'':sourceLink(source)}`}</div></article>`;
}

function renderPartner(p) {
  const d=partnerContent[p.id], context={partner:p.id};
  const heroHtml=hero({title:`${p.name} solutions through ITSIPL`,intro:d.intro,eyebrow:'TECHNOLOGY PARTNER',crumbs:[['partners.html','Partners'],[null,p.name]],context,logo:p});
  const jump=`<nav class="pf-jump" aria-label="On this page"><div class="container">${[['fit','Who it suits'],['products','Products by need'],['considerations','What to consider'],['cost','Cost factors'],['itsipl-role','ITSIPL’s role']].map(([id,n])=>link(`#${id}`,n)).join('')}</div></nav>`;
  const content=heroHtml+jump+
    section('fit','WHERE TO START',d.headline,`<div class="pf-split"><div><h3>Who it may suit</h3>${list(d.fit)}</div><aside class="pf-callout"><h3>Bring this to your ITSIPL discussion</h3><p>${e(d.prepare)}</p><p>No single brand is the right choice for every environment. Evaluate the requirement and the proposed edition together.</p></aside></div>`)+
    section('products','PRODUCTS BY CUSTOMER NEED','Start with the job you need done.',`<div class="pf-grid">${d.products.map((_,i)=>productCard(p.id,i)).join('')}</div><p class="pf-note">These are selected relevant offerings, not a complete vendor catalogue. Confirm product availability, compatibility and entitlements in your quote.</p>`,true)+
    section('considerations','A BALANCED DECISION','Strengths and purchase considerations',`<div class="pf-split"><div><h3>Practical strengths</h3>${list(d.strengths)}</div><div><h3>Check before purchasing</h3>${list(d.considerations)}</div></div>`)+
    section('cost','BUDGET AND SCOPE','What affects the cost?',`<p class="pf-intro">${e(d.cost)}</p><dl class="pf-factors"><div><dt>Scale</dt><dd>Confirm the applicable device, user, workload or capacity count, including expected growth.</dd></div><div><dt>Edition &amp; features</dt><dd>Separate essential capabilities from optional modules and add-ons.</dd></div><div><dt>Subscription term</dt><dd>Review the initial term, renewal date and any existing contracts that overlap.</dd></div><div><dt>Deployment</dt><dd>Include hosting, integration, migration and rollout work where required.</dd></div><div><dt>Support</dt><dd>Identify vendor entitlements and the ITSIPL support scope separately.</dd></div></dl><p class="pf-note">ITSIPL provides a requirement-based quotation. No indicative price is shown because the correct configuration and service scope must be established first.</p>`,true)+
    section('itsipl-role','WHY WORK WITH ITSIPL','From a requirement to an agreed scope',steps)+
    section('related','CONTINUE YOUR EVALUATION','Related solutions and relevant options',`<div class="pf-split"><div><h3>Explore the requirement</h3><ul class="pf-link-list">${d.related.map(id=>`<li>${link(`${id}.html`,solution(id).name)}</li>`).join('')}</ul></div><div><h3>Other portfolio options</h3><p>Use the linked guides to compare products for the same need, rather than comparing whole brands.</p><ul class="pf-link-list">${d.alternatives.map(id=>`<li>${partnerLink(id,`${partner(id).name} — ${d.related.filter(s=>partnerContent[id].related.includes(s)).map(s=>solution(s).name).join(', ')}`)}</li>`).join('')}</ul></div></div>` ,true)+
    cta(context,`Discuss your ${p.name} requirement with ITSIPL.`,d.prepare);
  return shell(`${p.name} Solutions & Buying Guide`, `Explore ${p.name} through ITSIPL: product fit, purchasing considerations, cost factors and a requirement-based quote.`,purl(p.id),content,'partners');
}


const endpointOverviewCard = '<section id="security-solutions" class="pf-section"><div class="container"><div class="pf-heading"><p class="eyebrow">CYBERSECURITY SOLUTIONS</p><h2>Explore Endpoint Security</h2></div><div class="pf-grid"><article class="pf-card"><p class="pf-kicker">A solution within Cybersecurity</p><h3><a href="endpoint-security.html">Endpoint Security</a></h3><p>Protect computers and servers with endpoint prevention, detection and response. Explore relevant Sophos and CrowdStrike offerings.</p><div class="pf-card-links"><a href="endpoint-security.html">Explore Endpoint Security &rarr;</a></div></article></div></div></section>';

function renderSolution(s) {
  const context={solution:s.id};
  const content=hero({title:s.name,intro:s.intro,eyebrow:'SOLUTIONS',crumbs:[['cybersecurity.html','Solutions'],...(s.id==='endpoint-security' ? [['cybersecurity.html','Cybersecurity']] : []),[null,s.name]],context})+
    (s.id==='cybersecurity' ? endpointOverviewCard : '')+
    section('requirements','BEFORE YOU BUY',s.headline,`<div class="pf-split"><div><h3>Requirements to gather</h3>${list(s.requirements)}</div><aside class="pf-callout"><h3>Define the right problem</h3><p>${e(s.distinction)}</p></aside></div>`)+
    section('options','RELEVANT PARTNER OPTIONS','A shortlist tied to your needs',`<p class="pf-intro">${e(s.decision)}</p><div class="pf-grid">${s.options.map(([id,i])=>productCard(id,i,3,s.id)).join('')}</div>`,true)+
    renderProductComparison(s,{section,e,link})+
    section('selection','FEATURES, BUDGET AND SUPPORT','Compare the complete scope.',`<div class="pf-split"><div><h3>Fit with the existing environment</h3><p>Bring the current product names, versions, licences and renewal dates. Check supported integrations and the effort needed to migrate, operate and maintain each option.</p><p>${e(s.budget)}</p></div><div><h3>What a useful evaluation should establish</h3>${list(s.acceptance)}</div></div>`)+
    section('itsipl-role','ITSIPL AS YOUR SOLUTION PARTNER','Agree the purchase and delivery responsibilities.',steps,true)+
    section('related','RELATED REQUIREMENTS','Build a connected plan.',`<div class="pf-related">${s.related.map(id=>link(`${id}.html`,`${solution(id).name} →`)).join('')}${link('partners.html','All technology partners →')}</div>`)+
    cta(context,'Request an ITSIPL recommendation.','Share your business need, users or devices, existing product, optional budget range and target timeline.');
  return shell(`${s.name} Solutions`,`${s.name} guidance from ITSIPL: customer requirements, relevant partner options, cost and support considerations.`,`${s.id}.html`,content);
}


function partnersOverviewHero() {
  return hero({title:'The right technology starts with your requirements.',intro:'ITSIPL is your reseller and solution partner. Explore our technology portfolio, understand where each option fits, and bring us the context needed for a practical recommendation.',eyebrow:'PARTNER PORTFOLIO',crumbs:[[null,'Partners']],context:{}})
    .replace('class="pf-hero"', 'class="pf-hero pf-partners-hero"')
    .replace(/<a class="button pf-secondary"[^>]*>[\s\S]*?<\/a>/, '')
    .replace(/<aside class="pf-hero-aside">[\s\S]*?<\/aside>/, '<div class="pf-partners-art"><img src="assets/images/partners-technology-core.png" alt="A central business core connected to server, cloud, laptop and security technologies." width="1536" height="1024" decoding="async" fetchpriority="high"></div>');
}

function renderOverview() {
  return shell('Technology Partners & Solution Selection','Explore eight technology partners with ITSIPL. Choose products by business need, existing systems, features, budget and support.','partners.html',
    partnersOverviewHero()+
    section('partner-portfolio','EIGHT TECHNOLOGY PARTNERS','Explore the options with ITSIPL.',`<div class="pf-grid pf-partner-grid">${technologyPartners.map(p=>`<a class="pf-partner-card" id="${p.id}" ${partnerLinkAttributes(p.id)}><div class="pf-logo-panel" data-partner="${p.id}"><img src="assets/images/partners/${e(p.file)}" alt="${e(p.name)} logo" width="${p.width}" height="${p.height}" loading="lazy"></div><h3>${e(p.name)}</h3><p>${e(partnerContent[p.id].headline)}</p><span>Explore solutions &amp; buying guide <span aria-hidden="true">&rarr;</span>${partnerNewTabText(p.id)}</span></a>`).join('')}</div>`)+
    section('choose-by-need','START WITH THE PROBLEM','Prefer to explore by business need?',`<div class="pf-grid pf-three">${solutions.filter(s=>['endpoint-security','data-loss-prevention','data-protection','network-security','secure-access','managed-services'].includes(s.id)).map(s=>`<article class="pf-card"><h3>${link(`${s.id}.html`,s.name)}</h3><p>${e(s.headline)}</p>${link(`${s.id}.html`,'View requirements and options →')}</article>`).join('')}</div>`,true)+
    section('itsipl-role','YOUR ITSIPL TEAM','A purchase that fits the way you work.',steps)+
    cta({},'Not sure which partner to choose?','Start with the business problem. ITSIPL can help you prepare a shortlist around your systems, required features and available budget.'),'partners');
}

function renderContact() {
  let html=fs.readFileSync('templates/contact-base.html','utf8');
  html=html.replace('<body>','<body class="portfolio-page portfolio-contact">').replace('</head>','<link rel="stylesheet" href="assets/css/portfolio.css"></head>');
  html=normalizeNavigation(html,'contact.html');
  html=html.replace(/<title>.*?<\/title>/,'<title>Request a Quote or Recommendation | ITSIPL</title>')
    .replace(/<meta name="description"[^>]*>/,'<meta name="description" content="Discuss your technology requirements with ITSIPL. Prepare a partner or solution enquiry with devices, budget, existing systems and timeline.">')
    .replace(/<meta property="og:title"[^>]*>/,'<meta property="og:title" content="Request a Quote or Recommendation | ITSIPL">')
    .replace(/<meta property="og:description"[^>]*>/,'<meta property="og:description" content="Prepare an ITSIPL enquiry around your business need, partner, devices, budget and timeline.">');
  html=html.replace(/<div class="form-heading">[\s\S]*?<\/div>/,`<div class="form-heading"><p class="eyebrow">YOUR REQUIREMENTS / OUR STARTING POINT</p><h2>Tell ITSIPL what you need.</h2><p>Fields marked * are required. Online submission is not configured. Use <strong>Open Email Draft</strong> to prepare your enquiry in your email application, then review and send it there. You can also ${link('mailto:sales@itsipl.com','email sales@itsipl.com')} or ${link('tel:+911147695000','call +91 11 4769 5000')}.</p><p class="pf-prefill" data-enquiry-context role="status"></p></div>`);
  html=html.replace(/<label class="wide">Service required<select name="service">[\s\S]*?<\/select><\/label>/,`<label>Enquiry type<select name="intent"><option value="requirements">Discuss My Requirements</option><option value="quote">Request a Quote</option></select></label><label>Selected partner (optional)<select name="partner"><option value="">Not sure / help me choose</option>${technologyPartners.map(p=>`<option value="${e(p.name)}" data-key="${p.id}">${e(p.name)}</option>`).join('')}</select></label><label class="wide">Solution or business area<select name="service"><option value="">Not sure / help me choose</option>${solutions.map(s=>`<option value="${e(s.service||s.name)}" data-key="${s.id}">${e(s.name)}</option>`).join('')}<option>Other</option></select></label><label>Users (optional)<input name="users" type="number" min="0" step="1" inputmode="numeric"></label><label>Devices (optional)<input name="devices" type="number" min="0" step="1" inputmode="numeric"></label><label class="wide">Existing product or systems (optional)<input name="existing_product" maxlength="300" placeholder="Product names, versions and renewal dates"></label><label>Budget range (optional)<input name="budget" maxlength="120" placeholder="Include your currency"></label><label>Timeline (optional)<select name="timeline"><option value="">Not decided</option><option>Within 30 days</option><option>1–3 months</option><option>3–6 months</option><option>Exploring for later</option></select></label>`);
  html=html.replace('Message *<textarea','Business need *<textarea').replace('name="message" rows="6"','name="message" rows="6" maxlength="4000" placeholder="What should improve? Include required features, constraints and support needs."');
  html=html.replace('Submit Enquiry</button>','Check Enquiry</button><a class="button pf-email" data-email-draft href="mailto:sales@itsipl.com">Open Email Draft</a><p class="pf-note">Checking the enquiry does not send it. Opening a draft also does not send an email automatically.</p>');
  html=html.replace('</body>','<script src="assets/js/portfolio-enquiry.js" defer></script></body>');
  html=html.replace('<label>Selected partner (optional)',`<label>Selected product (optional)<select name="product"><option value="">Not sure / help me choose</option>${products.map(p=>`<option value="${e(p.name)}" data-key="${p.id}">${e(p.name)}</option>`).join('')}</select></label><label>Selected partner (optional)`);
  return html;
}

const generated=new Map([['partners.html',renderOverview()],['contact.html',renderContact()]]);
for(const p of technologyPartners) generated.set(purl(p.id),renderPartner(p));
for(const s of solutions) generated.set(`${s.id}.html`,renderSolution(s));
for(const p of products) generated.set(p.page,renderProduct(p,{shell,hero,section,list,link,e,actions,steps,partner,partnerLink}));
for(const [file,html] of generated) {
  if(!outputs.has(file) || file==='index.html') throw new Error(`Output not authorized: ${file}`);
  fs.writeFileSync(file,html);
}
const sitemap=fs.readFileSync('sitemap.xml','utf8');
const urls=new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]));
for(const file of generated.keys()) urls.add(`https://www.itsipl.com/${file}`);
fs.writeFileSync('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls].map(u=>`  <url><loc>${e(u)}</loc></url>`).join('\n')}\n</urlset>\n`);
if(homeHash()!==before) throw new Error('Homepage changed unexpectedly');
fs.writeFileSync('verification/portfolio-routes.json',JSON.stringify([...generated.keys()],null,2));
fs.writeFileSync('verification/product-mapping.json',JSON.stringify(products.map(p=>({product:p.name,id:p.id,page:p.page,pdf:availableProductPdf(p),solutions:p.solutions,references:p.references,reviewDate:p.reviewDate})),null,2));
const missingPdfs=products.filter(p=>!availableProductPdf(p)).map(p=>({product:p.name,expectedPdf:p.pdf}));
fs.writeFileSync('verification/product-missing-pdfs.json',JSON.stringify(missingPdfs,null,2));
if(missingPdfs.length)console.warn('PDF download links omitted for missing files:',missingPdfs);
console.log(`Built ${generated.size} non-home pages. Homepage hash unchanged: ${before}`);
