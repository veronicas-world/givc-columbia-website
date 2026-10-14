import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from './ContactForm';

function fill(label: RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
}

describe('ContactForm', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;
  let openSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, 'fetch');
    openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
  });

  afterEach(() => {
    fetchSpy.mockRestore();
    openSpy.mockRestore();
  });

  it('labels every field and marks them required', () => {
    render(<ContactForm />);
    for (const label of [/^Name/, /^Email/, /^Message/]) {
      const field = screen.getByLabelText(label);
      expect(field).toBeRequired();
      expect(field).not.toHaveAttribute('aria-invalid', 'true');
    }
    expect(screen.getByLabelText(/^Email/)).toHaveAttribute('type', 'email');
    expect(screen.getByRole('form', { name: 'Contact the chapter' })).toBeInTheDocument();
  });

  it('blocks an empty submission with errors tied to each field and focuses the first', async () => {
    render(<ContactForm />);
    submit();
    const name = screen.getByLabelText(/^Name/);
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAccessibleDescription('Enter your name.');
    expect(screen.getByLabelText(/^Email/)).toHaveAccessibleDescription('Enter your email address.');
    expect(screen.getByLabelText(/^Message/)).toHaveAccessibleDescription('Enter a message.');
    expect(name).toHaveFocus();
    expect(screen.queryByRole('status')).toBeEmptyDOMElement();
    await Promise.resolve();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('flags a malformed email and clears the error once corrected', () => {
    render(<ContactForm />);
    fill(/^Name/, 'Test Visitor');
    fill(/^Email/, 'visitor@example');
    fill(/^Message/, 'Hello');
    submit();
    const email = screen.getByLabelText(/^Email/);
    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(email).toHaveAccessibleDescription('Enter an email address in the format name@example.com.');
    expect(email).toHaveFocus();
    expect(screen.queryByText(/not connected/)).toBeNull();

    fill(/^Email/, 'visitor@example.com');
    expect(email).not.toHaveAttribute('aria-invalid', 'true');
    expect(email).not.toHaveAccessibleDescription(/format/);
  });

  it('rejects a pasted address with a trailing comma and accepts the corrected address', async () => {
    render(<ContactForm />);
    fill(/^Name/, 'Test Visitor');
    fill(/^Email/, 'visitor@example.com,');
    fill(/^Message/, 'Hello');
    submit();
    const email = screen.getByLabelText(/^Email/);
    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(email).toHaveAccessibleDescription('Enter an email address in the format name@example.com.');
    expect(email).toHaveFocus();
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(email).toHaveValue('visitor@example.com,');

    fill(/^Email/, 'visitor@example.com');
    expect(email).not.toHaveAttribute('aria-invalid', 'true');
    expect(email).not.toHaveAccessibleDescription(/format/);
    submit();
    expect(await screen.findByText(/Messages cannot be sent from this form yet/)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('keeps the same status region exposed before and after its first update', async () => {
    const style = document.createElement('style');
    style.textContent = readFileSync(resolve(process.cwd(), 'src/styles/global.css'), 'utf8');
    document.head.append(style);
    try {
      render(<ContactForm />);
      const before = screen.getByRole('status');
      expect(before).toBeEmptyDOMElement();
      expect(before).not.toHaveAttribute('aria-hidden');
      expect(before).not.toHaveAttribute('hidden');
      expect(getComputedStyle(before).display).not.toBe('none');
      expect(getComputedStyle(before).visibility).not.toBe('hidden');

      fill(/^Name/, 'Test Visitor');
      fill(/^Email/, 'visitor@example.com');
      fill(/^Message/, 'Hello');
      submit();
      await screen.findByText(/Messages cannot be sent from this form yet/);
      const after = screen.getByRole('status');
      expect(after).toBe(before);
      expect(getComputedStyle(after).display).not.toBe('none');
    } finally {
      style.remove();
    }
  });

  it('updates an error as the field changes after a failed attempt', () => {
    render(<ContactForm />);
    submit();
    const email = screen.getByLabelText(/^Email/);
    fill(/^Email/, 'visitor');
    expect(email).toHaveAccessibleDescription('Enter an email address in the format name@example.com.');
  });

  it('announces that sending is unavailable for valid input, without sending or claiming success', async () => {
    render(<ContactForm />);
    fill(/^Name/, 'Test Visitor');
    fill(/^Email/, 'visitor@example.com');
    fill(/^Message/, 'I would like to learn about upcoming events.');
    const button = screen.getByRole('button', { name: 'Send message' });
    button.focus();
    submit();

    const status = await screen.findByText(/Messages cannot be sent from this form yet/);
    expect(screen.getByRole('status')).toContainElement(status);
    expect(screen.getByRole('status').textContent).not.toMatch(/(has been|was|were) sent|delivered|received|thank you|success/i);
    expect(button).toHaveFocus();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(openSpy).not.toHaveBeenCalled();
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(screen.getByLabelText(/^Message/)).toHaveValue('I would like to learn about upcoming events.');
  });
});
