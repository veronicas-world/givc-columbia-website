import { describe, expect, it } from 'vitest';
import { contactFormAction, presidentContact } from './contact';

describe('private contact configuration', () => {
  it('does not expose a recipient email in public content', () => {
    expect(presidentContact).toEqual({ name: 'Diane Lang', role: 'President' });
    expect(presidentContact).not.toHaveProperty('email');
  });

  it('submits only to the on-site server route', () => {
    expect(contactFormAction).toBe('/api/contact');
    expect(contactFormAction).not.toContain('@');
  });
});
