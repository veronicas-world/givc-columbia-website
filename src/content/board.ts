/**
 * Chapter board. The real board list and portraits have not been supplied yet,
 * so the site shows clearly labeled example cards until they are.
 */

export interface BoardPortrait {
  src: string;
  alt: string;
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

export const boardIsPending = true;

const exampleCard: BoardMember = {
  name: 'Board member name',
  role: 'Board role',
  school: 'School',
  classYear: 'Class year',
  isExample: true,
};

export const boardMembers: BoardMember[] = [exampleCard, exampleCard, exampleCard].map((card) => ({ ...card }));
