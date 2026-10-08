# ITSIPL corporate website

## Dedicated product pages (5 October 2026)

Use `node build-portfolio.mjs` for the current non-home site: 17 reusable product pages, eight existing solution guides, eight partner guides, partner overview and product-aware enquiry form. Product URLs, existing optional PDF downloads and editorial content are shared through `product-data.mjs`; body templates are in `product-page.mjs` and `templates/product-body.html`. No homepage or shared design changes are made by this builder.

Run `node validate-products.mjs`, `node validate-navigation.mjs` and `node validate-chat-widget.mjs`. See [PRODUCT-PAGES-DELIVERY.md](PRODUCT-PAGES-DELIVERY.md) for the complete page/PDF mapping, official sources, rendered browser checks and confirmation items. Product canonicals use the existing `https://www.itsipl.com/` convention. Do not run the legacy whole-site generator for this update.

## Non-home partner and solution update (30 September 2026)

Use `node build-portfolio.mjs` to rebuild the partner overview, eight partner guides, eight solution guides and enquiry page. This isolated builder does not write `index.html`, shared styles/scripts, original artwork or legacy generators. Run `node validate-portfolio.mjs` and `node validate-site.mjs` afterward. Do not use the older whole-site generator for this update: it can overwrite the guides and regenerate the homepage.

See [PORTFOLIO-DELIVERY.md](PORTFOLIO-DELIVERY.md) for changed files, new routes, official product sources, verification evidence and remaining browser checks. The legacy partner-slider description below applies to the earlier overview; the current overview uses eight internal guide cards. Its original anchor IDs remain compatible with homepage links. The enquiry form is still unconnected; it can prepare an email draft without claiming to submit it.

A responsive static website for ITS Integrated IT Solutions Pvt. Ltd., built with HTML5, CSS3, and vanilla JavaScript. It has no build dependency and works from `index.html` or any static web host.

## Project structure

The homepage follows the supplied image's compact layout. `simple-home.mjs` is the final homepage-only generator transform; `assets/css/simple-home.css` refines the reference styles without loading the larger customer-experience layout on the homepage. The network and How We Work sections are omitted. Homepage statistics follow the supplied reference artwork. Other pages retain their customer-experience styles.

- Root HTML files: the homepage and all internal pages
- `assets/css/styles.css`: shared design system and responsive layouts
- `assets/js/main.js`: navigation, dropdowns, search panel, and current year
- `assets/js/contact.js`: form validation and submission configuration
- `assets/images/`: reserved for approved company imagery
- `robots.txt` and `sitemap.xml`: search-engine files
- `generate-site.mjs`: page generator used to keep shared HTML consistent

## Preview locally

Opening `index.html` directly works. For the most accurate local preview, run one of these commands from this folder:

```powershell
py -m http.server 8080
```

Then visit `http://localhost:8080/`.

## Content and image updates

Shared page content is maintained in `generate-site.mjs`. After editing it, run `node generate-site.mjs`. Global styles are in `assets/css/styles.css`. The reference-led homepage is applied by `redesign-home.mjs`, with responsive overrides in `assets/css/home.css`.

The homepage uses all 18 standalone images in `assets/ITSIPL-Homepage-PNGs/`: hero (01), solutions (02-05), homepage industries (06-08 and 10), business priorities (12-14), and insights (15-18). `assets/css/home.css` maps each image to its matching section with cover sizing. Text and buttons remain native HTML. The old `assets/images/home-reference.jpg` is archived and no longer loaded by the homepage. Technology partner logos remain in `assets/images/partners/`.

Before publication, replace all `https://www.example.com/` canonical, Open Graph, sitemap, and JSON-LD URLs with the production domain. Confirm the homepage figures marked with an asterisk, social links, business contact details, and legal copy.

## Contact details and form integration

The Our Clients section has been removed at the company?s request. Its source assets remain archived and are not loaded by the homepage.

Company name, founding year, partner and award counts, city presence, address, sales email, and office phone were checked against https://www.itsipl.com/about-us/ and https://www.itsipl.com/our-locations/ on September 18, 2026. `customer-experience.mjs` applies these details during generation. The unsupported project count was removed, and illustrative success stories are now presented as business priorities.

The form validates in the browser but intentionally does not transmit data. To connect Formspree or another endpoint, set `FORM_SUBMISSION_URL` in `assets/js/contact.js`.

For Zoho Forms, use the form action URL supplied by Zoho and map fields to the generated form. For Zoho CRM, do not expose OAuth credentials in the browser. Send the form to a secure serverless function or company API, keep credentials there, validate and sanitize the payload, then forward it to Zoho CRM.

## Technology partner logos

`technology-partners.mjs` maintains the approved file list, descriptive alt text, original dimensions, and shared markup for the homepage and `partners.html`. Both pages show eight logos in a separate ?Our Technology Partners? section, as a horizontal slider showing six logos on desktop, three on tablet, and two on mobile. The shared `assets/js/main.js` adds previous/next controls, Arrow/Home/End keys when the list is focused, a visible range status, and partner-anchor navigation. Native touch/trackpad scrolling uses scroll snapping, with no autoplay. The partner list remains keyboard-scrollable. Homepage partner logos are non-clickable; the View All Partners button opens the partners page. Individual CSS sizing in `assets/css/styles.css` accounts for source whitespace using `object-fit: contain`; the artwork files are unchanged. No partner tiers or external vendor links are inferred. Regeneration checks that each listed asset exists. Run `node validate-partners.mjs` to verify image references, anchors, shared markup, responsive geometry, and slider controls. Browser visual verification still requires a connected browser.

## Existing chatbot integration

Every page includes `assets/partials/chat-widget.html`, styled in `assets/css/styles.css` and controlled by `assets/js/main.js`. The generator includes the same partial. “Chat with us” opens the existing assistant at `https://company-chatbot-5c6r.onrender.com/`; no second chatbot or backend changes are involved. Its iframe is created on first open and stays mounted when closed, retaining the conversation while that page remains loaded. Navigating to another page creates a new host page; cross-page conversation persistence depends on the chatbot's own storage.

The native dialog provides a close button, Escape cancellation, focus return, and a permanently available “Open in new tab” link. The panel reserves space above for the mobile header and uses the visual viewport to follow the on-screen keyboard. The iframe delegates microphone access only to the chatbot origin. Neither the website nor opening the panel requests microphone access; the chatbot starts voice recognition on a microphone-button click. Actual voice input requires a secure context, browser support, and visitor permission.

Run `node validate-chat-widget.mjs` for shared markup, lazy creation, retained iframe, dialog cancellation, and focus-return checks. These use simulated DOM state. A live API test returned a services answer, and the chatbot response had no `X-Frame-Options` or CSP `frame-ancestors` header when checked. No browser was connected for rendered iframe loading, message entry, scrolling, mobile keyboard/layout, Escape from within the iframe, or microphone testing. Cross-origin iframe load events cannot reliably identify embedding errors; if an error occurs, record the browser console's exact message and use the new-tab link. Do not weaken site-wide security headers to work around it.

## Deployment

For the current product/partner pages, run `node build-portfolio.mjs`. Rebuild the existing detailed industry guide with `node build-industries.mjs`; its source is `templates/industries-base.html`. Government and Retail are no longer industry offerings. The legacy generator also uses this guide template and lists only the four remaining industries. Footer templates omit the Contact enquiry text link while retaining contact details and the consultation/expert calls to action. Run `python verification/validate-removals.py` and `node validate-site.mjs` to check the removals and local links.

- GitHub Pages: push the folder to a repository and enable Pages for the branch root.
- Netlify: drag the folder into Netlify Drop or connect the repository; no build command is required and the publish directory is `.`.
- Render Static Site: connect the repository, leave the build command blank (or use a harmless echo command), and set the publish directory to `.`.
- Company server: upload the files while preserving their relative paths and configure `404.html` as the custom error page.

Use HTTPS in production. After setting the final domain, recheck canonical tags, the sitemap, redirects, form endpoint, legal content, and analytics/cookie consent requirements.

## Customer experience refresh

`customer-experience.mjs` applies customer-facing content and verified contact details to all generated pages. `assets/css/customer-experience.css` provides the final visual refinement layer: readable cards, spacing, responsive grids, and clear contact calls to action. The original company logo and monochrome partner strip are retained. Canonical and sitemap URLs use https://www.itsipl.com/.

The bare domain and www homepage denied the research crawler, but indexed official About, Solutions, and Locations pages were available. No browser connection was available for visual verification. Automatic link, partner-controller, and chatbot-controller checks passed. The enquiry form still needs a submission endpoint; direct telephone and email links are available, and the form explicitly says when nothing has been sent. Existing legal pages remain drafts. Nothing has been deployed.
