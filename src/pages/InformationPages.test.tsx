import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { siteLinks } from '../content/links';
import { representedOrganizations } from '../content/organizations';
import { activityPhotos, homePhotos } from '../content/photos';
import { resourceGroups } from '../content/resources';
import { AboutPage } from './AboutPage';
import { HomePage } from './HomePage';
import { ResourcesPage } from './ResourcesPage';

function renderPage(page: React.ReactElement) {
  return render(<MemoryRouter>{page}</MemoryRouter>);
}

const unsupportedPromises = /guarantee|placement|applications? (are|now) open|apply now|deadline|brighter future|where ambition meets/i;

describe('HomePage', () => {
  it('introduces the student-led chapter and its purpose', () => {
    renderPage(<HomePage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Girls Into VC at Columbia' })).toBeInTheDocument();
    expect(
      screen.getByText(/student-led organization at Columbia University dedicated to increasing the participation of women in venture capital through education, community, and access/),
    ).toBeInTheDocument();
  });

  it('gives the supplied reasons to get involved', () => {
    renderPage(<HomePage />);
    const reasons = screen.getByRole('region', { name: 'Why join' });
    expect(within(reasons).getByText(/investors, founders, and operators/)).toBeInTheDocument();
    expect(within(reasons).getByText(/at Columbia and beyond/)).toBeInTheDocument();
    expect(within(reasons).getByText(/practical skills/)).toBeInTheDocument();
  });

  it('prominently links to the exact interest form', () => {
    renderPage(<HomePage />);
    const links = screen.getAllByRole('link', { name: /Join our interest list/ });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute('href', siteLinks.interestForm);
    }
  });

  it('avoids unsupported promises', () => {
    const { container } = renderPage(<HomePage />);
    expect(container.textContent).not.toMatch(unsupportedPromises);
  });

  it('opens with the pink title band', () => {
    renderPage(<HomePage />);
    const title = screen.getByRole('heading', { level: 1, name: 'Girls Into VC at Columbia' });
    expect(title.closest('section')).toHaveClass('home-hero');
  });

  it('shows the supplied campus photo and general photos without visible captions', () => {
    const { container } = renderPage(<HomePage />);
    expect(screen.getByRole('img', { name: homePhotos.librarySteps.alt })).toHaveAttribute(
      'src',
      homePhotos.librarySteps.src,
    );
    expect(screen.getByRole('img', { name: homePhotos.community.alt })).toHaveAttribute('src', homePhotos.community.src);
    const activities = screen.getByRole('region', { name: 'What we do' });
    expect(within(activities).getAllByRole('img').map((img) => img.getAttribute('src'))).toEqual(
      activityPhotos.map((photo) => photo.src),
    );
    expect(container.querySelector('figcaption')).toBeNull();
    expect(container.textContent).not.toMatch(/not a Columbia chapter event|Photo:|chapter Instagram\./);
  });

  it('moves from the pink opening straight into the campus photo and a centered intro', () => {
    renderPage(<HomePage />);
    const hero = screen.getByRole('heading', { level: 1 }).closest('section')!;
    const next = hero.nextElementSibling!;
    expect(next.querySelector('img')).toHaveAttribute('src', homePhotos.librarySteps.src);
    const intro = screen.getByRole('region', { name: 'A Columbia chapter for women in venture capital' });
    expect(intro).toHaveAttribute('data-intro', 'true');
    expect(intro).toHaveClass('home-centered');
    expect(next.contains(intro) || next.nextElementSibling === intro).toBe(true);
  });

  it('describes NYC firm site visits and the Girls Into VC NYC chapter without naming host firms', () => {
    renderPage(<HomePage />);
    const nyc = screen.getByRole('region', { name: 'In New York City' });
    expect(nyc.textContent).toMatch(/site visits to NYC venture capital firms/i);
    expect(nyc.textContent).toMatch(/Girls Into VC NYC chapter/);
    for (const org of representedOrganizations) {
      expect(nyc.textContent).not.toContain(org.name);
    }
  });

  it('shows the four parent figures with their captions and no citations', () => {
    renderPage(<HomePage />);
    const section = screen.getByRole('region', { name: 'Why we exist' });
    const items = within(section).getAllByRole('listitem');
    const accessibleText = (item: HTMLElement) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('[aria-hidden="true"]').forEach((node) => node.remove());
      return clone.textContent?.replace(/\s+/g, ' ').trim();
    };
    expect(items.map(accessibleText)).toEqual([
      '2% of female founders are funded by VC capital',
      '7% of board seats at firms',
      '8% of firm partners',
      '9% of venture capitalists are women',
    ]);
    expect(within(section).getByText('Women account for only')).toBeInTheDocument();
    expect(section.querySelectorAll('[data-figure-value]')).toHaveLength(4);
    expect(within(section).queryAllByRole('link')).toHaveLength(0);
    expect(section.textContent).not.toMatch(/source|study|report|survey|\b(19|20)\d{2}\b/i);
  });

  it('keeps the Columbia story ahead of the parent context and lists no event cards', () => {
    const { container } = renderPage(<HomePage />);
    const regions = screen.getAllByRole('region').map((region) => region.getAttribute('aria-labelledby'));
    const intro = screen.getByRole('region', { name: 'A Columbia chapter for women in venture capital' });
    const why = screen.getByRole('region', { name: 'Why we exist' });
    expect(intro.compareDocumentPosition(why) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('region', { name: 'In New York City' }).compareDocumentPosition(why) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(regions.length).toBeGreaterThan(4);
    expect(container.querySelector('.event-card, .event-list')).toBeNull();
  });

  it('links to People and Resources', () => {
    renderPage(<HomePage />);
    expect(screen.getByRole('link', { name: 'Meet the board and members' })).toHaveAttribute('href', '/people');
    expect(screen.getByRole('link', { name: 'Browse resources' })).toHaveAttribute('href', '/resources');
  });

  it('shows every represented organization logo as member experience', () => {
    renderPage(<HomePage />);
    const section = screen.getByRole('region', { name: 'Where our members are represented' });
    const logos = within(section).getAllByRole('img');
    expect(logos.map((logo) => logo.getAttribute('alt'))).toEqual(representedOrganizations.map((org) => org.name));
    for (const [index, organization] of representedOrganizations.entries()) {
      expect(logos[index]).toHaveAttribute('src', organization.logo);
    }
    expect(section.textContent).toMatch(/not sponsors/);
    expect(section.textContent).not.toMatch(/our (sponsors|partners)|sponsored by|in partnership with/i);
  });
});

describe('AboutPage', () => {
  it('separates the Columbia chapter from the parent network', () => {
    renderPage(<AboutPage />);
    expect(screen.getByRole('heading', { level: 2, name: 'The Columbia chapter' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'The Girls Into VC network' })).toBeInTheDocument();
  });

  it('links to real parent information', () => {
    renderPage(<AboutPage />);
    expect(screen.getByRole('link', { name: /girlsintovc\.com/ })).toHaveAttribute('href', siteLinks.parentSite);
    expect(screen.getByRole('link', { name: /campus chapters/i })).toHaveAttribute(
      'href',
      siteLinks.parentCampusChapters,
    );
  });

  it('describes speaker events, workshops, fellowship and community without invented commitments', () => {
    const { container } = renderPage(<AboutPage />);
    for (const name of ['Speaker events', 'Workshops', 'Fellowship', 'Community']) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }
    expect(container.textContent).toMatch(/résumé reviews/);
    expect(container.textContent).toMatch(/technical training/);
    expect(container.textContent).toMatch(/career panels/);
    expect(container.textContent).toMatch(/mentorship/);
    expect(container.textContent).not.toMatch(unsupportedPromises);
  });
});

describe('ResourcesPage', () => {
  it('renders every curated resource as an external link', () => {
    renderPage(<ResourcesPage />);
    for (const resource of resourceGroups.flatMap((group) => group.resources)) {
      expect(screen.getByRole('link', { name: (name) => name.startsWith(resource.title) })).toHaveAttribute(
        'href',
        resource.url,
      );
    }
  });
});
