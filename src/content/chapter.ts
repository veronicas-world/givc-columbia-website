export const chapterName = 'Girls Into VC at Columbia';

export const chapterIntro =
  'Girls Into VC (GIVC) is a student-led organization at Columbia University dedicated to increasing the participation of women in venture capital through education, community, and access.';

export interface Pillar {
  title: string;
  description: string;
}

export const pillars: Pillar[] = [
  {
    title: 'Education',
    description: 'Speaker events and workshops that explain how venture capital works and how people build careers in it.',
  },
  {
    title: 'Community',
    description: 'A supportive group of students who are curious about venture capital, at Columbia and beyond.',
  },
  {
    title: 'Access',
    description: 'Direct conversations with investors, founders, and operators, plus a shared set of career resources.',
  },
];

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
    summary: 'A supportive network of members.',
    detail:
      'Members meet, learn from each other, and support one another as they explore venture capital and related careers.',
  },
];

export const reasonsToJoin: string[] = [
  'Learn directly from investors, founders, and operators.',
  'Build a supportive network at Columbia and beyond.',
  'Develop practical skills and confidence for venture capital and related careers.',
  'Take part in events, the fellowship, and shared career resources.',
];

export const parentSummary =
  'Girls Into VC is a broader network that empowers women to explore venture capital through education, mentorship, and community. Its campus chapters are student-led groups at individual universities.';

export const interestFormNote =
  'The interest list is a Google Form. It asks for your name and Columbia or Barnard email so the chapter can send event reminders and mailing-list updates.';
