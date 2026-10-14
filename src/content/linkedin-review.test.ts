import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { approvedMemberLinkedIns, members } from './members';

const reviewPath = resolve(process.cwd(), 'docs/linkedin-review.md');
const review = readFileSync(reviewPath, 'utf8');

const statuses = new Set(['likely', 'low-confidence', 'ambiguous', 'unknown', 'supplied', 'not-researched']);

interface ReviewRow {
  name: string;
  queries: string;
  candidate: string;
  status: string;
  approval: string;
}

function reviewRows(): ReviewRow[] {
  const resultsSection = review.split('## Results')[1]?.split('\n## ')[0] ?? '';
  return resultsSection
    .split('\n')
    .filter((line) => line.startsWith('| ') && !line.startsWith('| Member') && !line.startsWith('|---'))
    .map((line) => {
      const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
      return {
        name: cells[0] ?? '',
        queries: cells[2] ?? '',
        candidate: cells[3] ?? '',
        status: cells[5] ?? '',
        approval: cells[6] ?? '',
      };
    });
}

describe('LinkedIn review document', () => {
  const rows = reviewRows();

  it('has exactly one row for every roster member', () => {
    expect(rows).toHaveLength(56);
    expect(rows.map((row) => row.name)).toEqual(members.map((member) => member.name));
  });

  it('records research and the current approval status for every member', () => {
    for (const row of rows) {
      if (row.status === 'not-researched') {
        expect(row.queries).toBe('not researched');
        expect(row.candidate).toBe('none');
      } else {
        expect(row.queries).toMatch(/`[^`]+`/);
      }
      expect(statuses.has(row.status)).toBe(true);
      expect(row.approval).toBe(approvedMemberLinkedIns[row.name] ? 'approved' : 'pending');
      if (row.approval === 'approved') {
        expect(row.candidate).toBe(approvedMemberLinkedIns[row.name]);
      }
    }
    expect(rows.filter((row) => row.approval === 'approved')).toHaveLength(6);
    expect(rows.filter((row) => row.status === 'not-researched')).toHaveLength(25);
  });

  it('lists URLs only for supplied, likely or low-confidence rows', () => {
    for (const row of rows) {
      const hasUrl = /^https:\/\/www\.linkedin\.com\/in\//.test(row.candidate);
      expect(hasUrl).toBe(['supplied', 'likely', 'low-confidence'].includes(row.status));
    }
  });

  it('keeps unapproved research candidates out of live member links', () => {
    const liveUrls = new Set([
      ...Object.values(approvedMemberLinkedIns),
      ...members.flatMap((member) => (member.linkedInUrl ? [member.linkedInUrl] : [])),
    ]);
    for (const row of rows.filter((row) => row.approval === 'pending')) {
      for (const url of row.candidate.match(/https:\/\/[^\s|`)]+/g) ?? []) {
        expect(liveUrls.has(url)).toBe(false);
      }
    }
  });

  it('contains no email addresses or phone numbers', () => {
    expect(review).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
    expect(review).not.toMatch(/\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/);
  });
});
