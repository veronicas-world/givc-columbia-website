/** Parent-organization information from https://www.girlsintovc.com/, checked 2026-10-14. */
export const networkDescription =
  'Girls Into VC works to close the gender gap in venture capital through educational resources, mentorship, and opportunities. Its global community brings women together to learn about investing, entrepreneurship, and careers in venture capital.';

export const networkLeadership =
  'Founded by Isabella Mandis and led by CEO Sarah Phillips, the wider organization connects campus chapters with a global community of students, founders, and investors.';

export const networkPrograms = [
  {
    title: 'Education',
    description: 'Venture capital resources and a fellowship that brings together industry speakers, a curriculum, and practical learning.',
  },
  {
    title: 'Mentorship and community',
    description: 'A place to learn from industry professionals and connect with other women exploring venture capital and entrepreneurship.',
  },
  {
    title: 'Chapters and events',
    description: 'Campus chapters and gatherings connect members locally and across the wider Girls Into VC network.',
  },
];

/** Use the clearly labeled impact figures, not the older counts in the founder biography.
 * The source also shows "150 members" without explaining its relationship to "10k members".
 * That ambiguous figure is intentionally omitted rather than assigned an invented label.
 */
export const networkStats = [
  { value: '6', label: 'continents' },
  { value: '24', label: 'campus chapters' },
  { value: '75', label: 'countries' },
  { value: '10k', label: 'members' },
];

export const networkGraphics = {
  partners: {
    src: '/images/network/parent-partners.jpg',
    width: 1400,
    height: 424,
    alt: 'Parent-organization partner logos, including Milemark Capital, General Catalyst, Bloomberg Beta, PwC, Insight Partners, Bank of America, The MBA Fund, Pear, and Gunderson Dettmer',
  },
  recognition: {
    src: '/images/network/parent-featured-in.jpg',
    width: 1400,
    height: 314,
    alt: 'Recognition logos featured on the parent website: Forbes 30 Under 30 Local, LinkedIn, NVCA, The Business Journals, BostInno, and Her Campus',
  },
};
