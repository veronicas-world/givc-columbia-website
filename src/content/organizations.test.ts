import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { representedOrganizations } from './organizations';

const expectedNames = [
  'BlackRock',
  'J.P. Morgan',
  'Factory',
  'Elliott Management',
  'Goldman Sachs',
  'Lightspeed Venture Partners',
  'New Enterprise Associates (NEA)',
  'General Catalyst',
  'Exceptional Capital',
  'KKR',
  'TowerBrook',
  'Brookfield',
  'Fox Sports',
  'NewYork-Presbyterian',
  'Dorm Room Fund',
  'Alumni Ventures',
];

describe('represented organizations', () => {
  it('lists the sixteen supplied organizations in order', () => {
    expect(representedOrganizations.map((organization) => organization.name)).toEqual(expectedNames);
  });

  it('lists NEA exactly once', () => {
    const nea = representedOrganizations.filter((organization) => /NEA|New Enterprise Associates/.test(organization.name));
    expect(nea).toHaveLength(1);
  });

  it('uses unique ids and logo files', () => {
    const ids = representedOrganizations.map((organization) => organization.id);
    const logos = representedOrganizations.map((organization) => organization.logo);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(logos).size).toBe(logos.length);
  });

  it('points every logo at a shipped local asset with a recorded source', () => {
    const sourceNotes = readFileSync(resolve(process.cwd(), 'docs/asset-sources.md'), 'utf8');
    for (const organization of representedOrganizations) {
      expect(organization.logo).toMatch(/^\/images\/organizations\/[a-z-]+\.(svg|png)$/);
      expect(existsSync(resolve(process.cwd(), 'public', organization.logo.slice(1)))).toBe(true);
      expect(organization.source).toMatch(/^https:\/\//);
      expect(sourceNotes).toContain(organization.logo.split('/').pop());
      expect(sourceNotes).toContain(organization.source);
    }
  });
});
