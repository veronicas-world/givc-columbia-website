import { describe, expect, it, vi } from 'vitest';
import {
  contactDeliveryConfig,
  isContactDeliveryConfigured,
  submitContactMessage,
  validateContactMessage,
  type ContactMessage,
} from './contact';

const validMessage: ContactMessage = {
  name: 'Test Visitor',
  email: 'visitor@example.com',
  message: 'I would like to learn about upcoming events.',
};

describe('validateContactMessage', () => {
  it('requires every field', () => {
    expect(validateContactMessage({ name: ' ', email: '', message: '' })).toEqual({
      name: 'Enter your name.',
      email: 'Enter your email address.',
      message: 'Enter a message.',
    });
  });

  it.each([
    'visitor',
    'visitor@',
    '@example.com',
    'visitor@example',
    'visitor @example.com',
    'a@b@example.com',
    'visitor@example.com,',
    'visitor,@example.com',
    'visitor@example,com',
    'visitor@example..com',
    'visitor@.example.com',
    'visitor@example.com.',
    'visitor@-example.com',
    'visitor@example.com;',
  ])(
    'rejects malformed email %s',
    (email) => {
      expect(validateContactMessage({ ...validMessage, email }).email).toBe(
        'Enter an email address in the format name@example.com.',
      );
    },
  );

  it('accepts a complete message', () => {
    expect(validateContactMessage(validMessage)).toEqual({});
    for (const email of [
      '  first.last+tag@mail.columbia.edu ',
      'jd1234@columbia.edu',
      'o\'brien_x-y@sub-domain.example.org',
      'visitor@barnard.edu',
    ]) {
      expect(validateContactMessage({ ...validMessage, email })).toEqual({});
    }
  });
});

describe('contact delivery boundary', () => {
  it('ships unconfigured, with no recipient and no provider', () => {
    expect(contactDeliveryConfig).toEqual({ recipientInbox: null, provider: null });
    expect(isContactDeliveryConfigured(contactDeliveryConfig)).toBe(false);
  });

  it('does not treat a recipient inbox alone as configured', () => {
    expect(isContactDeliveryConfigured({ recipientInbox: 'chapter@example.com', provider: null })).toBe(false);
  });

  it('reports unavailable and makes no network request while unconfigured', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    await expect(submitContactMessage(validMessage)).resolves.toEqual({ status: 'unavailable' });
    await expect(
      submitContactMessage(validMessage, { recipientInbox: 'chapter@example.com', provider: null }),
    ).resolves.toEqual({ status: 'unavailable' });
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('hands a configured provider the trimmed message and recipient, and reports provider failures', async () => {
    const send = vi.fn().mockRejectedValue(new Error('provider down'));
    const result = await submitContactMessage(
      { ...validMessage, name: '  Test Visitor ' },
      { recipientInbox: 'chapter@example.com', provider: { send } },
    );
    expect(send).toHaveBeenCalledWith(validMessage, 'chapter@example.com');
    expect(result).toEqual({ status: 'failed' });
  });
});
