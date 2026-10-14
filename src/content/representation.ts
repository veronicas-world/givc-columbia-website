/**
 * Parent-reference figures for the Home "Why we exist" section. Values and
 * captions follow the supplied girlsintovc.com statistics visual; the parent
 * page's DOM text swaps the 2% and 9% captions, so it is not the reference.
 * The parent site gives no year or study, so none is shown or implied.
 * Provenance is kept in `docs/asset-sources.md`, never rendered.
 */
export interface RepresentationFigure {
  value: number;
  label: string;
}

export const representationLead = 'Women account for only';

export const representationFigures: RepresentationFigure[] = [
  { value: 2, label: 'of female founders are funded by VC capital' },
  { value: 7, label: 'of board seats at firms' },
  { value: 8, label: 'of firm partners' },
  { value: 9, label: 'of venture capitalists are women' },
];

export const whyWeExist =
  'Women remain a small share of the people who work in venture capital and of the founders it funds. Girls Into VC works to change that.';
