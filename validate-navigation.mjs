import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { normalizeNavigation } from './navigation.mjs';

const pages = fs.readdirSync('.').filter(file => file.endsWith('.html'));
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const nav = html.match(/<nav id="site-nav"[\s\S]*?<\/nav>/)[0];
  assert.equal((nav.match(/href="endpoint-security.html"/g) || []).length, 1, file);
  assert.match(nav, /<li><a[^>]*href="endpoint-security.html">Endpoint Security<\/a><\/li>/);
  assert(!nav.includes("cybersecurity.html"), file);
  assert.equal(normalizeNavigation(html, file), html, `${file}: repeat normalization`);
}
const endpoint = fs.readFileSync('endpoint-security.html', 'utf8');
const crumbs = endpoint.match(/<nav class="pf-breadcrumbs"[\s\S]*?<\/nav>/)[0];
assert.match(crumbs, />Home<.*>Solutions<.*>Cybersecurity<.*>Endpoint Security</);
assert.match(endpoint, /<h3>Sophos Endpoint<\/h3>/);
assert.match(endpoint, /<h3>CrowdStrike Falcon Prevent<\/h3>/);
assert.match(endpoint, /<h3>CrowdStrike Falcon Insight XDR<\/h3>/);
assert.match(fs.readFileSync('cybersecurity.html', 'utf8'), /<article class="pf-card">[^]*?<h3><a href="endpoint-security.html">Endpoint Security<\/a><\/h3>/);

// Exercise the real navigation controller with mouse, touch and keyboard events.
const source = fs.readFileSync('assets/js/main.js', 'utf8').split('// Embed the existing assistant')[0];
function checkController(compact) {
  let document;
  const element = () => ({
    events: {}, attrs: {}, classes: new Set(),
    addEventListener(type, handler) { this.events[type] = handler; },
    setAttribute(key, value) { this.attrs[key] = value; },
    focus() { document.activeElement = this; },
    querySelector() { return null; },
    get classList() { return { contains: name => this.classes.has(name), toggle: (name, value) => value ? this.classes.add(name) : this.classes.delete(name) }; },
  });
  const menu = element(), nav = element(), body = element(), header = element();
  const groups = [element(), element()];
  for (const group of groups) {
    group.button = element(); group.endpoint = element();
    group.querySelector = () => group.button;
    group.contains = target => [group, group.button, group.endpoint].includes(target);
  }
  const media = { matches: compact, addEventListener() {} };
  const selectors = { '[data-header]': header, '.menu-toggle': menu, '.site-nav': nav };
  document = { ...element(), body, activeElement: null, querySelector: key => selectors[key], querySelectorAll: key => key === '.nav-group' ? groups : [] };
  vm.runInNewContext(source, { document, window: { matchMedia: () => media, scrollY: 0, addEventListener() {} } });
  assert.equal(nav.inert, compact);
  menu.events.click(); assert.equal(nav.inert, false);
  const group = groups[0];
  group.events.pointerenter({ pointerType: 'touch' });
  assert.equal(group.button.attrs['aria-expanded'], 'false');
  group.button.events.click(); // Native button click also fires on Enter / Space.
  assert.equal(group.button.attrs['aria-expanded'], 'true');
  group.endpoint.focus();
  group.events.focusout({ relatedTarget: group.endpoint });
  assert.equal(group.button.attrs['aria-expanded'], 'true');
  document.events.keydown({ key: 'Escape' });
  assert.equal(group.button.attrs['aria-expanded'], 'false');
  assert.equal(document.activeElement, group.button);
  group.button.events.click();
  document.events.click({ target: body });
  assert.equal(group.button.attrs['aria-expanded'], 'false');
  document.activeElement = null;
  group.events.pointerenter({ pointerType: 'mouse' });
  assert.equal(group.button.attrs['aria-expanded'], String(!compact));
  group.events.pointerleave();
  assert.equal(group.button.attrs['aria-expanded'], 'false');
  menu.events.click(); assert.equal(nav.inert, compact);
}
checkController(false);
checkController(true);
console.log(`${pages.length} pages: nested hierarchy, route, breadcrumbs, offerings and normalization passed.`);
console.log('Desktop and compact-menu controller checks passed for click, hover, touch, focus, Escape and dismissal. Browser rendering remains unverified.');
