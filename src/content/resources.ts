export interface Resource {
  title: string;
  source: string;
  url: string;
  description: string;
}

export interface ResourceGroup {
  title: string;
  description: string;
  resources: Resource[];
}

export const resourceGroups: ResourceGroup[] = [
  {
    title: 'Learn how venture capital works',
    description: 'Reading and listening that explain how startups raise money and how investors think.',
    resources: [
      {
        title: 'Venture Deals',
        source: 'Brad Feld and Jason Mendelson',
        url: 'https://venturedeals.com/',
        description:
          'Companion site for the widely used book on venture financings, term sheets, and how founders and investors negotiate.',
      },
      {
        title: 'YC Startup Library',
        source: 'Y Combinator',
        url: 'https://www.ycombinator.com/library',
        description:
          'Essays, videos, and talks from the Y Combinator accelerator on fundraising, building companies, and working with investors.',
      },
      {
        title: 'Paul Graham essays',
        source: 'Paul Graham',
        url: 'https://www.paulgraham.com/articles.html',
        description:
          'Essays by the Y Combinator co-founder on startups, early-stage investing, and how founders raise money.',
      },
      {
        title: 'a16z podcast network',
        source: 'Andreessen Horowitz',
        url: 'https://a16z.com/podcasts/',
        description:
          'Podcasts from the venture capital firm Andreessen Horowitz covering technology markets, company building, and investing.',
      },
    ],
  },
  {
    title: 'Follow the market',
    description: 'Industry data on where venture capital is being invested.',
    resources: [
      {
        title: 'NVCA research',
        source: 'National Venture Capital Association',
        url: 'https://nvca.org/research/',
        description:
          'Research from the U.S. venture capital trade association, including its yearbook and the quarterly PitchBook-NVCA Venture Monitor.',
      },
    ],
  },
  {
    title: 'Careers and community',
    description: 'Organizations and campus offices that support people entering venture capital and entrepreneurship.',
    resources: [
      {
        title: 'All Raise',
        source: 'All Raise',
        url: 'https://www.allraise.org/',
        description:
          'Nonprofit focused on helping women and nonbinary investors and founders succeed across the venture capital ecosystem.',
      },
      {
        title: 'Kauffman Fellows',
        source: 'Kauffman Fellows',
        url: 'https://www.kauffmanfellows.org/',
        description:
          'Leadership development fellowship and global network for working venture capital investors; useful for seeing how the profession trains its people.',
      },
      {
        title: 'Columbia Entrepreneurship',
        source: 'Columbia University',
        url: 'https://entrepreneurship.columbia.edu/',
        description:
          'Columbia University entrepreneurship hub supported by the William V. Campbell Center, with programs, events, and resources for students.',
      },
      {
        title: 'Columbia Center for Career Education',
        source: 'Columbia University',
        url: 'https://www.careereducation.columbia.edu/',
        description:
          'Career advising, job and internship listings, and recruiting resources for Columbia students.',
      },
    ],
  },
];
