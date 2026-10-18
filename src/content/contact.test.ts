import { describe, expect, it } from 'vitest';
import { contactFormAction, contactFormAjaxAction, contactFormPage, presidentContact } from './contact';

describe('contact configuration', () => {
  it('does not expose a recipient email in public content', () => {
    expect(presidentContact).toEqual({ name: 'Diane Lang', role: 'President' });
    expect(presidentContact).not.toHaveProperty('email');
  });

  it('posts to the anonymous FormSubmit alias, never a raw address', () => {
    expect(contactFormAction).toMatch(/^https:\/\/formsubmit\.co\/[0-9a-f]{32}$/);
    expect(contactFormAjaxAction).toMatch(/^https:\/\/formsubmit\.co\/ajax\/[0-9a-f]{32}$/);
    for (const url of [contactFormAction, contactFormAjaxAction]) expect(url).not.toContain('@');
    expect(contactFormPage).toBe('https://www.givc-columbia.com/contact');
  });
});
