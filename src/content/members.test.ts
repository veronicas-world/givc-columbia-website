import { describe, expect, it } from 'vitest';
import { approvedMemberLinkedIns, memberClassGroups, members, schoolName } from './members';

const expectedRoster: [name: string, classYear: number, school: string][] = [
  ['Mali Gilbert', 2028, 'Columbia Engineering'],
  ['Kagan Levine', 2028, 'Barnard College'],
  ['Diane Lang', 2028, 'Columbia College'],
  ['Mila Ansorge', 2028, 'Columbia College'],
  ['Grace Benson', 2029, 'Columbia College'],
  ['Amber Yin', 2028, 'Columbia College'],
  ['Isabela Ferrer', 2029, 'Columbia Engineering'],
  ['Dara Popkoleva', 2029, 'Columbia College'],
  ['Kritvi Kalani', 2029, 'Barnard College'],
  ['Veronica Agudelo', 2028, 'Columbia College'],
  ['Coco Chen', 2029, 'Columbia College'],
  ['Avantika Kampani', 2029, 'Columbia College'],
  ['Jenny Xie', 2028, 'Columbia College'],
  ['Baifern Boondoungprasert', 2028, 'Barnard College'],
  ['Alyna Takahashi', 2028, 'Barnard College'],
  ['Juliana Chavis', 2029, 'Barnard College'],
  ['Frankie (Francesca) Welch', 2029, 'Columbia College'],
  ['Margaret Hui', 2029, 'Barnard College'],
  ['Nora Shitandi', 2028, 'Columbia College'],
  ['Amya Hillis', 2028, 'Columbia College'],
  ['Renee Chieu', 2029, 'Columbia College'],
  ['Camilla Huck', 2029, 'Columbia College'],
  ['Jaya De Rycker', 2029, 'Columbia College'],
  ['Taylor Ye', 2029, 'Columbia College'],
  ['Caroline Keohane', 2028, 'Barnard College'],
  ['Victoria Strobos', 2029, 'Columbia College'],
  ['Isabel Lee', 2028, 'Columbia College'],
  ['Leah Wang', 2029, 'Columbia Engineering'],
  ['Chloe Slack', 2029, 'Columbia College'],
  ['Natalie So', 2029, 'Columbia College'],
  ['Lola Raghavan', 2029, 'Columbia Engineering'],
];

describe('members', () => {
  it('matches the supplied 31-member roster exactly, each once', () => {
    expect(members).toHaveLength(31);
    const actual = members.map((member) => [member.name, member.classYear, schoolName(member.school)]);
    expect(actual).toEqual(expectedRoster);
    expect(new Set(members.map((member) => member.name)).size).toBe(31);
  });

  it('treats BC as Barnard College, not a separate school', () => {
    const caroline = members.find((member) => member.name === 'Caroline Keohane');
    expect(caroline && schoolName(caroline.school)).toBe('Barnard College');
    const schools = new Set(members.map((member) => schoolName(member.school)));
    expect([...schools].sort()).toEqual(['Barnard College', 'Columbia College', 'Columbia Engineering']);
  });

  it('exposes only public fields on every record', () => {
    const allowed = new Set(['name', 'school', 'classYear', 'linkedInUrl']);
    for (const member of members) {
      for (const key of Object.keys(member)) {
        expect(allowed.has(key)).toBe(true);
      }
    }
  });

  it('only links members whose exact LinkedIn URL is approved', () => {
    const rosterNames = new Set(members.map((member) => member.name));
    for (const [name, url] of Object.entries(approvedMemberLinkedIns)) {
      expect(rosterNames.has(name)).toBe(true);
      expect(url).toMatch(/^https:\/\/www\.linkedin\.com\/in\/[^/?#]+\/?$/);
    }
    for (const member of members) {
      expect(member.linkedInUrl).toBe(approvedMemberLinkedIns[member.name]);
    }
  });

  it('groups the roster into Class of 2028 (13) and Class of 2029 (18) without loss or duplication', () => {
    expect(memberClassGroups.map((group) => [group.classYear, group.members.length])).toEqual([
      [2028, 13],
      [2029, 18],
    ]);
    const union = memberClassGroups.flatMap((group) => group.members);
    expect(union).toHaveLength(members.length);
    expect(new Set(union)).toEqual(new Set(members));
    for (const group of memberClassGroups) {
      expect(group.members.every((member) => member.classYear === group.classYear)).toBe(true);
    }
  });
});
