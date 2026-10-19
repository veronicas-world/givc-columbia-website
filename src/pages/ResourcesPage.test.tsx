import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '../App';
import { siteLinks } from '../content/links';
import { parentNewsletter, parentPodcast, parentSocials } from '../content/parentResources';

function renderResources() {
  return render(
    <MemoryRouter initialEntries={['/resources']}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('Resources page', () => {
  it('offers the parent newsletter subscription, distinct from the chapter interest form', () => {
    renderResources();
    const newsletter = screen.getByRole('region', { name: parentNewsletter.title });
    expect(within(newsletter).getByRole('link', { name: /Subscribe to the newsletter/ }))
      .toHaveAttribute('href', 'https://girlsintovc.beehiiv.com/subscribe');
    expect(parentNewsletter.url).not.toBe(siteLinks.interestForm);
    expect(screen.getByText(/from the Girls Into VC parent organization/)).toBeInTheDocument();
  });

  it('shows the podcast description, local cover art, and both listening platforms', () => {
    renderResources();
    const podcast = screen.getByRole('region', { name: parentPodcast.title });
    expect(podcast).toHaveTextContent(parentPodcast.description);
    const cover = within(podcast).getByRole('img', { name: parentPodcast.cover.alt });
    expect(cover).toHaveAttribute('src', parentPodcast.cover.src);
    expect(cover).toHaveAttribute('width', '560');
    expect(cover).toHaveAttribute('height', '560');
    expect(existsSync(resolve(process.cwd(), 'public', parentPodcast.cover.src.slice(1)))).toBe(true);
    expect(within(podcast).getByRole('link', { name: /Listen on Spotify/ }))
      .toHaveAttribute('href', 'https://open.spotify.com/show/11qwyNr02er9kvlaYc95LD');
    expect(within(podcast).getByRole('link', { name: /Listen on Apple Podcasts/ }))
      .toHaveAttribute('href', 'https://podcasts.apple.com/podcast/id1676192516');
  });

  it('links to every verified parent social account, not the Columbia accounts', () => {
    renderResources();
    const socials = screen.getByRole('list', { name: 'Parent organization social media' });
    expect(within(socials).getAllByRole('link')).toHaveLength(3);
    for (const social of parentSocials) {
      expect(within(socials).getByRole('link', { name: new RegExp(social.name) }))
        .toHaveAttribute('href', social.url);
      expect(social.url).not.toBe(siteLinks.instagram);
      expect(social.url).not.toBe(siteLinks.chapterLinkedIn);
    }
    expect(screen.getByRole('link', { name: /Girls Into VC website/ }))
      .toHaveAttribute('href', siteLinks.parentSite);
  });

  it('opens external resources safely in a new tab', () => {
    renderResources();
    const links = within(screen.getByRole('main')).getAllByRole('link');
    for (const link of links) {
      expect(new URL(link.getAttribute('href')!).protocol).toBe('https:');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAccessibleName(/opens in a new tab/);
    }
  });

  it('opens from navigation, marks the active page, and closes the mobile menu', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    const menu = screen.getByRole('button', { name: 'Menu' });
    fireEvent.click(menu);
    const nav = screen.getByRole('navigation', { name: 'Main' });
    fireEvent.click(within(nav).getByRole('link', { name: 'Resources' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Resources' })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'Resources' })).toHaveAttribute('aria-current', 'page');
    expect(menu).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('main')).toHaveFocus();
  });
});
