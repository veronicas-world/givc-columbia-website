import { useState, type FormEvent } from 'react';
import {
  submitContactMessage,
  validateContactMessage,
  type ContactErrors,
  type ContactField,
  type ContactMessage,
  type ContactSubmitResult,
} from '../content/contact';

const emptyMessage: ContactMessage = { name: '', email: '', message: '' };

const fieldOrder: ContactField[] = ['name', 'email', 'message'];

const statusText: Record<ContactSubmitResult['status'], string> = {
  unavailable:
    'Messages cannot be sent from this form yet because chapter email is not connected. Your message has not been sent. Please reach us on Instagram for now.',
  sent: 'Your message was sent to the chapter.',
  failed: 'Your message could not be sent. Please try again later or reach us on Instagram.',
};

export function ContactForm() {
  const [values, setValues] = useState<ContactMessage>(emptyMessage);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<ContactSubmitResult['status'] | null>(null);

  function handleChange(field: ContactField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    setStatus(null);
    if (attempted) {
      setErrors((current) => ({ ...current, [field]: validateContactMessage(next)[field] }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    setAttempted(true);
    const nextErrors = validateContactMessage(values);
    setErrors(nextErrors);
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setStatus(null);
      const element = form.elements.namedItem(firstInvalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }
    setPending(true);
    const result = await submitContactMessage(values);
    setPending(false);
    setStatus(result.status);
    if (result.status === 'sent') {
      setValues(emptyMessage);
      setAttempted(false);
    }
  }

  function fieldProps(field: ContactField) {
    const error = errors[field];
    return {
      id: `contact-${field}`,
      name: field,
      value: values[field],
      required: true,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `contact-${field}-error` : undefined,
    };
  }

  function fieldError(field: ContactField) {
    const error = errors[field];
    return error ? (
      <p id={`contact-${field}-error`} className="field-error">
        {error}
      </p>
    ) : null;
  }

  return (
    <form className="contact-form" aria-label="Contact the chapter" noValidate onSubmit={handleSubmit}>
      <p className="form-note">All fields are required.</p>
      <div className="form-field">
        <label htmlFor="contact-name">Name</label>
        <input
          {...fieldProps('name')}
          type="text"
          autoComplete="name"
          onChange={(event) => handleChange('name', event.target.value)}
        />
        {fieldError('name')}
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input
          {...fieldProps('email')}
          type="email"
          autoComplete="email"
          onChange={(event) => handleChange('email', event.target.value)}
        />
        {fieldError('email')}
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Message</label>
        <textarea {...fieldProps('message')} rows={6} onChange={(event) => handleChange('message', event.target.value)} />
        {fieldError('message')}
      </div>
      <button type="submit" className="button button-primary" aria-disabled={pending || undefined}>
        Send message
      </button>
      <p role="status" className="form-status" data-status={status ?? undefined}>
        {status ? statusText[status] : null}
      </p>
    </form>
  );
}
