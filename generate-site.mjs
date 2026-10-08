import fs from 'node:fs';
import path from 'node:path';
import { redesignHome } from './redesign-home.mjs';
import { renderTechnologyPartners } from './technology-partners.mjs';
import { improveCustomerExperience } from './customer-experience.mjs';
import { simplifyHome } from './simple-home.mjs';
import { normalizeNavigation } from './navigation.mjs';

const root = process.cwd();
for (const dir of ['assets/css','assets/js','assets/images','assets/icons']) fs.mkdirSync(path.join(root, dir), { recursive: true });

const pages = {
  'cybersecurity.html': ['Cyber Security', 'Stay ahead of evolving cyber risk', 'cybersecurity'],
  'index.html': ['Home', 'Secure, resilient IT for ambitious enterprises', 'homepage'],
  'about.html': ['About ITSIPL', 'Three decades of practical IT expertise', 'about'],
  'data-protection.html': ['Data Protection', 'Keep critical business data available', 'data-protection'],
  'it-infrastructure.html': ['IT Infrastructure', 'Build a foundation that scales', 'it-infrastructure'],
  'managed-services.html': ['Managed Services', 'Reliable IT operations, every day', 'managed-services'],
  'industries.html': ['Industries', 'Technology shaped around your sector', 'industries'],
  'partners.html': ['Technology Partners', 'An ecosystem built for enterprise outcomes', 'partners'],
  'insights.html': ['Insights', 'Practical guidance for secure growth', 'insights'],
  'contact.html': ['Contact', 'Let’s solve your next IT challenge', 'contact'],
  'privacy-policy.html': ['Privacy Policy', 'How we handle website information', 'privacy'],
  'terms.html': ['Terms & Conditions', 'Terms for using this website', 'terms'],
  '404.html': ['Page Not Found', 'The page you’re looking for isn’t here', '404']
};

const solutions = [
  ['Cyber Security','Shield identities, endpoints, networks, and data with layered, continuously managed protection.',['Security Operations Centre','Network Security','Endpoint Protection','Zero Trust Security','Vulnerability Assessment'],'cybersecurity.html','shield'],
  ['Data Protection','Keep business-critical information recoverable, resilient, and ready when disruption strikes.',['Backup Solutions','Disaster Recovery','Data Security','Business Continuity','Cloud Backup'],'data-protection.html','database'],
  ['IT Infrastructure','Modernize the platforms, networks, and data centres that power productive work.',['Servers and Storage','Virtualization','Cloud Infrastructure','Networking Solutions','Data Centre Solutions'],'it-infrastructure.html','server'],
  ['Managed Services','Extend your team with proactive monitoring, maintenance, and expert day-to-day support.',['AMC and Maintenance','IT Monitoring','Helpdesk Support','IT Consultancy','Remote Management'],'managed-services.html','pulse']
];

const industries = [
  ['Banking & Finance','Secure transactions, resilient systems, and controls aligned to a high-trust environment.','bank'],
  ['Manufacturing','Protect connected operations and keep production-critical infrastructure available.','factory'],
  ['Healthcare','Safeguard sensitive records while enabling dependable access across care teams.','health'],
  ['Education','Create secure, accessible digital learning environments for institutions of every size.','book'],
];

const icon = name => `<span class="line-icon ${name}" aria-hidden="true"></span>`;
const nav = active => `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" data-header><div class="nav-shell">
  <a class="brand" href="index.html" aria-label="ITSIPL home"><img class="brand-logo" src="assets/images/its-logo.png" alt="ITSIPL — Integrated IT Solutions" width="500" height="255"></a>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span><span class="sr-only">Open navigation</span></button>
  <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
    <a ${active==='homepage'?'aria-current="page"':''} href="index.html">Home</a>
    <div class="nav-group"><button type="button" aria-expanded="false">Solutions <span>⌄</span></button><div class="dropdown"><a href="data-protection.html">Data Protection</a><a href="it-infrastructure.html">IT Infrastructure</a><a href="managed-services.html">Managed Services</a></div></div>
    <a ${active==='industries'?'aria-current="page"':''} href="industries.html">Industries</a>
    <a ${active==='partners'?'aria-current="page"':''} href="partners.html">Partners</a>
    <a ${active==='insights'?'aria-current="page"':''} href="insights.html">Insights</a>
    <div class="nav-group"><button type="button" aria-expanded="false">About Us <span>⌄</span></button><div class="dropdown"><a href="about.html">Our Company</a><a href="contact.html">Contact</a></div></div>
    <a class="button button-sm" href="contact.html">Get in Touch</a>
    <button class="search-toggle" type="button" aria-label="Open site search">⌕</button>
  </nav>
</div></header>
<div class="search-panel" role="search" hidden><form action="insights.html"><label class="sr-only" for="site-search">Search</label><input id="site-search" name="q" type="search" placeholder="Search ITSIPL…"><button class="button button-sm" type="submit">Search</button><button class="search-close" type="button" aria-label="Close search">×</button></form></div>`;

const footer = `
<section class="final-cta"><div class="container"><p class="eyebrow light">LET’S BUILD RESILIENCE</p><h2>Ready to Secure and Transform Your Business?</h2><div class="button-row centered"><a class="button button-light" href="contact.html">Schedule Consultation</a></div></div></section>
<footer class="site-footer"><div class="container footer-grid">
  <div><a class="brand brand-footer" href="index.html"><img class="brand-logo" src="assets/images/its-logo.png" alt="ITSIPL — Integrated IT Solutions" width="500" height="255"></a><p>Your technology partner for secure, resilient, and future-ready IT infrastructure since 1996.</p><div class="socials" aria-label="Social media"><a href="#" aria-label="LinkedIn">in</a><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="X">x</a></div></div>
  <div><h3>Solutions</h3><a href="cybersecurity.html">Cyber Security</a><a href="data-protection.html">Data Protection</a><a href="it-infrastructure.html">IT Infrastructure</a><a href="managed-services.html">Managed Services</a></div>
  <div><h3>Company</h3><a href="about.html">About Us</a><a href="partners.html">Partners</a><a href="industries.html">Industries</a><a href="insights.html">Insights</a></div>
  <div><h3>Contact</h3><p class="contact-placeholder">Contact details awaiting company confirmation.</p></div>
</div><div class="container footer-bottom"><p>© <span data-year></span> ITS Integrated IT Solutions Pvt. Ltd.</p><div><a href="privacy-policy.html">Privacy Policy</a><a href="terms.html">Terms & Conditions</a></div></div></footer>`;

const head = (title, desc, file) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | ITSIPL</title><meta name="description" content="${desc}"><link rel="canonical" href="https://www.example.com/${file==='index.html'?'':file}"><meta property="og:type" content="website"><meta property="og:title" content="${title} | ITSIPL"><meta property="og:description" content="${desc}"><meta property="og:url" content="https://www.example.com/${file==='index.html'?'':file}"><meta name="theme-color" content="#050505"><link rel="stylesheet" href="assets/css/styles.css"><script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"ITS Integrated IT Solutions Pvt. Ltd.","alternateName":"ITSIPL","url":"https://www.example.com/","foundingDate":"1996","description":"Enterprise cybersecurity, data protection, IT infrastructure, and managed services provider."}</script></head>`;
const slug = s => s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const bread = title => `<div class="breadcrumbs container"><a href="index.html">Home</a><span>/</span><span>${title}</span></div>`;
const innerHero = (title, h1, intro) => `<section class="inner-hero"><div class="hero-grid"></div>${bread(title)}<div class="container inner-hero-content"><p class="eyebrow light">ITSIPL / ${title.toUpperCase()}</p><h1>${h1}</h1><p>${intro}</p></div></section>`;

function home(){ return `${nav('homepage')}<main id="main">
<section class="hero"><div class="hero-grid"></div><div class="orb orb-one"></div><div class="orb orb-two"></div><div class="container hero-content"><p class="eyebrow light"><span></span>SINCE 1996</p><h1>Secure. Protect. Transform.<br><em>Your IT Infrastructure.</em></h1><p class="hero-copy">We help enterprises reduce cyber risk, protect critical data, modernize infrastructure, and operate IT with confidence.</p><div class="button-row"><a class="button" href="contact.html">Schedule Consultation</a><a class="button button-outline-light" href="#solutions">Explore Solutions</a></div></div><div class="security-viz" aria-hidden="true"><div class="core">ITS</div><i></i><i></i><i></i><i></i><span></span><span></span><span></span></div><div class="scroll-cue">SCROLL <b></b></div></section>
<section class="stats"><div class="container stats-grid">${[['30+','Years of Excellence'],['26+','Technology Partners'],['24+','Industry Awards*'],['500+','Enterprise Projects*']].map(x=>`<div class="stat"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('')}</div><p class="data-note container">*Sample figures pending company verification.</p></section>
<section id="solutions" class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">WHAT WE DO</p><h2>Comprehensive IT Solutions<br>for Your Business</h2></div><p>From strategy to round-the-clock operations, we connect the technology, expertise, and support your business needs to move securely.</p></div><div class="solution-grid">${solutions.map((s,i)=>`<article class="solution-card"><div class="card-top tone-${i}">${icon(s[5])}<span>0${i+1}</span></div><div class="card-body"><h3>${s[0]}</h3><p>${s[1]}</p><ul>${s[2].map(x=>`<li>${x}</li>`).join('')}</ul><a class="text-link" href="${s[3]}">Explore More <span>→</span></a></div></article>`).join('')}</div></div></section>
${renderTechnologyPartners({ home: true })}
<section class="section muted"><div class="container"><div class="section-heading"><div><p class="eyebrow">INDUSTRIES</p><h2>Solutions Tailored<br>for Every Industry</h2></div><a class="text-link" href="industries.html">View all industries →</a></div><div class="industry-grid">${industries.map(x=>`<a class="industry-card" href="industries.html">${icon(x[2])}<h3>${x[0]}</h3><p>${x[1]}</p><span>Learn more →</span></a>`).join('')}</div></div></section>
<section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">SUCCESS STORIES</p><h2>Real Challenges.<br>Real Results.</h2></div><p>Illustrative scenarios showing how integrated IT services can create measurable operational improvements.</p></div><div class="story-grid">${[['Manufacturing','Reduced ransomware exposure','A layered endpoint, network, and recovery program designed to reduce operational risk.','Risk reduction'],['Banking & Finance','Faster recovery readiness','A modern protection architecture focused on application availability and tested recovery.','Resilience'],['Healthcare','Stronger data safeguards','Security controls and monitoring structured around sensitive information and compliance needs.','Data security']].map(x=>`<article class="story-card"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p><strong>${x[3]} <small>Illustrative outcome</small></strong></article>`).join('')}</div><p class="data-note">All case studies and outcomes shown are sample content pending client approval.</p></div></section>
<section class="section insights-preview"><div class="container"><div class="section-heading"><div><p class="eyebrow">INSIGHTS & RESOURCES</p><h2>Stay Updated.<br>Stay Secure.</h2></div><a class="text-link" href="insights.html">Explore all insights →</a></div>${articleGrid()}</div></section>
</main>${footer}`; }

function articleGrid(){ return `<div class="article-grid">${[
['Cyber Security','Top Cybersecurity Threats Enterprises Should Watch','A practical overview of the attack patterns security leaders should keep on their radar.'],
['Infrastructure','How to Build a Scalable IT Infrastructure for Growth','Principles for designing capacity, connectivity, and operations that evolve with demand.'],
['Data Protection','Why Backup and Disaster Recovery Are Critical for Business','How tested recovery planning protects continuity when ordinary safeguards fail.'],
['Compliance','Understanding Data Compliance in Today’s Digital World','A clear starting point for aligning information controls with business obligations.']
].map((x,i)=>`<article class="article-card"><div class="article-art art-${i}"><span>0${i+1}</span></div><div><span class="tag">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p><a class="text-link" href="insights.html#article-${i+1}">Read article →</a></div></article>`).join('')}</div>`; }

function standard(type,title,h1){
 const intros={about:'ITSIPL helps organizations build secure, dependable technology environments through hands-on expertise and enduring partnerships.',cybersecurity:'Reduce exposure across users, devices, networks, and cloud environments with a connected security approach.', 'data-protection':'Protect information through its full lifecycle and recover with confidence when disruption occurs.','it-infrastructure':'Design, modernize, and operate infrastructure that is secure, efficient, and ready for change.','managed-services':'Give your internal team the reach, visibility, and specialist support to keep technology performing.','industries':'Every sector has distinct risks, workflows, and obligations. Our approach starts with understanding yours.','partners':'We bring together trusted technology platforms and practical implementation expertise to deliver cohesive solutions.'};
 if(type==='about') return `${nav(type)}<main id="main">${innerHero(title,h1,intros[type])}<section class="section"><div class="container split"><div><p class="eyebrow">WHO WE ARE</p><h2>Experience that translates into confident decisions</h2></div><div class="rich-text"><p>Founded in 1996, ITS Integrated IT Solutions Pvt. Ltd. supports organizations navigating changing security threats, growing data, and increasingly complex infrastructure.</p><p>Our role is straightforward: understand the operational need, design the right-fit solution, implement it responsibly, and remain accountable after go-live.</p></div></div><div class="container value-grid">${[['Clarity first','Recommendations grounded in business requirements—not technology for its own sake.'],['Built for resilience','Security and recoverability considered throughout the technology lifecycle.'],['Long-term partnership','Responsive support and practical guidance beyond project delivery.']].map(x=>`<article>${icon('diamond')}<h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div></section><section class="section dark-section"><div class="container split"><div><p class="eyebrow light">OUR APPROACH</p><h2>From complexity to a clear path forward</h2></div><ol class="process"><li><b>01</b><span><strong>Discover</strong>Understand systems, risks, priorities, and constraints.</span></li><li><b>02</b><span><strong>Design</strong>Shape an integrated solution and realistic roadmap.</span></li><li><b>03</b><span><strong>Deliver</strong>Implement with discipline, documentation, and care.</span></li><li><b>04</b><span><strong>Support</strong>Monitor, maintain, and improve over time.</span></li></ol></div></section></main>${footer}`;
 if(type==='industries') return `${nav(type)}<main id="main">${innerHero(title,h1,intros[type])}<section class="section"><div class="container industry-grid expanded">${industries.map(x=>`<article class="industry-card">${icon(x[2])}<h2>${x[0]}</h2><p>${x[1]}</p><ul><li>Risk-aware solution design</li><li>Reliable core infrastructure</li><li>Continuity and recovery planning</li></ul></article>`).join('')}</div></section></main>${footer}`;
 if(type==='partners') return `${nav(type)}<main id="main">${innerHero(title,h1,intros[type])}${renderTechnologyPartners()}</main>${footer}`;
 const sol=solutions.find(s=>s[3]===type+'.html');
 return `${nav(type)}<main id="main">${innerHero(title,h1,intros[type])}<section class="section"><div class="container service-intro"><div><p class="eyebrow">CAPABILITIES</p><h2>A connected approach to ${title.toLowerCase()}</h2><p>${sol[1]}</p><a class="button" href="contact.html">Discuss your requirements</a></div><div class="capability-list">${sol[2].map((x,i)=>`<article><b>0${i+1}</b><div><h3>${x}</h3><p>Assessment, solution design, implementation, and ongoing guidance tailored to your environment.</p></div></article>`).join('')}</div></div></section><section class="section muted"><div class="container"><div class="section-heading"><div><p class="eyebrow">WHY ITSIPL</p><h2>Technology connected to outcomes</h2></div></div><div class="value-grid"><article>${icon('scope')}<h3>Context-led design</h3><p>We begin with your systems, people, risks, and priorities.</p></article><article>${icon('layers')}<h3>Integrated delivery</h3><p>We coordinate platforms and services as one working environment.</p></article><article>${icon('support')}<h3>Lifecycle support</h3><p>We stay engaged from initial assessment through ongoing operations.</p></article></div></div></section></main>${footer}`;
}

function insights(){return `${nav('insights')}<main id="main">${innerHero('Insights','Practical guidance for secure growth','Ideas and frameworks to help technology leaders make clearer decisions about security, resilience, and infrastructure.')}<section class="section"><div class="container">${articleGrid()}<div class="article-details">${[
['Top Cybersecurity Threats Enterprises Should Watch','Strong defence begins with a current inventory, well-managed identities, protected endpoints, segmented networks, and a response plan the team has actually rehearsed.'],
['How to Build a Scalable IT Infrastructure for Growth','Design around workloads and service levels, standardize where possible, automate repeatable operations, and review capacity before growth becomes an emergency.'],
['Why Backup and Disaster Recovery Are Critical for Business','Backups are valuable only when they are isolated, monitored, and regularly restored in realistic tests. Recovery objectives should be agreed with business owners.'],
['Understanding Data Compliance in Today’s Digital World','Start by knowing what information you hold, why you hold it, where it moves, who can access it, and how long it should remain. Then map controls to applicable obligations.']
].map((x,i)=>`<article id="article-${i+1}"><span class="tag">INSIGHT 0${i+1}</span><h2>${x[0]}</h2><p>${x[1]}</p></article>`).join('')}</div></div></section></main>${footer}`}

function contact(){return `${nav('contact')}<main id="main">${innerHero('Contact','Let’s solve your next IT challenge','Tell us where you are today and what you need to achieve. Our team can help shape the next step.')}<section class="section"><div class="container contact-layout"><form id="contact-form" class="contact-form" novalidate><div class="form-heading"><p class="eyebrow">START A CONVERSATION</p><h2>How can we help?</h2><p>Fields marked * are required.</p></div><div class="form-grid"><label>Full name *<input name="name" autocomplete="name" required></label><label>Business email *<input name="email" type="email" autocomplete="email" required></label><label>Phone<input name="phone" type="tel" autocomplete="tel"></label><label>Company<input name="company" autocomplete="organization"></label><label class="wide">Service required<select name="service"><option value="">Select a service</option><option>Cyber Security</option><option>Data Protection</option><option>IT Infrastructure</option><option>Managed Services</option><option>Other</option></select></label><label class="wide">Message *<textarea name="message" rows="6" required></textarea></label><label class="check wide"><input name="consent" type="checkbox" required><span>I consent to ITSIPL using these details to respond to my enquiry. *</span></label><div class="wide"><button class="button" type="submit">Submit Enquiry</button><p class="form-status" role="status" aria-live="polite"></p></div></div></form><aside class="contact-aside"><p class="eyebrow light">CONTACT DETAILS</p><h2>We’re ready when you are.</h2><p>Verified address, email, and telephone details have not yet been supplied.</p><div class="contact-block"><span>Company</span><strong>ITS Integrated IT Solutions Pvt. Ltd.</strong></div><div class="contact-block"><span>Office hours</span><strong>Available on confirmation</strong></div><a class="button button-outline-light disabled" href="#" aria-disabled="true">WhatsApp — number required</a><div class="map-placeholder" role="img" aria-label="Map placeholder awaiting verified office address"><span>MAP</span><p>Google Maps embed will be added after the office address is confirmed.</p></div></aside></div></section></main>${footer}<script src="assets/js/contact.js" defer></script>`}

function legal(type,title,h1){const isPrivacy=type==='privacy'; return `${nav(type)}<main id="main">${innerHero(title,h1,'This page is a draft placeholder and must be reviewed against the company’s actual policies before publication.')}<section class="section"><article class="container legal"><p class="notice"><strong>Draft notice:</strong> This content is provided as a structural starting point and is not legal advice.</p><h2>${isPrivacy?'Information we collect':'Using this website'}</h2><p>${isPrivacy?'If you use the enquiry form, we may collect the details you choose to provide, such as your name, business email, phone number, company, and message. The static demonstration form does not transmit or store this information.':'You may use this website for lawful informational purposes. Do not attempt to disrupt its availability, access restricted systems, or misuse its content.'}</p><h2>${isPrivacy?'How information may be used':'Website information'}</h2><p>${isPrivacy?'Once a form service is connected, submitted information may be used to respond to enquiries, provide requested information, and maintain appropriate business records. The final policy should name the service provider, retention period, lawful basis, and user rights.':'Content is provided for general information. Service descriptions do not constitute a guarantee, proposal, or binding commitment.'}</p><h2>${isPrivacy?'Cookies and third parties':'Intellectual property'}</h2><p>${isPrivacy?'No analytics or advertising cookies are configured in this static build. Any future analytics, map, chat, or form integration must be reflected in the published policy and consent controls where applicable.':'Company names and product names may be trademarks of their respective owners. Official partner logos should be used only with appropriate authorization.'}</p><h2>Contact</h2><p>Privacy and legal contact details must be added after company confirmation. Please use the <a href="contact.html">contact page</a> in the meantime.</p><p class="updated">Last updated: September 2026</p></article></section></main>${footer}`}

function notFound(){return `${nav('404')}<main id="main" class="not-found"><div class="hero-grid"></div><div class="container"><span>404</span><h1>The page you’re looking for isn’t here.</h1><p>It may have moved, or the address may be incorrect.</p><a class="button" href="index.html">Return to homepage</a></div></main>${footer}`}

const chatWidget = fs.readFileSync(new URL('./assets/partials/chat-widget.html', import.meta.url), 'utf8');
for (const [file,[title,h1,type]] of Object.entries(pages)) {
 if (type === 'industries') {
  fs.writeFileSync(path.join(root,file), fs.readFileSync(new URL('./templates/industries-base.html', import.meta.url)));
  continue;
 }
 let body = type==='homepage'?home():type==='insights'?insights():type==='contact'?contact():['privacy','terms'].includes(type)?legal(type,title,h1):type==='404'?notFound():standard(type,title,h1);
 const desc = type==='homepage'?'Enterprise cybersecurity, data protection, IT infrastructure, and managed services from ITSIPL.':`${h1}. Learn how ITSIPL supports secure, resilient enterprise IT.`;
 const html = `${head(title,desc,file)}<body>${body}${chatWidget}<script src="assets/js/main.js" defer></script></body></html>`;
 const page = improveCustomerExperience(type === 'homepage' ? redesignHome(html) : html, type === 'homepage');
 fs.writeFileSync(path.join(root,file), normalizeNavigation(type === 'homepage' ? simplifyHome(page) : page, file));
}

console.log(`Generated ${Object.keys(pages).length} pages.`);
