import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { eventSourceConflicts, homeHighlightEvents, pastEvents } from './events';

function publicText(event: (typeof pastEvents)[number]): string {
  return JSON.stringify({ ...event, sourceNote: undefined });
}

function byId(id: string) {
  const event = pastEvents.find((candidate) => candidate.id === id);
  if (!event) throw new Error(`Missing event ${id}`);
  return event;
}

describe('past event records', () => {
  it('contains exactly the three source-supported past events', () => {
    expect(pastEvents.map((event) => event.id)).toEqual([
      'avni-barman-genshe',
      'women-investors-in-vc',
      'fireside-chat-vc-entrepreneurship',
    ]);
    expect(new Set(pastEvents.map((event) => event.title)).size).toBe(3);
  });

  it('never publishes an inferred year, time, dollar figure or registration count', () => {
    for (const event of pastEvents) {
      const text = publicText(event);
      // 2000-2039 keeps the speaker firm "2048 Ventures" from tripping the year check.
      expect(text).not.toMatch(/\b20[0-3]\d\b/);
      expect(text).not.toMatch(/\d\s?(am|pm)\b/i);
      expect(text).not.toMatch(/\$/);
      expect(text).not.toMatch(/registered|attend/i);
      expect(text).not.toMatch(/register now|rsvp|upcoming/i);
    }
  });

  it('keeps the undisputed Avni Barman date and room without a year', () => {
    const avni = byId('avni-barman-genshe');
    expect(avni.date).toBe('March 25');
    expect(avni.location).toBe('Pupin 428');
    expect(avni.speakers).toEqual([{ name: 'Avni Barman', affiliation: 'GenShe' }]);
  });

  it('leaves the conflicting Women Investors in VC date and location pending', () => {
    const event = byId('women-investors-in-vc');
    expect(event.date).toBeNull();
    expect(event.location).toBeNull();
    expect(publicText(event)).not.toMatch(/April 10|March 31|Pupin|Lerner/);
    expect(event.speakers.map((speaker) => speaker.name)).toEqual([
      'Daniella Cohen',
      'Lori Berenberg',
      'Nicole Ripka',
      'Irene Wu',
    ]);
  });

  it('does not pick a side in the fireside chat date, spelling or affiliation conflicts', () => {
    const event = byId('fireside-chat-vc-entrepreneurship');
    const text = publicText(event);
    expect(event.date).toBeNull();
    expect(text).not.toMatch(/May 2|April 27|Weng|Wang|Andreessen|SV Angel|General Partner/);
    expect(event.speakers).toContainEqual({ name: 'Joshua Browder', affiliation: 'Founder and CEO, DoNotPay' });
    const andrea = event.speakers.find((speaker) => speaker.name.startsWith('Andrea'));
    expect(andrea?.affiliation).toBeNull();
    expect(andrea?.pending).toMatch(/to be confirmed/i);
  });

  it('records every source conflict for user confirmation', () => {
    const notes = eventSourceConflicts.join(' ');
    for (const fragment of ['April 10', 'March 31', 'Lerner 568', 'May 2', 'April 27', 'Weng', 'Wang', 'Andreessen Horowitz', 'SV Angel']) {
      expect(notes).toContain(fragment);
    }
  });

  it('ships a local cropped photo with descriptive alt text for every event', () => {
    for (const event of pastEvents) {
      expect(event.image.src).toMatch(/^\/images\/events\/[a-z-]+\.jpg$/);
      expect(existsSync(resolve(__dirname, '../../public', event.image.src.slice(1)))).toBe(true);
      expect(event.image.alt.length).toBeGreaterThan(20);
    }
  });

  it('builds Home highlights from the archive records themselves', () => {
    expect(homeHighlightEvents.length).toBeGreaterThan(0);
    for (const highlight of homeHighlightEvents) {
      expect(pastEvents).toContain(highlight);
    }
  });
});
