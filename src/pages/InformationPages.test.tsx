import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { siteLinks } from '../content/links';
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
