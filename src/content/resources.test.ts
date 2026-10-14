import { describe, expect, it } from 'vitest';
import { resourceGroups } from './resources';

const allResources = resourceGroups.flatMap((group) => group.resources);

describe('resourceGroups', () => {
  it('contains curated resources in every group', () => {
    expect(resourceGroups.length).toBeGreaterThan(0);
    for (const group of resourceGroups) {
      expect(group.resources.length).toBeGreaterThan(0);
    }
  });

  it('links only to real https destinations, never placeholders or downloads', () => {
    for (const resource of allResources) {
      const url = new URL(resource.url);
      expect(url.protocol).toBe('https:');
      expect(resource.url).not.toMatch(/example\.|#$|\.pdf$|localhost/i);
      expect(resource.url).not.toMatch(/placeholder/i);
    }
  });

  it('gives every resource a unique destination with a name, source and description', () => {
    const urls = allResources.map((resource) => resource.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const resource of allResources) {
      expect(resource.title.trim()).not.toBe('');
      expect(resource.source.trim()).not.toBe('');
      expect(resource.description.length).toBeGreaterThan(30);
    }
  });
});
