import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { contactFormAction, contactFormAjaxAction, contactFormPage } from '../content/contact';
import { ExternalLink } from './ExternalLink';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const submitting = useRef(false);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (submitting.current || !form.reportValidity()) return;
    const fields = new FormData(form);
    submitting.current = true;
    setStatus('sending');
    const controller = new AbortController();
    let timeout: ReturnType<typeof setTimeout> | undefined;

    try {
      const response = await Promise.race([
        fetch(contactFormAjaxAction, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            name: fields.get('name'),
            email: fields.get('email'),
            message: fields.get('message'),
            _honey: fields.get('_honey'),
            _subject: 'New message from the GIVC Columbia website',
            _template: 'table',
            _url: contactFormPage,
          }),
        }),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(() => {
            controller.abort();
            reject(new Error('Submission timed out'));
          }, 20000);
        }),
      ]);
      // FormSubmit labels its JSON reply as text/html and may send success as a string.
      const data: unknown = response.ok ? JSON.parse(await response.text()) : null;
      const accepted = typeof data === 'object' && data !== null && 'success' in data
        && (data.success === true || data.success === 'true');
      if (!accepted) throw new Error('Submission was not accepted');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
    }
  }

  return (
    <form
      className="contact-form"
      action={contactFormAction}
      method="POST"
      aria-label="Contact form"
      aria-describedby="contact-privacy"
      aria-busy={status === 'sending'}
      onSubmit={(event) => { void submitMessage(event); }}
    >
      {status === 'success' && (
        <p className="contact-status" role="status">
          Thank you. Your message has been submitted.
        </p>
      )}
      {status === 'error' && (
        <p className="contact-status" role="alert">
          We couldn’t confirm your submission. Please try again later or use LinkedIn or Instagram below.
        </p>
      )}
      <fieldset disabled={status === 'sending'}>
        <legend className="visually-hidden">Your message</legend>
        <label htmlFor="contact-name">
          Name
          <input id="contact-name" name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label htmlFor="contact-email">
          Your email
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
        <label htmlFor="contact-message">
          Message
          <textarea id="contact-message" name="message" rows={6} required minLength={10} maxLength={5000} />
        </label>
        <div hidden aria-hidden="true">
          <label htmlFor="contact-website">Leave this blank</label>
          <input id="contact-website" name="_honey" tabIndex={-1} autoComplete="off" />
        </div>
        <button type="submit" className="button button-primary">
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </fieldset>
      <p id="contact-privacy" className="contact-privacy">
        Messages are processed by FormSubmit, which retains submissions for 30 days.
        Please do not include sensitive information.{' '}
        <ExternalLink href="https://formsubmit.co/privacy.pdf">FormSubmit privacy policy</ExternalLink>
      </p>
    </form>
  );
}
