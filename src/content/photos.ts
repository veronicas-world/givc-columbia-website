/**
 * Photographs shown on the site. Width and height are the shipped file's
 * intrinsic pixels. Provenance lives in `docs/asset-sources.md` and in
 * `sourceNote`, which is for maintainers and is never rendered.
 */
export interface SitePhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position that keeps faces in frame when the photo is cropped to fill a slot. */
  focus: string;
  sourceNote: string;
}

export const homePhotos = {
  introGroup: {
    src: '/images/photos/girls-into-vc-intro.jpg',
    alt: 'Ten women standing together in front of Girls Into VC banners',
    width: 828,
    height: 512,
    focus: '50% 50%',
    sourceNote: 'Group photo supplied by the user on 2026-10-14 for the Home introduction, copied unchanged.',
  },
  librarySteps: {
    src: '/images/photos/low-library-steps.jpg',
    alt: 'Low Memorial Library and the Alma Mater statue at the top of the steps on the Columbia University campus',
    width: 971,
    height: 507,
    focus: '50% 50%',
    sourceNote: 'Supplied by the user (design-preview/refresh-inputs/low-library-steps.jpeg), copied unchanged.',
  },
  campus: {
    src: '/images/photos/low-memorial-library.jpg',
    alt: 'Low Memorial Library on the Columbia University campus in Morningside Heights',
    width: 1800,
    height: 1350,
    focus: '50% 50%',
    sourceNote: 'Wikimedia Commons, Spaghet-Ti, CC0 1.0. Resized to 1800 pixels wide.',
  },
  community: {
    src: '/images/photos/girls-into-vc-community.jpg',
    alt: 'A group of women standing together in front of a Girls Into VC banner',
    width: 2000,
    height: 1195,
    focus: '50% 30%',
    sourceNote: 'Girls Into VC official photo 606A6532.jpg (2500 x 1494), resized to 2000 pixels wide.',
  },
} satisfies Record<string, SitePhoto>;

/** General editorial photos of Girls Into VC gatherings. They are not tied to a named event. */
export const activityPhotos: SitePhoto[] = [
  {
    src: '/images/photos/panel-discussion.jpg',
    alt: 'Panelists seated in a lecture hall while one speaks into a microphone',
    width: 1340,
    height: 1292,
    focus: '45% 30%',
    sourceNote: 'Girls Into VC official photo 606A6646.jpg (2500 x 1667), cropped to the left of the frame.',
  },
  {
    src: '/images/photos/registration-table.jpg',
    alt: 'Attendees checking in at a Girls Into VC registration table',
    width: 1600,
    height: 1068,
    focus: '40% 35%',
    sourceNote: 'Girls Into VC official photo 606A9109.jpg (2500 x 1668), resized to 1600 pixels wide.',
  },
  {
    src: '/images/photos/community-conversation.jpg',
    alt: 'Five women talking and laughing around a small cafe table',
    width: 800,
    height: 533,
    focus: '50% 40%',
    sourceNote: 'Supplied by the user (design-preview/refresh-inputs/community-coffee.jpeg), copied unchanged.',
  },
];

export const networkPhotos = {
  about: {
    src: '/images/photos/givc-network-about.jpg',
    alt: 'Two women seated with microphones in front of a Girls Into VC backdrop',
    width: 1600,
    height: 900,
    focus: '50% 50%',
    sourceNote: 'Official Girls Into VC homepage photo DJI_20260228105509_0012_D.jpg, resized from 2048 x 1152 to 1600 x 900.',
  },
  impact: {
    src: '/images/photos/givc-network-impact.jpg',
    alt: 'A person wearing a Girls Into VC hoodie in front of a branded backdrop',
    width: 1200,
    height: 800,
    focus: '50% 50%',
    sourceNote: 'Official Girls Into VC homepage photo 606A6912.jpg, resized from 2500 x 1667 to 1200 x 800.',
  },
} satisfies Record<string, SitePhoto>;

const chapterRecapNote =
  'Cropped from the chapter Instagram slide “What we do at GIVC” (IMG_6202), via a 1012 x 2200 review copy of the 1206 x 2622 screenshot. Not upscaled.';

/** Chapter photos from the chapter's own "What we do" slide, one per About activity section. */
export const chapterActivityPhotos = {
  speakerEvents: {
    src: '/images/photos/chapter-speaker-event.jpg',
    alt: 'A guest speaker in a camel blazer talking at a seminar table',
    width: 434,
    height: 281,
    focus: '50% 40%',
    sourceNote: `${chapterRecapNote} Guest speaker panel.`,
  },
  workshops: {
    src: '/images/photos/chapter-workshop.jpg',
    alt: 'Students in a lecture hall facing a presenter at a Girls Into VC lectern',
    width: 437,
    height: 281,
    focus: '50% 50%',
    sourceNote: `${chapterRecapNote} Workshops panel.`,
  },
  fellowship: {
    src: '/images/photos/chapter-fellowship.jpg',
    alt: 'Four women standing together, one holding a bouquet of flowers',
    width: 434,
    height: 307,
    focus: '50% 35%',
    sourceNote: `${chapterRecapNote} Fellowship panel.`,
  },
  community: {
    src: '/images/photos/chapter-community.jpg',
    alt: 'A full lecture hall of students, several raising their hands',
    width: 437,
    height: 307,
    focus: '50% 50%',
    sourceNote: `${chapterRecapNote} Community panel.`,
  },
} satisfies Record<string, SitePhoto>;

/** Speaker headshots from the chapter's event recap slides. */
export const speakerPhotos = {
  avniBarman: {
    src: '/images/photos/speaker-avni-barman.jpg',
    alt: 'Portrait of Avni Barman',
    width: 483,
    height: 483,
    focus: '50% 40%',
    sourceNote: 'Cropped from the chapter Instagram speaker-event slide (IMG_6205) review copy, avoiding the slide text. Not upscaled.',
  },
  andreaWang: {
    src: '/images/photos/speaker-andrea-wang.jpg',
    alt: 'Portrait of Andrea Wang',
    width: 389,
    height: 389,
    focus: '50% 40%',
    sourceNote: 'Cropped from the chapter Instagram fireside-chat slide (IMG_6207) review copy, inside the headshot frame. Not upscaled.',
  },
  joshuaBrowder: {
    src: '/images/photos/speaker-joshua-browder.jpg',
    alt: 'Portrait of Joshua Browder',
    width: 389,
    height: 389,
    focus: '50% 40%',
    sourceNote: 'Cropped from the chapter Instagram fireside-chat slide (IMG_6207) review copy, inside the headshot frame. Not upscaled.',
  },
} satisfies Record<string, SitePhoto>;

export const allSitePhotos: SitePhoto[] = [
  ...Object.values(homePhotos),
  ...activityPhotos,
  ...Object.values(networkPhotos),
  ...Object.values(chapterActivityPhotos),
  ...Object.values(speakerPhotos),
];

/** Each alternating Home section uses a different existing editorial photo. */
export const homeFeaturePhotos = {
  whyJoin: activityPhotos[1]!,
  nyc: activityPhotos[2]!,
  activities: activityPhotos[0]!,
} satisfies Record<string, SitePhoto>;
