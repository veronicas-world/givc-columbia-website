/**
 * Parent-reference figures for the Home "Why we exist" section. The values and
 * the 7%, 8% and 9% captions follow the supplied girlsintovc.com statistics
 * visual; the parent page's DOM text swaps the 2% and 9% captions, so it is not
 * the reference. The 2% caption is the user's wording ("of VC funding dollars"),
 * not the visual's, since 2% is the share of VC dollars rather than of founders.
 * The parent site gives no year or study, so none is shown or implied.
 * Provenance is kept in `docs/asset-sources.md`, never rendered.
 */
export interface RepresentationFigure {
  value: number;
  label: string;
}

export const representationLead = 'Women account for only';

export const representationFigures: RepresentationFigure[] = [
  { value: 2, label: 'of VC funding dollars' },
  { value: 7, label: 'of board seats at firms' },
  { value: 8, label: 'of firm partners' },
  { value: 9, label: 'of venture capitalists' },
];

export const whyWeExist =
  'Women remain a small share of the people who work in venture capital and of the founders it funds. Girls Into VC works to change that.';
