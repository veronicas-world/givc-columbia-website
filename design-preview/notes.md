# Design concepts
## A — Venture Journal
Warm paper (#F7F5EF), ink/navy (#102638), Columbia-inspired blue (#B9D9EB), and a restrained coral marker. Instrument Serif headlines paired with DM Sans, thin editorial rules, numbered sections, and an asymmetric campus-photo inset. A thoughtful, contemporary investment-journal direction.

Preview: `concepts.html?concept=a`. Screenshot: `concept-a.png`.

## B — Blue / Bold
Crisp blue (#2455E9), white, navy, and controlled peach (#FFCDBB). Oversized sans-serif type, a custom VC typographic poster with an ascending arrow, a full-width statement ribbon, and an open two-row supporting index rather than cards. The most assertive, startup-forward direction.

Preview: `concepts.html?concept=b`. Screenshot: `concept-b.png`.

## C — Campus Atelier
Quiet ivory (#FCFCF9), navy, and muted blue. Refined serif/sans hierarchy above a spacious panoramic campus photograph, with a restrained three-column supporting statement. The most photography-led, collegiate, prestige-focused direction.

Preview: `concepts.html?concept=c`. Screenshot: `concept-c.png`.

## References and limitations
- Exploratory visual mockups only; no website implementation, project scaffolding, backend, contact delivery, enrollment, or live social integrations. Navigation labels illustrate the eventual Home / About / People / Resources / Events / Contact information architecture and are not implemented routes. Hero links scroll to a supporting section; parent-organization links and the A/B/C concept switcher are real links.
- No chapter member identities, LinkedIn profiles, chapter social handles, events, outcomes, statistics, affiliations beyond the supplied chapter brief, sponsor logos, or university seals/crowns have been invented. Hero positioning is aspirational draft copy, not a claim about existing chapter programs.
- Visually inspected the parent homepage, https://www.girlsintovc.com/, in a fresh isolated, unauthenticated agent-browser session. Observed the pink identity, photography-led mission hero, simple navigation, and lower partner/impact sections. These concepts intentionally use a distinct Columbia chapter identity and do not reuse the parent's people, metrics, partner logos, or logo artwork.
- Parent mission grounding: https://www.girlsintovc.com/campus-chapters — student-led chapters empower women to explore venture capital through mentorship, educational workshops, and networking. Safe paraphrase used: “Girls Into VC empowers women to explore venture capital through education, mentorship, and community.”
- Visually inspected https://www.lionfundllc.com/ in the same isolated session. Observed Columbia campus architecture, restrained navigation, generous spacing, and a serious investing/leadership information hierarchy. Used as visual context only; no affiliation, copied branding, or copied claims.
- Other supplied reference URLs: https://www.harvardcap.org/, https://www.whartonugpevc.com/, https://www.harvardventures.org/. Not independently visually inspected in this mockup pass and not used as sources for chapter facts.
- Campus photograph: “Low Memorial Library - Columbia University.jpg” by Spaghet-Ti, photographed December 25, 2017. Source and verified license: https://commons.wikimedia.org/wiki/File:Low_Memorial_Library_-_Columbia_University.jpg. Original image: https://upload.wikimedia.org/wikipedia/commons/4/48/Low_Memorial_Library_-_Columbia_University.jpg. CC0 1.0 Universal Public Domain Dedication, https://creativecommons.org/publicdomain/zero/1.0/. Saved as `campus.jpg`; cropped and recolored with CSS for A and C. People visible in the original are incidental campus visitors, not represented as chapter members.
- Typography loads Instrument Serif and DM Sans through Google Fonts; Georgia/Arial fallbacks are included for offline use. All layout CSS and query selection are inline, and the campus image is embedded as a data URI so the HTML does not depend on its sibling image file. Screenshots are the visual decision artifacts; choose a direction before implementation.
- Screenshot validation: all three final 1440 × 1100 PNGs were captured from the actual HTML query variants with agent-browser and then visually inspected. Fonts finished loading and both embedded images decoded before capture. No broken images, clipped text, horizontal overflow, or rendering issues in the final captures. B's hero height was tightened after inspection to bring its entire concept-selector footer inside the capture. All PNGs are under 5 MB: A 373,156 bytes; B 119,085 bytes; C 933,407 bytes. No browser JavaScript errors reported on the final view.
- Local previews used file URLs; no static server or listening port was started. The isolated browser session was closed after capture. No existing user browser sessions or unrelated processes were touched. No full website, mobile QA suite, or delivery-form behavior is claimed as implemented or tested.

# Approved-direction refinement

## D — Pink opening / photography-led chapter page
- Preview: `concepts.html?concept=d`. A/B/C remain available as historical comparisons; their PNGs were not changed. D combines B's large sans-serif typography with a calmer photographic section, without C's serif/italic treatment, blue identity, or generic aspirational slogans.
- The first screen is entirely pink with the large white title “Girls Into VC at Columbia.” Its height follows the viewport (900 pixels in the desktop capture; 844 pixels on mobile). Ordinary scrolling reveals “The Columbia chapter,” a concise parent-mission overview, and campus/community photographs. No scroll hijacking, forced overlay, animations, or intercepted wheel/touch events. D uses normal, non-italic type throughout and matter-of-fact labels.
- Actual parent pink: **#F174A2** (`rgb(241, 116, 162)`), verified from computed styles of navigation links, impact numerals, and the primary-button style on https://www.girlsintovc.com/ in a fresh, isolated, unauthenticated agent-browser session. The calmer background is the parent's actual **#FFF5FA** (`rgb(255, 245, 250)`) page background. The opening headline is white **#FFFFFF**, as requested.

## Photograph origins and context
- Real people/community photograph: the official Girls Into VC homepage hero image, sourced from its rendered public image element. Exact source: https://images.squarespace-cdn.com/content/v1/679000943bec52460a2447e3/603cf925-81ee-47d9-8f91-98d597c3a2dc/606A6532.jpg?format=1500w. Page origin: https://www.girlsintovc.com/. Saved as `givc-event.jpg` (1500 × 896), downloaded through the isolated browser from the verified official CDN asset; the negotiated WebP response was locally normalized to JPEG. No generated or stock people were used.
- Visible label: **“Girls Into VC community”**; visible context: **“Parent-organization photograph · not a Columbia chapter event.”** No individual identity, Columbia chapter membership, event name/date/location, or Columbia event history has been inferred from the photo. The official image placement establishes its parent-organization origin, not chapter-event provenance.
- The parent photo is used under the user's explicit authorization for these exploratory mockups. Photographer attribution and a public reuse license were not provided on the inspected hero image; no public-domain or Creative Commons claim is made for it. Confirm publication rights/credits before a production launch.
- Campus photograph remains the existing CC0 image by Spaghet-Ti: https://commons.wikimedia.org/wiki/File:Low_Memorial_Library_-_Columbia_University.jpg. The small people visible there are incidental campus visitors, not represented as chapter members. D uses the actual photo in color, with a local architectural crop.
- Both D images are embedded in the HTML as JPEG data URIs; source files are retained for provenance. No externally hosted image dependency is required for rendering. Fonts retain the existing Google Fonts loading and local fallbacks.

## Scope retained for later implementation
- Board: light-pink square cards with approved photographs, names, class year/school, and a small LinkedIn box.
- General members: names linked to approved LinkedIn profiles, school and year only; no member photographs.
- Homepage firm-logo heading: “Where our members are represented.” Use all 14 user-supplied firms later, explicitly as member representation, not sponsorship. No firm logos or roster data were sourced or invented in this refinement.
- Proposed page labels remain mockup navigation, not implemented routes. The parent link and the normal in-page About anchor are genuine links; there is no backend or contact delivery.

## Validation
- Desktop screenshot: `concept-d.png`, **1440 × 1838**, 1,030,885 bytes. Captured full-page from a **1440 × 900** viewport so the pink opening occupies exactly the first screen.
- Mobile screenshot: `concept-d-mobile.png`, **390 × 1975**, 372,913 bytes. Captured full-page from a **390 × 844** viewport.
- Both actual rendered screenshots were visually inspected. Fonts finished loading and both photographs decoded before capture. No clipped text, broken images, or horizontal overflow. D's computed italic-element count is **0**. Both PNGs are under 5 MB. No browser JavaScript errors reported.
- Previewed through file URLs; no server was started. The one isolated browser session was closed. No existing browser session, unrelated process, git state, or project scaffolding was touched.
