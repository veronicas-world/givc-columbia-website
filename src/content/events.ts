export interface EventSpeaker {
  name: string;
  /** Affiliation as printed on chapter event materials; null when sources disagree. */
  affiliation: string | null;
  /** Shown instead of the affiliation when a detail awaits chapter confirmation. */
  pending?: string;
}

export interface PastEvent {
  id: string;
  title: string;
  format: string;
  summary: string;
  speakers: EventSpeaker[];
  /** Month and day only: no source states a year, and none is inferred. Null when sources conflict. */
  date: string | null;
  /** Null when sources conflict or give no room. */
  location: string | null;
  partner?: string;
  /** Editorial provenance for maintainers; not rendered. */
  sourceNote: string;
}

/**
 * Ordered as the chapter's own recap carousel presents them. Without
 * confirmed years this is not a claim about chronology. Entries are text-led
 * because the only event images were low-resolution screenshot crops.
 */
export const pastEvents: PastEvent[] = [
  {
    id: 'avni-barman-genshe',
    title: 'Speaker event with Avni Barman',
    format: 'Speaker event',
    summary: 'A chapter speaker event with Avni Barman of GenShe.',
    speakers: [{ name: 'Avni Barman', affiliation: 'GenShe' }],
    date: 'March 25',
    location: 'Pupin 428',
    sourceNote:
      'Chapter Instagram recap slide (IMG_6205). Year and time not stated. Her title is partly covered on the slide, so only GenShe is shown. The registration figure on the slide is not an attendance count and is omitted.',
  },
  {
    id: 'women-investors-in-vc',
    title: 'Women Investors in VC',
    format: 'Speaker event',
    summary: 'A speaker event with four women investors working in venture capital.',
    speakers: [
      { name: 'Daniella Cohen', affiliation: '2048 Ventures' },
      { name: 'Lori Berenberg', affiliation: 'Bloomberg Beta' },
      { name: 'Nicole Ripka', affiliation: 'The Collaborative Fund' },
      { name: 'Irene Wu', affiliation: 'Angel investor' },
    ],
    date: null,
    location: null,
    partner: "Co-presented with the Columbia Women's Business Society",
    sourceNote:
      'Chapter Instagram recap slide (IMG_6206) and a separately supplied announcement. Speaker names agree. Date and room conflict, so both are pending. Unexplained dollar figures on the recap and an abbreviated prior role for Irene Wu are omitted.',
  },
  {
    id: 'fireside-chat-vc-entrepreneurship',
    title: 'Fireside Chat on Venture Capital and Entrepreneurship',
    format: 'Fireside chat',
    summary: 'A fireside chat on venture capital and entrepreneurship with an investor and a founder.',
    speakers: [
      { name: 'Andrea Wang', affiliation: 'General Partner, SV Angel' },
      { name: 'Joshua Browder', affiliation: 'Founder and CEO, DoNotPay' },
    ],
    date: null,
    location: null,
    partner: 'In collaboration with women@core',
    sourceNote:
      'Chapter Instagram recap slide (IMG_6207) and a separately supplied announcement. Joshua Browder and DoNotPay agree. The chapter confirmed the investor speaker as Andrea Wang, General Partner, SV Angel, matching the announcement (the recap’s Andrea Weng of Andreessen Horowitz is wrong). The date conflicts, so it is pending. The room appears only on the recap template, whose other details conflict, so it is also pending.',
  },
];

/** Anchor id used by the retained past-event archive component. */
export const pastEventsAnchor = 'past-events';

/** Conflicts between supplied event sources, kept for the chapter to confirm. */
export const eventSourceConflicts: string[] = [
  'Women Investors in VC: the recap slide says April 10 in Pupin 428; the announcement says March 31, 2026 in Lerner 568.',
  'Fireside chat date: the recap slide says May 2; the announcement says Monday, April 27, 4 to 5 pm.',
  'No source gives a year for the Avni Barman event, the fireside chat or the Women Investors recap. Years are not inferred from weekdays or post dates.',
];
