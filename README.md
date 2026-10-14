# Girls Into VC at Columbia website

Local-review website for Girls Into VC at Columbia, built with React, TypeScript, Vite, and React Router, styled with plain CSS.

## Pages

All five pages share a header (with a mobile menu below 768 pixels wide) and a pale-pink footer with the interest list, Instagram, chapter LinkedIn status and Contact.

| Route        | Content |
| ------------ | ------- |
| `/`          | Full-height pink opening with the white Girls Into VC logo and "at Columbia", then the supplied Low Library steps photo and a centered chapter introduction, reasons to join, NYC venture capital firm site visits and the Girls Into VC NYC chapter connection, a community photo, activities with general Girls Into VC photos, a compact "Why we exist" section with four parent figures (2%, 7%, 8%, 9%), "Where our members are represented" logos, links to People, Resources and the past events, and the interest list |
| `/about`     | Columbia chapter activities with a campus photo, separated from the wider Girls Into VC network |
| `/people`    | Board section with pale-pink square cards (labeled examples until the real board is supplied) and the 31-member directory as centered text rows grouped under Class of 2028 (13) and Class of 2029 (18) |
| `/resources` | Curated external venture capital learning and career links, then the past-event archive (`#past-events`) of three source-backed chapter events; unconfirmed details shown as "to be confirmed" |
| `/events`    | Old address kept for existing links: redirects (replacing the history entry) to `/resources#past-events` |
| `/contact`   | Accessible contact form with field validation; sending is not connected yet (see below) |

Design rules for future edits: the official Girls Into VC logo (never retyped in a similar font) beside a separate "at Columbia", self-hosted Alice for headings and Almarai for body and navigation, no italics, no visible photo captions or credits, matter-of-fact copy without slogans or invented figures, real photographs only, and small text in navy (white text on `#F174A2` is only used for the large title, because smaller white text on that pink is hard to read). The only motion is the browser's own; the `prefers-reduced-motion` rule in `src/styles/global.css` turns off transitions, animations and smooth scrolling if any are added later.

## Requirements

- Node 22 and npm 10 (verified with Node 22.23.2 and npm 10.9.8)

## Install and run

```sh
npm ci
npm run dev
```

The development server runs at http://127.0.0.1:3100 and binds to localhost only. `--strictPort` makes it stop with an error instead of switching ports if 3100 is busy. `npm run preview` serves the production build from `dist/` on the same address after `npm run build`.

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
- `chapter.ts`: chapter introduction and purpose, activities, reasons to join, NYC engagement
- `representation.ts`: the four "Why we exist" figures and their captions (provenance in `docs/asset-sources.md`; never cited on the page)
- `resources.ts`: curated resource groups and descriptions
- `members.ts`: public member directory (name, school code, class year only), `approvedMemberLinkedIns`, and `memberClassGroups`, which groups the directory by class year in roster order
- `board.ts`: board cards; currently labeled examples while `boardIsPending` is `true`
- `events.ts`: past-event records shown in the Resources archive, the `past-events` anchor id, and `eventSourceConflicts`
- `navigation.ts`: main navigation order (Home, About, People, Resources, Contact), shared by the header and footer
- `photos.ts`: Home and About photographs with alt text, intrinsic size, crop focus and a maintainer-only source note (never rendered)
- `brand.ts`: the official logo files and the "at Columbia" descriptor
- `organizations.ts`: the 14 represented-company logos on Home
- `contact.ts`: contact validation and the email delivery boundary

Pages and the footer read from these files, so a change in one place updates every page. Styling is in `src/styles/global.css`. Images are served from `public/images/`, and every image's source and terms are listed in [`docs/asset-sources.md`](docs/asset-sources.md); add a row there whenever you add or replace an image.

## Pending inputs

- **Chapter LinkedIn:** `siteLinks.chapterLinkedIn` is `null`, so the footer shows "Chapter LinkedIn: coming soon". Set it to the verified chapter page URL once one is supplied.
- **Board:** the real board list and portraits have not been supplied. Replace the example entries in `board.ts` with `{ name, role, school, classYear, portrait: { src, alt }, linkedInUrl }` records, put portraits under `public/`, and set `boardIsPending` to `false`. A card shows a LinkedIn icon link only when `linkedInUrl` is set.
- **Member LinkedIn links:** no URLs are approved yet, so every member name is plain text. Add an entry to `approvedMemberLinkedIns` (exact roster name to exact `https://www.linkedin.com/in/...` URL) only after the person's profile is approved. Research candidates stay in [`docs/linkedin-review.md`](docs/linkedin-review.md), not in this file.
- **Member privacy:** member records hold only name, school, class year and an approved LinkedIn URL. Do not add emails, phone numbers, UNIs, join dates or internship history.
- **Event details:** some dates, rooms, a speaker surname and her firm conflict between the supplied event graphics, and no source gives a year. These fields are `null` and render as "to be confirmed". Fill them in `events.ts` only after the chapter confirms them. The conflicts are listed in [`docs/asset-sources.md`](docs/asset-sources.md).
- **Photos and logo:** `public/images/photos/` and `public/images/brand/` are rebuilt with `python3 scripts/build-refresh-assets.py <official-originals-dir>` (needs Pillow, the supplied files in `design-preview/refresh-inputs/` and the downloaded official originals listed in [`docs/asset-sources.md`](docs/asset-sources.md)). Past events are text-led; the earlier low-resolution screenshot crops were retired. Fonts in `public/fonts/` are self-hosted OFL files.
- **Represented organizations:** the Home logo section reads `src/content/organizations.ts`. To add one, save the logo in `public/images/organizations/`, add a record and add a source row in [`docs/asset-sources.md`](docs/asset-sources.md). The section describes member experience, not sponsorship.
- **Photos and publication rights:** the Girls Into VC photos come from the parent network's website without a published license, and the library-steps photo is 971 pixels wide. Supply chapter originals or a larger campus photo if available, and confirm rights and credits before a public launch.
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

## Deployment

The site has not been deployed. It is a static Vite build (`npm run build` writes `dist/`), so it can later be hosted on any static host that rewrites unknown paths to `index.html` for the client-side routes. Choosing a host, a domain and the email provider are decisions for the chapter; none is configured in this repository.

## Design references

`design-preview/` holds earlier mockups and reference photos. It is excluded from the build, lint, and tests and is not shipped in `dist/`.
