// Final homepage presentation, based on the supplied reference image.
export function simplifyHome(html) {
  html = html.replace('<link rel="stylesheet" href="assets/css/customer-experience.css">', '');
  html = html.replace(/<section class="section approach-section"[\s\S]*?<\/section>/, '');
  html = html.replace(/<p class="hero-copy">[\s\S]*?<\/p>/, '<p class="hero-copy">Empowering organizations with robust cybersecurity,<br class="desktop-break"> data protection, and IT infrastructure solutions<br class="desktop-break"> to build a secure and resilient digital future.</p>');
  html = html.replace('The right technology. A stronger business.', 'Comprehensive IT Solutions for Your Business');
  html = html.replace('What would you like to improve?', 'Real Challenges. Real Results.');
  html = html.replace(/<section class="stats"[^>]*>[\s\S]*?<\/section>/, `<section class="stats" aria-label="ITSIPL at a glance"><div class="container stats-grid">${[
    ['30+', 'Years of Excellence', 'Delivering trusted IT solutions since 1996', '<circle cx="12" cy="9" r="6"/><circle cx="12" cy="9" r="3"/><path d="m8 14-2 8 6-3 6 3-2-8"/>'],
    ['26+', 'Technology Partners', 'Collaborating with global technology leaders', '<path d="m2 8 5-5 5 2 5-2 5 5-4 9-6 4-6-4zM7 3l-3 9m13-9 3 9M7 12l4-5 6 5-4 5-5-3"/>'],
    ['24+', 'Industry Awards', 'Recognized for excellence and innovation', '<path d="M7 3h10v7a5 5 0 0 1-10 0zM7 5H3v4a4 4 0 0 0 4 4m10-8h4v4a4 4 0 0 1-4 4M12 15v6m-5 0h10"/>'],
    ['500+', 'Enterprise Projects', 'Successfully delivered across diverse industries', '<path d="M3 21h18M5 21V11h4v10m2 0V3h4v18m2 0V7h4v14"/>']
  ].map(([value,label,description,icon]) => `<div class="stat"><svg class="stat-symbol" viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">${icon}</svg><div><strong>${value}</strong><span>${label}</span><p>${description}</p></div></div>`).join('')}</div></section>`);
  html = html.replace('<h2 id="technology-partners-title">Our Technology Partners</h2>', '<div><p class="eyebrow">OUR TECHNOLOGY ECOSYSTEM</p><h2 id="technology-partners-title">Partnering with Global Technology Leaders</h2></div>');
  html = html.replace('View all technology partners', 'View All Partners');
  html = html.replace(/<section class="final-cta">[\s\S]*?<\/section>/, '<section class="final-cta"><div class="container"><h2>Ready to Secure &amp; Transform Your Business?</h2><div class="button-row"><a class="button" href="contact.html">Schedule Consultation &nbsp; &rarr;</a></div></div></section>');
  const industryLink = /<a class="text-link" href="industries.html">[^<]*<\/a>/;
  html = html.replace(industryLink, '').replace(/(<div class="industry-grid">[\s\S]*?<\/div>)(<\/div><\/section>)/, '$1<div class="home-section-action"><a class="button" href="industries.html">View All Industries &rarr;</a></div>$2');
  if (!html.includes('assets/css/simple-home.css')) html = html.replace('</head>', '<link rel="stylesheet" href="assets/css/simple-home.css"></head>');
  // Keep only the four requested homepage industries.
  html = html.replace(/<a class="industry-card"[^>]*>[\s\S]*?<\/a>/g, card =>
    /<h3>(Government|Retail)<\/h3>/.test(card) ? '' : card);
  return html;
}
