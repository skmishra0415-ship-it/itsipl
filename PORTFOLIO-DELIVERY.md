# ITSIPL portfolio update

Implemented locally on 30 September 2026. Nothing was deployed and no changes were made to the live website.

## Homepage preservation

`index.html` was not edited. Its SHA-256 before and after is:

`b765bcac6391960ce40e99f7f57cfc05503ae11d72fe614a767c90f6af68bf7e`

All 25 protected files match `verification/homepage-baseline.json`: the homepage, original stylesheets, scripts, images, partner identity data and legacy generators. The new stylesheet and enquiry script are loaded only by the generated non-home pages. Existing homepage links to all eight `partners.html#partner-id` anchors resolve to the matching cards.

**Desktop/mobile visual comparison is pending.** The Browser runtime was initialized, but returned “No browser is available” and an empty browser list. No screenshots were captured. Identical homepage HTML and dependencies establish source-level preservation for desktop and mobile, but this is not a claim that rendered screenshots were compared. New-page responsive rules were checked statically; real viewport, keyboard, zoom and mail-client checks still require a connected browser.

## Implemented pages

Updated existing routes:

- `partners.html`: eight clickable internal partner cards, original anchor IDs and need-based solution links.
- `cybersecurity.html`: security selection overview.
- `data-protection.html`: backup and disaster recovery, explicitly distinct from DLP.
- `it-infrastructure.html`: requirements, relevant monitoring/management/network options and infrastructure scope boundaries.
- `managed-services.html`: existing service categories, operational responsibilities and product/service distinction.
- `contact.html`: partner/solution prefills, editable selections, users, devices, existing systems, optional budget, timeline and business need. Existing name, email, phone, company and consent fields retained.

New partner routes:

- `partner-sophos.html`
- `partner-palo-alto-networks.html`
- `partner-crowdstrike.html`
- `partner-manageengine.html`
- `partner-commvault.html`
- `partner-druva.html`
- `partner-netskope.html`
- `partner-forcepoint.html`

New focused solution routes:

- `data-loss-prevention.html`
- `endpoint-security.html`
- `network-security.html`
- `secure-access.html`

Every partner guide includes who it may suit, products grouped by need, strengths, purchase considerations, cost factors, ITSIPL’s role, related solutions, relevant alternatives, official information links and both enquiry actions. New pages use the existing ITSIPL logo, partner assets, typography and red/black/white design language.

## Supporting files

- `build-portfolio.mjs`: isolated generator with an explicit non-home output allowlist; updates sitemap entries on the configured `https://www.itsipl.com/` domain.
- `portfolio-data.mjs`: maintainable partner/solution content and official source URLs. Imports the original partner identities instead of inferring them from filenames.
- `templates/portfolio-base.html`, `templates/contact-base.html`: snapshots of the existing non-home shell and enquiry page, used for reproducible builds.
- `assets/css/portfolio.css`: all rules scoped under `.portfolio-page`; responsive grids, keyboard focus styles and reduced-motion support.
- `assets/js/portfolio-enquiry.js`: contact-only prefilling and email-draft preparation. Unknown query values are ignored; values never become HTML.
- `sitemap.xml`: existing entries preserved and 12 new routes added.
- `validate-portfolio.mjs`, `verification/homepage-baseline.json`, `verification/portfolio-routes.json`, `verification/validation-summary.json`: preservation evidence and repeatable tests.
- `README.md` and this delivery report: maintenance and verification instructions.

## Verification

Passed:

- `node validate-site.mjs`: all 25 HTML pages have required metadata/headings and resolving local links.
- `node validate-portfolio.mjs`: 25 protected-file hashes; 1,206 local links/assets/fragments; eight partner cards; balanced generated HTML; unique titles/descriptions; canonical and sitemap entries; image alt text and valid control targets; scoped styles and responsive breakpoint rules.
- Enquiry controller tests: all eight partner and eight solution prefills; legacy `service=IT Infrastructure` query; unknown/malicious values ignored; editable selection context; invalid input handling; empty-endpoint submission remains unsent; email subject/body encoding and field inclusion; no backend calls.
- `node validate-chat-widget.mjs`: retained shared chatbot markup across current HTML pages and existing controller behavior. The legacy test prints “13 pages” as a hardcoded label but actually iterates every current root HTML file.
- JavaScript syntax checks for the generator, data and scoped enquiry script.
- Deterministic rebuild: rebuilding all 18 non-home pages and the sitemap produces byte-identical output.

The controller tests use a minimal DOM harness. They do not simulate native browser layout, native email clients, iframe interaction or voice permissions. The original partner-slider validator expects the superseded overview markup; use `validate-portfolio.mjs` for the new overview. The original homepage slider code is unchanged.

## Product evidence

Official sources reviewed on 30 September 2026; the product cards link directly to the relevant source. Descriptions are intentionally limited to high-level verified capabilities. Selection and rollout considerations are ITSIPL-oriented guidance, not vendor performance guarantees.

| Partner | Official sources used |
| --- | --- |
| Sophos | [Endpoint](https://www.sophos.com/en-us/products/endpoint-security), [Firewall](https://www.sophos.com/en-us/products/next-gen-firewall) |
| Palo Alto Networks | [Next-generation firewalls](https://www.paloaltonetworks.com/network-security/next-generation-firewall), [Prisma Access overview](https://docs.paloaltonetworks.com/prisma-access/administration/prisma-access-overview) |
| CrowdStrike | [Endpoint security](https://www.crowdstrike.com/en-us/platform/endpoint-security/) |
| ManageEngine | [Endpoint Central](https://www.manageengine.com/products/desktop-central/), [Endpoint DLP Plus](https://www.manageengine.com/endpoint-dlp/), [OpManager](https://www.manageengine.com/network-monitoring/), [ServiceDesk Plus](https://www.manageengine.com/products/service-desk/) |
| Commvault | [Backup & Recovery](https://www.commvault.com/platform/backup-and-recovery) |
| Druva | [Platform overview](https://www.druva.com/products/resilience-cloud/platform-overview) |
| Netskope | [DLP](https://www.netskope.com/products/data-loss-prevention), [Private Access](https://www.netskope.com/products/private-access) |
| Forcepoint | [DLP documentation](https://help.forcepoint.com/docs/Tech_Pubs/DLP/DLP.html), [Web Security](https://www.forcepoint.com/product/secure-web-gateway-swg) |

Forcepoint’s main DLP marketing URL timed out on direct fetch. Current official DLP documentation and indexed official product information were available; no claims about performance, certifications or compliance guarantees were used.

## Details requiring ITSIPL confirmation

1. **Delivery/support scope:** the supplied About and Managed Services pages describe solution design, implementation, support, AMC/maintenance, monitoring, helpdesk, consultancy and remote management. Live ITSIPL About, Solutions and Locations pages returned access denied. Confirm which services can be supplied for each product, who delivers them, and any exclusions. The public copy makes proposal scope explicit and does not promise response times, 24/7 coverage, training or incident-response services.
2. **Commercial availability:** the eight partner identities and assets come directly from `technology-partners.mjs`. Confirm the actual editions/SKUs available for resale when quoting. No partner tier, certification, discount, stock commitment or price is asserted.
3. **Contact details:** the existing project supplies `sales@itsipl.com`, `+91 11 4769 5000` and the Okhla address. These were retained; they could not be independently refreshed from the access-denied live site.
4. **Online enquiries:** `FORM_SUBMISSION_URL` remains empty in the unchanged `assets/js/contact.js`. The form never reports a successful send in this state. “Open Email Draft” prepares a `mailto:` draft and explicitly requires the visitor to send it in their email application. Confirm an endpoint only if online submission is later required.
5. **Exact compatibility and entitlement:** OS/version coverage, channels, capacity metrics, edition inclusions, terms and support entitlements must be checked against the proposed SKU and environment. The public guides explicitly direct these checks instead of asserting universal compatibility.

## Maintenance

Run from the project directory:

```powershell
node build-portfolio.mjs
node validate-portfolio.mjs
node validate-site.mjs
node validate-chat-widget.mjs
```

Edit `portfolio-data.mjs` for content and `assets/css/portfolio.css` for scoped styling. Do not run `generate-site.mjs` for this update: the unchanged legacy generator can regenerate the homepage and overwrite non-home guides. Use the isolated command above. Do not replace the preservation baseline to conceal a change.

Before publication, connect a browser and check desktop (1440×900), tablet (768×1024), mobile (390×844 and 320×800), keyboard-only navigation, 200% zoom, enquiry validation, email-draft handling and the existing chatbot. Homepage visual comparison can use the unchanged project version as the baseline; report screenshots separately from the completed hash checks.
