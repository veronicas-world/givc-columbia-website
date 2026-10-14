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

export const allSitePhotos: SitePhoto[] = [...Object.values(homePhotos), ...activityPhotos];
