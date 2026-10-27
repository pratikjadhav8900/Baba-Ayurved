# Sitemap proposal

Proposal for the next phases. Routes marked **built** exist now as placeholders; everything else is proposed.

```
/                                   Homepage                                   built
│
├── /rituals                        Rituals index (the three collections)      proposed
│   └── /rituals/[slug]             Ritual concept page: morning, evening,     built (concept state)
│                                   rasayana. Becomes the ritual detail page
│                                   with contents, practice card, cautions.
│
├── /seasons                        Ritucharya: the six ritus                  proposed
│   └── /seasons/[ritu]             Seasonal kit pages (vasanta ... shishira)
│
├── /shop                           Shop entry: by ritual, by category         built (placeholder)
│   ├── /shop/[category]            Category listing, filters, search          built (empty state)
│   └── /shop/[category]/[product]  Product detail page                        proposed
│
├── /search                         Search results (with auto-complete)        proposed
│
├── /heritage                       Phoolchand Aushdhalaya and the pharmacy     proposed (homepage section now)
├── /sourcing                       Provenance: how sources are chosen          proposed (homepage section now)
│   └── /sourcing/[herb]            Per-herb source records, batch evidence
│
├── /artists                        Credited Gond artists                       proposed (needs licensed work)
│   └── /artists/[slug]             Artist profile, village, works, licence credit
│
├── /journal                        Ayurvedic practice: dinacharya, ritucharya  proposed (needs content)
│   └── /journal/[slug]             Article
│
├── /prakriti                       Constitution quiz routing to matched        proposed (Phase 4+)
│                                   oils and churnas
│
├── /cart  /checkout                Cart and checkout (UPI, cards, net banking) proposed (Phase 5)
├── /account  /orders               Account, order tracking, subscriptions      proposed (Phase 5)
│
├── /contact  /faq                  Support                                     proposed
└── /policies/[privacy|shipping|returns|terms]                                  proposed
```

## Notes

- **Navigation today:** Rituals, Our heritage, Sourcing, Shop. Rituals, heritage and sourcing are homepage anchors until they become routes. There is deliberately **no Journal link**, because there is no content or route yet. When `/journal` exists, add it to `primaryNav` in `lib/site.ts`.
- **One ritual route, three ways in.** `/rituals/[slug]` is driven by `content/rituals.ts`, so a fourth ritual or a seasonal kit is a data change.
- **Catalogue routes are data-driven.** `/shop/[category]` uses `content/categories.ts`. Product routes should read from a single typed catalogue source (file, CMS or database, to be decided) and never be populated with invented products.
- **Cache Components.** Dynamic routes use `generateStaticParams` and read `params` inside `<Suspense>`, as this Next.js version requires for instant navigation. Product routes with live pricing or stock will need to split static content from fresh data the same way.

## Proposed next-phase plan

**Phase 3: catalogue and product pages.** Choose the catalogue source; typed product schema (ingredients, pack sizes, cautions, source record link, COA reference); `/shop/[category]/[product]` with warning-block space reserved; listing filters and search; ritual detail pages with real contents; seasons.
**Phase 4: story and trust.** `/heritage`, `/sourcing` and per-herb records from verified evidence; `/artists` once Gond works are licensed; FAQ, contact, policies; journal; prakriti quiz.
**Phase 5: commerce.** Cart, checkout and Indian payment gateway, order tracking, seasonal-kit subscriptions (timed to ritu sandhi), gifting message insert. Export classification settled first.
**Phase 6: growth and hardening.** Metadata and structured data, GA4 e-commerce tracking, performance and accessibility audits, security and legal review, removal of `noindex`.
