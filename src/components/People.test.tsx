import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { BoardMember } from '../content/board';
import type { Member } from '../content/members';
import { BoardCard } from './BoardCard';
import { MemberRow } from './MemberRow';

const syntheticUrl = 'https://www.linkedin.com/in/synthetic-test-profile/';

function renderRow(member: Member) {
  return render(
    <ul>
      <MemberRow member={member} />
    </ul>,
  );
}

function renderCard(person: BoardMember) {
  return render(
    <ul>
      <BoardCard person={person} />
    </ul>,
  );
}

describe('MemberRow', () => {
  it('renders a name without an approved URL as plain text', () => {
    renderRow({ name: 'Test Person', school: 'BC', classYear: 2028 });
    const row = screen.getByRole('listitem');
    expect(within(row).queryByRole('link')).not.toBeInTheDocument();
    expect(row.querySelector('a')).toBeNull();
    expect(within(row).getByText('Test Person')).toBeInTheDocument();
    expect(within(row).getByText('Barnard College')).toBeInTheDocument();
    expect(within(row).getByText('Class of 2028')).toBeInTheDocument();
    expect(row.querySelector('img')).toBeNull();
  });

  it('links the name to the exact approved URL', () => {
    renderRow({ name: 'Test Person', school: 'SEAS', classYear: 2029, linkedInUrl: syntheticUrl });
    const link = screen.getByRole('link', { name: /Test Person/ });
    expect(link).toHaveAttribute('href', syntheticUrl);
    expect(link).toHaveAccessibleName('Test Person on LinkedIn (opens in a new tab)');
    link.focus();
    expect(link).toHaveFocus();
  });
});

describe('BoardCard', () => {
  it('labels example cards and uses a neutral placeholder without a live control', () => {
    renderCard({ name: 'Board member name', school: 'School', classYear: 'Class year', isExample: true });
    const card = screen.getByRole('listitem');
    expect(within(card).getByText('Example')).toBeInTheDocument();
    expect(within(card).getByText('Portrait pending')).toBeInTheDocument();
    expect(card.querySelector('img')).toBeNull();
    expect(card.querySelector('a, button')).toBeNull();
  });

  it('shows supplied portrait, name, school, year and an accessible LinkedIn control', () => {
    renderCard({
      name: 'Test Officer',
      role: 'President',
      school: 'Columbia College',
      classYear: 'Class of 2028',
      portrait: { src: '/test-portrait.jpg', alt: 'Portrait of Test Officer' },
      linkedInUrl: syntheticUrl,
    });
    const card = screen.getByRole('listitem');
    expect(within(card).getByRole('img', { name: 'Portrait of Test Officer' })).toHaveAttribute(
      'src',
      '/test-portrait.jpg',
    );
    expect(within(card).getByRole('heading', { level: 3, name: 'Test Officer' })).toBeInTheDocument();
    expect(within(card).getByText('Columbia College')).toBeInTheDocument();
    expect(within(card).getByText('Class of 2028')).toBeInTheDocument();
    expect(within(card).queryByText('Example')).not.toBeInTheDocument();
    const link = within(card).getByRole('link', { name: 'Test Officer on LinkedIn (opens in a new tab)' });
    expect(link).toHaveAttribute('href', syntheticUrl);
    link.focus();
    expect(link).toHaveFocus();
  });

  it('omits the LinkedIn control when no URL is approved', () => {
    renderCard({ name: 'Test Officer', school: 'Barnard College', classYear: 'Class of 2029' });
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
