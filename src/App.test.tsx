import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './App';
import { siteLinks } from './content/links';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

const routes: Array<[string, RegExp]> = [
  ['/', /Girls Into VC at Columbia/],
  ['/about', /About/],
  ['/people', /People/],
  ['/resources', /Resources/],
  ['/events', /Events/],
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

  it('offers a skip link to the main content', () => {
    renderAt('/');
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute('href', '#main');
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
