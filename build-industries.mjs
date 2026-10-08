import fs from 'node:fs';

// Keep the existing detailed guide and its design in a rebuildable template.
const html = fs.readFileSync(new URL('./templates/industries-base.html', import.meta.url), 'utf8');
if (/id="(?:government|retail)"|href="[^"]*(?:#|industry=)(?:government|retail)"|Send an enquiry/.test(html)) {
  throw new Error('Removed industry or footer content found in industry template');
}
fs.writeFileSync(new URL('./industries.html', import.meta.url), html);
console.log('Built industries.html from its existing guide template.');
