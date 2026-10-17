import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from './ContactForm';

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  fetchMock.mockReset().mockResolvedValue(Response.json({ ready: true }));
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

async function renderForm(path = '/contact') {
  const result = render(
    <MemoryRouter initialEntries={[path]}>
      <ContactForm />
    </MemoryRouter>,
  );
  await waitFor(() => expect(screen.queryByText('Loading contact form…')).toBeNull());
  return result;
}

function fillForm() {
  fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'A visitor' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'Your email' }), { target: { value: 'visitor@example.test' } });
  fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
    target: { value: 'I would like to learn more about the chapter.' },
  });
}

describe('ContactForm', () => {
  it('uses only the local endpoint without publishing the recipient address', async () => {
    const { container } = await renderForm();
    const form = screen.getByRole('form', { name: 'Contact form' });
    expect(form).toHaveAttribute('method', 'POST');
    expect(form).toHaveAttribute('action', '/api/contact');
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(form.outerHTML).not.toMatch(/@columbia\.edu|formsubmit\.co\/ajax/);
    expect(form.querySelector('input[name="_next"]')).toBeNull();
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
  });

  it('requires a name, valid reply email, and message', async () => {
    await renderForm();
    const form = screen.getByRole('form') as HTMLFormElement;
    const name = screen.getByRole('textbox', { name: 'Name' });
    const email = screen.getByRole('textbox', { name: 'Your email' });
    const message = screen.getByRole('textbox', { name: 'Message' });
    for (const field of [name, email, message]) expect(field).toBeRequired();
    fireEvent.submit(form);
    expect(fetchMock).toHaveBeenCalledTimes(1);
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

  it('provides a hidden honeypot and discloses processing and bot protection', async () => {
    const { container } = await renderForm();
    const honeypot = container.querySelector('input[name="_honey"]');
    expect(honeypot).toHaveAttribute('tabindex', '-1');
    expect(honeypot?.parentElement).toHaveAttribute('hidden');
    expect(screen.getByText(/retains submissions for 30 days/)).toHaveTextContent(/Vercel provides bot protection/);
    expect(screen.getByRole('link', { name: /FormSubmit privacy policy/ })).toHaveAttribute(
      'href', 'https://formsubmit.co/privacy.pdf',
    );
    expect(screen.getByRole('link', { name: /Vercel privacy policy/ })).toHaveAttribute(
      'href', 'https://vercel.com/legal/privacy-policy',
    );
  });

  it.each(['unconfigured', 'unreachable'])('disables sending when the server is %s', async (reason) => {
    if (reason === 'unconfigured') fetchMock.mockResolvedValueOnce(Response.json({ ready: false }));
    else fetchMock.mockRejectedValueOnce(new Error('Unavailable'));
    await renderForm();
    expect(screen.getByRole('status')).toHaveTextContent(/temporarily unavailable/);
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled();
    for (const field of screen.getAllByRole('textbox')) expect(field).toBeDisabled();
    fireEvent.submit(screen.getByRole('form'));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('stops waiting if the availability check stalls', async () => {
    vi.useFakeTimers();
    fetchMock.mockReturnValueOnce(new Promise(() => {}));
    render(<ContactForm />);
    await act(async () => { await vi.advanceTimersByTimeAsync(10000); });
    expect(screen.getByRole('status')).toHaveTextContent(/temporarily unavailable/);
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled();
  });

  it('acknowledges an accepted submission without leaving the site or claiming delivery', async () => {
    await renderForm();
    fetchMock.mockResolvedValueOnce(Response.json({ success: true }));
    fillForm();
    fireEvent.submit(screen.getByRole('form'));
    expect(await screen.findByRole('status')).toHaveTextContent('Your message has been submitted.');
    expect(screen.getByRole('status')).not.toHaveTextContent(/delivered/i);
    expect(fetchMock).toHaveBeenLastCalledWith('/api/contact', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'A visitor',
        email: 'visitor@example.test',
        message: 'I would like to learn more about the chapter.',
        _honey: '',
      }),
    }));
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('');
  });

  it.each(['rejected', 'network', 'provider'])('preserves the message and reports %s failures without private details', async (reason) => {
    await renderForm();
    if (reason === 'network') fetchMock.mockRejectedValueOnce(new Error('Private upstream details'));
    else fetchMock.mockResolvedValueOnce(Response.json(
      { success: false, privateDetails: 'Do not display this' },
      { status: reason === 'provider' ? 502 : 200 },
    ));
    fillForm();
    fireEvent.submit(screen.getByRole('form'));
    expect(await screen.findByRole('alert')).toHaveTextContent(/couldn’t confirm your submission/);
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue(
      'I would like to learn more about the chapter.',
    );
    expect(document.body).not.toHaveTextContent(/Private upstream details|Do not display this/);
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('prevents duplicate submissions while waiting for the server', async () => {
    await renderForm();
    let resolveResponse!: (response: Response) => void;
    fetchMock.mockReturnValueOnce(new Promise((resolve) => { resolveResponse = resolve; }));
    fillForm();
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await act(async () => { resolveResponse(Response.json({ success: true })); });
    expect(screen.getByRole('status')).toHaveTextContent(/has been submitted/);
  });

  it('recovers from a stalled request instead of leaving the form disabled forever', async () => {
    await renderForm();
    vi.useFakeTimers();
    fetchMock.mockReturnValueOnce(new Promise(() => {}));
    fillForm();
    fireEvent.submit(screen.getByRole('form'));
    await act(async () => { await vi.advanceTimersByTimeAsync(20000); });
    expect(screen.getByRole('alert')).toHaveTextContent(/couldn’t confirm/);
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
  });

  it('does not trust a query string as evidence of a successful submission', async () => {
    await renderForm('/contact?sent=1');
    expect(screen.queryByText(/has been submitted/)).toBeNull();
  });
});
