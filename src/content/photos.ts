import type { PastSpeaker } from './chapter';

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

/** User-supplied higher-resolution photos for the About activities. */
export const chapterActivityPhotos = {
  workshops: {
    src: '/images/photos/chapter-workshop.jpg',
    alt: 'A speaker addresses students in a lecture hall at a Girls Into VC event',
    width: 996,
    height: 1024,
    focus: '50% 50%',
    sourceNote: 'Photo supplied by the user on 2026-10-16 for Pre-Professional Workshops; copied unchanged.',
  },
  fellowship: {
    src: '/images/photos/chapter-fellowship.jpg',
    alt: 'Students fill a lecture hall at a Girls Into VC event',
    width: 1024,
    height: 539,
    focus: '50% 50%',
    sourceNote: 'Photo supplied by the user on 2026-10-16 for Fellowship; copied unchanged.',
  },
  community: {
    src: '/images/photos/chapter-community.jpg',
    alt: 'Four women stand together at a Girls Into VC event, one holding a bouquet',
    width: 1024,
    height: 889,
    focus: '50% 50%',
    sourceNote: 'Photo supplied by the user on 2026-10-16 for Community; copied unchanged.',
  },
} satisfies Record<string, SitePhoto>;

const speakerNote =
  'Headshot from a chapter Instagram event slide, recovered from Git history at full screenshot resolution, upscaled 4x with Real-ESRGAN x4plus and resized to 640 x 640.';

/** Speaker headshots, keyed by `PastSpeaker.id`. */
export const speakerPhotos = {
  avniBarman: {
    src: '/images/photos/speaker-avni-barman.jpg',
    alt: 'Portrait of Avni Barman',
    width: 640,
    height: 640,
    focus: '50% 50%',
    sourceNote: `${speakerNote} Square crop from the speaker-event slide (IMG_6205).`,
  },
  andreaWang: {
    src: '/images/photos/speaker-andrea-wang.jpg',
    alt: 'Portrait of Andrea Wang',
    width: 640,
    height: 640,
    focus: '50% 50%',
    sourceNote: `${speakerNote} Square crop from the fireside-chat slide (IMG_6207).`,
  },
  joshuaBrowder: {
    src: '/images/photos/speaker-joshua-browder.jpg',
    alt: 'Portrait of Joshua Browder',
    width: 640,
    height: 640,
    focus: '50% 50%',
    sourceNote: `${speakerNote} Square crop from the fireside-chat slide (IMG_6207).`,
  },
  daniellaCohen: {
    src: '/images/photos/speaker-daniella-cohen.jpg',
    alt: 'Portrait of Daniella Cohen',
    width: 640,
    height: 640,
    focus: '50% 50%',
    sourceNote: `${speakerNote} Square crop from the Women Investors in VC slide (IMG_6206), top left.`,
  },
  loriBerenberg: {
    src: '/images/photos/speaker-lori-berenberg.jpg',
    alt: 'Portrait of Lori Berenberg',
    width: 640,
    height: 640,
    focus: '50% 50%',
    sourceNote: `${speakerNote} Square crop from the Women Investors in VC slide (IMG_6206), top right.`,
  },
  nicoleRipka: {
    src: '/images/photos/speaker-nicole-ripka.jpg',
    alt: 'Portrait of Nicole Ripka',
    width: 640,
    height: 640,
    focus: '50% 50%',
    sourceNote: `${speakerNote} Square crop from the Women Investors in VC slide (IMG_6206), bottom left.`,
  },
  ireneWu: {
    src: '/images/photos/speaker-irene-wu.jpg',
    alt: 'Portrait of Irene Wu',
    width: 640,
    height: 640,
    focus: '50% 50%',
    sourceNote: `${speakerNote} Square crop from the Women Investors in VC slide (IMG_6206), bottom right.`,
  },
} satisfies Record<PastSpeaker['id'], SitePhoto>;

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
