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
    for (const member of members) {
      const matching = rows.filter((row) => row.querySelector('.member-name')?.textContent === member.name);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toHaveTextContent(schoolName(member.school));
      expect(matching[0]).toHaveTextContent(`Class of ${member.classYear}`);
    }
    expect(directory.querySelector('img')).toBeNull();
  });

  it('groups members under Class of 2028 (13) and Class of 2029 (18) in roster order', () => {
    renderPeople();
    const directory = screen.getByRole('region', { name: 'Members' });
    const expected: Array<[number, number]> = [
      [2028, 13],
      [2029, 18],
    ];
    const groups = within(directory).getAllByRole('region');
    expect(groups.map((group) => within(group).getByRole('heading', { level: 3 }).textContent)).toEqual(
      expected.map(([year]) => `Class of ${year}`),
    );
    expected.forEach(([year, count], index) => {
      const names = within(groups[index]!)
        .getAllByRole('listitem')
        .map((row) => row.querySelector('.member-name')?.textContent);
      const expectedNames = members.filter((member) => member.classYear === year).map((member) => member.name);
      expect(names).toHaveLength(count);
      expect(names).toEqual(expectedNames);
    });
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
