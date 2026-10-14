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

  it('keeps the chapter LinkedIn unconfigured until a verified URL is supplied', () => {
    expect(siteLinks.chapterLinkedIn).toBeNull();
  });

  it('points parent information at the real Girls Into VC pages', () => {
    expect(siteLinks.parentSite).toBe('https://www.girlsintovc.com/');
    expect(siteLinks.parentCampusChapters).toBe('https://www.girlsintovc.com/campus-chapters');
  });
});
