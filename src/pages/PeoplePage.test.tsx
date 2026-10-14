import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { boardMembers } from '../content/board';
import { members, schoolName } from '../content/members';
import { PeoplePage } from './PeoplePage';

function renderPeople() {
  return render(
    <MemoryRouter>
      <PeoplePage />
    </MemoryRouter>,
  );
}

describe('PeoplePage', () => {
  it('lists every member once as a text row with school and year', () => {
    renderPeople();
    const directory = screen.getByRole('region', { name: 'Members' });
    const rows = within(directory).getAllByRole('listitem');
    expect(rows).toHaveLength(members.length);
    members.forEach((member, index) => {
      const row = rows[index]!;
      expect(row).toHaveTextContent(member.name);
      expect(row).toHaveTextContent(schoolName(member.school));
      expect(row).toHaveTextContent(`Class of ${member.classYear}`);
    });
    expect(directory.querySelector('img')).toBeNull();
  });

  it('keeps names without approved URLs as plain text', () => {
    renderPeople();
    const directory = screen.getByRole('region', { name: 'Members' });
    const linked = members.filter((member) => member.linkedInUrl);
    expect(within(directory).queryAllByRole('link')).toHaveLength(linked.length);
  });

  it('shows a separate board section with labeled pending examples', () => {
    renderPeople();
    const board = screen.getByRole('region', { name: 'Board' });
    expect(board).toHaveTextContent(/examples/i);
    expect(board).toHaveTextContent(/not yet/i);
    const cards = within(board).getAllByRole('listitem');
    expect(cards).toHaveLength(boardMembers.length);
    for (const card of cards) {
      expect(card).toHaveTextContent('Example');
    }
    expect(within(board).queryByRole('link')).not.toBeInTheDocument();
    for (const member of members) {
      expect(board).not.toHaveTextContent(member.name);
    }
  });
});
