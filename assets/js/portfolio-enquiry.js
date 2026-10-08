// Contact page only. Uses allowlisted select options; query strings never become HTML.
(() => {
  if (!document.body.classList.contains('portfolio-contact')) return;
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const field = name => form.elements.namedItem(name);
  const choose = (name, value) => {
    const select = field(name);
    const option = [...select.options].find(item => item.value && (item.dataset.key === value || item.value === value));
    if (option) select.value = option.value;
  };
  choose('partner', params.get('partner'));
  choose('product', params.get('product'));
  choose('service', params.get('solution') || params.get('service'));
  choose('intent', params.get('intent'));
  // Industry comes only from this allowlist; other values are ignored.
  const industries = {'banking-finance':'Banking & Finance', manufacturing:'Manufacturing', healthcare:'Healthcare', education:'Education'};
  const industry = Object.prototype.hasOwnProperty.call(industries, params.get('industry')) ? industries[params.get('industry')] : '';
  const context = form.querySelector('[data-enquiry-context]');
  const updateContext = () => {
    const selected = [industry && `${industry} sector`, field('partner').value, field('product').value, field('service').selectedOptions[0]?.textContent].filter(value => value && !value.startsWith('Not sure'));
    context.textContent = selected.length ? `Enquiry for ${selected.join(' / ')}. You can change these selections.` : '';
  };
  form.addEventListener('change', updateContext);
  form.addEventListener('reset', () => setTimeout(updateContext, 0));
  updateContext();
  form.querySelector('[data-email-draft]').addEventListener('click', event => {
    const status = form.querySelector('.form-status');
    form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
    if (!form.checkValidity()) {
      event.preventDefault();
      form.querySelectorAll(':invalid').forEach(el => el.setAttribute('aria-invalid', 'true'));
      status.className = 'form-status error';
      status.textContent = 'Please complete the required fields, confirm consent and check your email address.';
      form.querySelector(':invalid')?.focus();
      return;
    }
    const labels = {industry:'Industry', name:'Name', email:'Email', phone:'Phone', company:'Company', partner:'Partner', product:'Product', service:'Solution', users:'Users', devices:'Devices', existing_product:'Existing product / systems', budget:'Budget range', timeline:'Timeline', message:'Business need'};
    const values = new FormData(form);
    values.set('industry', industry);
    const subject = `ITSIPL ${values.get('intent') === 'quote' ? 'quote request' : 'requirements discussion'}${industry ? ` — ${industry}` : ''}${values.get('partner') ? ` — ${values.get('partner')}` : ''}`;
    const body = Object.entries(labels).map(([key,label]) => `${label}: ${values.get(key) || 'Not specified'}`).join('\n\n');
    event.currentTarget.href = `mailto:sales@itsipl.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.className = 'form-status';
    status.textContent = 'Your email application may open with a draft. Nothing has been sent by this website. Review and send the draft there, or email sales@itsipl.com directly.';
  });
})();
