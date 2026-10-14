import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { pastEvents } from '../content/events';
import { siteLinks } from '../content/links';
import { resourceGroups } from '../content/resources';
import { HomePage } from './HomePage';
import { ResourcesPage } from './ResourcesPage';

function renderPage(page: React.ReactElement) {
  return render(<MemoryRouter>{page}</MemoryRouter>);
}

function archive() {
  return screen.getByRole('region', { name: 'Past events' });
}

function archiveCards() {
  return within(archive()).getAllByRole('article');
}

describe('Resources past-event archive', () => {
  it('is the #past-events section of Resources', () => {
    renderPage(<ResourcesPage />);
    expect(archive()).toHaveAttribute('id', 'past-events');
  });

  it('renders every past event record as a text-led entry with its speakers', () => {
    renderPage(<ResourcesPage />);
    const cards = archiveCards();
    expect(cards).toHaveLength(pastEvents.length);
    pastEvents.forEach((event, index) => {
      const card = within(cards[index]!);
      expect(card.getByRole('heading', { name: event.title })).toBeInTheDocument();
      expect(card.queryByRole('img')).toBeNull();
      for (const speaker of event.speakers) {
        expect(card.getByText(speaker.name)).toBeInTheDocument();
      }
    });
  });

  it('shows missing dates and locations as pending instead of guessing', () => {
    renderPage(<ResourcesPage />);
    const women = archiveCards().find((card) => within(card).queryByRole('heading', { name: 'Women Investors in VC' }));
    expect(women).toBeDefined();
    expect(within(women!).getByText('Date to be confirmed')).toBeInTheDocument();
    expect(within(women!).getByText('Location to be confirmed')).toBeInTheDocument();
    const avni = archiveCards()[0]!;
    expect(within(avni).getByText('March 25')).toBeInTheDocument();
    expect(within(avni).getByText('Pupin 428')).toBeInTheDocument();
  });

  it('points to Instagram for announcements without offering registration', () => {
    renderPage(<ResourcesPage />);
    expect(within(archive()).getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', siteLinks.instagram);
    expect(archive().textContent).not.toMatch(/register now|rsvp|sign up for this event/i);
  });

  it('keeps all nine curated resources alongside the archive', () => {
    renderPage(<ResourcesPage />);
    const resources = resourceGroups.flatMap((group) => group.resources);
    expect(resources).toHaveLength(9);
    for (const resource of resources) {
      const link = screen.getByRole('link', { name: (name) => name.startsWith(resource.title) });
      expect(link).toHaveAttribute('href', resource.url);
      expect(archive()).not.toContainElement(link);
    }
  });

  it('offers an in-page link to the archive', () => {
    renderPage(<ResourcesPage />);
    expect(screen.getByRole('link', { name: 'Jump to past events' })).toHaveAttribute(
      'href',
      '/resources#past-events',
    );
  });
});

describe('Home entry points', () => {
  it('has no event cards or separate events destination', () => {
    const { container } = renderPage(<HomePage />);
    expect(screen.queryByRole('region', { name: 'Past chapter events' })).toBeNull();
    expect(container.querySelector('.event-card')).toBeNull();
    expect(container.querySelector('a[href="/events"]')).toBeNull();
  });

  it('leads to People, Resources and the archive within Resources', () => {
    renderPage(<HomePage />);
    expect(screen.getByRole('link', { name: /Meet the board and members/ })).toHaveAttribute('href', '/people');
    expect(screen.getByRole('link', { name: /Browse resources/ })).toHaveAttribute('href', '/resources');
    expect(screen.getByRole('link', { name: /See past events/ })).toHaveAttribute('href', '/resources#past-events');
  });

  it('contains no placeholder anchors', () => {
    const { container } = renderPage(<HomePage />);
    for (const anchor of container.querySelectorAll('a')) {
      const href = anchor.getAttribute('href') ?? '';
      expect(href).not.toBe('');
      expect(href).not.toBe('#');
    }
  });
});
