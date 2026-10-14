import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { chapterIntro } from '../content/chapter';
import { representedOrganizations } from '../content/organizations';
import { chapterActivityPhotos, homeFeaturePhotos, homePhotos } from '../content/photos';
import { networkGraphics } from '../content/network';
import { AboutPage } from './AboutPage';
import { HomePage } from './HomePage';

function renderPage(page: React.ReactElement) {
  return render(<MemoryRouter>{page}</MemoryRouter>);
}

const unsupportedPromises = /guarantee|placement|applications? (are|now) open|apply now|deadline|brighter future|where ambition meets/i;

describe('HomePage', () => {
  it('introduces the student-led chapter and its purpose', () => {
    renderPage(<HomePage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Girls Into VC at Columbia' })).toBeInTheDocument();
    const intro = screen.getByRole('region', { name: 'About the chapter' });
    expect(within(intro).getByRole('paragraph')).toHaveTextContent(chapterIntro);
  });

  it('gives the supplied reasons to get involved', () => {
    renderPage(<HomePage />);
    const reasons = screen.getByRole('region', { name: 'Why join' });
    expect(within(reasons).getByText(/investors, founders, and operators/)).toBeInTheDocument();
    expect(within(reasons).getByText(/at Columbia and beyond/)).toBeInTheDocument();
    expect(within(reasons).getByText(/practical skills/)).toBeInTheDocument();
    expect(within(reasons).getByText(/Access the broader Girls Into VC network and community/)).toBeInTheDocument();
    const photoColumn = reasons.querySelector<HTMLElement>('.home-feature-photo')!;
    expect(photoColumn.querySelector('.photo-frame')).toBeInTheDocument();
    expect(photoColumn.querySelector('[data-network-stats]')).toBeInTheDocument();
    expect(within(photoColumn).getByRole('list', { name: 'Parent-network traction' })).toBeInTheDocument();
  });

  it('leaves the stay-in-touch area to the shared footer', () => {
    renderPage(<HomePage />);
    expect(screen.queryByRole('heading', { name: 'Stay in touch' })).toBeNull();
    expect(screen.queryByRole('link', { name: /Join our interest list/ })).toBeNull();
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

  it('omits the tagline and About link from the opening page', () => {
    renderPage(<HomePage />);
    expect(screen.queryByText('A student-led chapter at Columbia University.')).toBeNull();
    expect(screen.queryByRole('link', { name: 'About the chapter' })).toBeNull();
  });

  it('shows the supplied group photo and general photos without campus imagery or visible captions', () => {
    const { container } = renderPage(<HomePage />);
    expect(screen.getByRole('img', { name: homePhotos.introGroup.alt })).toHaveAttribute(
      'src',
      homePhotos.introGroup.src,
    );
    expect(screen.queryByRole('img', { name: homePhotos.librarySteps.alt })).toBeNull();
    expect(screen.queryByRole('img', { name: homePhotos.campus.alt })).toBeNull();
    expect(screen.queryByRole('img', { name: homePhotos.community.alt })).toBeNull();
    const photos = [...container.querySelectorAll('img[src^="/images/photos/"]')];
    expect(photos).toHaveLength(4);
    expect(new Set(photos.map((photo) => photo.getAttribute('src'))).size).toBe(4);
    expect(container.querySelector('figcaption')).toBeNull();
    expect(container.textContent).not.toMatch(/not a Columbia chapter event|Photo:|chapter Instagram\./);
  });

  it('alternates distinct photos left, right, and left beside the three section descriptions', () => {
    renderPage(<HomePage />);
    const sections = [
      { name: 'Why join', side: 'left', photo: homeFeaturePhotos.whyJoin },
      { name: 'In New York City', side: 'right', photo: homeFeaturePhotos.nyc },
      { name: 'What we do', side: 'left', photo: homeFeaturePhotos.activities },
    ];
    for (const { name, side, photo } of sections) {
      const section = screen.getByRole('region', { name });
      expect(section).toHaveClass('home-feature');
      expect(section).toHaveAttribute('data-photo-side', side);
      if (name === 'Why join' || name === 'What we do') {
        expect(section).toHaveClass('home-band-pale');
      }
      expect(within(section).getAllByRole('img')).toHaveLength(1);
      expect(within(section).getByRole('img', { name: photo.alt })).toHaveAttribute('src', photo.src);
      expect(section.querySelector('.home-feature-copy')).toContainElement(
        within(section).getByRole('heading', { level: 2, name }),
      );
    }
  });

  it('moves from the pink opening into the static description on the left and supplied group photo on the right', () => {
    renderPage(<HomePage />);
    const hero = screen.getByRole('heading', { level: 1 }).closest('section')!;
    const intro = screen.getByRole('region', { name: 'About the chapter' });
    expect(intro).toHaveAttribute('data-intro', 'true');
    expect(hero.nextElementSibling).toBe(intro);
    expect(intro).toHaveAttribute('id', 'chapter');
    expect(intro.children[0]).toHaveClass('home-intro-copy');
    const description = within(intro).getByRole('paragraph');
    expect(description).toHaveClass('home-description');
    expect(description).toHaveTextContent(chapterIntro);
    expect(description).not.toHaveAttribute('data-typewriter');
    expect(intro.children[1]!.querySelector('img')).toHaveAttribute('src', homePhotos.introGroup.src);
    expect(screen.queryByRole('heading', { name: 'A Columbia chapter for women in venture capital' })).toBeNull();
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
    expect(section).toHaveClass('home-band-pink');
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

  it('places Why we exist immediately after the introduction and lists no event cards', () => {
    const { container } = renderPage(<HomePage />);
    const regions = screen.getAllByRole('region').map((region) => region.getAttribute('aria-labelledby'));
    const intro = screen.getByRole('region', { name: 'About the chapter' });
    const why = screen.getByRole('region', { name: 'Why we exist' });
    expect(intro.compareDocumentPosition(why) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(intro.nextElementSibling).toBe(why);
    expect(why.nextElementSibling).toBe(screen.getByRole('region', { name: 'Why join' }));
    expect(regions.length).toBeGreaterThan(4);
    expect(container.querySelector('.event-card, .event-list')).toBeNull();
  });

  it('does not show the removed chapter information link', () => {
    renderPage(<HomePage />);
    expect(screen.queryByRole('link', { name: 'More about the chapter' })).toBeNull();
  });

  it('shows represented organization logos without the removed description', () => {
    renderPage(<HomePage />);
    const section = screen.getByRole('region', { name: "Where our chapter's members are represented" });
    const logos = within(section).getAllByRole('img');
    expect(logos.map((logo) => logo.getAttribute('alt'))).toEqual(representedOrganizations.map((org) => org.name));
    for (const [index, organization] of representedOrganizations.entries()) {
      expect(logos[index]).toHaveAttribute('src', organization.logo);
    }
    expect(section.querySelector('p')).toBeNull();
    expect(section.textContent).not.toContain('Organizations where chapter members have gained experience.');
  });
});

describe('AboutPage', () => {
  it('titles the page for the Columbia chapter without an introduction paragraph', () => {
    renderPage(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'About the Columbia chapter' })).toBeInTheDocument();
    expect(screen.queryByText(chapterIntro)).toBeNull();
    expect(screen.queryByRole('heading', { name: 'The Columbia chapter' })).toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'The Girls Into VC network' })).toBeInTheDocument();
  });

  it('shows speaker events without a side photo, then workshops, fellowship and community side by side', () => {
    const { container } = renderPage(<AboutPage />);
    const speakers = screen.getByRole('region', { name: 'Speaker events' });
    expect(speakers.querySelectorAll('.photo-frame:not(.speaker-figure-photo)')).toHaveLength(0);
    const columns = container.querySelector('.activity-columns')!;
    const expected = [
      ['Workshops', chapterActivityPhotos.workshops],
      ['Fellowship', chapterActivityPhotos.fellowship],
      ['Community', chapterActivityPhotos.community],
    ] as const;
    expect([...columns.querySelectorAll(':scope > section h2')].map((h) => h.textContent)).toEqual(expected.map(([name]) => name));
    for (const [name, photo] of expected) {
      const section = within(columns as HTMLElement).getByRole('region', { name });
      expect(within(section).getByRole('img', { name: photo.alt })).toHaveAttribute('src', photo.src);
    }
    expect(chapterActivityPhotos.fellowship.src).toMatch(/chapter-community\.jpg$/);
    expect(chapterActivityPhotos.community.src).toMatch(/chapter-fellowship\.jpg$/);
  });

  it('describes the 10-week fellowship every new member completes, using the parent program wording', () => {
    renderPage(<AboutPage />);
    const fellowship = screen.getByRole('region', { name: 'Fellowship' });
    expect(fellowship.textContent).toMatch(/All new members complete the Girls Into VC Fellowship, a 10-week educational program/);
    expect(fellowship.textContent).toMatch(/venture capital and the startup ecosystem/);
    expect(fellowship.textContent).toMatch(/investment memo and a term sheet/);
    expect(fellowship.textContent).not.toMatch(/does not list fellowship dates/);
    expect(fellowship.textContent).not.toMatch(/five hours|workbook|one-hour/);
  });

  it('captions every past speaker headshot with a name and role but no dates', () => {
    renderPage(<AboutPage />);
    const speakers = screen.getByRole('region', { name: 'Speaker events' });
    const figures = [...speakers.querySelectorAll('figure')];
    expect(figures.map((figure) => figure.querySelector('figcaption')?.textContent)).toEqual([
      'Avni BarmanFounder and CEO, GenShe',
      'Andrea WangGeneral Partner, SV Angel',
      'Joshua BrowderFounder and CEO, DoNotPay',
      'Daniella Cohen2048 Ventures',
      'Lori BerenbergBloomberg Beta',
      'Nicole RipkaThe Collaborative Fund',
      'Irene WuAngel investor',
    ]);
    for (const figure of figures) {
      const name = figure.querySelector('.speaker-name')!.textContent!;
      expect(within(figure).getByRole('img', { name: `Portrait of ${name}` })).toBeInTheDocument();
    }
    expect(speakers.textContent).not.toMatch(/Weng|Andreessen|January|February|March|April|May \d|Pupin|Lerner/);
  });


  it('adds the parent mission, leadership, programs, and distinct global impact figures', () => {
    renderPage(<AboutPage />);
    const network = screen.getByRole('region', { name: 'The Girls Into VC network' });
    expect(network.textContent).toMatch(/close the gender gap in venture capital/);
    expect(network.textContent).toMatch(/Isabella Mandis/);
    expect(network.textContent).toMatch(/Sarah Phillips/);
    expect(within(network).getByRole('heading', { name: 'Education' })).toBeInTheDocument();
    const impact = screen.getByRole('region', { name: 'The wider network’s impact' });
    expect(within(impact).getByRole('list', { name: 'Parent-network traction' })).toBeInTheDocument();
    expect(impact.textContent).not.toMatch(/not Columbia chapter totals|Parent-site figures/);
  });

  it('labels the partner and recognition graphics as parent-network information, not Columbia affiliation', () => {
    renderPage(<AboutPage />);
    const recognition = screen.getByRole('region', { name: 'Partners and recognition' });
    expect(recognition.textContent).not.toMatch(/The parent organization lists|not Columbia-chapter partnerships or press features/);
    expect(within(recognition).getByRole('img', { name: networkGraphics.partners.alt })).toHaveAttribute(
      'src', networkGraphics.partners.src,
    );
    expect(within(recognition).getByRole('img', { name: networkGraphics.recognition.alt })).toHaveAttribute(
      'src', networkGraphics.recognition.src,
    );
  });

  it('omits the removed parent programs paragraph and its links', () => {
    renderPage(<AboutPage />);
    expect(screen.queryByText(/Programs run by the wider network are separate/)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /girlsintovc\.com/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /campus chapters/i })).not.toBeInTheDocument();
  });

  it('describes speaker events, workshops, fellowship and community without invented commitments', () => {
    const { container } = renderPage(<AboutPage />);
    for (const name of ['Speaker events', 'Workshops', 'Fellowship', 'Community']) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
    expect(container.textContent).toMatch(/résumé reviews/);
    expect(container.textContent).toMatch(/technical training/);
    expect(container.textContent).toMatch(/career panels/);
    expect(container.textContent).toMatch(/peers and mentors/);
    expect(container.textContent).not.toMatch(unsupportedPromises);
  });
});
