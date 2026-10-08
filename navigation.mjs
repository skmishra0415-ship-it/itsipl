// One Solutions menu for both the homepage and the portfolio page builders.
export const solutionNavigation = [
  ['endpoint-security.html', 'Endpoint Security'],
  ['data-loss-prevention.html', 'Data Loss Prevention'],
  ['network-security.html', 'Network Security'],
  ['secure-access.html', 'Secure Access'],
  ['data-protection.html', 'Data Protection'],
  ['it-infrastructure.html', 'IT Infrastructure'],
  ['managed-services.html', 'Managed Services'],
];

export function normalizeNavigation(html, currentFile = '') {
  return html.replace(/<nav id="site-nav"[\s\S]*?<\/nav>/, nav => {
    // Remove the older homepage-only variant before inserting the shared menu.
    nav = nav.replace(/<div class="nav-group"><button[^>]*>Services\s*<span\b[^>]*>[\s\S]*?<\/div><\/div>/g, '');
    const renderLinks = items => items.map(([href, label, children]) =>
      `<li><a${href === currentFile ? ' aria-current="page"' : ''} href="${href}">${label}</a>${children ? `<ul class="solution-subcategories">${renderLinks(children)}</ul>` : ''}</li>`).join('');
    const links = `<ul class="solution-navigation">${renderLinks(solutionNavigation)}</ul>`;
    const services = '<div class="nav-group"><button type="button" aria-expanded="false">Services <span aria-hidden="true">&#8964;</span></button><div class="dropdown"><a href="managed-services.html">Managed Services</a><a href="contact.html">IT Consultancy</a></div></div>';
    return nav.replace(/<div class="nav-group"><button[^>]*>Solutions\s*<span\b[^>]*>[\s\S]*?<\/div><\/div>/,
      `<div class="nav-group"><button type="button" aria-expanded="false" aria-controls="solutions-menu">Solutions <span aria-hidden="true">&#8964;</span></button><div class="dropdown" id="solutions-menu">${links}</div></div>${services}`);
  });
}
