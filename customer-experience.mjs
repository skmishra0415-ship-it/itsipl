// Company facts checked against itsipl.com/about-us/ and /our-locations/.
// Keep the redesign reproducible without changing the supplied company artwork.
export function improveCustomerExperience(html, home = false) {
  html = html.replaceAll('https://www.example.com/', 'https://www.itsipl.com/')
    .replaceAll('ITS Integrated IT Solutions Pvt. Ltd.', 'I.T. Solutions India Private Limited')
    .replaceAll('ITSIPL — Integrated IT Solutions', 'ITSIPL — I.T. Solutions India Private Limited')
    .replace(/<div class="socials"[^>]*>[\s\S]*?<\/div>/g, '')
    .replace('<p class="contact-placeholder">Contact details awaiting company confirmation.</p>',
      '<a href="tel:+911147695000">+91 11 4769 5000</a><a href="mailto:sales@itsipl.com">sales@itsipl.com</a><p>D-88/5, Okhla Industrial Area,<br>Phase I, New Delhi 110020</p>');
  if (!html.includes('assets/css/customer-experience.css')) {
    html = html.replace('</head>', '<link rel="stylesheet" href="assets/css/customer-experience.css"></head>');
  }
  html = html.replace('Fields marked * are required.', 'Fields marked * are required. Online submission is not available yet. Please <a href="mailto:sales@itsipl.com">email our team</a> or call +91 11 4769 5000.');
  html = html.replace(/<aside class="contact-aside">[\s\S]*?<\/aside>/,
    `<aside class="contact-aside"><p class="eyebrow light">LET’S TALK</p><h2>Your next step starts with a conversation.</h2><p>Tell us about your systems, your priorities, and what needs to work better.</p><div class="contact-block"><span>Call our team</span><a href="tel:+911147695000">+91 11 4769 5000</a></div><div class="contact-block"><span>Sales enquiries</span><a href="mailto:sales@itsipl.com">sales@itsipl.com</a></div><div class="contact-block"><span>Head office</span><p>D-88/5, Okhla Industrial Area,<br>Phase I, New Delhi 110020, India</p></div><div class="contact-block"><span>Our presence</span><p>Delhi/NCR · Mumbai · Chandigarh · Jaipur</p></div><a class="button button-outline-light" href="https://www.google.com/maps/search/?api=1&amp;query=D-88%2F5%20Okhla%20Phase%20I%20New%20Delhi%20110020">Find our office &rarr;</a></aside>`);
  if (!home) return html;
  html = html.replace(/<p class="hero-copy">[\s\S]*?<\/p>/,
    '<p class="hero-copy">Protect your business. Keep your teams connected. Build IT that grows with you—with cybersecurity, data protection, infrastructure, and expert support from ITSIPL.</p>');
  html = html.replace(/<section class="stats">[\s\S]*?<\/section>/,
    `<section class="stats" aria-label="ITSIPL at a glance"><div class="container stats-grid">${[
      ['1996', 'Established', 'Experience built over three decades'],
      ['26+', 'Technology partners', 'Expertise across leading platforms'],
      ['24+', 'IT media awards', 'Recognition across our journey'],
      ['4', 'Cities', 'Delhi/NCR, Mumbai, Chandigarh, Jaipur']
    ].map(([n,title,description]) => `<div class="stat"><div><strong>${n}</strong><span>${title}</span><p>${description}</p></div></div>`).join('')}</div></section>`);
  html = html.replace('Comprehensive IT Solutions for Your Business', 'The right technology. A stronger business.')
    .replace('From strategy to round-the-clock operations, we connect the technology, expertise, and support your business needs to move securely.', 'From securing your endpoints to keeping critical systems available, explore solutions built around your business priorities.')
    .replace('>SUCCESS STORIES</p>', '>BUSINESS PRIORITIES</p>')
    .replace('Real Challenges. Real Results.', 'What would you like to improve?')
    .replace('Illustrative scenarios showing how integrated IT services can create measurable operational improvements.', 'Start with the challenge that matters to your team. We will help you explore the right approach.')
    .replace('Reduced ransomware exposure', 'Reduce ransomware exposure')
    .replace('Faster recovery readiness', 'Prepare for faster recovery')
    .replace('Stronger data safeguards', 'Strengthen data safeguards')
    .replace(/<strong>[^<]*<small>Illustrative outcome<\/small><\/strong>/g, '')
    .replace('<p class="data-note">All case studies and outcomes shown are sample content pending client approval.</p>', '');
  if (!html.includes('id="our-approach"')) {
    html = html.replace('<section class="section insights-preview">', `<section class="section approach-section" id="our-approach"><div class="container"><div class="section-heading"><div><p class="eyebrow">HOW WE WORK</p><h2>Clarity at every step.</h2></div><p>A practical path from understanding your needs to supporting the technology you depend on.</p></div><ol class="approach-grid"><li><span>01</span><h3>Understand</h3><p>Discuss your current setup, business priorities, and technical challenges.</p></li><li><span>02</span><h3>Design</h3><p>Explore a solution that fits your workloads, requirements, and plans for growth.</p></li><li><span>03</span><h3>Implement</h3><p>Bring the solution into your environment with deployment and administration guidance.</p></li><li><span>04</span><h3>Support</h3><p>Keep moving with post-implementation support and troubleshooting expertise.</p></li></ol></div></section><section class="section insights-preview">`);
  }
  html = html.replace(/<section class="final-cta">[\s\S]*?<\/section>/,
    '<section class="final-cta"><div class="container"><div><p class="eyebrow light">LET’S BUILD YOUR NEXT CHAPTER</p><h2>Better IT starts<br>with a conversation.</h2><p>Share your priorities with our team. Let’s find the right next step.</p></div><div class="button-row"><a class="button" href="contact.html">Talk to our team &rarr;</a><a class="button button-outline-light" href="tel:+911147695000">Call +91 11 4769 5000</a></div></div></section>');
  return html;
}
