import { approvedMemberLinkedIns } from './members';

/**
 * Chapter-supplied board, portraits and LinkedIn links. School and class year
 * follow the supplied member roster. Roles include the chapter's corrections:
 * Mila is Treasurer and Kagan is VP of Operations.
 */

export interface BoardPortrait {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface BoardMember {
  name: string;
  role?: string;
  school: string;
  classYear: string;
  /** Omit until the user supplies a portrait; a neutral placeholder is shown. */
  portrait?: BoardPortrait;
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
    portrait: {
      src: '/images/board/diane-lang.webp',
      alt: 'Portrait of Diane Lang',
      width: 504,
      height: 600,
    },
    linkedInUrl: approvedMemberLinkedIns['Diane Lang']!,
  },
  {
    name: 'Mali Gilbert',
    role: 'Vice President',
    school: 'Columbia Engineering',
    classYear: 'Class of 2028',
    portrait: {
      src: '/images/board/mali-gilbert.webp',
      alt: 'Portrait of Mali Gilbert',
      width: 800,
      height: 800,
    },
    linkedInUrl: approvedMemberLinkedIns['Mali Gilbert']!,
  },
  {
    name: 'Mila Ansorge',
    role: 'Treasurer',
    school: 'Columbia College',
    classYear: 'Class of 2028',
    portrait: {
      src: '/images/board/mila-ansorge.webp',
      alt: 'Portrait of Mila Ansorge',
      width: 800,
      height: 800,
    },
    linkedInUrl: approvedMemberLinkedIns['Mila Ansorge']!,
  },
  {
    name: 'Kagan Levine',
    role: 'VP of Operations',
    school: 'Barnard College',
    classYear: 'Class of 2028',
    portrait: {
      src: '/images/board/kagan-levine.webp',
      alt: 'Portrait of Kagan Levine',
      width: 800,
      height: 800,
    },
    linkedInUrl: approvedMemberLinkedIns['Kagan Levine']!,
  },
  {
    name: 'Veronica Agudelo',
    role: 'VP of Education',
    school: 'Columbia College',
    classYear: 'Class of 2028',
    portrait: {
      src: '/images/board/veronica-agudelo.webp',
      alt: 'Portrait of Veronica Agudelo',
      width: 800,
      height: 800,
    },
    linkedInUrl: approvedMemberLinkedIns['Veronica Agudelo']!,
  },
  {
    name: 'Caroline Keohane',
    role: 'VP of Education',
    school: 'Barnard College',
    classYear: 'Class of 2028',
    portrait: {
      src: '/images/board/caroline-keohane.webp',
      alt: 'Portrait of Caroline Keohane',
      width: 800,
      height: 800,
    },
    linkedInUrl: approvedMemberLinkedIns['Caroline Keohane']!,
  },
];
