# Baba Ayurved Pharmacy — Brand Asset Manifest

**Source of Truth:** `Baba brand kit_v2.pdf`  
**Status:** Extracted, Calibrated, and Integrated into Website  
**Date:** October 2026

---

## 1. Executive Summary

This manifest documents all brand identity assets, color tokens, typography systems, vector logos, and packaging imagery extracted directly from `Baba brand kit_v2.pdf`. All assets have been placed into standard web directories under `/public/brand/` with both lossless original assets (vector SVGs and uncompressed PNGs) and production-optimized formats (WebP).

---

## 2. Brand Color Palette Tokens

Implemented in CSS `:root` and Tailwind `@theme` without approximation.

### Primary Palette

| Brand Role | Exact Hex | Intended Use | Proportion |
|---|---|---|---|
| **Primary Brown** | `#5C2E06` | Brand wordmark, primary titles, solid buttons, core brand identity | **25%** |
| **Leaf Green** | `#5C5E27` | Botanical accents, secondary highlights, active badges, leaf motif | **5%** |
| **Ivory Cream** | `#F0E4D3` | Backgrounds, calm surfaces, purity, balance | **60%** |

### Neutral Palette

| Brand Role | Exact Hex | Intended Use | Proportion |
|---|---|---|---|
| **Off-White** | `#FBF7F3` | Clean whitespace, cards, high-contrast readable surfaces | Part of 60% |
| **Cream** | `#F4EADD` | Surfaces, light UI controls, card insets | Part of 10% |
| **Sand** | `#E6D3BA` | Elevated cards, sections, container borders | Part of 10% |
| **Taupe** | `#CFB99A` | Dividers, borders, hairline demarcation lines | Part of 10% |

### Proportions

- **60% Background:** Ivory Cream (`#F0E4D3`) and Off-White (`#FBF7F3`)
- **25% Primary:** Primary Brown (`#5C2E06`) for titles, wordmark, buttons
- **10% Secondary:** Cream (`#F4EADD`), Sand (`#E6D3BA`), Taupe (`#CFB99A`)
- **5% Accent:** Leaf Green (`#5C5E27`) for botanical accents and leaf details

---

## 3. Typography System

| Role | Font Family | Weights Loaded | Applied To |
|---|---|---|---|
| **Primary Display Serif** | **Cormorant Garamond** | 400, 500, 600, 700 (Normal & Italic) | Main hero headline, major section headings, heritage and brand-story headings, editorial statements, product names |
| **Secondary Functional Sans** | **Montserrat** | 300, 400, 500, 600, 700 | Navigation, body copy, buttons, calls to action, product metadata, prices, forms, filters |
| **Hindi / Devanagari Companion** | **Tiro Devanagari Hindi** | 400 | Devanagari Sanskrit nomenclature and classical terminology |

---

## 4. Extracted Logo Variations

| Logo Variant | File Path | Format | Dimensions | Extraction Method |
|---|---|---|---|---|
| **Primary Vector Logo** | `/brand/logos/baba-logo-primary.svg` | SVG | Scalable (489&times;179 viewBox) | Extracted from PDF Drawings 4–17 (BABA letterforms in `#5C2E06`, botanical leaf in `#5C5E27`, AYURVEDA in `#5C2E06`) |
| **Primary Logo (Reversed)** | `/brand/logos/baba-logo-reversed.svg` | SVG | Scalable (489&times;179 viewBox) | Vector converted with `#FBF7F3` letters & `#E6D3BA` leaf for dark surfaces |
| **Primary Logo (Transparent PNG)** | `/brand/logos/baba-logo-primary-transparent.png` | PNG | 1980&times;760 px | 4&times; 288 DPI vector render with background removed |
| **Compact Primary Logo** | `/brand/logos/baba-logo-v1-primary.svg` | SVG | Scalable (224&times;85 viewBox) | Extracted from PDF Drawings 114–127 |
| **Brand Monogram** | `/brand/logos/baba-monogram.svg` | SVG | Scalable (95&times;71 viewBox) | Extracted from PDF Drawings 174–176 |
| **Brand Monogram (Reversed)** | `/brand/logos/baba-monogram-reversed.svg` | SVG | Scalable (95&times;71 viewBox) | Vector with light cream fill for dark backgrounds |
| **Favicon Badge** | `/brand/logos/baba-favicon.svg` | SVG | Scalable (76&times;76 viewBox) | Extracted from PDF Drawings 128, 177–179 |
| **Standalone Leaf Icon** | `/brand/logos/baba-leaf-icon.svg` | SVG | Scalable (70&times;93 viewBox) | Extracted from PDF Drawings 172–173 |
| **Logo on Dark Background** | `/brand/logos/baba-logo-dark.svg` | SVG | 218&times;87 px | Extracted from PDF Drawings 145–159 (`#3E240C` card) |
| **Logo on Light Background** | `/brand/logos/baba-logo-light.svg` | SVG | 218&times;87 px | Extracted from PDF Drawings 130–144 (`#F0E4D3` card) |
| **Logo Variations V2 Primary** | `/brand/logos/baba-logo-v2-primary.png` | PNG / WebP | 1802&times;872 px | Original embedded PDF image xref 20 |
| **Logo Variations V2 Monogram** | `/brand/logos/baba-logo-v2-monogram.png` | PNG / WebP | 1350&times;1165 px | Original embedded PDF image xref 8 |
| **Logo Variations V2 Favicon** | `/brand/logos/baba-logo-v2-favicon.png` | PNG / WebP | 1350&times;1165 px | Original embedded PDF image xref 24 |
| **Logo Variations V2 on Dark** | `/brand/logos/baba-logo-v2-dark.png` | PNG / WebP | 1802&times;872 px | Original embedded PDF image xref 12 |
| **Logo Variations V2 on Light** | `/brand/logos/baba-logo-v2-light.png` | PNG / WebP | 1803&times;872 px | Original embedded PDF image xref 16 |

---

## 5. Extracted Product & Packaging Assets

| Asset Name | WebP Path | Raw PNG Path | Dimensions | Source | Intended Site Location |
|---|---|---|---|---|---|
| **Brand Lifestyle Showcase** | `/brand/packaging/brand-lifestyle-showcase.webp` | `...png` | 1536&times;1024 | Embedded xref 28 | Homepage Hero & Lifestyle Section |
| **Product Shelf Lineup** | `/brand/packaging/packaging-shelf-lineup.webp` | `...png` | 1799&times;874 | Embedded xref 32 | Product Discovery Scroll Row & Shop Banner |
| **Amber Glass Jars** | `/brand/packaging/packaging-amber-jars.webp` | `...png` | 1536&times;1024 | Embedded xref 52 | Single Herb Churna Products (Amalaki, Ashwagandha) |
| **Herbal Tins & Boxes** | `/brand/packaging/packaging-tins-boxes.webp` | `...png` | 1536&times;1024 | Embedded xref 56 | Classical Formulations (Triphala) |
| **Bottles & Dropper** | `/brand/packaging/packaging-bottles-dropper.webp` | `...png` | 1536&times;1024 | Embedded xref 36 | Medicated Tailas (Oils) & Liquid Formulations |
| **Stacked Boxes** | `/brand/packaging/packaging-boxes-stack.webp` | `...png` | 1536&times;1024 | Embedded xref 48 | Classical Avaleh & Boxed Herbs |
| **Stationery & Bag** | `/brand/packaging/packaging-stationery-bag.webp` | `...png` | 1536&times;1024 | Embedded xref 44 | Heritage & Sourcing Provenance Sections |
| **Tubes & Pouches** | `/brand/packaging/packaging-tubes-pouches.webp` | `...png` | 1254&times;1254 | Embedded xref 70 | Herbal Balms, Lepa & Ointments |

---

## 6. Brand Guidelines Reference Sheets

High-resolution 288 DPI renders of key brand kit sections for designer review:

- **Color Palette & Proportions:** `/brand/guidelines/04_color_palette_and_proportions.png` (2220&times;1180 px)
- **Typography Specimen:** `/brand/guidelines/05_typography_specimen.png` (2220&times;1000 px)
- **Typography Hierarchy Example:** `/brand/guidelines/06_typography_hierarchy_example.png` (2220&times;1000 px)
- **Iconography System:** `/brand/guidelines/07_iconography.png` (2220&times;1200 px)

---

## 7. Review & Verification

- **Interactive Contact Sheet:** Available in the browser at `/brand/contact-sheet.html`
- **Design System Specimen Route:** `/design-system`
