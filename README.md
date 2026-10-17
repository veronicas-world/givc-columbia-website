# Girls Into VC at Columbia website

Local-review website for Girls Into VC at Columbia, built with React, TypeScript, Vite, and React Router, styled with plain CSS.

## Pages

All four pages share a light-pink header (with a mobile menu below 768 pixels wide) and a pale-pink footer with the interest list, Instagram, chapter LinkedIn status and Contact. The logo sits at the left and opens Home; About, People and Contact use the heading font (Alice) and exact logo pink at the right.

Interior pages use full-width white, pale-pink and pink section bands like Home. `PageHeader` frames each main title with the existing reference sketches on a pale background; smaller screens keep the sketches at the top and bottom, away from text. `PageSection` preserves centered content widths inside each band. Their shared styling is in `src/components/PageLayout.css`. The Home landing animation and footer decoration remain unchanged.

Desktop Home content below the landing screen and the About content use 80% sizing to match the supplied reference at normal browser zoom. `ContentDensity.css` scopes this to their content bands; the landing screen, shared header/footer, People, Contact and phone layouts keep their existing sizes.

| Route        | Content |
| ------------ | ------- |
| `/`          | Full-height pink opening with the white Girls Into VC logo and "at Columbia", then the supplied Low Library steps photo and a centered static chapter introduction, reasons to join, NYC venture capital firm site visits and the Girls Into VC NYC chapter connection, a community photo, activities with general Girls Into VC photos, a compact "Why we exist" section with four parent figures (2%, 7%, 8%, 9%) that roll once to their values, "Where our members are represented" logos, a link to About and the interest list |
| `/about`     | "About the Columbia chapter": speaker events with captioned past-speaker headshots, then Pre-Professional Workshops, the 10-week fellowship, Continued Education and Community in four responsive columns, followed by the wider Girls Into VC network |
| `/people`    | Executive Board: six supplied officer profiles in compact, light-pink framed cards. Members: 50 general members in centered, wrapping rows (about five across on desktop), grouped under Class of 2028 (10), Class of 2029 (24) and Class of 2030 (16), without repeating board members or introductory descriptions |
| `/contact`   | Interest-list button, a contact form that uses an anonymous FormSubmit ID, LinkedIn and Instagram; sending stays disabled until activation is complete |

Design rules for future edits: the official Girls Into VC logo (never retyped in a similar font) beside a separate "at Columbia", self-hosted Alice for headings and header navigation and Lora for body text, no italics, no visible photo captions or credits, matter-of-fact copy without slogans or invented figures, real photographs only, and small text in navy (white text on `#F174A2` is only used for the large title, because smaller white text on that pink is hard to read). Motion is limited to what is described under [Motion](#motion); keep Home intro copy static and do not add typed text, looping counters, scroll-pinned scenes or a motion library.

## Motion

All motion is plain CSS plus the preference and visibility helpers in `src/motion/`, with no animation library. Scrolling is never taken over.

- `LandingVisual.tsx` and `LandingMark.tsx`: Home starts on a navy-tinted photo of Alma Mater and Butler Library (`public/images/photos/landing-alma-mater.jpg`, set on `.home-hero` in `src/styles/global.css`) for 0.55 seconds, then the genuine GIVC logo outlines in white and fills. At 1.7 seconds the menu bar appears as the ten supplied sketches start spinning outward across the full landing screen, not the inner content box. The sketches exit completely by 4.7 seconds; the logo and "at Columbia" stay, without looping or changing to a headline. Styling is in `src/components/LandingVisual.css`; `SiteHeader` applies the delayed reveal only on Home. The logo name stays accessible throughout. Reduced motion shows the clean final state and menu immediately, without sketches or replaying.
- The Home chapter introduction appears as complete static text immediately. Its photo still reveals once when the section enters view.
- `RollingNumber.tsx`: each "Why we exist" figure rolls once through the digits and settles on 2%, 7%, 8% and 9% when the figures panel first comes into view. Screen readers only get the final values, and there is no live announcement.
- `useSectionReveals.ts`: page sections that start below the fold fade up once as they are scrolled into view. Sections already on screen are never hidden.
- `useSectionLift.ts`: on Home only, each section's inner content rests a few pixels below its place while it approaches the middle of the screen and lifts a few pixels above it as the section is scrolled past, so bands drift gently through the page. Only inner content moves, never the full-bleed band backgrounds or the hero, and scrolling is never taken over.
- `useHeroTint.ts`: on Home only, a translucent pink cover fades in over the landing photo as it scrolls away (up to 70% opacity once 60% of the landing screen has scrolled past) and fades back out at the top. The logo stays above it. Reduced motion leaves the photo uncovered.
- Small hover and focus color changes on buttons, navigation, logo cells and list items, set in `src/styles/global.css`.

Nothing replays when scrolling away and back during the same page visit. When the visitor's system asks for reduced motion (`prefers-reduced-motion: reduce`), or the browser has no `IntersectionObserver`, the heading and figures render complete and final straight away, no section is hidden and the scroll drift settles to none. Turning reduced motion on while the page is open has the same effect at once, even mid-animation, and nothing restarts if it is turned off again before the next page load; the reduced-motion rule at the end of `src/styles/global.css` also turns off transitions and animations. Behavior is covered by `src/motion/motion.test.tsx`.

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
- `contact.ts`: the president's public name and role, plus validation of the anonymous FormSubmit ID; never put a recipient email here

Pages and the footer read from these files, so a change in one place updates every page. Styling is in `src/styles/global.css`. Images are served from `public/images/`, and every image's source and terms are listed in [`docs/asset-sources.md`](docs/asset-sources.md); add a row there whenever you add or replace an image.

## Pending inputs

- **Chapter LinkedIn:** `siteLinks.chapterLinkedIn` is `null`, so the footer shows "Chapter LinkedIn: coming soon". Set it to the verified chapter page URL once one is supplied.
- **Board updates:** the supplied six-member board is published in this order: President, Vice President, Treasurer, VP of Operations, then the two VPs of Education. Edit records in `board.ts`. Board cards have no photos. LinkedIn links come from `approvedMemberLinkedIns`. Light-pink cards have darker pink frames, with one column on phones, two on tablets and three on desktop.
- **Member LinkedIn links:** the six chapter-supplied board URLs are approved and appear on their board cards. Board members are excluded from the general list, whose 50 names remain plain text. Add an entry to `approvedMemberLinkedIns` (exact roster name to exact `https://www.linkedin.com/in/...` URL) only after the person's profile is approved, and update their status in [`docs/linkedin-review.md`](docs/linkedin-review.md). Unapproved research candidates stay off the site.
- **Member privacy:** member records hold only name, school, class year and an approved LinkedIn URL. Do not add emails, phone numbers, UNIs, join dates or internship history. The general member list shows only first name and last initial (`memberDisplayName`); board cards keep full names.
- **Photos and logo:** `public/images/photos/` and `public/images/brand/` are rebuilt with `python3 scripts/build-refresh-assets.py <official-originals-dir>` (needs Pillow, the supplied files in `design-preview/refresh-inputs/` and the downloaded official originals listed in [`docs/asset-sources.md`](docs/asset-sources.md)). The Home landing photo is rebuilt separately with `scripts/build-landing-photo.py <RealESRGAN_x4plus.pth>` (needs torch, spandrel, Pillow and numpy), which upscales, straightens and centers it. The earlier low-resolution event screenshot crops were retired. Fonts in `public/fonts/` are self-hosted OFL files.
- **Represented organizations:** the Home logo section reads `src/content/organizations.ts`. To add one, save the logo in `public/images/organizations/`, add a record and add a source row in [`docs/asset-sources.md`](docs/asset-sources.md). The section describes member experience, not sponsorship.
- **Photos and publication rights:** the Girls Into VC photos come from the parent network's website without a published license, and the library-steps photo is 971 pixels wide. Supply chapter originals or a larger campus photo if available, and confirm rights and credits before a public launch.
- **Contact details:** the president's public name and role are in `src/content/contact.ts`. The recipient email must not appear in client code or a form action. LinkedIn, Instagram and the interest form links are in `src/content/links.ts`.

## Contact page

The Contact page opens with a pink interest-list band and a single "Click here" button. Below it, visitors can message the president through FormSubmit, followed by LinkedIn and Instagram links. The recipient email is not published.

FormSubmit currently advertises free forms and submissions with no registration. The recipient must confirm its one-time activation email. Use the **anonymous form address** supplied after confirmation, not the recipient email: copy only its ID into `VITE_CONTACT_FORM_ID` in Vercel's production environment and rebuild. For local testing, copy `.env.example` to `.env.local` and set the same public ID. This ID is a public submission endpoint, not an email credential. Until it is configured, the form is visibly disabled and directs visitors to the social links.

Submissions use a native POST to FormSubmit with its default CAPTCHA, a hidden honeypot, native field validation, and a return to `/contact?sent=1`. The site acknowledges submission, not guaranteed delivery. FormSubmit processes names, reply emails, and messages and retains submissions for 30 days; the form discloses this and links to its privacy policy. Do not disable the CAPTCHA or add the recipient email as a fallback.

## Deployment

The site is live at [givc-columbia-website.vercel.app](https://givc-columbia-website.vercel.app/), and its source is in the [public GitHub repository](https://github.com/veronicas-world/givc-columbia-website). Vercel builds the static Vite site from `main`; GitHub Actions runs the tests, type check, lint and production build. `vercel.json` routes direct visits to client-side pages through `index.html`.

Keep editing this project with Droid. Commit and push changes to `main` when they are ready to publish; Vercel builds and hosts each update. The local development server is not needed to keep the live site available. See [`docs/deployment.md`](docs/deployment.md) for details.

## Design references

`design-preview/` holds earlier mockups and reference photos. It is excluded from the build, lint, and tests and is not shipped in `dist/`.
