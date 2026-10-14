# Asset sources

Every image shipped from `public/` and where it came from. Original screenshots on the Desktop are never edited; the site uses cropped copies.

## Event photos (`public/images/events/`)

Cropped from the chapter's own Instagram recap slides, supplied by the user as phone screenshots. The originals on the Desktop are kept unchanged. Only the speaker photographs are kept: the phone status bar, Instagram interface, carousel counter, tag avatar and poster text (dates, rooms, statistics) are cropped out. `scripts/crop-event-images.py` rebuilds the files from the originals with the exact crop boxes.

| File | Source screenshot | Content |
| --- | --- | --- |
| `avni-barman-genshe.jpg` | `IMG_6205.png` | Avni Barman portrait from the speaker event slide |
| `women-investors-in-vc.jpg` | `IMG_6206.png` | Four speaker portraits, arranged in a 2 by 2 grid |
| `fireside-chat-vc-entrepreneurship.jpg` | `IMG_6207.png` | Two speaker portraits from the fireside chat slide |

The photos come from screenshots of a resized Instagram post, so they are suitable for card-sized display, not for large hero images. Replace them with the original event graphics or photos when the chapter can supply them.

## Chapter activity photos (`public/images/chapter/`)

Cropped from `IMG_6202.png`, the chapter's "What We Do at GIVC" Instagram slide, supplied by the user as a phone screenshot. The original is unchanged. Each crop sits inside the slide's rounded photo frame, so captions, the phone status bar and the Instagram interface are excluded. Crops keep their native size (about 500 by 320 pixels) and are displayed at card size only. `scripts/crop-chapter-photos.py` rebuilds them.

| File | Content | Context |
| --- | --- | --- |
| `speaker-event.jpg` | Guest speaker at a chapter speaker event | Columbia chapter |
| `workshop.jpg` | Presenter and students in a lecture hall | Columbia chapter |
| `fellowship.jpg` | Four members, one holding flowers | Columbia chapter |
| `community.jpg` | Members seated in a lecture hall | Columbia chapter |

No people in these photos are named on the site. Replace them with the chapter's original photo files when available.

## Home and About photos (`public/images/photos/`)

The About page reuses these two files with the same captions.

| File | Source | Context and terms |
| --- | --- | --- |
| `low-memorial-library.jpg` | "Low Memorial Library - Columbia University.jpg" by Spaghet-Ti, https://commons.wikimedia.org/wiki/File:Low_Memorial_Library_-_Columbia_University.jpg | Columbia campus. CC0 1.0. Resized to 1800 pixels wide. People in it are incidental visitors. |
| `girls-into-vc-community.jpg` | Girls Into VC homepage hero image, https://www.girlsintovc.com/ (file: https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/603cf925-81ee-47d9-8f91-98d597c3a2dc/606A6532.jpg?format=1500w) | Parent network, not a Columbia chapter event; the caption says so. Used with the user's authorization. No license or photographer credit is published; confirm rights before a public launch. |

Both files were copied from `design-preview/`, which keeps the originals.

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
