export const chapterName = 'Girls Into VC at Columbia';

export const chapterIntro =
  'Girls Into VC (GIVC) is a student-led organization at Columbia University dedicated to increasing the participation of women in venture capital through education, community, and access.';

export interface Activity {
  id: 'speaker-events' | 'workshops' | 'fellowship' | 'continued-education' | 'community';
  title: string;
  summary: string;
  detail: string;
}

export const activities: Activity[] = [
  {
    id: 'speaker-events',
    title: 'Speaker events',
    summary: 'Conversations with investors, founders, and operators.',
    detail:
      'The chapter hosts speaker events and fireside chats that give students direct access to learn from major players in the industry.',
  },
  {
    id: 'workshops',
    title: 'Workshops',
    summary: 'Recruitment advice, résumé reviews, technical training, and career panels.',
    detail:
      'Workshops help members prepare for VC careers with recruiting advice, career planning, résumé reviews, technical training, and career panels.',
  },
  {
    id: 'fellowship',
    title: 'Fellowship',
    summary: 'A 10-week introduction to venture capital for every new member.',
    detail:
      'All new members complete a 10-week fellowship on venture capital and startups, ending with a team simulation that includes an investment memo and term sheet.',
  },
  {
    id: 'continued-education',
    title: 'Continued Education',
    summary: 'Ongoing learning and investment practice beyond the fellowship.',
    detail:
      'After the fellowship, members explore sectors and market trends, practice evaluating pitches in mock investment committees, learn from investors and alumni, and access Girls Into VC resources and programs.',
  },
  {
    id: 'community',
    title: 'Community',
    summary: 'Members who meet and learn from each other.',
    detail: 'Members share insights and support one another as they explore venture capital and related careers.',
  },
];

export interface PastSpeaker {
  /** Matches the speaker's key in `speakerPhotos`. */
  id: 'avniBarman' | 'andreaWang' | 'joshuaBrowder' | 'daniellaCohen' | 'loriBerenberg' | 'nicoleRipka' | 'ireneWu';
  name: string;
  role: string;
}

/** Past chapter speakers, as named on the chapter's event materials and confirmed by the chapter. */
export const pastSpeakers: PastSpeaker[] = [
  { id: 'avniBarman', name: 'Avni Barman', role: 'Founder and CEO, GenShe' },
  { id: 'andreaWang', name: 'Andrea Wang', role: 'General Partner, SV Angel' },
  { id: 'joshuaBrowder', name: 'Joshua Browder', role: 'Founder and CEO, DoNotPay' },
  { id: 'daniellaCohen', name: 'Daniella Cohen', role: '2048 Ventures' },
  { id: 'loriBerenberg', name: 'Lori Berenberg', role: 'Bloomberg Beta' },
  { id: 'nicoleRipka', name: 'Nicole Ripka', role: 'The Collaborative Fund' },
  { id: 'ireneWu', name: 'Irene Wu', role: 'Angel investor' },
];

export const reasonsToJoin: string[] = [
  'Learn directly from investors, founders, and operators.',
  'Meet other students interested in venture capital, at Columbia and beyond.',
  'Access the broader Girls Into VC network and community across campus chapters and countries.',
  'Build practical skills for venture capital and related careers.',
  'Take part in events, the fellowship, and shared career resources.',
];

export const chapterPurpose =
  'Venture capital can be hard to see into from campus. The chapter gives Columbia and Barnard students a place to learn how it works, meet people in it and find their own way in.';

export interface Engagement {
  title: string;
  description: string;
}

/** User-supplied facts. No host firms or dates are listed until the chapter confirms them. */
export const nycEngagement: Engagement[] = [
  {
    title: 'Site visits to NYC venture capital firms',
    description: 'Members visit venture capital firms in New York City to learn how investment teams work.',
  },
  {
    title: 'Girls Into VC NYC chapter',
    description:
      'The chapter connects with the Girls Into VC NYC chapter, linking Columbia members with the wider network in the city.',
  },
];

export const parentSummary =
  'Girls Into VC is a broader network that helps women learn about venture capital through education, mentorship, and community. Its campus chapters are student-led groups at individual universities.';
