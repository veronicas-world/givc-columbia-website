import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ContactForm } from './ContactForm';

const anonymousAction = 'https://formsubmit.co/0123456789abcdef0123456789abcdef';

function renderForm(action = anonymousAction, path = '/contact') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ContactForm action={action} />
    </MemoryRouter>,
  );
}

describe('ContactForm', () => {
  it('posts to an anonymous endpoint without publishing the recipient address', () => {
    const { container } = renderForm();
    const form = screen.getByRole('form', { name: 'Contact form' });
    expect(form).toHaveAttribute('method', 'POST');
    expect(form).toHaveAttribute('action', anonymousAction);
    expect(screen.queryByText('Message the president')).toBeNull();
    expect(screen.queryByText('Diane Lang, President')).toBeNull();
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(form.outerHTML).not.toMatch(/@columbia\.edu/);
    expect(form.querySelector('input[name="_captcha"]')).toBeNull();
    expect(form.querySelector('input[name="_next"]')).toHaveValue(`${window.location.origin}/contact?sent=1`);
  });

  it('requires a name, valid reply email, and message without sending a real request', () => {
    renderForm();
    const form = screen.getByRole('form', { name: 'Contact form' }) as HTMLFormElement;
    const name = screen.getByRole('textbox', { name: 'Name' });
    const email = screen.getByRole('textbox', { name: 'Your email' });
    const message = screen.getByRole('textbox', { name: 'Message' });
    for (const field of [name, email, message]) expect(field).toBeRequired();
    expect(form.checkValidity()).toBe(false);
    fireEvent.change(name, { target: { value: 'A visitor' } });
    fireEvent.change(email, { target: { value: 'not-an-email' } });
    fireEvent.change(message, { target: { value: 'I would like to learn more about the chapter.' } });
    expect(form.checkValidity()).toBe(false);
    fireEvent.change(email, { target: { value: 'visitor@example.test' } });
    expect(form.checkValidity()).toBe(true);
    expect(name).toHaveAttribute('maxlength', '100');
    expect(email).toHaveAttribute('maxlength', '254');
    expect(message).toHaveAttribute('maxlength', '5000');
  });

  it('provides a hidden honeypot and discloses the message processor', () => {
    const { container } = renderForm();
    const honeypot = container.querySelector('input[name="_honey"]');
    expect(honeypot).toHaveAttribute('tabindex', '-1');
    expect(honeypot?.parentElement).toHaveAttribute('hidden');
    expect(screen.getByText(/retains submissions for 30 days/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /FormSubmit privacy policy/ })).toHaveAttribute(
      'href', 'https://formsubmit.co/privacy.pdf',
    );
  });

  it('clearly disables sending until the anonymous endpoint is configured', () => {
    renderForm('');
    expect(screen.getByRole('status')).toHaveTextContent(/being connected/);
    expect(screen.getByRole('form')).not.toHaveAttribute('action');
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled();
    for (const field of screen.getAllByRole('textbox')) expect(field).toBeDisabled();
  });

  it('acknowledges the provider return without claiming delivery', () => {
    renderForm(anonymousAction, '/contact?sent=1');
    expect(screen.getByRole('status')).toHaveTextContent('Your message has been submitted.');
    expect(screen.getByRole('status')).not.toHaveTextContent(/delivered/i);
  });

  it('does not show a successful submission while the form is disconnected', () => {
    renderForm('', '/contact?sent=1');
    expect(screen.getByRole('status')).toHaveTextContent(/being connected/);
    expect(screen.queryByText(/Your message has been submitted/)).toBeNull();
  });
});
