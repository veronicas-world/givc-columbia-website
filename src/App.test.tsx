import { useEffect } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './App';
import { siteLinks } from './content/links';

const probe: { location: string; navigate: ReturnType<typeof useNavigate> | null } = { location: '', navigate: null };

function LocationProbe() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    probe.location = `${location.pathname}${location.hash}`;
    probe.navigate = navigate;
  }, [location, navigate]);
  return null;
}

function renderAt(path: string | string[], initialIndex = 0) {
  const entries = Array.isArray(path) ? path : [path];
  return render(
    <MemoryRouter initialEntries={entries} initialIndex={initialIndex}>
      <AppRoutes />
      <LocationProbe />
    </MemoryRouter>,
  );
}

const routes: Array<[string, RegExp]> = [
  ['/', /Girls Into VC at Columbia/],
  ['/about', /About/],
  ['/people', /Executive Board/],
  ['/contact', /Contact/],
];

describe('site routes', () => {
  it.each(routes)('renders %s inside the shared shell', (path, heading) => {
    renderAt(path);
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('highlights the interest list, then offers a private contact form and social links', () => {
    renderAt('/contact');
    const main = screen.getByRole('main');
    expect(main.querySelector('a[href^="mailto:"]')).toBeNull();

    const interest = screen.getByRole('region', { name: 'Join our interest list' });
    expect(interest).toHaveClass('page-band-pink');
    expect(within(interest).getByRole('link', { name: 'Click here' })).toHaveAttribute('href', siteLinks.interestForm);
    expect(within(interest).queryByRole('paragraph')).toBeNull();
    expect(interest).not.toHaveTextContent(/Google Form|opens in a new tab/);

    const channels = screen.getByRole('region', { name: 'Get in touch' });
    expect(interest.compareDocumentPosition(channels) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(channels).not.toHaveTextContent(/Diane Lang|Message the president/);
    const form = within(channels).getByRole('form', { name: 'Contact form' });
    expect(form.getAttribute('action') ?? '').not.toContain('@');
    expect(within(channels).getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', siteLinks.chapterLinkedIn);
    expect(within(channels).getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', siteLinks.instagram);
  });

  it.each(['/missing', '/resources', '/events'])('shows a not-found page for removed paths such as %s', (path) => {
    renderAt(path);
    expect(screen.getByRole('heading', { level: 1, name: /Page not found/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute('href', '/');
  });

  it('navigates between pages from the main navigation', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    fireEvent.click(within(nav).getByRole('link', { name: 'People' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Executive Board' })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'People' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('main')).toHaveFocus();
  });

  it('opens About from the main navigation', () => {
    renderAt('/');
    fireEvent.click(within(screen.getByRole('navigation', { name: 'Main' })).getByRole('link', { name: 'About' }));
    expect(screen.getByRole('heading', { level: 1, name: 'About the Columbia chapter' })).toBeInTheDocument();
  });

  it('returns Home from the header logo', () => {
    renderAt('/about');
    fireEvent.click(screen.getByRole('link', { name: 'Girls Into VC at Columbia home' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Girls Into VC at Columbia' })).toBeInTheDocument();
  });

  it('lists About, People and Contact in the header and footer', () => {
    renderAt('/');
    const expected = ['About', 'People', 'Contact'];
    const main = screen.getByRole('navigation', { name: 'Main' });
    expect(within(main).getAllByRole('link').map((link) => link.textContent)).toEqual(expected);
    const footer = screen.getByRole('contentinfo');
    const footerNav = within(footer).getByRole('navigation', { name: 'Footer' });
    expect(within(footerNav).getAllByRole('link').map((link) => link.textContent)).toEqual(['About', 'People', 'Contact']);
    expect(within(footer).getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(within(footer).getByRole('link', { name: 'People' })).toHaveAttribute('href', '/people');
    expect(within(footer).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    expect(within(footer).queryByRole('link', { name: 'Events' })).toBeNull();
    expect(document.querySelector('a[href="/events"]')).toBeNull();
    expect(document.querySelector('a[href="/resources"]')).toBeNull();
  });

  it('offers a skip link to the main content', () => {
    renderAt('/');
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute('href', '#main');
  });
});

const routePaths = routes.map(([path]) => path);
const stockPhrases = /empower|supportive|passionate|unlock|game.?chang|next generation|journey|world.?class|cutting.?edge/i;

describe('final copy across the five routes', () => {
  it.each(routePaths)('%s uses matter-of-fact copy without italic elements', (path) => {
    const { container } = renderAt(path);
    expect(container.querySelector('em, i, cite')).toBeNull();
    expect(container.textContent).not.toMatch(stockPhrases);
  });

  it.each(routePaths)('%s ends with the shared footer actions', (path) => {
    renderAt(path);
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).queryByRole('link', {
      name: 'Stay in touch by joining our interest list',
    })).toBeNull();
    expect(within(footer).getByRole('link', { name: /Instagram/ })).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: 'Contact' })).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', siteLinks.chapterLinkedIn);
    expect(screen.queryByRole('heading', { name: 'Stay in touch' })).toBeNull();
  });

  it.each(routePaths)('%s frames its opening and shared footer with decorative sketches', (path) => {
    renderAt(path);
    const main = screen.getByRole('main');
    const mainSketches = main.querySelectorAll('.sketch-accent');
    expect(mainSketches).toHaveLength(10);
    for (const sketch of mainSketches) {
      expect(sketch.closest(path === '/' ? '.home-hero' : '.page-header')).not.toBeNull();
      expect(sketch).toHaveAttribute('aria-hidden', 'true');
    }
    const sketches = screen.getByRole('contentinfo').querySelectorAll('.sketch-accent');
    expect(sketches).toHaveLength(16);
    for (const sketch of sketches) {
      expect(sketch.closest('footer')).toBe(screen.getByRole('contentinfo'));
    }
  });

  it.each([
    ['/about', ['white', 'pale', 'white', 'pale']],
    ['/people', ['white', 'pale']],
    ['/contact', ['pink', 'white']],
  ] as const)('%s divides its content into full-width color bands', (path, tones) => {
    renderAt(path);
    const main = screen.getByRole('main');
    expect(main).toHaveClass('main-bands');
    const bands = [...main.querySelectorAll(':scope > .page-band')];
    expect(bands).toHaveLength(tones.length);
    bands.forEach((band, index) => {
      expect(band).toHaveClass(`page-band-${tones[index]}`);
      expect(band.querySelector(':scope > .page-band-inner')).not.toBeNull();
      expect(band).toHaveAttribute('aria-labelledby');
    });
  });
});

describe('footer', () => {
  it('credits Factory in a full-width footer row with the social buttons', () => {
    renderAt('/');
    const footer = screen.getByRole('contentinfo');
    const credit = footer.querySelector<HTMLElement>('.footer-credit')!;
    expect(credit).toHaveTextContent('Built with Factory');
    const factory = within(credit).getByRole('link', { name: /^Factory/ });
    expect(factory).toHaveAttribute('href', 'https://factory.ai');
    expect(factory).toHaveAttribute('target', '_blank');
    expect(factory).toHaveAttribute('rel', 'noopener noreferrer');
    const socialRow = footer.querySelector('.footer-social-row')!;
    expect(socialRow.parentElement).toHaveClass('site-footer-inner');
    expect(socialRow).toContainElement(credit);
    expect(socialRow).toContainElement(within(footer).getByRole('list', { name: 'Social media' }));
  });

  it('offers navigation and social links without the interest-list callout or copyright', () => {
    renderAt('/about');
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).queryByRole('link', {
      name: 'Stay in touch by joining our interest list',
    })).toBeNull();
    expect(footer.querySelector('.footer-intro p')).toBeNull();
    expect(within(footer).queryByRole('heading', { name: 'Pages' })).toBeNull();
    expect(footer.textContent).not.toMatch(/Follow along for chapter news/);
    expect(within(footer).getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', siteLinks.instagram);
    expect(within(footer).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    expect(within(footer).getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', siteLinks.chapterLinkedIn);
    const socialLinks = within(within(footer).getByRole('list', { name: 'Social media' })).getAllByRole('link');
    expect(socialLinks).toHaveLength(2);
    for (const link of socialLinks) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
    expect(footer.textContent).not.toMatch(/copyright|©|coming soon/i);
    expect(footer.querySelectorAll('.sketch-accent[aria-hidden="true"]')).toHaveLength(16);
    expect(footer.querySelectorAll('.sketch-scatter')).toHaveLength(1);
  });
});
