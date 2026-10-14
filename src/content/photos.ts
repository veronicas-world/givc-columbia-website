/**
 * Photographs shown on the site. `context` keeps parent-network photos from
 * being presented as Columbia chapter events. Sources are in `docs/asset-sources.md`.
 */
export interface SitePhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  context: 'campus' | 'parent' | 'chapter';
  label: string;
  credit: string;
}

export const homePhotos = {
  campus: {
    src: '/images/photos/low-memorial-library.jpg',
    alt: 'Low Memorial Library on the Columbia University campus in Morningside Heights',
    width: 1800,
    height: 1350,
    context: 'campus',
    label: 'Columbia University',
    credit: 'Low Memorial Library, Morningside Heights. Photo: Spaghet-Ti, CC0.',
  },
  community: {
    src: '/images/photos/girls-into-vc-community.jpg',
    alt: 'A group of women standing in front of a Girls Into VC banner',
    width: 1500,
    height: 896,
    context: 'parent',
    label: 'Girls Into VC community',
    credit: 'Photo from the Girls Into VC network, not a Columbia chapter event.',
  },
} satisfies Record<string, SitePhoto>;

const chapterCredit = 'Columbia chapter photo, from the chapter Instagram.';

export const chapterActivityPhotos: SitePhoto[] = [
  {
    src: '/images/chapter/speaker-event.jpg',
    alt: 'A speaker addressing the audience at a chapter speaker event',
    width: 502,
    height: 306,
    context: 'chapter',
    label: 'Speaker events',
    credit: chapterCredit,
  },
  {
    src: '/images/chapter/workshop.jpg',
    alt: 'Students in a lecture hall listening to a presenter at a Girls Into VC lectern',
    width: 504,
    height: 310,
    context: 'chapter',
    label: 'Workshops',
    credit: chapterCredit,
  },
  {
    src: '/images/chapter/fellowship.jpg',
    alt: 'Four chapter members smiling together, one holding a bouquet of flowers',
    width: 502,
    height: 340,
    context: 'chapter',
    label: 'Fellowship',
    credit: chapterCredit,
  },
  {
    src: '/images/chapter/community.jpg',
    alt: 'Members seated in a lecture hall, several raising their hands',
    width: 506,
    height: 342,
    context: 'chapter',
    label: 'Community',
    credit: chapterCredit,
  },
];
