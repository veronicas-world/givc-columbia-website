import { useSearchParams } from 'react-router-dom';
import { contactFormAction } from '../content/contact';
import { ExternalLink } from './ExternalLink';

interface ContactFormProps {
  action?: string;
}

export function ContactForm({ action = contactFormAction }: ContactFormProps) {
  const [searchParams] = useSearchParams();
  const connected = Boolean(action);

  return (
    <form
      className="contact-form"
      action={action || undefined}
      method="POST"
      aria-label="Contact form"
      aria-describedby={connected ? 'contact-privacy' : 'contact-status contact-privacy'}
      onSubmit={(event) => {
        if (!connected) event.preventDefault();
      }}
    >
      {!connected && (
        <p id="contact-status" className="contact-status" role="status">
          The contact form is being connected. Please use LinkedIn or Instagram below for now.
        </p>
      )}
      {connected && searchParams.get('sent') === '1' && (
        <p className="contact-status" role="status">
          Thank you. Your message has been submitted.
        </p>
      )}
      <fieldset disabled={!connected}>
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
        <input type="hidden" name="_subject" value="New message from the GIVC Columbia website" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value={`${window.location.origin}/contact?sent=1`} />
        <button type="submit" className="button button-primary">Send message</button>
      </fieldset>
      <p id="contact-privacy" className="contact-privacy">
        Messages are processed by FormSubmit, which retains submissions for 30 days.
        Please do not include sensitive information.{' '}
        <ExternalLink href="https://formsubmit.co/privacy.pdf">FormSubmit privacy policy</ExternalLink>
      </p>
    </form>
  );
}
