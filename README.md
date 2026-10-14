# Girls Into VC at Columbia website

Local-review website for Girls Into VC at Columbia, built with React, TypeScript, Vite, and React Router, styled with plain CSS.

## Current state

This is the content-first foundation. All six pages have real routes inside a shared header, mobile menu, and footer:

| Route        | Status |
| ------------ | ------ |
| `/`          | Chapter introduction, pillars, activities, reasons to join, interest-list links |
| `/about`     | Columbia chapter activities, separated from the wider Girls Into VC network |
| `/people`    | Board section with labeled example cards (real board pending) and the 31-member directory |
| `/resources` | Curated external venture capital learning and career links |
| `/events`    | Placeholder heading; past-event archive not yet added |
| `/contact`   | Placeholder heading; no contact form or email delivery yet |

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
- `navigation.ts`: main navigation order

Pages and the footer read from these files, so a change in one place updates every page.

## Pending inputs

- **Chapter LinkedIn:** `siteLinks.chapterLinkedIn` is `null`, so the footer shows "Chapter LinkedIn: coming soon". Set it to the verified chapter page URL once one is supplied.
- **Board:** the real board list and portraits have not been supplied. Replace the example entries in `board.ts` with `{ name, role, school, classYear, portrait: { src, alt }, linkedInUrl }` records, put portraits under `public/`, and set `boardIsPending` to `false`. A card shows a LinkedIn icon link only when `linkedInUrl` is set.
- **Member LinkedIn links:** no URLs are approved yet, so every member name is plain text. Add an entry to `approvedMemberLinkedIns` (exact roster name to exact `https://www.linkedin.com/in/...` URL) only after the person's profile is approved. Research candidates stay in review documents, not in this file.
- **Member privacy:** member records hold only name, school, class year and an approved LinkedIn URL. Do not add emails, phone numbers, UNIs, join dates or internship history.
- **Past events and contact form:** not yet built.
- **Email delivery:** no inbox or delivery service is configured. Nothing is sent from this site.

## Design references

`design-preview/` holds earlier mockups and reference photos. It is excluded from the build, lint, and tests and is not shipped in `dist/`.
