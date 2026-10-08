import { statSync } from 'node:fs';
import { partnerLinkAttributes, partnerNewTabText } from './partner-destinations.mjs';

// Approved files supplied by ITSIPL. Keep original artwork and filenames intact.
export const technologyPartners = [
  { name: 'Sophos', id: 'sophos', file: 'Sophos_logo.png', width: 1221, height: 261, size: 'sophos' },
  { name: 'Palo Alto Networks', id: 'palo-alto-networks', file: 'Parent-logo.webp', width: 480, height: 175, size: 'palo-alto' },
  { name: 'CrowdStrike', id: 'crowdstrike', file: 'crowdstrike.png', width: 655, height: 468, size: 'crowdstrike' },
  { name: 'ManageEngine', id: 'manageengine', file: 'manageengine.png', width: 250, height: 250, size: 'manageengine' },
  { name: 'Commvault', id: 'commvault', file: 'Commvault_logo_2019.svg', width: 1626, height: 267.4, size: 'commvault' },
  { name: 'Druva', id: 'druva', file: 'Druva_Logo.svg.webp', width: 960, height: 344, size: 'druva' },
  { name: 'Netskope', id: 'netskope', file: 'Netscope-logo.png', width: 533, height: 300, size: 'netskope' },
  { name: 'Forcepoint', id: 'forcepoint', file: 'forcepoint_logo_new-webp.png', width: 700, height: 207, size: 'forcepoint' },
];

export function renderTechnologyPartners({ home = false } = {}) {
  const cards = technologyPartners.map(partner => {
    const src = `assets/images/partners/${partner.file}`;
    if (!statSync(new URL(src, import.meta.url)).isFile()) throw new Error(`Missing approved partner logo: ${src}`);
    const image = `<img src="${src}" alt="${partner.name} logo" width="${partner.width}" height="${partner.height}" loading="lazy" decoding="async">`;
    return home
      ? `    <li><div class="technology-partner-card technology-partner-${partner.size}">${image}</div></li>`
      : `    <li class="technology-partner-card technology-partner-${partner.size}" id="${partner.id}"><a ${partnerLinkAttributes(partner.id)}>${image}${partnerNewTabText(partner.id)}</a></li>`;
  }).join('\n');
  return `<section class="technology-partners" aria-labelledby="technology-partners-title">
  <div class="container">
    <div class="technology-partners-heading"><h2 id="technology-partners-title">Our Technology Partners</h2>${home ? '<a href="partners.html">View all technology partners <span aria-hidden="true">&rarr;</span></a>' : ''}</div>
    <p class="sr-only" id="technology-partners-help">Swipe to browse partners, or focus the list and use Left and Right arrow keys. Home and End go to the first and last partners.</p>
    <ul class="technology-partner-grid" id="technology-partners-list" tabindex="0" aria-label="Technology partner logos" aria-describedby="technology-partners-help">
${cards}
    </ul>
    <div class="technology-partner-controls" role="group" aria-label="Technology partner slider controls" hidden>
      <button type="button" class="technology-partner-prev" aria-label="Previous technology partners" aria-controls="technology-partners-list"><span aria-hidden="true">&larr;</span></button>
      <span class="technology-partner-status" role="status" aria-live="polite" aria-atomic="true"></span>
      <button type="button" class="technology-partner-next" aria-label="Next technology partners" aria-controls="technology-partners-list"><span aria-hidden="true">&rarr;</span></button>
    </div>
  </div>
</section>`;
}
