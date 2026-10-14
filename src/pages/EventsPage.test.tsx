import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { homeHighlightEvents, pastEvents } from '../content/events';
import { siteLinks } from '../content/links';
import { EventsPage } from './EventsPage';
import { HomePage } from './HomePage';

function renderPage(page: React.ReactElement) {
  return render(<MemoryRouter>{page}</MemoryRouter>);
}

function archiveCards() {
  const archive = screen.getByRole('region', { name: 'Past events' });
  return within(archive).getAllByRole('article');
}

describe('EventsPage archive', () => {
  it('renders every past event record with its speakers and photo', () => {
    renderPage(<EventsPage />);
    const cards = archiveCards();
    expect(cards).toHaveLength(pastEvents.length);
    pastEvents.forEach((event, index) => {
      const card = within(cards[index]!);
      expect(card.getByRole('heading', { name: event.title })).toBeInTheDocument();
      expect(card.getByRole('img', { name: event.image.alt })).toHaveAttribute('src', event.image.src);
      for (const speaker of event.speakers) {
        expect(card.getByText(speaker.name)).toBeInTheDocument();
      }
    });
  });

  it('shows missing dates and locations as pending instead of guessing', () => {
    renderPage(<EventsPage />);
    const women = archiveCards().find((card) => within(card).queryByRole('heading', { name: 'Women Investors in VC' }));
    expect(women).toBeDefined();
    expect(within(women!).getByText('Date to be confirmed')).toBeInTheDocument();
    expect(within(women!).getByText('Location to be confirmed')).toBeInTheDocument();
    const avni = archiveCards()[0]!;
    expect(within(avni).getByText('March 25')).toBeInTheDocument();
    expect(within(avni).getByText('Pupin 428')).toBeInTheDocument();
  });

  it('points to Instagram for announcements without offering registration', () => {
    const { container } = renderPage(<EventsPage />);
    expect(screen.getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', siteLinks.instagram);
    expect(container.textContent).not.toMatch(/register now|rsvp|sign up for this event/i);
  });
});

describe('Home event highlights', () => {
  it('match their archive counterparts exactly', () => {
    const home = renderPage(<HomePage />);
    const highlights = within(screen.getByRole('region', { name: 'Past chapter events' })).getAllByRole('article');
    expect(highlights).toHaveLength(homeHighlightEvents.length);
    const homeTexts = highlights.map((card) => card.textContent);
    home.unmount();

    renderPage(<EventsPage />);
    const archiveTexts = new Map(archiveCards().map((card) => [card.querySelector('h3')?.textContent, card.textContent]));
    homeHighlightEvents.forEach((event, index) => {
      expect(homeTexts[index]).toBe(archiveTexts.get(event.title));
    });
  });

  it('leads to the past-event archive, People and Resources', () => {
    renderPage(<HomePage />);
    const events = screen.getByRole('region', { name: 'Past chapter events' });
    expect(within(events).getByRole('link', { name: 'See all past events' })).toHaveAttribute('href', '/events');
    expect(screen.getByRole('link', { name: /Meet the board and members/ })).toHaveAttribute('href', '/people');
    expect(screen.getByRole('link', { name: /Browse resources/ })).toHaveAttribute('href', '/resources');
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
