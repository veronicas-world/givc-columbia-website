import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { boardIsPending, boardMembers } from './board';
import { approvedMemberLinkedIns, members, schoolName } from './members';

const expectedBoard = [
  ['Diane Lang', 'President', 'https://www.linkedin.com/in/dianealang/'],
  ['Mali Gilbert', 'Vice President', 'https://www.linkedin.com/in/maligilbert/'],
  ['Mila Ansorge', 'Treasurer', 'https://www.linkedin.com/in/milaansorge/'],
  ['Kagan Levine', 'VP of Operations', 'https://www.linkedin.com/in/kagan-pulitzer-levine-34a4a4284/'],
  ['Veronica Agudelo', 'VP of Education', 'https://www.linkedin.com/in/vlagudelo/'],
  ['Caroline Keohane', 'VP of Education', 'https://www.linkedin.com/in/carolinekeohane/'],
];

describe('chapter board', () => {
  it('publishes all six supplied officers with corrected roles and exact LinkedIn links', () => {
    expect(boardIsPending).toBe(false);
    expect(boardMembers.map((person) => [person.name, person.role, person.linkedInUrl])).toEqual(expectedBoard);
    expect(new Set(boardMembers.map((person) => person.name)).size).toBe(6);
    expect(boardMembers.every((person) => !person.isExample)).toBe(true);
  });

  it('matches the member roster for school, class year and approved LinkedIn', () => {
    for (const person of boardMembers) {
      const member = members.find((entry) => entry.name === person.name);
      expect(member).toBeDefined();
      expect(person.school).toBe(schoolName(member!.school));
      expect(person.classYear).toBe(`Class of ${member!.classYear}`);
      expect(person.linkedInUrl).toBe(approvedMemberLinkedIns[person.name]);
      expect(person.linkedInUrl).toBe(member!.linkedInUrl);
    }
  });

  it('has no board portraits or portrait files', () => {
    for (const person of boardMembers) expect(person).not.toHaveProperty('portrait');
    expect(existsSync(resolve(process.cwd(), 'public/images/board'))).toBe(false);
  });
});
