import { describe, expect, it } from 'vitest';
import { siteLinks } from './links';

describe('siteLinks', () => {
  it('uses the exact supplied interest form URL', () => {
    expect(siteLinks.interestForm).toBe(
      'https://docs.google.com/forms/d/e/1FAIpQLSf8zwJ-SHjKiPGtXqvj-C72GsKEAfkaIZ9tEL99K9pkCrzs1Q/viewform?utm_source=ig&utm_medium=social&utm_content=link_in_bio',
    );
  });

  it('uses the verified chapter Instagram account', () => {
    expect(siteLinks.instagram).toBe('https://www.instagram.com/girlsintovc.columbia/');
  });

  it('uses the supplied chapter LinkedIn page', () => {
    expect(siteLinks.chapterLinkedIn).toBe('https://www.linkedin.com/company/girls-into-vc-at-columbia/');
  });

  it('points parent information at the real Girls Into VC pages', () => {
    expect(siteLinks.parentSite).toBe('https://www.girlsintovc.com/');
    expect(siteLinks.parentCampusChapters).toBe('https://www.girlsintovc.com/campus-chapters');
  });
});
