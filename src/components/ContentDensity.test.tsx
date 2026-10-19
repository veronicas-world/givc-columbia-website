import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from '../App';

const css = readFileSync(resolve(process.cwd(), 'src/components/ContentDensity.css'), 'utf8');
const pageLayoutCss = readFileSync(resolve(process.cwd(), 'src/components/PageLayout.css'), 'utf8');
const scaledSelector = /([^{}]+)\{\s*zoom:\s*0\.8\s*;/.exec(css)![1]!.trim();

function renderAt(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);
}

describe('editorial content sizing', () => {
  it.each(['/about', '/people', '/resources', '/contact'])('sizes the %s header independently of body content', (path) => {
    renderAt(path);
    const header = document.querySelector('.page-header')!;
    expect(header.matches(scaledSelector)).toBe(false);
    expect(pageLayoutCss).toMatch(/@media \(min-width: 48rem\)\s*{\s*\.page-header\s*{\s*zoom:\s*0\.8/);
  });

  it.each(['/', '/about'])('applies compact sizing only to the content on %s', (path) => {
    renderAt(path);
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('data-content-density', 'compact');
    for (const child of main.children) {
      expect(child.matches(scaledSelector)).toBe(
        !child.classList.contains('home-hero') && !child.classList.contains('page-header'),
      );
    }
  });

  it.each(['/people', '/resources', '/contact', '/missing'])('keeps body content on %s at its existing size', (path) => {
    renderAt(path);
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('data-content-density', 'standard');
    expect(main.querySelectorAll(scaledSelector)).toHaveLength(0);
  });

  it('never scales the landing screen, its logo, or the shared shell', () => {
    renderAt('/');
    for (const element of [
      document.documentElement,
      document.body,
      screen.getByRole('main'),
      screen.getByRole('banner'),
      screen.getByRole('contentinfo'),
      document.querySelector('.home-hero')!,
      document.querySelector('.home-title .brand-mark')!,
    ]) {
      expect(element.matches(scaledSelector)).toBe(false);
    }
    expect(css.match(/\bzoom\s*:/g)).toHaveLength(1);
    expect(css).toContain("@media (min-width: 48rem)");
    expect(scaledSelector).toBe("main[data-content-density='compact'] > :not(.home-hero):not(.page-header)");
  });

  it('updates sizing when navigating without leaving a compact style on People or Contact', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    for (const [label, density] of [['About', 'compact'], ['People', 'standard'], ['Resources', 'standard'], ['Contact', 'standard']] as const) {
      fireEvent.click(within(nav).getByRole('link', { name: label }));
      expect(screen.getByRole('main')).toHaveAttribute('data-content-density', density);
    }
    fireEvent.click(screen.getByRole('link', { name: 'Girls Into VC at Columbia home' }));
    expect(screen.getByRole('main')).toHaveAttribute('data-content-density', 'compact');
    expect(document.querySelector('.home-hero')!.matches(scaledSelector)).toBe(false);
  });
});
