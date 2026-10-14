import { describe, expect, it } from 'vitest';
import { representationFigures, representationLead } from './representation';

describe('parent-reference representation figures', () => {
  it('pairs exactly the four values with the captions from the supplied visual', () => {
    expect(representationLead).toBe('Women account for only');
    expect(representationFigures).toEqual([
      { value: 2, label: 'of female founders are funded by VC capital' },
      { value: 7, label: 'of board seats at firms' },
      { value: 8, label: 'of firm partners' },
      { value: 9, label: 'of venture capitalists are women' },
    ]);
  });

  it('adds no year, study or funding-dollar denominator', () => {
    for (const figure of representationFigures) {
      expect(figure.label).not.toMatch(/\b(19|20)\d{2}\b|study|report|survey|dollars|source/i);
    }
  });
});
