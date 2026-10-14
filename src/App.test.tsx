import { useEffect } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
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
  ['/people', /People/],
  ['/resources', /Resources/],
  ['/contact', /Contact/],
];

describe('site routes', () => {
  it.each(routes)('renders %s inside the shared shell', (path, heading) => {
    renderAt(path);
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('shows a not-found page for unknown paths', () => {
    renderAt('/missing');
    expect(screen.getByRole('heading', { level: 1, name: /Page not found/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute('href', '/');
  });

  it('navigates between pages from the main navigation', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    fireEvent.click(within(nav).getByRole('link', { name: 'Resources' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Resources' })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'Resources' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('main')).toHaveFocus();
  });

  it('lists exactly the five primary pages in the header and footer', () => {
    renderAt('/');
    const expected = ['Home', 'About', 'People', 'Resources', 'Contact'];
    const main = screen.getByRole('navigation', { name: 'Main' });
    expect(within(main).getAllByRole('link').map((link) => link.textContent)).toEqual(expected);
    const footer = screen.getByRole('contentinfo');
    for (const label of expected) {
      expect(within(footer).getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
    }
    expect(within(footer).queryByRole('link', { name: 'Events' })).toBeNull();
    expect(document.querySelector('a[href="/events"]')).toBeNull();
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
    expect(within(footer).getByRole('link', { name: /Join our interest list/ })).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: /Instagram/ })).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: 'Contact' })).toBeInTheDocument();
    expect(within(footer).getByText(/Chapter LinkedIn: coming soon/)).toBeInTheDocument();
  });
});

describe('footer', () => {
  it('offers the interest list, Instagram, Contact and an honest pending LinkedIn state', () => {
    renderAt('/about');
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', { name: /Join our interest list/ })).toHaveAttribute(
      'href',
      siteLinks.interestForm,
    );
    expect(within(footer).getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', siteLinks.instagram);
    expect(within(footer).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    expect(within(footer).queryByRole('link', { name: /LinkedIn/ })).toBeNull();
    expect(within(footer).getByText(/Chapter LinkedIn: coming soon/)).toBeInTheDocument();
  });
});

describe('legacy /events route and the Resources archive anchor', () => {
  const scrollIntoView = vi.fn();
  Element.prototype.scrollIntoView = scrollIntoView;

  beforeEach(() => {
    scrollIntoView.mockClear();
    vi.mocked(window.scrollTo).mockClear();
  });

  function archive() {
    return screen.getByRole('region', { name: 'Past events' });
  }

  it('replaces /events with /resources#past-events and lands on the archive', () => {
    renderAt('/events');
    expect(probe.location).toBe('/resources#past-events');
    expect(screen.getByRole('heading', { level: 1, name: 'Resources' })).toBeInTheDocument();
    expect(scrollIntoView).toHaveBeenCalled();
    expect(scrollIntoView.mock.contexts.at(-1)).toBe(archive());
    expect(archive()).toHaveFocus();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('does not keep /events in history, so Back skips the redirect', () => {
    renderAt(['/about', '/events'], 1);
    expect(probe.location).toBe('/resources#past-events');
    probe.navigate!(-1);
    return vi.waitFor(() => {
      expect(probe.location).toBe('/about');
      expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument();
    });
  });

  it('scrolls to the archive on a direct /resources#past-events load', () => {
    renderAt('/resources#past-events');
    expect(scrollIntoView.mock.contexts.at(-1)).toBe(archive());
    expect(archive()).toHaveFocus();
  });

  it('scrolls to the archive from the same-page link', () => {
    renderAt('/resources');
    expect(scrollIntoView).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('link', { name: 'Jump to past events' }));
    expect(probe.location).toBe('/resources#past-events');
    expect(scrollIntoView.mock.contexts.at(-1)).toBe(archive());
    expect(archive()).toHaveFocus();
  });

  it('reaches the archive from the Home link', () => {
    renderAt('/');
    fireEvent.click(screen.getByRole('link', { name: /See past events/ }));
    expect(probe.location).toBe('/resources#past-events');
    expect(scrollIntoView.mock.contexts.at(-1)).toBe(archive());
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('returns to the archive on Forward after going Back', async () => {
    renderAt('/about');
    fireEvent.click(within(screen.getByRole('navigation', { name: 'Main' })).getByRole('link', { name: 'Resources' }));
    fireEvent.click(screen.getByRole('link', { name: 'Jump to past events' }));
    probe.navigate!(-1);
    await vi.waitFor(() => expect(probe.location).toBe('/resources'));
    probe.navigate!(-1);
    await vi.waitFor(() => expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument());
    scrollIntoView.mockClear();
    probe.navigate!(2);
    await vi.waitFor(() => expect(probe.location).toBe('/resources#past-events'));
    expect(scrollIntoView.mock.contexts.at(-1)).toBe(archive());
  });
});
