import { describe, expect, it } from 'vitest';
import { eventSourceConflicts, pastEvents } from './events';

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

  it('uses the chapter-confirmed fireside investor and leaves the conflicting date pending', () => {
    const event = byId('fireside-chat-vc-entrepreneurship');
    const text = publicText(event);
    expect(event.date).toBeNull();
    expect(text).not.toMatch(/May 2|April 27|Weng|Andreessen/);
    expect(event.speakers).toContainEqual({ name: 'Joshua Browder', affiliation: 'Founder and CEO, DoNotPay' });
    expect(event.speakers).toContainEqual({ name: 'Andrea Wang', affiliation: 'General Partner, SV Angel' });
  });

  it('records every source conflict for user confirmation', () => {
    const notes = eventSourceConflicts.join(' ');
    for (const fragment of ['April 10', 'March 31', 'Lerner 568', 'May 2', 'April 27']) {
      expect(notes).toContain(fragment);
    }
  });

  it('keeps events text-led instead of reusing blurry screenshot portraits', () => {
    for (const event of pastEvents) {
      expect(event).not.toHaveProperty('image');
    }
  });

  it('has no Home-only highlight projection', () => {
    for (const event of pastEvents) {
      expect(event).not.toHaveProperty('highlight');
    }
  });
});
