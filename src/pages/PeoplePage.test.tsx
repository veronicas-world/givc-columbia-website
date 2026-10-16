import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { boardMembers } from '../content/board';
import { memberDisplayName, members, schoolName } from '../content/members';
import { PeoplePage } from './PeoplePage';

const boardNames = new Set(boardMembers.map((person) => person.name));
const generalMembers = members.filter((member) => !boardNames.has(member.name));

function renderPeople() {
  return render(
    <MemoryRouter>
      <PeoplePage />
    </MemoryRouter>,
  );
}

describe('PeoplePage', () => {
  it('lists the 50 general members once by first name and last initial, without repeating board members', () => {
    renderPeople();
    const directory = screen.getByRole('region', { name: 'Members' });
    const rows = within(directory).getAllByRole('listitem');
    expect(rows).toHaveLength(50);
    expect(within(directory).getByRole('heading', { level: 2, name: 'Members' })).toBeInTheDocument();
    expect(directory.querySelector(':scope > p')).toBeNull();
    for (const member of generalMembers) {
      const matching = rows.filter(
        (row) =>
          row.querySelector('.member-name')?.textContent === memberDisplayName(member.name) &&
          row.textContent?.includes(`Class of ${member.classYear}`) &&
          row.textContent?.includes(schoolName(member.school)),
      );
      expect(matching).toHaveLength(1);
      expect(directory).not.toHaveTextContent(member.name);
      expect(matching[0]).toHaveTextContent(schoolName(member.school));
      expect(matching[0]).toHaveTextContent(`Class of ${member.classYear}`);
    }
    for (const person of boardMembers) {
      expect(within(directory).queryByText(person.name)).not.toBeInTheDocument();
    }
    expect(within(directory).queryAllByRole('img')).toHaveLength(0);
    expect(directory.querySelector('.member-row img')).toBeNull();
  });

  it('groups general members under all three class years in roster order', () => {
    renderPeople();
    const directory = screen.getByRole('region', { name: 'Members' });
    const expected: Array<[number, number]> = [
      [2028, 10],
      [2029, 24],
      [2030, 16],
    ];
    const groups = within(directory).getAllByRole('region');
    expect(groups.map((group) => within(group).getByRole('heading', { level: 3 }).textContent)).toEqual(
      expected.map(([year]) => `Class of ${year}`),
    );
    expected.forEach(([year, count], index) => {
      const names = within(groups[index]!)
        .getAllByRole('listitem')
        .map((row) => row.querySelector('.member-name')?.textContent);
      const expectedNames = generalMembers
        .filter((member) => member.classYear === year)
        .map((member) => memberDisplayName(member.name));
      expect(names).toHaveLength(count);
      expect(names).toEqual(expectedNames);
    });
  });

  it('keeps names without approved URLs as plain text', () => {
    renderPeople();
    const directory = screen.getByRole('region', { name: 'Members' });
    const linked = generalMembers.filter((member) => member.linkedInUrl);
    expect(within(directory).queryAllByRole('link')).toHaveLength(linked.length);
  });

  it('shows the supplied board in leadership order with LinkedIn buttons and no photos', () => {
    renderPeople();
    const board = screen.getByRole('region', { name: 'Executive Board' });
    expect(board).not.toHaveTextContent(/examples|not yet|pending/i);
    const cards = within(board).getAllByRole('listitem');
    expect(cards).toHaveLength(6);
    expect(cards.map((card) => within(card).getByRole('heading', { level: 3 }).textContent)).toEqual([
      'Diane Lang',
      'Mali Gilbert',
      'Mila Ansorge',
      'Kagan Levine',
      'Veronica Agudelo',
      'Caroline Keohane',
    ]);
    boardMembers.forEach((person, index) => {
      const card = cards[index]!;
      expect(within(card).getByText(person.role!)).toBeInTheDocument();
      expect(within(card).getByText(person.school)).toBeInTheDocument();
      expect(within(card).getByText(person.classYear)).toBeInTheDocument();
      expect(within(card).getByRole('link', { name: `${person.name} on LinkedIn (opens in a new tab)` }))
        .toHaveAttribute('href', person.linkedInUrl);
      expect(card).not.toHaveAttribute('data-example');
    });
    expect(board.querySelector('img')).toBeNull();
  });

  it('uses only the Executive Board title, without the old introductory sentence', () => {
    renderPeople();
    expect(screen.getByRole('heading', { level: 1, name: 'Executive Board' })).toBeInTheDocument();
    expect(screen.queryByText('The students who lead and take part in Girls Into VC at Columbia.')).toBeNull();
    expect(document.querySelector('.page-lede')).toBeNull();
  });

  it('does not publish any supplied email addresses', () => {
    const { container } = renderPeople();
    expect(container.innerHTML).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
  });
});
