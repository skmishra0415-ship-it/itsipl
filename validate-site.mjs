import fs from 'node:fs';
import path from 'node:path';

const pages = fs.readdirSync('.').filter(file => file.endsWith('.html'));
const failures = [];

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (/^(#|https?:|mailto:|tel:)/.test(href)) continue;
    const target = href.split(/[?#]/)[0];
    if (target && !fs.existsSync(path.join('.', target))) failures.push(`${file}: missing ${href}`);
  }
  const counts = {
    h1: (html.match(/<h1[ >]/g) || []).length,
    title: (html.match(/<title>/g) || []).length,
    description: (html.match(/<meta name="description"/g) || []).length,
    canonical: (html.match(/rel="canonical"/g) || []).length,
  };
  for (const [name, count] of Object.entries(counts)) {
    if (count !== 1) failures.push(`${file}: expected one ${name}, found ${count}`);
  }
}

console.log(`Checked ${pages.length} HTML pages.`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('All local links resolve and required page metadata/headings are present.');
}
