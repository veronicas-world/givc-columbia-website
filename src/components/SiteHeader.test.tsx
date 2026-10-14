import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from './SiteHeader';

function renderHeader() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <SiteHeader />
    </MemoryRouter>,
  );
}

describe('SiteHeader', () => {
  it('lists all six pages in the main navigation', () => {
    renderHeader();
    const names = screen
      .getAllByRole('link')
      .filter((link) => link.closest('nav'))
      .map((link) => link.textContent);
    expect(names).toEqual(['Home', 'About', 'People', 'Resources', 'Events', 'Contact']);
  });

  it('toggles the mobile menu with an accessible button', () => {
    renderHeader();
    const button = screen.getByRole('button', { name: 'Menu' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'site-nav');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile menu with Escape and returns focus to the button', () => {
    renderHeader();
    const button = screen.getByRole('button', { name: 'Menu' });
    fireEvent.click(button);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
  });

  it('closes the mobile menu after choosing a page', () => {
    renderHeader();
    const button = screen.getByRole('button', { name: 'Menu' });
    fireEvent.click(button);
    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
