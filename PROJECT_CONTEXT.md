# Project context: Baba Ayurved Pharmacy website

Living record of brand direction, technical decisions and phase plan. Sources: *Brand Brief v2* (supersedes v1) and *Digital Brand Launch & Growth Roadmap*. Where the two differ, Brief v2 wins.

## Brand direction

**Positioning.** A lifestyle brand built on Ayurvedic daily (dinacharya) and seasonal (ritucharya) practice, not a premium-medicine brand. Spine: **Ritual, not remedy.** The unit is a morning, an evening, a season.

**Heritage is living, not nostalgic.** Phoolchand Aushdhalaya is a family Ayurvedic practice of more than 150 years in Madhya Pradesh. Baba Ayurved Pharmacy was founded in 1999 to extend it. The pillars are *real, not romanticized*, *inherited, not borrowed*, and *says the real thing plainly*.

**Name.** Always "Baba Ayurved Pharmacy" in full, including "Pharmacy".

**Voice.** A trusted elder: warm, unhurried, precise, never clinical. It flexes by channel: sensory and human for story, plain and sequential for practice cards, direct for content.

**Copy rules (non-negotiable, brief §6.1).**
- Describe what to do and when, never what it treats.
- Classical-text references, not modern health claims.
- No disease names, anywhere.
- No cure or treatment claims. A staff Vaidya reviews claims before print.
- No unverified credentials, licence numbers, testimonials or product data on the site.

**Colour** (exact brief values). Rule: *warm paper, warm photography, cool ink.*

| Token           | Hex       | Role                                   |
| --------------- | --------- | -------------------------------------- |
| `indigo`        | `#2B3A5B` | Primary                                |
| `paper`         | `#F4EFE5` | Warm cream stock                       |
| `ink`           | `#1A1814` | Body copy, wordmark                    |
| `indigo-muted`  | `#A8B4CC` | Secondary text on indigo               |
| `mute`          | `#8A8377` | Labels and captions (see contrast note) |

Avoided on purpose (competitor territory): brick red (Kama), gold (Forest Essentials), olive/wellness green (Kapiva).

**Typography.** Source Serif 4 speaks (story, product names, ritual steps). Archivo verifies (UI, evidence). Tiro Devanagari Hindi is mandatory for Hindi. The serif is never bolder than 500. Tracked caps appear only in Archivo. The type scale is in `globals.css` and mirrors brief §3.5.

**Mark.** Seven-circle rosette: six circles on a hexagonal grid around a seventh, with a centre point. Size ladder: full (32px and up), petal (20 to 32px), silhouette (14 to 20px), rounded hexagon (under 14px). Never scale one variant into another's range.

**Gond art.** Gond painting has a GI tag (April 2023) and artists hold individual motifs. **Do not illustrate Gond-style artwork in-house.** Commission, license and credit named artists. Technique-only surrounds (sunray dots, radiating lines, half-moon ring) are the brand's own to build on the rosette geometry. They are built as `RosetteSurround` (Phase 2).

## Decisions made in Phase 1

| Decision | Why |
| --- | --- |
| Next.js 16.4.2 App Router, Tailwind v4, Cache Components on | `create-next-app` defaults; static site works with them. No dynamic dates in server components. |
| Tailwind default palette removed (`--color-*: initial`) | Prevents off-brand colours entering by accident. |
| Added derived token `mute-strong` `#6B6458` | Brief's `#8A8377` is only **3.28:1** on paper, which fails WCAG AA for small text. `mute-strong` gives **5.11:1** and is used for all small text. Exact `mute` remains for decorative and large uses. Designer to confirm. |
| Added derived `paper-deep`, `indigo-deep`, `line` tints | Needed for card surfaces, hover state and hairlines. They are mixes of brand colours, not new hues. |
| Eyebrows are uppercase tracked Archivo | The Phase 1 prompt allows tracked uppercase for small functional labels. Brief rule 4 says sentence case except "PHARMACY". **Open question for the designer:** keep, or switch eyebrows to sentence case. |
| Rosette drawn in code, favicon is the hexagon rung | Placeholder construction of the brief's geometry. The final vector and construction grid are pending. |
| Homepage ritual cards use "The Morning / The Evening / The Rasayana" with sequence-only copy | Brief names these as flagship directions but marks them to be confirmed against the catalogue. No components, prices or claims shown. |
| Hero headline "Begin every morning the same way." | **Superseded in Phase 2** by the working signature `Ritual.` |
| All routes are `noindex` | Preview must not be indexed. Still true; remove only at launch. |
| Only `MobileNav` is a Client Component | Minimal client JS. **Phase 2** adds three small motion helpers (see below). |
| Only `lucide-react` added beyond the scaffold | Animation and 3D libraries wait until needed. **Phase 2** adds `motion` only. |

## State at the start of Phase 2

Phase 1 delivered, and Phase 2 preserved: Next 16.4.2 foundation with lint and build passing; the colour, type, spacing, radius and motion tokens; fonts (Source Serif 4, Archivo, Tiro Devanagari Hindi); `Rosette` with its size ladder; `Wordmark` and `BrandLockup`; UI primitives (Button, Container, Section, Heading, Text, Eyebrow, ProofList, Divider, ImageFrame, ProductCard); header, mobile navigation and footer; the `/design-system` specimen; a temporary homepage. Inventory of assets at that point: **none**. No photography, no artwork, no artist information, no licence documents; `public/` was empty. Phase 2 therefore builds every image and artwork slot as a labelled, designed fallback.

## Decisions made in Phase 2

| Decision | Why |
| --- | --- |
| Hero signature is `Ritual.`, held in `site.tagline` with `status: "working"` | The owner prefers the "Ritual" concept; it is not finally approved. The hero scales down automatically for longer text. Docs and copy never call it approved. |
| No photography is faked. Image slots show an indigo or paper plate carrying the rosette and a brand surround, labelled "Photograph pending" | Stock, generated or invented imagery would contradict "real, not romanticized". The fallbacks are designed to look finished while being plainly honest. Wiring a real photo is a one-line change in `content/assets.ts`. |
| `ArtworkZone` requires artist name, village and licence reference by type | Makes it impossible to show Gond artwork without attribution and a documented licence. Empty state is a labelled, reserved zone. No Gond motifs, trees, animals or birds are drawn anywhere. |
| `RosetteSurround` (sunray dots, radiating lines, half-moon ring) | The brief's technique-only treatments, built on the rosette geometry in one colour. Mapped to the collections as sun (morning), moon (evening), rays (rasayana). Explicitly secondary to commissioned artwork. |
| Closing moment is a half-risen rosette and sunray halo cropped by the footer's top edge | A quiet echo of the morning; the footer border is the horizon. |
| Ritual chapters use three different compositions, not three cards | Morning: wide plate and numbered sequence on paper. Evening: reversed on indigo, tall plate dropped to the right. Rasayana: centred and typographic. |
| Ritual copy lists practice names only | Practice terms (ushapan, jihwa nirlekhana, kavala, danta dhavana, padabhyanga) come from the brief. No components, doses, benefits or disease names. All labelled "proposed, to be confirmed with our Vaidya". The Rasayana line paraphrases the brief's note that the classical texts tie rasayana to supporting lifestyle; the Vaidya must confirm it. |
| Heritage keeps practice and pharmacy distinct: the practice (Phoolchand Aushdhalaya, more than 150 years) is older than the pharmacy brand (founded 1999) | Accuracy requirement. "Five generations" is taken from brief 2.1 and flagged for confirmation. No archive photograph is shown, because none is verified. |
| Provenance is a reusable `SourceLedger` that shows a labelled template while `content/provenance.ts` is empty | States the idea (where an herb grows changes the herb) without inventing farms, maps, results or credentials. |
| Product discovery uses the brief's seven categories as provisional labels, with no counts shown | Counts are unverified and the brief says trade terms stay in the trade channel. `/shop` shows a labelled sample state; no products exist. |
| Navigation: Rituals, Our heritage, Sourcing, Shop. No Journal link, no cart | Journal has no content or route; a dead link is worse than none. Cart and search do not exist yet. Shop is the one outlined action. |
| Mobile menu is a full-height sheet with a text label, focus trap, Escape, scroll lock, and closes on resize | Thumb-friendly and keyboard-accessible. The hamburger icon is CSS, not a library icon. |
| `motion` installed; `LazyMotion` with `m` elements and `domAnimation` features | Needed for scroll reveals, plate reveals, parallax drift and the animated menu. Smallest feature set that includes `inView`. |
| Hero animates with CSS only; scroll reveals are safe without JS and under reduced motion | `[data-reveal]` is forced visible by `@media (scripting: none)` and `prefers-reduced-motion`. No layout shift (opacity, transform and clip-path only). |
| Parallax nests outside Reveal | Found in testing: a clip-path on the wrapper cropped the plate as it drifted. |
| Dynamic routes read `params` inside `<Suspense>` | Required by this Next version's instant-navigation validation (found in dev). All slugs are also prerendered with `generateStaticParams`. |
| **Three.js, React Three Fiber and shaders not added** | Evaluated: the brand's strongest visual idea is precise geometry that SVG and CSS already render crisply at any size, at near-zero cost. A 3D or shader layer would add substantial JavaScript and maintenance, harm mobile performance, and risk the "warm, tactile, real" feel. Revisit only for a specific purpose (for example a product object viewer once real 3D assets exist). |
| Hero word enlarged from md up | Seen in desktop review: restrained at 390px, bolder at wide widths, kept inside its column. |

## Dependency audit

`npm audit` reports 5 high-severity advisories, all one chain: **`braces` (ReDoS via deeply nested patterns) to `micromatch` to `fast-glob` to `@next/eslint-plugin-next` to `eslint-config-next`**. Cause: the glob libraries inside Next's own ESLint plugin. Impact: **dev tooling only**; none of it is bundled for visitors, and the input is the project's own file patterns. The proposed fix, `npm audit fix --force`, would install `eslint-config-next@14.2.35`, a **major downgrade** that mismatches Next 16, so it has **not** been run. Recommended remediation: wait for Next to ship an `eslint-config-next` that depends on patched `fast-glob`, `micromatch` and `braces`, then upgrade within the 16.x line; re-run `npm audit` at each Next upgrade and before launch. `motion` and `lucide-react` add no advisories. This is a pre-existing Phase 1 issue, not introduced by Phase 2.

## Phase 2 redesign: diagnosis and photography sourcing

The first Phase 2 pass (above) was functionally complete but visually thin: an oversized hero with little below the fold, three ritual "chapters" that were mostly abstract rosette graphics and empty coloured space, and padding that stacked at every section boundary (each section's own bottom padding sat directly against the next section's top padding, so two adjacent same-tone sections showed roughly double the intended gap). Benchmarked against Forest Essentials, Kama Ayurveda and Kapiva (inspected live, desktop and mobile, via headless Chrome), all three lead with large photographic hero banners and image-led, swipeable product/collection rows; none of them use abstract illustration as a substitute for photography.

**Photography.** No brand photography exists. Rather than leave the empty plates, five real photographs were sourced from Wikimedia Commons under their stated open licences (not generated, not stock misrepresented as the family's own) and used as clearly temporary stand-ins, chosen for genuine relevance to the page they illustrate:

| Slot | Subject | Why |
| --- | --- | --- |
| Hero / Morning | A worn brass lota | The actual vessel named in the brief for *ushapan*, the first morning step |
| Evening | A lit brass oil lamp | A literal "lit at day's end" image for the evening chapter |
| Rasayana / Heritage | Ashwagandha root and powder | A real rasayana-adjacent herb named in the brief |
| Sourcing | Ground turmeric | A recognisable Ayurvedic herb for the provenance section |

Full title, author and licence for each file is in `public/images/CREDITS.md`; `src/content/assets.ts` carries the same information and a `temporary: true` flag per slot. Every use has a short, specific in-image credit line (via `ImageFrame`'s new `overlayLabel`) naming what the photo actually shows, so nothing is presented as the pharmacy, its products or its family. Unsplash was tried first and declined automated access (bot protection); Wikimedia Commons' public API has no such barrier and returns machine-readable licence metadata per file, which is what made accurate attribution practical.

**What changed, beyond swapping images in:**
- Hero rebuilt: photograph widened to roughly half the grid (was a small floating plate), a verified-facts proof strip added below the fold so the first screen is not followed by empty paper.
- The Rasayana chapter, previously text-only with a faint background illustration, gained a full-bleed photograph band (a third, distinct composition from Morning's side-by-side and Evening's reversed layout).
- Heritage and Provenance each gained a photograph paired with their existing text/ledger content.
- `SourceLedger`'s empty-state template was cut from three repeated rows of "Pending verification" to one, so the honest empty state reads as a sample row rather than an unfinished wall of placeholders.
- `ClosingMoment` was rebuilt from a large illustrated rosette rising into reserved empty space (which had forced `15rem`/`22rem` of bottom padding just to hold it) into a full-bleed photographic band with a dark scrim, at ordinary section padding.
- `Discover`'s "by ritual" list became a touch-swipeable, CSS-scroll-snap photo row (`ScrollRow`, no JavaScript) instead of a plain text list — a genuine commerce-style interaction, native momentum scrolling and snapping, no carousel library added.
- The global `--section-y`/`--section-y-tight` rhythm tokens were tightened (see `globals.css`) to reduce the stacked-padding gap between sections site-wide.
- `ProofList` gained a `columns` prop (2/3/4) instead of relying on a className override that could lose a Tailwind specificity race.

**Component libraries evaluated, not added.** 21st.dev, shadcn/ui and motion.dev were reviewed per the redesign brief. `motion` (already installed in the first Phase 2 pass) covers every interaction used here (`LazyMotion` + `m` elements for reveals and parallax). shadcn/Radix primitives (Dialog, Accordion) were not added: the existing bespoke `MobileNav` already implements a focus-trapped, Escape-closing disclosure, and no other interaction on the page (accordion, tabs, dialog) is needed yet. Adding Radix now would be weight without a concrete use. The swipeable row needed only native CSS scroll-snap, not an embla/Swiper dependency.

**A Turbopack caching trap worth recording:** after editing `--section-y` in `globals.css`, the running dev server kept serving the old compiled value through several saves and even a full process restart; the served CSS only picked up the change after deleting `.next/` entirely. If a CSS custom property change in `globals.css` doesn't appear to take effect, check the served chunk directly (`curl` the `/_next/static/chunks/*.css` the page references) before assuming the component logic is wrong — it may be a stale Turbopack cache.

## Phase plan

| Phase | Scope | Notes |
| --- | --- | --- |
| **1. Foundation (done)** | Tokens, fonts, rosette, UI primitives, header/footer, homepage shell, docs | This phase |
| **2. Brand experience (done, as a preview)** | Art-directed homepage, `Ritual.` hero, three ritual concepts, heritage, provenance ledger, artwork zone, shop entry, Motion for React, placeholder ritual and shop routes. Redesigned with real (temporarily licensed) photography and a photo-led commerce discovery row after the first pass read as empty and templated | Built with real photography standing in for commissioned brand photography. Needs that photography, licensed Gond artwork, final mark, approved copy |
| **3. Catalogue and product pages** | Category architecture for ~174 SKUs, product pages, ritual (set) pages, practice-card content, filters and search | Needs verified catalogue data, Vaidya-reviewed copy |
| **4. Story and trust** | Heritage and sourcing story, artist credit pages once Gond artists are licensed, FAQ, contact, warnings and contraindication blocks | Needs verified credentials and licences |
| **5. Commerce** | Cart, checkout, Indian payment gateway (UPI, cards, net banking), order tracking, subscriptions for seasonal kits | Explicitly out of scope until reached |
| **6. Growth and polish** | SEO and structured data, GA4 e-commerce tracking, 3D or shader moments (React Three Fiber, Paper Shaders) if they serve the brand, performance and accessibility audits | |

## Open business and design items (from brief)

Trademark search and filing for the rosette; Gond GI authorised-user licensing; manufacturer exclusivity contract; trade order-history pull to confirm which products actually sell; photography direction; whether tools carry the mark; prakriti indicator system; artwork-zone proportion; consumer product naming convention.
