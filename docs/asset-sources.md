# Asset sources

Every image shipped from `public/` and where it came from.

## Event photos (`public/images/events/`)

Cropped from the chapter's own Instagram recap slides, supplied by the user as phone screenshots. The originals on the Desktop are kept unchanged. Only the speaker photographs are kept: the phone status bar, Instagram interface, carousel counter, tag avatar and poster text (dates, rooms, statistics) are cropped out. `scripts/crop-event-images.py` rebuilds the files from the originals with the exact crop boxes.

| File | Source screenshot | Content |
| --- | --- | --- |
| `avni-barman-genshe.jpg` | `IMG_6205.png` | Avni Barman portrait from the speaker event slide |
| `women-investors-in-vc.jpg` | `IMG_6206.png` | Four speaker portraits, arranged in a 2 by 2 grid |
| `fireside-chat-vc-entrepreneurship.jpg` | `IMG_6207.png` | Two speaker portraits from the fireside chat slide |

The photos come from screenshots of a resized Instagram post, so they are suitable for card-sized display, not for large hero images. Replace them with the original event graphics or photos when the chapter can supply them.

## Event facts awaiting confirmation

Event records live in `src/content/events.ts`. The archive shows only facts that the supplied sources agree on. These conflicts are listed in `eventSourceConflicts` and need the chapter's confirmation before the pending fields are filled in:

- Women Investors in VC: the recap says April 10 in Pupin 428; the announcement says March 31, 2026 in Lerner 568. Date and location are shown as "to be confirmed".
- Fireside chat date: the recap says May 2; the announcement says Monday, April 27, 4 to 5 pm. Date is shown as "to be confirmed".
- Fireside chat speaker: the recap says Andrea Weng, Partner, Andreessen Horowitz; the announcement says Andrea Wang, General Partner, SV Angel. The site shows "Andrea" with the surname and firm pending. The room (Pupin 428) appears only on the recap template, so it is also pending.
- No source gives a year for any of the three events. Years are not inferred from weekdays or Instagram post dates.

Deliberately omitted: the "140+ registered" figure on the Avni Barman slide (registration, not attendance), the unexplained dollar figures under the Women Investors speakers, Avni Barman's partly covered title, and Irene Wu's abbreviated prior role.
