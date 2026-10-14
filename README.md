# Girls Into VC at Columbia website

Local-review website for Girls Into VC at Columbia, built with React, TypeScript, Vite, and React Router, styled with plain CSS.

## Pages

All four pages share a light-pink header (with a mobile menu below 768 pixels wide) and a pale-pink footer with the interest list, Instagram, chapter LinkedIn status and Contact. The logo sits at the left and opens Home; About, People and Contact use the heading font (Alice) and exact logo pink at the right.

Interior pages use full-width white, pale-pink and pink section bands like Home. `PageHeader` frames each main title with the existing reference sketches on a pale background; smaller screens keep the sketches at the top and bottom, away from text. `PageSection` preserves centered content widths inside each band. Their shared styling is in `src/components/PageLayout.css`. The Home landing animation and footer decoration remain unchanged.

Desktop Home content below the landing screen and the About content use 80% sizing to match the supplied reference at normal browser zoom. `ContentDensity.css` scopes this to their content bands; the landing screen, shared header/footer, People, Contact and phone layouts keep their existing sizes.

| Route        | Content |
| ------------ | ------- |
| `/`          | Full-height pink opening with the white Girls Into VC logo and "at Columbia", then the supplied Low Library steps photo and a centered static chapter introduction, reasons to join, NYC venture capital firm site visits and the Girls Into VC NYC chapter connection, a community photo, activities with general Girls Into VC photos, a compact "Why we exist" section with four parent figures (2%, 7%, 8%, 9%) that roll once to their values, "Where our members are represented" logos, a link to About and the interest list |
| `/about`     | "About the Columbia chapter": speaker events (with captioned past speakers), workshops, the 10-week new-member fellowship and community, each in its own photo section, followed by the wider Girls Into VC network |
| `/people`    | Executive Board: six supplied officer profiles in compact, light-pink framed cards. Members: 50 general members in centered, wrapping rows (about five across on desktop), grouped under Class of 2028 (10), Class of 2029 (24) and Class of 2030 (16), without repeating board members or introductory descriptions |
| `/contact`   | Accessible contact form with field validation; sending is not connected yet (see below) |

Design rules for future edits: the official Girls Into VC logo (never retyped in a similar font) beside a separate "at Columbia", self-hosted Alice for headings and header navigation and Lora for body text, no italics, no visible photo captions or credits, matter-of-fact copy without slogans or invented figures, real photographs only, and small text in navy (white text on `#F174A2` is only used for the large title, because smaller white text on that pink is hard to read). Motion is limited to what is described under [Motion](#motion); keep Home intro copy static and do not add typed text, looping counters, scroll-pinned scenes or a motion library.

## Motion

All motion is plain CSS plus the preference and visibility helpers in `src/motion/`, with no animation library. Scrolling is never taken over.

- `LandingVisual.tsx` and `LandingMark.tsx`: Home starts as plain pink for 0.55 seconds, then the genuine GIVC logo outlines in white and fills. At 1.7 seconds the menu bar appears as the ten supplied sketches start spinning outward across the full landing screen, not the inner content box. The sketches exit completely by 4.7 seconds; the logo and "at Columbia" stay, without looping or changing to a headline. Styling is in `src/components/LandingVisual.css`; `SiteHeader` applies the delayed reveal only on Home. The logo name stays accessible throughout. Reduced motion shows the clean final state and menu immediately, without sketches or replaying.
- The Home chapter introduction appears as complete static text immediately. Its photo still reveals once when the section enters view.
- `RollingNumber.tsx`: each "Why we exist" figure rolls once through the digits and settles on 2%, 7%, 8% and 9% when the figures panel first comes into view. Screen readers only get the final values, and there is no live announcement.
- `useSectionReveals.ts`: page sections that start below the fold fade up once as they are scrolled into view. Sections already on screen are never hidden.
- Small hover and focus color changes on buttons, navigation, logo cells and list items, set in `src/styles/global.css`.

Nothing replays when scrolling away and back during the same page visit. When the visitor's system asks for reduced motion (`prefers-reduced-motion: reduce`), or the browser has no `IntersectionObserver`, the heading and figures render complete and final straight away and no section is hidden. Turning reduced motion on while the page is open has the same effect at once, even mid-animation, and nothing restarts if it is turned off again before the next page load; the reduced-motion rule at the end of `src/styles/global.css` also turns off transitions and animations. Behavior is covered by `src/motion/motion.test.tsx`.

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
- `representation.ts`: the four "Why we exist" figures and their labels (single-digit values, because the rolling animation is built for one digit; provenance in `docs/asset-sources.md`; never cited on the page)
- `members.ts`: full 56-person public roster from the original 31-person list plus 25 supplemental members (name, school code, class year only), `approvedMemberLinkedIns`, and `memberClassGroups`; People groups by class year and filters out current board members from its general list. `GS` denotes Columbia School of General Studies.
- `board.ts`: six chapter-supplied board cards in leadership order; `boardIsPending` is `false`
- `navigation.ts`: main navigation order (About, People, Contact), shared by the header and footer
- `photos.ts`: Home and About photographs with alt text, intrinsic size, crop focus and a maintainer-only source note (never rendered)
- `brand.ts`: the official logo files and the "at Columbia" descriptor
- `organizations.ts`: the 14 represented-company logos on Home
- `contact.ts`: contact validation and the email delivery boundary

Pages and the footer read from these files, so a change in one place updates every page. Styling is in `src/styles/global.css`. Images are served from `public/images/`, and every image's source and terms are listed in [`docs/asset-sources.md`](docs/asset-sources.md); add a row there whenever you add or replace an image.

## Pending inputs

- **Chapter LinkedIn:** `siteLinks.chapterLinkedIn` is `null`, so the footer shows "Chapter LinkedIn: coming soon". Set it to the verified chapter page URL once one is supplied.
- **Board updates:** the supplied six-member board is published in this order: President, Vice President, Treasurer, VP of Operations, then the two VPs of Education. Edit records in `board.ts` and put replacement portraits under `public/images/board/`; each portrait includes its `src`, `alt`, `width` and `height`. LinkedIn links come from `approvedMemberLinkedIns`. Light-pink cards have inset photos and darker pink frames, with one column on phones, two on tablets and three on desktop.
- **Member LinkedIn links:** the six chapter-supplied board URLs are approved and appear on their board cards. Board members are excluded from the general list, whose 50 names remain plain text. Add an entry to `approvedMemberLinkedIns` (exact roster name to exact `https://www.linkedin.com/in/...` URL) only after the person's profile is approved, and update their status in [`docs/linkedin-review.md`](docs/linkedin-review.md). Unapproved research candidates stay off the site.
- **Member privacy:** member records hold only name, school, class year and an approved LinkedIn URL. Do not add emails, phone numbers, UNIs, join dates or internship history.
- **Photos and logo:** `public/images/photos/` and `public/images/brand/` are rebuilt with `python3 scripts/build-refresh-assets.py <official-originals-dir>` (needs Pillow, the supplied files in `design-preview/refresh-inputs/` and the downloaded official originals listed in [`docs/asset-sources.md`](docs/asset-sources.md)). The earlier low-resolution event screenshot crops were retired. Fonts in `public/fonts/` are self-hosted OFL files.
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

The site is live at [givc-columbia-website.vercel.app](https://givc-columbia-website.vercel.app/), and its source is in the [public GitHub repository](https://github.com/veronicas-world/givc-columbia-website). Vercel builds the static Vite site from `main`; GitHub Actions runs the tests, type check, lint and production build. `vercel.json` routes direct visits to client-side pages through `index.html`.

Keep editing this project with Droid. Commit and push changes to `main` when they are ready to publish; Vercel builds and hosts each update. The local development server is not needed to keep the live site available. See [`docs/deployment.md`](docs/deployment.md) for details.

## Design references

`design-preview/` holds earlier mockups and reference photos. It is excluded from the build, lint, and tests and is not shipped in `dist/`.
