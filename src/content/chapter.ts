export const chapterName = 'Girls Into VC at Columbia';

export const chapterIntro =
  'Girls Into VC (GIVC) is a student-led organization at Columbia University dedicated to increasing the participation of women in venture capital through education, community, and access.';

export interface Activity {
  title: string;
  summary: string;
  detail: string;
}

export const activities: Activity[] = [
  {
    title: 'Speaker events',
    summary: 'Conversations with investors, founders, and operators.',
    detail:
      'The chapter hosts speaker events and fireside chats where people working in and around venture capital talk about their work and answer student questions.',
  },
  {
    title: 'Workshops',
    summary: 'Résumé reviews, technical training, and career panels.',
    detail:
      'Workshops focus on practical preparation, including résumé reviews, technical training, and career panels.',
  },
  {
    title: 'Fellowship',
    summary: 'Deeper learning, mentorship, and hands-on venture capital context.',
    detail:
      'The chapter fellowship offers deeper learning, mentorship, and hands-on context for how venture capital works. This site does not list fellowship dates or requirements; chapter announcements are shared on Instagram and with the interest list.',
  },
  {
    title: 'Community',
    summary: 'Members who meet and learn from each other.',
    detail:
      'Members meet, compare notes, and help each other as they look into venture capital and related careers.',
  },
];

export const reasonsToJoin: string[] = [
  'Learn directly from investors, founders, and operators.',
  'Meet other students interested in venture capital, at Columbia and beyond.',
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

export const interestFormNote =
  'The interest list is a Google Form. It asks for your name and Columbia or Barnard email so the chapter can send event reminders and mailing-list updates.';
