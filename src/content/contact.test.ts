import { describe, expect, it } from 'vitest';
import { formSubmitAction, presidentContact } from './contact';

describe('private contact configuration', () => {
  it('does not expose a recipient email in public content', () => {
    expect(presidentContact).toEqual({ name: 'Diane Lang', role: 'President' });
    expect(presidentContact).not.toHaveProperty('email');
  });

  it('accepts an anonymous form ID, not an email address or arbitrary URL', () => {
    expect(formSubmitAction('0123456789abcdef0123456789abcdef')).toBe(
      'https://formsubmit.co/0123456789abcdef0123456789abcdef',
    );
    for (const value of [undefined, '', 'person@example.test', 'https://example.test/form', '../form', 'short']) {
      expect(formSubmitAction(value)).toBeUndefined();
    }
  });
});
