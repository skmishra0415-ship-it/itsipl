# ITSIPL product pages — 5 October 2026

Completed locally. Nothing deployed.

17 distinct product offerings now have dedicated HTML pages, reused by 26 cards across the existing eight solution URLs. Each card starts with **Explore Product** (internal, same tab), followed by **Download PDF**. Existing partner destinations and enquiry links are preserved; product-specific enquiries were added.

## New pages and existing PDF mappings

PDF filenames below are under `assets/guides/`. All 14 original PDFs exist and remain byte-for-byte unchanged. Three broader guides are shared by genuinely distinct offerings; no extra or duplicate PDF was created.

| Product | New HTML page | Optional existing PDF |
|---|---|---|
| Sophos Endpoint | [product-sophos-endpoint.html](product-sophos-endpoint.html) | sophos-endpoint.pdf |
| Sophos Firewall | [product-sophos-firewall.html](product-sophos-firewall.html) | sophos-firewall.pdf |
| Palo Alto Networks NGFW | [product-palo-alto-networks-ngfw.html](product-palo-alto-networks-ngfw.html) | palo-alto-networks-ngfw.pdf |
| Prisma Access | [product-palo-alto-prisma-access.html](product-palo-alto-prisma-access.html) | palo-alto-prisma-access.pdf |
| CrowdStrike Falcon Prevent | [product-crowdstrike-falcon-prevent.html](product-crowdstrike-falcon-prevent.html) | crowdstrike-endpoint-security.pdf |
| CrowdStrike Falcon Insight XDR | [product-crowdstrike-falcon-insight-xdr.html](product-crowdstrike-falcon-insight-xdr.html) | crowdstrike-endpoint-security.pdf |
| ManageEngine Endpoint Central | [product-manageengine-endpoint-central.html](product-manageengine-endpoint-central.html) | manageengine-endpoint-central.pdf |
| ManageEngine Endpoint DLP Plus | [product-manageengine-endpoint-dlp-plus.html](product-manageengine-endpoint-dlp-plus.html) | manageengine-endpoint-dlp-plus.pdf |
| ManageEngine OpManager | [product-manageengine-opmanager.html](product-manageengine-opmanager.html) | manageengine-opmanager.pdf |
| ManageEngine ServiceDesk Plus | [product-manageengine-servicedesk-plus.html](product-manageengine-servicedesk-plus.html) | manageengine-servicedesk-plus.pdf |
| Commvault Cloud Backup & Recovery | [product-commvault-backup-recovery.html](product-commvault-backup-recovery.html) | commvault-backup-recovery.pdf |
| Commvault SaaS Backup | [product-commvault-saas-backup.html](product-commvault-saas-backup.html) | commvault-backup-recovery.pdf |
| Druva SaaS & Endpoint Backup | [product-druva-saas-endpoint-backup.html](product-druva-saas-endpoint-backup.html) | druva-backup-resilience.pdf |
| Druva Hybrid & Cloud Backup | [product-druva-hybrid-cloud-backup.html](product-druva-hybrid-cloud-backup.html) | druva-backup-resilience.pdf |
| Netskope One DLP | [product-netskope-one-dlp.html](product-netskope-one-dlp.html) | netskope-one-dlp.pdf |
| Netskope One Private Access | [product-netskope-one-private-access.html](product-netskope-one-private-access.html) | netskope-one-private-access.pdf |
| Forcepoint DLP | [product-forcepoint-dlp.html](product-forcepoint-dlp.html) | forcepoint-dlp.pdf |

Falcon prevention and investigation, Commvault workload and SaaS recovery, and Druva end-user and hybrid protection remain distinct because their requirements, deployment checks and operating responsibilities differ. The existing Forcepoint Web Security partner-page offering is outside the Solutions product list; no extra product page or PDF was invented for it.

## Content and source changes

- `product-data.mjs`: shared offering-to-page/PDF mapping, original editorial explanations, capabilities, limitations, compatibility/licensing questions, budget drivers, alternatives, FAQs and official references.
- `product-page.mjs` and `templates/product-body.html`: product-body renderer/template reusing the existing portfolio shell and CSS. No shared design edits.
- `build-portfolio.mjs`: product generation, card links, solution comparison sections, sitemap and missing-PDF reporting. Rebuilds use one canonical product identity everywhere. Missing PDFs are omitted automatically and reported in `verification/product-missing-pdfs.json` (currently empty).
- Existing solution pages: `cybersecurity.html`, `endpoint-security.html`, `network-security.html`, `secure-access.html`, `data-protection.html`, `data-loss-prevention.html`, `it-infrastructure.html`, `managed-services.html`. Requirements, selection criteria, comparisons and ITSIPL scope stay on those URLs; detailed product explanations live on product pages.
- Existing partner pages reuse the new product links while retaining their verified partner links and existing content.
- `contact.html` and `assets/js/portfolio-enquiry.js`: allowlisted product selection, URL-context prefill, visible enquiry context and product details in the existing email draft flow. The form remains unconnected to a submission backend.
- `sitemap.xml`: all 17 new indexable production URLs use `https://www.itsipl.com/product-…html`.

Each product page includes official vendor references and the review date **5 October 2026**. Examples of verified references include [Sophos Endpoint](https://www.sophos.com/en-us/products/endpoint-security), [Palo Alto NGFW](https://www.paloaltonetworks.com/network-security/next-generation-firewall), [Falcon Insight XDR](https://www.crowdstrike.com/en-us/platform/endpoint-security/falcon-insight-xdr/), [ServiceDesk Plus editions](https://www.manageengine.com/products/service-desk/), [Commvault Microsoft 365 coverage](https://documentation.commvault.com/saas/backup_and_recovery_for_microsoft_365_apps.html), [Druva hybrid workloads](https://www.druva.com/use-cases/data-center), [Netskope One DLP](https://www.netskope.com/products/data-loss-prevention) and [Forcepoint DLP documentation](https://help.forcepoint.com/docs/Tech_Pubs/DLP/DLP.html). The complete per-product reference list is in `verification/product-mapping.json` and the HTML pages.

## Verification completed

- `node validate-products.mjs`: passed 17 distinct offerings, 26 correctly mapped same-tab solution-card links, 77 displayed PDF links, 2,303 local links/assets/fragments, unique product titles/descriptions/H1s, canonical URLs, sitemap inclusion, valid HTML nesting, accessible image text and product enquiry context.
- All 14 unique PDF downloads returned HTTP 200 with PDF file signatures through the local server. PDF text inventory was checked against product identity; shared guides are correctly mapped.
- Headless Edge: all 17 pages at **320, 375, 768 and 1440 pixels** (68 rendered layouts) passed horizontal-overflow, image loading, responsive-grid and action-size checks. All 17 product selections loaded correctly in the actual contact page. Evidence: `verification/product-browser-validation.json`.
- Desktop/mobile screenshots were visually inspected. Existing black, white and red styling, logo treatment and responsive portfolio layout were reused.
- `node validate-navigation.mjs` passed all 42 HTML pages plus desktop/compact-menu controller checks. `node validate-chat-widget.mjs` passed its existing widget checks.
- A repeat build produced byte-identical output for all 35 generated pages, sitemap and homepage.
- Every existing header and footer is byte-identical to the pre-task snapshot. All existing partner link URLs and external-link attributes remain identical. All CSS, shared navigation scripts, original images and PDFs are unchanged.
- Homepage SHA-256 before and after: `add2121e7620417db543d8f0ec4776ef038010b7a8b024d2e328838b9f3e1679`. Its dependencies were preserved, so its appearance is unchanged.

## Facts requiring configuration-specific confirmation

No unverified vendor capability is presented as a guaranteed result. Exact supported OS/application versions, regional availability, file/channel/workload limits, current SKU/licence metrics, retention and connector entitlements must be confirmed for the customer’s configuration. ITSIPL product-specific deployment tasks, support hours, response targets, training and monitoring services must be agreed in the quote. No new certification, partner tier, customer result, price, review or support guarantee was added.

The preserved PDFs are earlier ITSIPL summaries. In particular, Endpoint Central’s optional security portfolio now extends beyond the administration scope described in its older PDF; the HTML explains edition/add-on selection without silently rewriting that download. Vendor rebranding and future product changes require periodic content review.

The older `validate-portfolio.mjs` and `validate-partners.mjs` use historical assumptions/baselines predating this task. Use the new product validator and updated navigation validator for this delivery; historical baseline files were not rewritten. Browser checks cover layout and form prefill, not cross-origin chatbot voice behaviour or a production deployment.

## Rebuild

```powershell
node build-portfolio.mjs
node validate-products.mjs
node validate-navigation.mjs
node validate-chat-widget.mjs
```

Use this isolated non-home builder. The older whole-site generator can regenerate the homepage and is not the rebuild entry point for this delivery.
