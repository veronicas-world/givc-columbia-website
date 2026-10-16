import { approvedMemberLinkedIns } from './members';

/**
 * Chapter-supplied board and LinkedIn links. Board cards have no photos. School and class year
 * follow the supplied member roster. Roles include the chapter's corrections:
 * Mila is Treasurer and Kagan is VP of Operations.
 */

export interface BoardMember {
  name: string;
  role?: string;
  school: string;
  classYear: string;
  /** Set only after the user approves this exact URL for this person. */
  linkedInUrl?: string;
  /** Example cards are layout placeholders, not real officers. */
  isExample?: boolean;
}

export const boardIsPending = false;

export const boardMembers: BoardMember[] = [
  {
    name: 'Diane Lang',
    role: 'President',
    school: 'Columbia College',
    classYear: 'Class of 2028',
    linkedInUrl: approvedMemberLinkedIns['Diane Lang']!,
  },
  {
    name: 'Mali Gilbert',
    role: 'Vice President',
    school: 'Columbia Engineering',
    classYear: 'Class of 2028',
    linkedInUrl: approvedMemberLinkedIns['Mali Gilbert']!,
  },
  {
    name: 'Mila Ansorge',
    role: 'Treasurer',
    school: 'Columbia College',
    classYear: 'Class of 2028',
    linkedInUrl: approvedMemberLinkedIns['Mila Ansorge']!,
  },
  {
    name: 'Kagan Levine',
    role: 'VP of Operations',
    school: 'Barnard College',
    classYear: 'Class of 2028',
    linkedInUrl: approvedMemberLinkedIns['Kagan Levine']!,
  },
  {
    name: 'Veronica Agudelo',
    role: 'VP of Education',
    school: 'Columbia College',
    classYear: 'Class of 2028',
    linkedInUrl: approvedMemberLinkedIns['Veronica Agudelo']!,
  },
  {
    name: 'Caroline Keohane',
    role: 'VP of Education',
    school: 'Barnard College',
    classYear: 'Class of 2028',
    linkedInUrl: approvedMemberLinkedIns['Caroline Keohane']!,
  },
];
