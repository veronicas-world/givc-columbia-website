/**
 * Public member directory. Only name, school, class year and a user-approved
 * LinkedIn URL may appear here. Source: the sanitized roster supplied for the site.
 */

export type SchoolCode = 'CC' | 'SEAS' | 'Barnard' | 'BC';

export interface Member {
  name: string;
  school: SchoolCode;
  classYear: number;
  /** Set only after the user approves this exact URL for this member. */
  linkedInUrl?: string;
}

export const schoolNames: Record<SchoolCode, string> = {
  CC: 'Columbia College',
  SEAS: 'Columbia Engineering',
  Barnard: 'Barnard College',
  BC: 'Barnard College',
};

/**
 * Approved LinkedIn URLs keyed by exact member name. Candidates from research
 * stay in the review document until the user approves them.
 */
export const approvedMemberLinkedIns: Record<string, string> = {};

const roster: Member[] = [
  { name: 'Mali Gilbert', classYear: 2028, school: 'SEAS' },
  { name: 'Kagan Levine', classYear: 2028, school: 'Barnard' },
  { name: 'Diane Lang', classYear: 2028, school: 'CC' },
  { name: 'Mila Ansorge', classYear: 2028, school: 'CC' },
  { name: 'Grace Benson', classYear: 2029, school: 'CC' },
  { name: 'Amber Yin', classYear: 2028, school: 'CC' },
  { name: 'Isabela Ferrer', classYear: 2029, school: 'SEAS' },
  { name: 'Dara Popkoleva', classYear: 2029, school: 'CC' },
  { name: 'Kritvi Kalani', classYear: 2029, school: 'Barnard' },
  { name: 'Veronica Agudelo', classYear: 2028, school: 'CC' },
  { name: 'Coco Chen', classYear: 2029, school: 'CC' },
  { name: 'Avantika Kampani', classYear: 2029, school: 'CC' },
  { name: 'Jenny Xie', classYear: 2028, school: 'CC' },
  { name: 'Baifern Boondoungprasert', classYear: 2028, school: 'Barnard' },
  { name: 'Alyna Takahashi', classYear: 2028, school: 'Barnard' },
  { name: 'Juliana Chavis', classYear: 2029, school: 'Barnard' },
  { name: 'Frankie (Francesca) Welch', classYear: 2029, school: 'CC' },
  { name: 'Margaret Hui', classYear: 2029, school: 'Barnard' },
  { name: 'Nora Shitandi', classYear: 2028, school: 'CC' },
  { name: 'Amya Hillis', classYear: 2028, school: 'CC' },
  { name: 'Renee Chieu', classYear: 2029, school: 'CC' },
  { name: 'Camilla Huck', classYear: 2029, school: 'CC' },
  { name: 'Jaya De Rycker', classYear: 2029, school: 'CC' },
  { name: 'Taylor Ye', classYear: 2029, school: 'CC' },
  { name: 'Caroline Keohane', classYear: 2028, school: 'BC' },
  { name: 'Victoria Strobos', classYear: 2029, school: 'CC' },
  { name: 'Isabel Lee', classYear: 2028, school: 'CC' },
  { name: 'Leah Wang', classYear: 2029, school: 'SEAS' },
  { name: 'Chloe Slack', classYear: 2029, school: 'CC' },
  { name: 'Natalie So', classYear: 2029, school: 'CC' },
  { name: 'Lola Raghavan', classYear: 2029, school: 'SEAS' },
];

export const members: Member[] = roster.map((member) => {
  const linkedInUrl = approvedMemberLinkedIns[member.name];
  return linkedInUrl ? { ...member, linkedInUrl } : member;
});

export interface MemberClassGroup {
  classYear: number;
  members: Member[];
}

/** Members grouped by class year, earliest first, keeping roster order within each year. */
export const memberClassGroups: MemberClassGroup[] = [...new Set(members.map((member) => member.classYear))]
  .sort((a, b) => a - b)
  .map((classYear) => ({ classYear, members: members.filter((member) => member.classYear === classYear) }));

export function schoolName(code: SchoolCode) {
  return schoolNames[code];
}
