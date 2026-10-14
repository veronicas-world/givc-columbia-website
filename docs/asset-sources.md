# Asset sources

Every image and font shipped from `public/` and where it came from. Originals (supplied files, downloaded official files and the Desktop screenshots) are never edited; the site uses derived copies.

## Brand (`public/images/brand/`)

| File | Source | Treatment |
| --- | --- | --- |
| `givc-logo-pink.png` | Official transparent Girls Into VC logo, https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/ba8295ee-c2d6-41fd-a25f-63322cd07aed/GIRLS-2+copy.png (600 x 200 PNG, as used in the girlsintovc.com header) | Cropped to the artwork with 4 pixels of padding: 528 x 130. Colours unchanged. |
| `givc-logo-white.png` | Same file | Monochrome white treatment for the pink opening: every pixel set to white, original transparency kept. This is a derived treatment, not a white master published by Girls Into VC. |

"at Columbia" is set separately in Alice next to the artwork; it is not part of the parent logo. The CDN can return WebP to some clients for the URL above; the build used the PNG response. `design-preview/refresh-inputs/givc-logo-reference.png` is a reference only and is not shipped.

## Fonts (`public/fonts/`)

Alice 400 and Almarai 300, 400, 700 and 800, latin subsets as WOFF2, downloaded from Google Fonts (`fonts.gstatic.com`, Alice v21, Almarai v19). Both are licensed under the SIL Open Font License 1.1. These are the fonts measured on girlsintovc.com. Alice has only an upright 400 weight, so headings are never bolded or slanted.

## Photos (`public/images/photos/`)

Photos carry no visible captions or credits on the site. Alt text describes what is visible without naming people or events. General Girls Into VC photos are editorial images and do not claim that a photo shows a particular Columbia chapter event. `scripts/build-refresh-assets.py` rebuilds the derivatives (and the brand files) from the originals; originals are only read.

| File | Pixels | Source | Notes |
| --- | --- | --- | --- |
| `low-library-steps.jpg` | 971 x 507 | Supplied by the user, `design-preview/refresh-inputs/low-library-steps.jpeg` | Copied byte for byte and shown no wider than its native width. A larger matching original would be welcome. |
| `low-memorial-library.jpg` | 1800 x 1350 | "Low Memorial Library - Columbia University.jpg" by Spaghet-Ti, https://commons.wikimedia.org/wiki/File:Low_Memorial_Library_-_Columbia_University.jpg | CC0 1.0. Resized to 1800 pixels wide. Used on About. People in it are incidental visitors. |
| `girls-into-vc-community.jpg` | 2000 x 1195 | Girls Into VC official photo `606A6532.jpg` (2500 x 1494), https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/603cf925-81ee-47d9-8f91-98d597c3a2dc/606A6532.jpg, from https://www.girlsintovc.com/ | Resized from the 2500-pixel original. |
| `panel-discussion.jpg` | 1340 x 1292 | Girls Into VC official photo `606A6646.jpg` (2500 x 1667), https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/ef749f90-8a66-4144-804b-0b8e4754ec0d/606A6646.jpg, from https://www.girlsintovc.com/join-us | Cropped to the left of the frame (box 0, 375, 1340, 1667) so the projected slide naming panelists is excluded. Not resized. |
| `registration-table.jpg` | 1600 x 1068 | Girls Into VC official photo `606A9109.jpg` (2500 x 1668), https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/c6dd56ed-2a8c-4ed5-9d48-2e5b27694e87/606A9109.jpg, from https://www.girlsintovc.com/join-us | Resized from the 2500-pixel original. |
| `community-conversation.jpg` | 800 x 533 | Supplied by the user, `design-preview/refresh-inputs/community-coffee.jpeg` | Copied byte for byte; displayed at most about 400 CSS pixels wide. |

The 2500-pixel files were downloaded in full and their decoded dimensions checked; they are not a CDN size parameter. Girls Into VC publishes no license or photographer credit for its photos. They are used with the user's authorization; confirm publication rights before a public launch.

Other supplied inputs in `design-preview/refresh-inputs/` (`parent-group`, `parent-panel`, `parent-registration`, `parent-fireside`, `parent-audience`) are smaller screenshot-sized versions of parent photos and are kept as references, not shipped. `parent-statistics-reference.png` is a design reference only.

## Retired screenshot crops

Earlier versions shipped small crops of the chapter's Instagram slides (`public/images/chapter/` from `IMG_6202.png`, `public/images/events/` from `IMG_6205.png` to `IMG_6207.png`). They were too low in resolution and were removed with the scripts that made them; they remain in Git history. The original screenshots on the Desktop are unchanged. Past events are now text-led. Replace with the chapter's original photo files if they become available.

## Organization logos (`public/images/organizations/`)

Shown under "Where our members are represented" on Home. They describe where members have gained experience and do not indicate sponsorship, partnership or endorsement. Logos are trademarks of their owners. Records live in `src/content/organizations.ts`.

| File | Organization | Source |
| --- | --- | --- |
| `blackstone.svg` | Blackstone | https://commons.wikimedia.org/wiki/File:The_Blackstone_Group_logo_(2).svg |
| `jp-morgan.svg` | J.P. Morgan | https://commons.wikimedia.org/wiki/File:J_P_Morgan_Logo_2008.svg |
| `factory.svg` | Factory | https://factory.ai/ (site header wordmark) |
| `elliott-management.svg` | Elliott Management | https://commons.wikimedia.org/wiki/File:Elliott_Management_Corporation_logo.svg |
| `goldman-sachs.svg` | Goldman Sachs | https://commons.wikimedia.org/wiki/File:Goldman_Sachs_2022_Black.svg |
| `lightspeed-venture-partners.svg` | Lightspeed Venture Partners | https://commons.wikimedia.org/wiki/File:LSVP_Horizontal_Logo.svg |
| `nea.svg` | New Enterprise Associates (NEA) | https://commons.wikimedia.org/wiki/File:New_Enterprise_Associates_Logo.svg |
| `general-catalyst.svg` | General Catalyst | https://commons.wikimedia.org/wiki/File:General_Catalyst_Logo.svg |
| `exceptional-capital.png` | Exceptional Capital | https://www.exceptionalcap.com/ (site header logo) |
| `kkr.svg` | KKR | https://commons.wikimedia.org/wiki/File:Kohlberg_Kravis_Roberts_(logo).svg |
| `towerbrook.svg` | TowerBrook | https://commons.wikimedia.org/wiki/File:TowerBrook_Capital_Partners_(logo).svg |
| `brookfield.svg` | Brookfield | https://commons.wikimedia.org/wiki/File:Brookfield_Asset_Management_logo.svg |
| `fox-sports.svg` | Fox Sports | https://commons.wikimedia.org/wiki/File:FOX_Sports_2022.svg |
| `newyork-presbyterian.svg` | NewYork-Presbyterian | https://www.nyp.org/ (site logo file `/sites/default/files/2024-08/NYP_square_box_rgb_enlargedd.svg`) |

The only change to downloaded files: a `viewBox` matching the existing width and height was added to `blackstone.svg` and `jp-morgan.svg` so they scale cleanly. The Factory wordmark was copied from the inline SVG in the factory.ai header, with its layout classes removed.

To add an organization, save its logo in that folder, add a record to `src/content/organizations.ts` and add a row to this table.

## Event facts awaiting confirmation

Event records live in `src/content/events.ts`. The archive shows only facts that the supplied sources agree on. These conflicts are listed in `eventSourceConflicts` and need the chapter's confirmation before the pending fields are filled in:

- Women Investors in VC: the recap says April 10 in Pupin 428; the announcement says March 31, 2026 in Lerner 568. Date and location are shown as "to be confirmed".
- Fireside chat date: the recap says May 2; the announcement says Monday, April 27, 4 to 5 pm. Date is shown as "to be confirmed".
- Fireside chat speaker: the recap says Andrea Weng, Partner, Andreessen Horowitz; the announcement says Andrea Wang, General Partner, SV Angel. The site shows "Andrea" with the surname and firm pending. The room (Pupin 428) appears only on the recap template, so it is also pending.
- No source gives a year for any of the three events. Years are not inferred from weekdays or Instagram post dates.

Deliberately omitted: the "140+ registered" figure on the Avni Barman slide (registration, not attendance), the unexplained dollar figures under the Women Investors speakers, Avni Barman's partly covered title, and Irene Wu's abbreviated prior role.
