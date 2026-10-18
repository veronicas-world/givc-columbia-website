import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from './ContactForm';
import { contactFormAction, contactFormAjaxAction } from '../content/contact';

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

function renderForm(path = '/contact') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ContactForm />
    </MemoryRouter>,
  );
}

function fillForm() {
  fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'A visitor' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'Your email' }), { target: { value: 'visitor@example.test' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
    target: { value: 'I would like to learn more about the chapter.' },
  });
}

// FormSubmit labels its JSON reply as text/html and sends success as a string.
const accepted = () => new Response('{"success":"true","message":"The form was submitted successfully."}', {
  headers: { 'Content-Type': 'text/html; charset=UTF-8' },
});

describe('ContactForm', () => {
  it('uses the anonymous FormSubmit alias without publishing a recipient address', () => {
    const { container } = renderForm();
    const form = screen.getByRole('form', { name: 'Contact form' });
    expect(form).toHaveAttribute('method', 'POST');
    expect(form).toHaveAttribute('action', contactFormAction);
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(container.innerHTML).not.toMatch(/@columbia\.edu/);
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
  });

  it('requires a name, valid reply email, and message before sending', () => {
    renderForm();
    const form = screen.getByRole('form') as HTMLFormElement;
    const name = screen.getByRole('textbox', { name: 'Name' });
    const email = screen.getByRole('textbox', { name: 'Your email' });
    const message = screen.getByRole('textbox', { name: 'Message' });
    for (const field of [name, email, message]) expect(field).toBeRequired();
    fireEvent.submit(form);
    expect(fetchMock).not.toHaveBeenCalled();
    fillForm();
    fireEvent.change(email, { target: { value: 'not-an-email' } });
    expect(form.checkValidity()).toBe(false);
    fireEvent.change(email, { target: { value: 'visitor@example.test' } });
    expect(form.checkValidity()).toBe(true);
    expect(name).toHaveAttribute('maxlength', '100');
    expect(email).toHaveAttribute('maxlength', '254');
    expect(message).toHaveAttribute('minlength', '10');
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

  it('sends the message to FormSubmit and acknowledges acceptance without leaving the site', async () => {
    renderForm();
    fetchMock.mockResolvedValueOnce(accepted());
    fillForm();
    fireEvent.submit(screen.getByRole('form'));
    expect(await screen.findByRole('status')).toHaveTextContent('Your message has been submitted.');
    expect(screen.getByRole('status')).not.toHaveTextContent(/delivered/i);
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(contactFormAjaxAction, expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: 'A visitor',
        email: 'visitor@example.test',
        message: 'I would like to learn more about the chapter.',
        _honey: '',
        _subject: 'New message from the GIVC Columbia website',
        _template: 'table',
        _url: 'https://www.givc-columbia.com/contact',
      }),
    }));
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('');
  });

  it('accepts a boolean success acknowledgment too', async () => {
    renderForm();
    fetchMock.mockResolvedValueOnce(Response.json({ success: true }));
    fillForm();
    fireEvent.submit(screen.getByRole('form'));
    expect(await screen.findByRole('status')).toHaveTextContent(/has been submitted/);
  });

  it.each(['activation', 'network', 'http', 'malformed'])('keeps the message and reports %s failures without provider details', async (reason) => {
    renderForm();
    if (reason === 'network') fetchMock.mockRejectedValueOnce(new Error('Private upstream details'));
    else if (reason === 'http') fetchMock.mockResolvedValueOnce(new Response('Do not display this', { status: 403 }));
    else if (reason === 'malformed') fetchMock.mockResolvedValueOnce(new Response('<html>Do not display this</html>'));
    else fetchMock.mockResolvedValueOnce(Response.json({ success: 'false', message: 'Do not display this' }));
    fillForm();
    fireEvent.submit(screen.getByRole('form'));
    expect(await screen.findByRole('alert')).toHaveTextContent(/couldn’t confirm your submission/);
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue(
      'I would like to learn more about the chapter.',
    );
    expect(document.body).not.toHaveTextContent(/Private upstream details|Do not display this/);
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
  });

  it('prevents duplicate submissions while waiting for FormSubmit', async () => {
    renderForm();
    let resolveResponse!: (response: Response) => void;
    fetchMock.mockReturnValueOnce(new Promise((resolve) => { resolveResponse = resolve; }));
    fillForm();
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await act(async () => { resolveResponse(accepted()); });
    expect(screen.getByRole('status')).toHaveTextContent(/has been submitted/);
  });

  it('recovers from a stalled request instead of leaving the form disabled forever', async () => {
    renderForm();
    vi.useFakeTimers();
    fetchMock.mockReturnValueOnce(new Promise(() => {}));
    fillForm();
    fireEvent.submit(screen.getByRole('form'));
    await act(async () => { await vi.advanceTimersByTimeAsync(20000); });
    expect(screen.getByRole('alert')).toHaveTextContent(/couldn’t confirm/);
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
  });

  it('does not trust a query string as evidence of a successful submission', () => {
    renderForm('/contact?sent=1');
    expect(screen.queryByText(/has been submitted/)).toBeNull();
  });
});
