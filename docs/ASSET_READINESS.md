# Asset and decision readiness

What the site needs from the business, designer and photographers before it can leave development preview. **Nothing below has been supplied yet.** Every placeholder in the site is labelled and points back to a row here.

Status: `Not supplied` · `In progress` · `Received` · `Verified`. Update this table as items arrive.

## 1. Artwork and identity

| Item | Status | Where it plugs in | Rules |
| --- | --- | --- | --- |
| **Commissioned Gond artwork** (one work per hero ritual or seasonal kit) | Not supplied | `ArtworkZone` (`components/ui/ArtworkZone.tsx`), shown in `components/home/ArtworkSection.tsx` | Commission real Gond artists (Dindori / Patangarh region is the centre of contemporary practice). Never draw Gond-style motifs in-house or use generated imagery. Gond has a GI tag (April 2023): obtain GI authorised-user licensing in writing, covering packaging, digital and merchandise. Pay per use or royalty, not a one-off buyout. Keep the artwork in its own full colours; never recolour it to indigo and cream. |
| Artist name and village, per work | Not supplied | `artwork.artistName`, `artwork.village` | Required by type. The zone will not render a work without them. |
| Licence reference, per work | Not supplied | `artwork.licenceReference` | Required by type. Internal id of the written licence. |
| High-resolution artwork files | Not supplied | `/public/images/artwork/` | Supply as the artist delivers it. Check the licence allows web use before publishing. |
| Final rosette vector with construction grid | Not supplied | `components/brand/Rosette.tsx` is a code construction of the brief's geometry | Replace or confirm. Also needed: four lockups, four size-range SVG exports, single-colour black test (brief §3.3, §7). |
| Trademark search and filing for the rosette | Not supplied | n/a | An unrelated company operates under an identical name elsewhere in India. |

## 2. Photography

Direction (brief §3.4): **warm paper, warm photography, cool ink.** Real provenance and process imagery: real hands, real herbs, real places. Never stock wellness, never cool or clinical grading. Never present stock or generated images as the family's history or as the real facility.

**Current state: every slot below holds a real, properly licensed, temporary photograph** (sourced from Wikimedia Commons, not generated), not a placeholder graphic. Full credit and licence terms are in `public/images/CREDITS.md`; `content/assets.ts` marks each with `temporary: true`. Each carries a short in-image credit line naming what it actually shows, so none of them reads as a claim about the pharmacy's own facility, products or family. Replacing a slot with commissioned brand photography is a one-line change: put the file in `/public/images/`, update `src`/`alt`/`focal`, set `temporary: false`.

| Slot (`content/assets.ts`) | Status | Current (temporary) image | Shot brief for the replacement | Crop notes |
| --- | --- | --- | --- | --- |
| `hero` | Temporary | A worn brass lota (CC BY-SA 4.0, Rajani Gairshail) | A real morning at a sink or window, natural side light, hands and objects, warm tones | Portrait on mobile, wide on desktop; `focal` set |
| `morning` | Temporary | The same brass lota, different crop | The morning sequence in a real home, soft daylight | Landscape (4:3) on desktop, 5:4 on mobile |
| `evening` | Temporary | A lit brass oil lamp (CC0, Saral Shots) | An evening scene by lamplight, warm and unhurried | Portrait (3:4) on desktop, 5:4 on mobile |
| `rasayana` | Temporary | Ashwagandha root and powder on wooden spoons (CC BY 2.0, formulatehealth) | Process or preparation imagery that is genuinely the family's own | Wide cinematic band, full-bleed |
| `heritage` | Temporary | Dried ashwagandha root (CC BY 2.0, Formulatehealth.com) | Genuine family or archive photographs only | 4:5, sticky column |
| `provenance` | Temporary | Ground turmeric (CC BY-SA 4.0, Barbara-Ingeborg) | Real herbs, hands and source locations in Madhya Pradesh, only verified places | 4:5 |

The source files are large (1–3.3MB each); before launch, re-export them (or their real replacements) at a sane maximum and sensible JPEG quality so the origin files are lighter for Next's image optimizer to work from.

For each delivered photograph: supply the original at 2400px on the long edge or larger; put it in `/public/images/`; set `src`, real descriptive `alt`, and `focal` in `content/assets.ts`; check it at 320px and at desktop. Obtain model, location and usage releases.

## 3. Words

| Item | Status | Notes |
| --- | --- | --- |
| **Tagline approval** | Working | `Ritual.` is the working signature. Change `site.tagline` in `lib/site.ts`; set `status` to `"approved"` only when the owner confirms. |
| Approved Hindi copy | Not supplied | No Hindi appears on the public pages. Needs Vaidya-reviewed text for labels and packaging. Tiro Devanagari Hindi is wired (use `lang="hi"`). |
| Vaidya review of all ritual copy | Not started | Practice names, the "proposed sequence" lists and the Rasayana line are drawn from the brief's classical references and must be reviewed before they are presented as anything more than concepts. |
| Family history in the family's own words | Not supplied | `components/home/Heritage.tsx`. Confirm "five generations" (from brief §2.1) and any further details. |
| Journal / practice content | Not started | No route exists; see `SITEMAP_PROPOSAL.md`. |
| Consumer naming convention for categories | Open | Brief says trade terms (Shastrokt, Vati, Patent) stay in the trade channel. Labels in `content/categories.ts` are provisional. |

## 4. Product and catalogue

| Item | Status | Notes |
| --- | --- | --- |
| Verified catalogue (about 174 SKUs per the brief) | Not supplied | Exact counts and availability must be confirmed before any number is published. `provisionalSkuCount` in `content/categories.ts` is never rendered. |
| Trade order-history pull | Not started | To confirm which churnas and formulations actually sell. |
| Ingredients, pack sizes, prices | Not supplied | Needed for product pages. |
| Usage information and regulatory cautions per product | Not supplied | Must be reviewed by the Vaidya. Ashwagandha, Trikatu and Yashtimadhu need warning text with reserved panel space (brief §6.2). |
| Ritual set contents and objects (copper, brass, kansa) | Not supplied | Concepts only on the site. |
| Export classification per market | Not decided | US, UK, EU, UAE differ (brief §6.3). Settle before shipping outside India. |

## 5. Sourcing evidence (for the provenance ledger)

| Item | Status | Notes |
| --- | --- | --- |
| Verified source records: herb, region, harvest, batch, evidence reference | Not supplied | Add to `content/provenance.ts`. The ledger currently shows a labelled template. No farm names, maps, test results, purity guarantees or lab credentials may appear unless evidenced. |
| Certificates of analysis and third-party testing documents | Not supplied | Build into the product architecture from the start (brief §6.3). |

## 6. Business details and policies

| Item | Status | Notes |
| --- | --- | --- |
| Address, telephone, email | Not supplied | Footer shows "To be added once verified". Do not invent. |
| Drug and cosmetic licence number | Not supplied | The brief states the licence is held; the number must be verified before display. |
| GMP certification details | Not supplied | Same. |
| Privacy, shipping, returns, terms | Not written | Footer lists them as pending. Legal review needed. |
| Payment gateway account (UPI, cards, net banking) | Not started | Phase 5. |

## 7. Technical and security

| Item | Status | Notes |
| --- | --- | --- |
| Dependency vulnerabilities | Reviewed, open | See "Dependency audit" in `PROJECT_CONTEXT.md`. Five advisories, all in the lint toolchain; none ships to visitors. |
| `noindex` | Active | Set in `app/layout.tsx` via `metadata.robots`. Remove only at launch, deliberately. |
| Launch review | Not done | The site is **not launch-ready**. It needs the items above, a security review, and a legal and regulatory copy review. |
