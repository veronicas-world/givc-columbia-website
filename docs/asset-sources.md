# Asset sources

Every image and font shipped from `public/` and where it came from. Originals (supplied files, downloaded official files and the Desktop screenshots) are never edited; the site uses derived copies.

## Brand (`public/images/brand/`)

| File | Source | Treatment |
| --- | --- | --- |
| `givc-logo-pink.png` | Official transparent Girls Into VC logo, https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/ba8295ee-c2d6-41fd-a25f-63322cd07aed/GIRLS-2+copy.png (600 x 200 PNG, as used in the girlsintovc.com header) | Cropped to the artwork with 4 pixels of padding: 528 x 130. Colours unchanged. |
| `givc-logo-white.png` | Same file | Monochrome white treatment for the pink opening: every pixel set to white, original transparency kept. This is a derived treatment, not a white master published by Girls Into VC. |

"at Columbia" is set separately in Alice next to the artwork; it is not part of the parent logo. The CDN can return WebP to some clients for the URL above; the build used the PNG response. `design-preview/refresh-inputs/givc-logo-reference.png` is a reference only and is not shipped.

## Sketches (`public/images/sketches/`)

Ten decorative motifs extracted from the pink Girls Into VC artwork supplied by the user on 2026-10-14: `leaves`, `sprig`, `sparkles`, `star`, `dots`, `rays`, `loop`, `zigzag`, `ribbon`, and `splash`. Cropped to the individual drawings and saved as transparent PNGs, removing the pale background and gray frame. Pink coverage is recovered against the background to retain the lighter motifs and antialiased edges. No logo or screenshot text is included. These small derivatives are shipped locally; the temporary screenshot is not required at runtime. Sketches appear in the shared footer and the Home opening. The footer's light pink background (`#fdf5fa`) is sampled from the reference; the opening uses white and deep-rose CSS treatments of the same shapes.

The Home opening's white outline/fill and outward-spin sequence is inspired by the user-supplied recording of https://nea.com/. It uses only the official GIVC mark and these GIVC sketches, not NEA artwork, fonts, video or code. The sketches leave the screen completely; only the logo and "at Columbia" remain, with no final transition to a headline.

## Fonts (`public/fonts/`)

Alice 400 and upright Lora (one variable file covering weights 400 to 700), latin subsets as WOFF2, downloaded from Google Fonts (`fonts.gstatic.com`, Alice v21, Lora v37). Both are licensed under the SIL Open Font License 1.1. Alice matches the heading font on girlsintovc.com; Lora replaces the parent site's Almarai for body text. Alice has only an upright 400 weight, so headings are never bolded or slanted.

## Photos (`public/images/photos/`)

Photos carry no visible captions or credits on the site, with one exception: the past-speaker headshots on About are captioned with the speaker's name and role (no dates). Other alt text describes what is visible without naming people or events. General Girls Into VC photos are editorial images and do not claim that a photo shows a particular Columbia chapter event. `scripts/build-refresh-assets.py` rebuilds the derivatives (and the brand files) from the originals; originals are only read.

| File | Pixels | Source | Notes |
| --- | --- | --- | --- |
| `girls-into-vc-intro.jpg` | 828 x 512 | Group photo supplied by the user on 2026-10-14 | Copied byte for byte for the Home introduction. Shown uncropped next to the typed chapter description; no Columbia event or identities are inferred. |
| `givc-network-about.jpg` | 1600 x 900 | Official parent homepage photo `DJI_20260228105509_0012_D.jpg`, https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/ee07e229-08d7-4fc2-8ad3-d8d55012f884/DJI_20260228105509_0012_D.jpg | Resized from 2048 x 1152. Used for the parent-network description on About, not presented as a Columbia event. |
| `givc-network-impact.jpg` | 1200 x 800 | Official parent homepage photo `606A6912.jpg`, https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/ef67c8df-9d8b-43df-823c-6b4480b3bb9f/606A6912.jpg | Resized from 2500 x 1667. Used beside parent-network impact figures on About. |
| `low-library-steps.jpg` | 971 x 507 | Supplied by the user, `design-preview/refresh-inputs/low-library-steps.jpeg` | Copied byte for byte and shown no wider than its native width. A larger matching original would be welcome. |
| `low-memorial-library.jpg` | 1800 x 1350 | "Low Memorial Library - Columbia University.jpg" by Spaghet-Ti, https://commons.wikimedia.org/wiki/File:Low_Memorial_Library_-_Columbia_University.jpg | CC0 1.0. Resized to 1800 pixels wide. Not currently shown; About now leads with chapter activity photos. People in it are incidental visitors. |
| `girls-into-vc-community.jpg` | 2000 x 1195 | Girls Into VC official photo `606A6532.jpg` (2500 x 1494), https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/603cf925-81ee-47d9-8f91-98d597c3a2dc/606A6532.jpg, from https://www.girlsintovc.com/ | Resized from the 2500-pixel original. |
| `panel-discussion.jpg` | 1340 x 1292 | Girls Into VC official photo `606A6646.jpg` (2500 x 1667), https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/ef749f90-8a66-4144-804b-0b8e4754ec0d/606A6646.jpg, from https://www.girlsintovc.com/join-us | Cropped to the left of the frame (box 0, 375, 1340, 1667) so the projected slide naming panelists is excluded. Not resized. |
| `registration-table.jpg` | 1600 x 1068 | Girls Into VC official photo `606A9109.jpg` (2500 x 1668), https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/c6dd56ed-2a8c-4ed5-9d48-2e5b27694e87/606A9109.jpg, from https://www.girlsintovc.com/join-us | Resized from the 2500-pixel original. |
| `community-conversation.jpg` | 800 x 533 | Supplied by the user, `design-preview/refresh-inputs/community-coffee.jpeg` | Copied byte for byte; displayed at most about 400 CSS pixels wide. |
| `chapter-speaker-event.jpg` | 434 x 281 | Chapter Instagram slide "What we do at GIVC" (`IMG_6202.png`, 1206 x 2622) | Guest-speaker panel cropped inside its rounded frame. Speaker events section on About. The speaker is not named because the slide does not name her. |
| `chapter-workshop.jpg` | 437 x 281 | Same slide | Workshops panel. Workshops section on About. |
| `chapter-fellowship.jpg` | 434 x 307 | Same slide | Fellowship panel. Fellowship section on About. |
| `chapter-community.jpg` | 437 x 307 | Same slide | Community panel. Community section on About. |
| `speaker-avni-barman.jpg` | 483 x 483 | Chapter Instagram speaker-event slide (`IMG_6205.png`) | Square crop of the portrait, excluding the slide's text and figure boxes. Captioned "Founder and CEO, GenShe"; the slide shows "…nder & CEO, GenShe" with the first letters covered. |
| `speaker-andrea-wang.jpg` | 389 x 389 | Chapter Instagram fireside-chat slide (`IMG_6207.png`) | Square crop inside the headshot frame. Captioned "General Partner, SV Angel", as confirmed by the chapter. |
| `speaker-joshua-browder.jpg` | 389 x 389 | Chapter Instagram fireside-chat slide (`IMG_6207.png`) | Square crop inside the headshot frame. Captioned "Founder and CEO, DoNotPay", matching the slide and the announcement. |

The 2500-pixel files were downloaded in full and their decoded dimensions checked; they are not a CDN size parameter. Girls Into VC publishes no license or photographer credit for its photos. They are used with the user's authorization; confirm publication rights before a public launch.

Other supplied inputs in `design-preview/refresh-inputs/` (`parent-group`, `parent-panel`, `parent-registration`, `parent-fireside`, `parent-audience`) are smaller screenshot-sized versions of parent photos and are kept as references, not shipped. `parent-statistics-reference.png` is a design reference only.

## Parent-network information and graphics

The parent homepage at https://www.girlsintovc.com/ was checked on 2026-10-14. Mission, educational resources, mentorship, fellowship, campus chapters, events, founder Isabella Mandis, and CEO Sarah Phillips are paraphrased in `src/content/network.ts`. Parent programs and affiliations are labeled separately from the Columbia chapter.

The homepage’s "Our impact" block reports **6 continents, 24 campus chapters, 75 countries, and 10k members**. These are parent-organization figures, not Columbia totals, and are shown on About and beneath the Home "Why join" photo. The same block inexplicably also labels **150** as **members**; no definition explains the relationship to 10k, so 150 is omitted rather than relabeled. The older founder biography gives 8,000 members and 60 countries; the visuals follow the impact block, not that biography.

| File | Pixels | Official parent source |
| --- | --- | --- |
| `public/images/network/parent-partners.jpg` | 1400 x 424 | https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/82b3c448-50b4-4e43-8ada-8034ae9c7812/1.jpg, resized from 1919 x 581 |
| `public/images/network/parent-featured-in.jpg` | 1400 x 314 | https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/074efe83-164d-45f9-8783-1e1472b6ff20/2.jpg, resized from 1480 x 332 |

These are the parent website’s original collage graphics, not newly assembled Columbia sponsor lists. The recognition graphic includes individual recognition (Forbes 30 Under 30 Local) as well as platform and publication logos. All are labeled as parent-network recognition rather than Columbia press coverage. An unidentified CV monogram in the partner collage is retained as artwork but not assigned an invented organization name in alt text.

## Chapter Instagram crops

The six `chapter-*` and `speaker-*` photos above were cut with Pillow from 1012 x 2200 review copies of the chapter's Instagram screenshots (the 1206 x 2622 originals were later unreadable from Messages). They are saved as JPEG at quality 90 and never upscaled, so they are small; the About layout caps the activity photo column near their native width. Replace them with the chapter's original photo files when available. The fireside-chat investor is captioned Andrea Wang, General Partner, SV Angel, as confirmed by the chapter on 2026-10-14; the recap slide's "Andrea Weng, Partner, Andreessen Horowitz" is not used. Earlier crops in `public/images/chapter/` and `public/images/events/` remain retired and are only in Git history.

## Board portraits (`public/images/board/`)

Supplied by the chapter in `GIVC Board members.pdf` on 2026-10-14 for publication on the board cards. Extracted directly from each page's embedded image with `pypdf`, not from screenshots of the PDF. Saved as RGB WebP at quality 90 using Pillow, without upscaling, retouching or retaining image metadata. At the chapter's request, Diane's original 516 x 604 image is cropped by 10 pixels on the left, 4 on top and 2 on the right to remove its white edge. Other files retain their original dimensions. Square photo framing is display-only via CSS. The original PDF is unchanged and is not shipped.

| File | Pixels | Source page |
| --- | --- | --- |
| `kagan-levine.webp` | 800 x 800 | 1 |
| `mali-gilbert.webp` | 800 x 800 | 2 |
| `diane-lang.webp` | 504 x 600 | 3 |
| `veronica-agudelo.webp` | 800 x 800 | 4 |
| `caroline-keohane.webp` | 800 x 800 | 5 |
| `mila-ansorge.webp` | 800 x 800 | 6 |

Names and LinkedIn links follow the same PDF; schools and class years follow the member roster. Subsequent chapter corrections set Mila Ansorge's role to Treasurer and Kagan Levine's to VP of Operations.

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
| `dorm-room-fund.svg` | Dorm Room Fund | https://www.dormroomfund.com/ (site header logo) |
| `alumni-ventures.svg` | Alumni Ventures | https://commons.wikimedia.org/wiki/File:Alumni_Ventures.svg |

Source-file edits: a `viewBox` matching the existing width and height was added to `blackstone.svg` and `jp-morgan.svg` so they scale cleanly. The Factory wordmark was copied from the inline SVG in the factory.ai header, with its layout classes removed. The Dorm Room Fund logo was downloaded from the site header and recolored purple for the homepage; the Alumni Ventures logo is the unchanged Wikimedia Commons SVG.

To add an organization, save its logo in that folder, add a record to `src/content/organizations.ts` and add a row to this table.

## Home "Why we exist" figures

The four figures in `src/content/representation.ts` come from the statistics visual on https://www.girlsintovc.com/ (supplied as `design-preview/refresh-inputs/parent-statistics-reference.png`, a reference only, not shipped). Under the lead "Women account for only":

- 2%: of female founders are funded by VC capital
- 7%: of board seats at firms
- 8%: of firm partners
- 9%: of venture capitalists are women

The parent page's DOM text swaps the 2% and 9% captions; the pairings follow the visual, as the user confirmed. Girls Into VC gives no study, year or methodology for these figures, so the site adds none, shows no citation (per the user's direction) and does not restate 2% as a share of funding dollars. Replace or remove the figures if the parent organization publishes updated numbers. On the page each figure rolls once through the digits before settling on its value; the rolling digit is decorative and hidden from screen readers, which read only the final value. The roll supports single-digit values only.

## Past-event source notes (not displayed on the site)

The former Resources page and its past-event archive have been removed from the site. These source discrepancies are retained as historical notes; they are not displayed:

- Women Investors in VC: the recap says April 10 in Pupin 428; the announcement says March 31, 2026 in Lerner 568.
- Fireside chat date: the recap says May 2; the announcement says Monday, April 27, 4 to 5 pm.
- Fireside chat speaker (resolved 2026-10-14): the recap says Andrea Weng, Partner, Andreessen Horowitz; the announcement says Andrea Wang, General Partner, SV Angel. The chapter confirmed Andrea Wang, General Partner, SV Angel. The room (Pupin 428) appears only on the recap template.
- No source gives a year for any of the three events. Years are not inferred from weekdays or Instagram post dates.

Deliberately omitted: the "140+ registered" figure on the Avni Barman slide (registration, not attendance), the unexplained dollar figures under the Women Investors speakers, Avni Barman's partly covered title, and Irene Wu's abbreviated prior role.
