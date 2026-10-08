// Keep the reference-led homepage reproducible when the site is regenerated.
export function redesignHome(html) {
  const icon = (kind) => `<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${[
    '<path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5z"/><path d="m8 11 3 3 5-6"/>',
    '<path d="M6 18a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11"/><path d="M12 22V12m-4 4 4-4 4 4"/>',
    '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6h.1M7 17h.1M12 6h5m-5 11h5"/>',
    '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M2 21v-4a6 6 0 0 1 12 0v4zm13-8a5 5 0 0 1 7 4v4h-5"/>'
  ][kind]}</svg>`;
  html = html.replace('</head>', '<link rel="stylesheet" href="assets/css/home.css"></head>').replace('<body>', '<body class="reference-home">');
  html = html.replace('<a  href="industries.html">', '<div class="nav-group"><button type="button" aria-expanded="false">Services <span>⌄</span></button><div class="dropdown"><a href="managed-services.html">Managed Services</a><a href="contact.html">IT Consultancy</a></div></div><a href="industries.html">');
  html = html.replace(/<button class="search-toggle"[^>]*>.*?<\/button>/, '<button class="search-toggle" type="button" aria-label="Open site search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></svg></button>');
  html = html.replace(/<div class="hero-grid"><\/div><div class="orb orb-one"><\/div><div class="orb orb-two"><\/div>/, '<div class="hero-art" aria-hidden="true"></div>');
  html = html.replace('Secure. Protect. Transform.<br>', 'Secure. Protect.<br>Transform.<br>');
  html = html.replace('We help enterprises reduce cyber risk, protect critical data, modernize infrastructure, and operate IT with confidence.', 'Empowering organizations with robust cybersecurity,<br class="desktop-break"> data protection, and IT infrastructure solutions<br class="desktop-break"> to build a secure and resilient digital future.');
  html = html.replace(/<div class="security-viz"[\s\S]*?<div class="scroll-cue">SCROLL <b><\/b><\/div>/, '');
  const notes = ['Delivering trusted IT solutions since 1996', 'Collaborating with global technology leaders', 'Recognized for excellence and innovation', 'Successfully delivered across diverse industries'];
  let stat = 0;
  html = html.replace(/<div class="stat"><strong>(.*?)<\/strong><span>(.*?)<\/span><\/div>/g, (_, value, label) => `<div class="stat"><span class="stat-symbol" aria-hidden="true">${['♙','♧','♜','⚑'][stat]}</span><div><strong>${value}</strong><span>${label}</span><p>${notes[stat++]}</p></div></div>`);
  html = html.replace('WHAT WE DO', 'OUR SOLUTIONS').replace('Comprehensive IT Solutions<br>for Your Business', 'Comprehensive IT Solutions for Your Business');
  let card = 0;
  html = html.replace(/<span class="line-icon undefined" aria-hidden="true"><\/span>/g, () => `<span class="solution-badge" aria-hidden="true">${icon(card++)}</span>`);
  html = html.replace('>INDUSTRIES</p>', '>INDUSTRIES WE SERVE</p>').replace('Solutions Tailored<br>for Every Industry', 'Solutions Tailored for Every Industry');
  html = html.replace('Real Challenges.<br>Real Results.', 'Real Challenges. Real Results.').replace('Stay Updated.<br>Stay Secure.', 'Stay Updated. Stay Secure.');
  html = html.replace(/<\/strong><\/article>/g, '</strong><a class="story-link" href="contact.html">Discuss a similar challenge →</a></article>');
  html = html.replace(/<section class="final-cta">[\s\S]*?<\/section>/, '<section class="final-cta"><div class="container"><h2>Ready to Secure &amp; Transform Your Business?</h2><div class="button-row"><a class="button" href="contact.html">Schedule Consultation &nbsp; →</a></div></div></section>');
  html = html.replace('>Schedule Consultation</a>', '>Schedule Consultation &nbsp; →</a>').replace('>Explore Solutions</a>', '>Explore Solutions &nbsp; →</a>');
  return html;
}
