import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { contactFormAction } from '../content/contact';
import { ExternalLink } from './ExternalLink';

export function ContactForm() {
  const [ready, setReady] = useState<boolean | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const submitting = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      setReady(false);
      controller.abort();
    }, 10000);
    async function checkAvailability() {
      try {
        const response = await fetch(contactFormAction, { signal: controller.signal });
        const data = response.ok ? await response.json() : null;
        if (!controller.signal.aborted) setReady(data?.ready === true);
      } catch {
        if (!controller.signal.aborted) setReady(false);
      } finally {
        clearTimeout(timeout);
      }
    }
    void checkAvailability();
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!ready || submitting.current || !form.reportValidity()) return;
    const fields = new FormData(form);
    submitting.current = true;
    setStatus('sending');
    const controller = new AbortController();
    let timeout: ReturnType<typeof setTimeout> | undefined;

    try {
      const response = await Promise.race([
        fetch(contactFormAction, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            name: fields.get('name'),
            email: fields.get('email'),
            message: fields.get('message'),
            _honey: fields.get('_honey'),
          }),
        }),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(() => {
            controller.abort();
            reject(new Error('Submission timed out'));
          }, 20000);
        }),
      ]);
      const data = response.ok ? await response.json() : null;
      if (data?.success !== true) throw new Error('Submission was not accepted');
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
      aria-busy={ready === null || status === 'sending'}
      onSubmit={(event) => { void submitMessage(event); }}
    >
      {ready !== true && (
        <p id="contact-status" className="contact-status" role="status">
          {ready === null
            ? 'Loading contact form…'
            : 'The contact form is temporarily unavailable. Please use LinkedIn or Instagram below for now.'}
        </p>
      )}
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
      <fieldset disabled={ready !== true || status === 'sending'}>
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
        Vercel provides bot protection. Please do not include sensitive information.{' '}
        <ExternalLink href="https://formsubmit.co/privacy.pdf">FormSubmit privacy policy</ExternalLink>
        {' · '}
        <ExternalLink href="https://vercel.com/legal/privacy-policy">Vercel privacy policy</ExternalLink>
      </p>
    </form>
  );
}
