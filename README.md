# Girls Into VC at Columbia website

Local-review website for Girls Into VC at Columbia, built with React, TypeScript, Vite, and React Router, styled with plain CSS.

## Current state

This is the content-first foundation. All six pages have real routes inside a shared header, mobile menu, and footer:

| Route        | Status |
| ------------ | ------ |
| `/`          | Chapter introduction, pillars, activities, reasons to join, past-event highlights, links to People and Resources, interest-list links |
| `/about`     | Columbia chapter activities, separated from the wider Girls Into VC network |
| `/people`    | Board section with labeled example cards (real board pending) and the 31-member directory |
| `/resources` | Curated external venture capital learning and career links |
| `/events`    | Past-event archive of three source-backed chapter events; unconfirmed details shown as pending |
| `/contact`   | Accessible contact form with field validation; sending is not connected yet (see below) |

The final visual design (pink opening, photography, represented-company logos) has not been applied yet. The current styling is intentionally plain.

## Requirements

- Node 22 and npm 10 (verified with Node 22.23.2 and npm 10.9.8)

## Install and run

```sh
npm ci
npm run dev
```

The development server runs at http://127.0.0.1:3100 and binds to localhost only.

## Checks

```sh
npm test -- --maxWorkers=1   # Vitest, one worker, no watch mode
npm run typecheck            # strict TypeScript
npm run lint                 # ESLint, zero warnings allowed
npm run build                # production build into dist/
```

## Editing content

Page copy and links live in typed files under `src/content/`:

- `links.ts`: interest form, Instagram, chapter LinkedIn, and parent-network URLs
- `chapter.ts`: chapter introduction, pillars, activities, reasons to join
- `resources.ts`: curated resource groups and descriptions
- `members.ts`: public member directory (name, school code, class year only) and `approvedMemberLinkedIns`
- `board.ts`: board cards; currently labeled examples while `boardIsPending` is `true`
- `events.ts`: past-event records used by both the Events archive and the Home highlights (`highlight: true`), plus `eventSourceConflicts`
- `navigation.ts`: main navigation order

Pages and the footer read from these files, so a change in one place updates every page.

## Pending inputs

- **Chapter LinkedIn:** `siteLinks.chapterLinkedIn` is `null`, so the footer shows "Chapter LinkedIn: coming soon". Set it to the verified chapter page URL once one is supplied.
- **Board:** the real board list and portraits have not been supplied. Replace the example entries in `board.ts` with `{ name, role, school, classYear, portrait: { src, alt }, linkedInUrl }` records, put portraits under `public/`, and set `boardIsPending` to `false`. A card shows a LinkedIn icon link only when `linkedInUrl` is set.
- **Member LinkedIn links:** no URLs are approved yet, so every member name is plain text. Add an entry to `approvedMemberLinkedIns` (exact roster name to exact `https://www.linkedin.com/in/...` URL) only after the person's profile is approved. Research candidates stay in [`docs/linkedin-review.md`](docs/linkedin-review.md), not in this file.
- **Member privacy:** member records hold only name, school, class year and an approved LinkedIn URL. Do not add emails, phone numbers, UNIs, join dates or internship history.
- **Event details:** some dates, rooms, a speaker surname and her firm conflict between the supplied event graphics, and no source gives a year. These fields are `null` and render as "to be confirmed". Fill them in `events.ts` only after the chapter confirms them. The conflicts are listed in [`docs/asset-sources.md`](docs/asset-sources.md).
- **Event photos:** `public/images/events/` holds crops of the chapter's Instagram slides, rebuilt with `python3 scripts/crop-event-images.py` (needs Pillow and the original screenshots). Sources are in [`docs/asset-sources.md`](docs/asset-sources.md).
- **Contact inbox and email delivery:** not connected. See the next section.

## Contact form and email delivery

The Contact page form checks that name, email and message are filled in and that the email looks like `name@example.com`. Errors appear next to the affected field and clear as soon as the field is corrected.

Email delivery has deliberately not been set up. It waits for two things from the chapter:

1. an approved recipient inbox, and
2. an approved delivery provider (for example a form backend or transactional email service) with an account owned by the chapter.

### Current behavior

`src/content/contact.ts` holds the delivery boundary:

```ts
export const contactDeliveryConfig: ContactDeliveryConfig = {
  recipientInbox: null,
  provider: null,
};
```

While this is unconfigured, a valid submission makes no network request, opens no mail app, keeps the visitor's text in the form, and shows: "Messages cannot be sent from this form yet because chapter email is not connected. Your message has not been sent." The site never claims a message was sent or delivered.

Setting `recipientInbox` on its own does not turn sending on. `isContactDeliveryConfigured` requires both a recipient and a provider. There is no placeholder endpoint, SMTP server, mock provider or provider SDK in the code.

### Connecting delivery later

1. Choose and approve the provider, and create its account under chapter control.
2. Implement a `ContactDeliveryProvider` in `src/content/contact.ts`. Its `send(message, recipientInbox)` must resolve only after the provider accepts the message and throw on any failure. The form then shows "sent" or a retry message accordingly.
3. Set `recipientInbox` to the approved inbox and `provider` to that implementation.
4. Keep API keys and secrets out of the repository. Browser code is public, so a secret key needs a server-side or provider-hosted step. Public site keys should come from environment variables (`import.meta.env.VITE_...`) in an uncommitted `.env.local`.
5. Verify real delivery separately before launch: send a test message to the approved inbox, confirm it arrives, and confirm that a provider failure shows the retry message. The current automated tests only cover validation and the unconfigured state; they do not prove that email delivery works.

## Design references

`design-preview/` holds earlier mockups and reference photos. It is excluded from the build, lint, and tests and is not shipped in `dist/`.
