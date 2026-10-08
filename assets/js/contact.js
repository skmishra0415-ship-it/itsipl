// Configure a Formspree, Zoho Forms, Zoho CRM proxy, or other secure endpoint here.
// Never place API secrets in this client-side file. Keep empty for demonstration mode.
const FORM_SUBMISSION_URL = '';

document.querySelector('#contact-form')?.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));

  if (!form.checkValidity()) {
    form.querySelectorAll(':invalid').forEach(field => field.setAttribute('aria-invalid', 'true'));
    status.className = 'form-status error';
    status.textContent = 'Please complete all required fields with valid information.';
    form.querySelector(':invalid')?.focus();
    return;
  }

  if (!FORM_SUBMISSION_URL) {
    status.className = 'form-status error';
    status.textContent = 'Your enquiry has not been sent. Please email sales@itsipl.com or call +91 11 4769 5000 to speak with our team.';
    return;
  }

  try {
    const response = await fetch(FORM_SUBMISSION_URL, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Submission failed');
    form.reset();
    status.className = 'form-status success';
    status.textContent = 'Thank you. Your enquiry has been submitted.';
  } catch {
    status.className = 'form-status error';
    status.textContent = 'We could not submit the form. Please try again later.';
  }
});
