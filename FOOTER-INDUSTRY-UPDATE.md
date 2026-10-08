# ITSIPL footer and industry update

- Removed the footer Contact “Send an enquiry →” link from all 42 HTML pages and source footer templates. Phone, email, address and consultation/expert buttons remain unchanged.
- Removed Government and Retail homepage cards, industry jump cards, complete guide sections, metadata mentions and enquiry-context values. Remaining offerings: Banking & Finance, Manufacturing, Healthcare and Education.
- No dedicated Government/Retail pages or sitemap entries existed. Sitemap remains unchanged.
- Homepage changes are limited to the requested card/footer removals and industry-grid reflow. All other page content, partner destinations, product pages and PDF files are preserved.
- Browser checks at 320, 375, 768 and 1440 pixels: both card grids have four cards, complete rows and no card overflow. Education retains its existing image.
- All 2,244 local links/assets/fragments across 42 pages resolve. Repeating both current generators produces byte-identical HTML and sitemap files. Legacy source data and footer updated; legacy industry generation uses the preserved detailed guide template.
- No deployment performed. Historical verification snapshots contain previous content and are not production pages.

## Changed website files

- `404.html`
- `about.html`
- `contact.html`
- `cybersecurity.html`
- `data-loss-prevention.html`
- `data-protection.html`
- `endpoint-security.html`
- `index.html`
- `industries.html`
- `insights.html`
- `it-infrastructure.html`
- `managed-services.html`
- `network-security.html`
- `partner-commvault.html`
- `partner-crowdstrike.html`
- `partner-druva.html`
- `partner-forcepoint.html`
- `partner-manageengine.html`
- `partner-netskope.html`
- `partner-palo-alto-networks.html`
- `partner-sophos.html`
- `partners.html`
- `privacy-policy.html`
- `product-commvault-backup-recovery.html`
- `product-commvault-saas-backup.html`
- `product-crowdstrike-falcon-insight-xdr.html`
- `product-crowdstrike-falcon-prevent.html`
- `product-druva-hybrid-cloud-backup.html`
- `product-druva-saas-endpoint-backup.html`
- `product-forcepoint-dlp.html`
- `product-manageengine-endpoint-central.html`
- `product-manageengine-endpoint-dlp-plus.html`
- `product-manageengine-opmanager.html`
- `product-manageengine-servicedesk-plus.html`
- `product-netskope-one-dlp.html`
- `product-netskope-one-private-access.html`
- `product-palo-alto-networks-ngfw.html`
- `product-palo-alto-prisma-access.html`
- `product-sophos-endpoint.html`
- `product-sophos-firewall.html`
- `secure-access.html`
- `terms.html`
- `generate-site.mjs`
- `templates/contact-base.html`
- `templates/portfolio-base.html`
- `assets/css/industries.css`
- `assets/js/portfolio-enquiry.js`
- `build-industries.mjs`
- `templates/industries-base.html`
- `README.md`

## Verification and maintenance files

- `verification/validate-removals.py`
- `verification/removals-validation.json`
- `verification/removals-browser.html`
- `verification/removals-qa-server.py`
- `verification/removals-browser-validation.json`
- `verification/removals-before-hashes.json` and local pre-change snapshots
- `verification/remove-industry-offerings.py` (one-time migration; do not rerun)
- `verification/package-removals.py`
