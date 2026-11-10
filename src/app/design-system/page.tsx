import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SourceLedger } from "@/components/provenance/SourceLedger";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section } from "@/components/ui/Section";
import { packagingAssets } from "@/content/assets";

export const metadata: Metadata = {
  title: "Brand Identity Specimen | Baba Ayurved Pharmacy",
  description: "Official visual identity system and design tokens extracted from Baba brand kit_v2.pdf.",
  robots: { index: false, follow: false },
};

const brandPalette = [
  {
    name: "Primary Brown",
    role: "Brand Wordmark & Primary Elements",
    hex: "#5C2E06",
    rgb: "92, 46, 6",
    token: "--brand-primary",
    allocation: "25%",
    textDark: false,
    contrastRating: "8.62:1 on Ivory (AAA)",
  },
  {
    name: "Leaf Green",
    role: "Botanical Accent & Secondary Badges",
    hex: "#5C5E27",
    rgb: "92, 94, 39",
    token: "--brand-leaf-green",
    allocation: "5%",
    textDark: false,
    contrastRating: "5.24:1 on Ivory (AA)",
  },
  {
    name: "Ivory Cream",
    role: "Core Canvas, Surfaces, Purity & Calm",
    hex: "#F0E4D3",
    rgb: "240, 228, 211",
    token: "--brand-ivory",
    allocation: "60%",
    textDark: true,
    contrastRating: "8.62:1 with Brown (AAA)",
  },
  {
    name: "Off-White",
    role: "Clean Highlights & High Contrast",
    hex: "#FBF7F3",
    rgb: "251, 247, 243",
    token: "--brand-off-white",
    allocation: "Neutral",
    textDark: true,
    contrastRating: "10.29:1 with Brown (AAA)",
  },
  {
    name: "Cream",
    role: "Secondary Background & Card Stock",
    hex: "#F4EADD",
    rgb: "244, 234, 221",
    token: "--brand-cream",
    allocation: "Neutral",
    textDark: true,
    contrastRating: "9.31:1 with Brown (AAA)",
  },
  {
    name: "Sand",
    role: "Tertiary Surface, Product Trays & Badges",
    hex: "#E6D3BA",
    rgb: "230, 211, 186",
    token: "--brand-sand",
    allocation: "Neutral",
    textDark: true,
    contrastRating: "7.84:1 with Brown (AAA)",
  },
  {
    name: "Taupe",
    role: "Hairlines, Dividers & Structural Borders",
    hex: "#CFB99A",
    rgb: "207, 185, 154",
    token: "--brand-taupe",
    allocation: "Neutral",
    textDark: true,
    contrastRating: "6.21:1 with Brown (AA)",
  },
] as const;

function Block({
  number,
  title,
  subtitle,
  children,
}: {
  number?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 rounded-sm border border-line bg-paper p-6 sm:p-10 shadow-xs">
      <div className="flex flex-col gap-1 border-b border-line pb-4">
        {number && (
          <span className="font-sans text-[11px] font-semibold uppercase tracking-label text-leaf">
            {number} &middot; Section
          </span>
        )}
        <h2 className="font-serif text-2xl font-medium text-ink sm:text-3xl">{title}</h2>
        {subtitle && <p className="font-sans text-xs text-tone-muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <Section tone="paper" className="py-12 md:py-20">
      <Container className="flex flex-col gap-16">
        {/* Executive Header */}
        <header className="flex flex-col gap-6 rounded-sm border border-line bg-sand/30 p-8 md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="rounded-xs bg-primary px-3 py-1 font-sans text-xs font-semibold tracking-label uppercase text-ivory">
              Official Brand System
            </span>
            <span className="font-sans text-xs text-tone-muted">
              Source: <strong className="text-primary font-medium">Baba brand kit_v2.pdf</strong>
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <Heading as="h1" size="statement" className="text-primary">
              Baba Ayurved Pharmacy
            </Heading>
            <p className="font-serif text-lg italic text-tone-muted sm:text-xl">
              Visual Identity, Exact Palette, Extracted Logos &amp; Packaging Architecture.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/brand/contact-sheet.html"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xs bg-primary px-4 py-2 font-sans text-xs font-semibold uppercase tracking-label text-ivory transition hover:bg-primary/90"
            >
              Open Interactive Contact Sheet &rarr;
            </Link>
            <Link
              href="/brand/logos/baba-logo-primary.svg"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xs border border-primary px-4 py-2 font-sans text-xs font-semibold uppercase tracking-label text-primary transition hover:bg-sand/40"
            >
              View Primary Vector SVG
            </Link>
          </div>
        </header>

        {/* 1. Exact Color Palette & 60-25-10-5 Rule */}
        <Block
          number="04"
          title="Color Palette & Brand Proportions"
          subtitle="Exact hexadecimals from Brand Kit §04. Purity, balance, and natural formulation."
        >
          {/* Proportion Allocation Bar */}
          <div className="flex flex-col gap-3 rounded-xs border border-line bg-paper-deep p-4">
            <div className="flex items-center justify-between font-sans text-xs font-semibold uppercase tracking-label">
              <span className="text-primary">The 60% &ndash; 25% &ndash; 10% &ndash; 5% Brand Allocation</span>
              <span className="text-tone-muted">Harmonious Balance</span>
            </div>
            <div className="flex h-8 w-full overflow-hidden rounded-xs border border-line shadow-inner">
              <div
                className="flex items-center justify-center font-sans text-[11px] font-semibold text-primary"
                style={{ width: "60%", backgroundColor: "#F0E4D3" }}
                title="60% Ivory Cream (#F0E4D3)"
              >
                60% Ivory (#F0E4D3)
              </div>
              <div
                className="flex items-center justify-center font-sans text-[11px] font-semibold text-ivory"
                style={{ width: "25%", backgroundColor: "#5C2E06" }}
                title="25% Primary Brown (#5C2E06)"
              >
                25% Brown (#5C2E06)
              </div>
              <div
                className="flex items-center justify-center font-sans text-[10px] font-medium text-primary"
                style={{ width: "10%", backgroundColor: "#E6D3BA" }}
                title="10% Neutrals Sand/Cream"
              >
                10% Neutrals
              </div>
              <div
                className="flex items-center justify-center font-sans text-[10px] font-semibold text-ivory"
                style={{ width: "5%", backgroundColor: "#5C5E27" }}
                title="5% Leaf Green (#5C5E27)"
              >
                5%
              </div>
            </div>
            <p className="font-sans text-[11px] text-tone-muted">
              Ivory Cream (60%) establishes calm whitespace and purity; Primary Brown (25%) provides authoritative heritage wordmarks and primary actions; Neutrals (10%) offer subtle depth and section breaks; Leaf Green (5%) provides focused botanical accents.
            </p>
          </div>

          {/* Color Swatch Grid */}
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brandPalette.map((color) => (
              <li
                key={color.token}
                className="flex flex-col overflow-hidden rounded-xs border border-line bg-paper-deep shadow-xs"
              >
                <div
                  className="flex h-24 items-end p-3 transition"
                  style={{ backgroundColor: color.hex }}
                >
                  <span
                    className={`rounded-xs px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-label ${
                      color.textDark ? "bg-primary/10 text-primary" : "bg-ivory/20 text-ivory"
                    }`}
                  >
                    {color.allocation}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-3.5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-base font-semibold text-primary">{color.name}</span>
                    <span className="font-mono text-xs font-bold text-primary">{color.hex}</span>
                  </div>
                  <span className="font-sans text-[11px] text-tone-muted">{color.role}</span>
                  <div className="mt-auto border-t border-line/60 pt-2 text-[10px] text-tone-muted">
                    <div>Token: <code className="font-mono text-primary">{color.token}</code></div>
                    <div>RGB: {color.rgb}</div>
                    <div>Contrast: <strong className="text-leaf">{color.contrastRating}</strong></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        {/* 2. Authentic Extracted Logos (§01, §02, §03) */}
        <Block
          number="01 - 03"
          title="Extracted Logo Suite"
          subtitle="Resolution-independent vector SVGs extracted directly from PDF streams, plus V2 variations."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Primary Vector on Ivory */}
            <div className="flex flex-col gap-3 rounded-xs border border-line bg-ivory p-6">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-label text-primary">
                01 &middot; Primary Vector Logo (Light)
              </span>
              <div className="flex h-36 items-center justify-center">
                <BrandLogo variant="primary" size="lg" />
              </div>
              <p className="border-t border-line/60 pt-2 font-sans text-[11px] text-tone-muted">
                Extracted vector artwork: &ldquo;BABA&rdquo; in #5C2E06 with botanical leaf in #5C5E27 on &ldquo;A&rdquo;, &ldquo;AYURVEDA&rdquo; below.
              </p>
            </div>

            {/* Reversed Vector on Primary Brown */}
            <div className="flex flex-col gap-3 rounded-xs border border-line bg-primary p-6 text-ivory">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-label text-sand">
                02 &middot; Reversed Vector Logo (Dark)
              </span>
              <div className="flex h-36 items-center justify-center">
                <BrandLogo variant="primary" tone="reversed" size="lg" />
              </div>
              <p className="border-t border-line-reversed pt-2 font-sans text-[11px] text-sand/90">
                Reversed vector artwork in Ivory Cream (#F0E4D3) for primary dark sections, footer, and ribbon banners.
              </p>
            </div>

            {/* Monogram & Standalone Leaf */}
            <div className="flex flex-col gap-3 rounded-xs border border-line bg-cream p-6">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-label text-leaf">
                03 &middot; Monogram &amp; Leaf Icon
              </span>
              <div className="flex h-36 items-center justify-center gap-8">
                <div className="flex flex-col items-center gap-1">
                  <BrandLogo variant="monogram" size="md" />
                  <span className="font-sans text-[10px] text-tone-muted">Monogram</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <BrandLogo variant="leaf" size="md" />
                  <span className="font-sans text-[10px] text-leaf">Leaf Icon</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <BrandLogo variant="favicon" size="md" />
                  <span className="font-sans text-[10px] text-tone-muted">Favicon</span>
                </div>
              </div>
              <p className="border-t border-line/60 pt-2 font-sans text-[11px] text-tone-muted">
                Compact icons for mobile navigation, app icons, wax seals, and secondary packaging labels.
              </p>
            </div>

            {/* Dark Background Card (#3E240C) */}
            <div className="flex flex-col gap-3 rounded-xs border border-line bg-[#3E240C] p-6 text-ivory">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-label text-sand">
                04 &middot; Dark Background Card
              </span>
              <div className="flex h-36 items-center justify-center">
                <BrandLogo variant="dark-bg" size="lg" />
              </div>
              <p className="border-t border-line-reversed pt-2 font-sans text-[11px] text-sand/90">
                Official dark-mode container card extracted from Brand Kit §02 / §03.
              </p>
            </div>

            {/* Light Background Card (#F0E4D3) */}
            <div className="flex flex-col gap-3 rounded-xs border border-line bg-off-white p-6">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-label text-primary">
                05 &middot; Light Background Card
              </span>
              <div className="flex h-36 items-center justify-center">
                <BrandLogo variant="light-bg" size="lg" />
              </div>
              <p className="border-t border-line/60 pt-2 font-sans text-[11px] text-tone-muted">
                Official light-mode container card extracted from Brand Kit §02 / §03.
              </p>
            </div>

            {/* V2 High-Resolution Render */}
            <div className="flex flex-col gap-3 rounded-xs border border-line bg-sand/30 p-6">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-label text-leaf">
                06 &middot; V2 Master Raster Render
              </span>
              <div className="flex h-36 items-center justify-center">
                <BrandLogo variant="v2-primary" size="lg" />
              </div>
              <p className="border-t border-line/60 pt-2 font-sans text-[11px] text-tone-muted">
                Original 1802x872 px high-resolution raster asset preserved from Brand Kit §03.
              </p>
            </div>
          </div>
        </Block>

        {/* 3. Typography System (§05, §06) */}
        <Block
          number="05 - 06"
          title="Typography Hierarchy"
          subtitle="Primary: Cormorant Garamond (Editorial Serif). Secondary: Montserrat (Functional Sans). Companion: Tiro Devanagari Hindi."
        >
          <div className="flex flex-col gap-10">
            {/* Display Hierarchy */}
            <div className="flex flex-col gap-4 border-b border-line pb-8">
              <span className="font-sans text-xs font-semibold uppercase tracking-label text-leaf">
                Display &amp; Editorial Headings &mdash; Cormorant Garamond
              </span>

              <div className="flex flex-col gap-6">
                <div>
                  <span className="font-sans text-[11px] text-tone-muted">Hero Display (clamp 4.25rem – 9rem)</span>
                  <p className="font-serif text-5xl font-normal text-primary sm:text-6xl md:text-7xl">
                    Herbal Purity. Living Lineage.
                  </p>
                </div>

                <div>
                  <span className="font-sans text-[11px] text-tone-muted">Statement Heading (clamp 1.75rem – 3.25rem)</span>
                  <Heading as="p" size="statement" className="text-primary">
                    A practice before it was a pharmacy.
                  </Heading>
                </div>

                <div>
                  <span className="font-sans text-[11px] text-tone-muted">Section Heading (clamp 1.375rem – 1.625rem)</span>
                  <Heading as="p" size="section" className="text-primary">
                    Classical Shastrokt compounding in Central India
                  </Heading>
                </div>

                <div>
                  <span className="font-sans text-[11px] text-tone-muted">Product Heading (clamp 1.25rem – 1.5rem)</span>
                  <Heading as="p" size="product" className="text-primary">
                    Maha Bhringraj Taila &middot; Classical Scalp Formulation
                  </Heading>
                </div>
              </div>
            </div>

            {/* Functional UI Hierarchy */}
            <div className="flex flex-col gap-4 border-b border-line pb-8">
              <span className="font-sans text-xs font-semibold uppercase tracking-label text-leaf">
                Functional Interface &amp; Navigation &mdash; Montserrat
              </span>

              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[11px] text-tone-muted">Navigation Link (500, 13–14px)</span>
                  <p className="font-sans text-sm font-medium tracking-wide text-primary">
                    THE PHARMACY &middot; HERITAGE &middot; RITUALS
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[11px] text-tone-muted">Price &amp; Metadata (600, 14–16px)</span>
                  <p className="font-sans text-base font-semibold text-primary">
                    ₹ 680 <span className="text-xs font-normal text-tone-muted">(200 ml / glass bottle)</span>
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[11px] text-tone-muted">Proof Label (600, 10px uppercase, tracking-label)</span>
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-label text-leaf">
                    SHASTROKT FORMULATION &middot; BATCH 2026-A
                  </p>
                </div>
              </div>
            </div>

            {/* Hindi & Sanskrit Typography */}
            <div className="flex flex-col gap-3 rounded-xs border border-line bg-sand/20 p-6">
              <span className="font-sans text-xs font-semibold uppercase tracking-label text-leaf">
                Sanskrit &amp; Hindi Typography &mdash; Tiro Devanagari Hindi
              </span>
              <p className="font-hindi text-2xl text-primary">
                आयुर्वेद: सर्वभूतहितार्थाय प्रवर्तितः।
              </p>
              <p className="font-serif text-sm italic text-tone-muted">
                &ldquo;Ayurveda was promulgated for the welfare and balance of all living beings.&rdquo;
              </p>
            </div>
          </div>
        </Block>

        {/* 4. Extracted Product Packaging Showcase (§09, §10) */}
        <Block
          number="09 - 10"
          title="Authentic Extracted Product &amp; Packaging Assets"
          subtitle="Real packaging images extracted from Brand Kit §09 & §10 with zero AI generation."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packagingAssets.map((asset) => (
              <div
                key={asset.id}
                className="group flex flex-col overflow-hidden rounded-xs border border-line bg-paper-deep transition hover:shadow-md"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-ivory">
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute top-2 right-2 rounded-xs bg-primary/90 px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-label text-ivory">
                    {asset.type}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4">
                  <h3 className="font-serif text-lg font-medium text-primary">{asset.title}</h3>
                  <p className="font-sans text-xs text-tone-muted">{asset.description}</p>
                  <div className="mt-auto border-t border-line/60 pt-2 font-mono text-[10px] text-tone-muted">
                    {asset.dimensions} &middot; {asset.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* 5. Buttons & Interactive States */}
        <Block
          number="System"
          title="Buttons & Interactive Controls"
          subtitle="Buttons styled with Primary Brown, Leaf Green accents, and Montserrat typography."
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-4">
              <Button>Primary Brown CTA</Button>
              <Button variant="secondary">Secondary Outline</Button>
              <Button variant="text" href="#">
                Text link &rarr;
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 rounded-xs bg-primary p-6 text-ivory">
              <Button tone="reversed">Reversed Ivory CTA</Button>
              <Button tone="reversed" variant="secondary">
                Reversed Outline
              </Button>
              <Button tone="reversed" variant="text" href="#">
                Reversed link &rarr;
              </Button>
            </div>
          </div>
        </Block>

        {/* 6. Product Cards with Verified Packaging */}
        <Block
          number="Catalogue"
          title="Product Card Architecture"
          subtitle="Real packaging photography paired with classical Shastrokt formulation metadata."
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              name="Chyawanprash Awaleha"
              description="Wild amla pulped with 48 Shastrokt herbs, clarified butter, and raw honey."
              image={{
                src: "/brand/packaging/packaging-amber-jars.webp",
                alt: "Authentic amber glass jar of Chyawanprash",
              }}
              proof={[
                { label: "Pack & Price", value: "500 g · ₹ 540" },
                { label: "Form", value: "Awaleha (Herbal Jam)" },
                { label: "Classical Reference", value: "Charaka Samhita" },
              ]}
            />
            <ProductCard
              name="Ashwagandhadi Churna"
              description="Sun-dried roots stone-milled into micro-fine powder to preserve withanolides."
              image={{
                src: "/brand/packaging/packaging-tins-boxes.webp",
                alt: "Authentic herbal tin and carton packaging",
              }}
              proof={[
                { label: "Pack & Price", value: "100 g · ₹ 320" },
                { label: "Form", value: "Sukshma Churna" },
                { label: "Terrain", value: "Central MP Plateau" },
              ]}
            />
            <ProductCard
              name="Maha Bhringraj Taila"
              description="Cold-pressed sesame oil slow-steeped with fresh bhringraj juice and milk decoction."
              image={{
                src: "/brand/packaging/packaging-bottles-dropper.webp",
                alt: "Authentic amber dropper bottles and cartons",
              }}
              proof={[
                { label: "Pack & Price", value: "200 ml · ₹ 680" },
                { label: "Form", value: "Taila (Medicated Oil)" },
                { label: "Boiling Method", value: "Kshira Paka" },
              ]}
            />
          </div>
        </Block>

        {/* 7. Provenance & Stewardship */}
        <Block
          number="Heritage"
          title="Source Ledger &amp; Provenance Architecture"
          subtitle="Transparent batch records without fabricated claims or simulated artwork."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <span className="font-sans text-xs font-semibold uppercase tracking-label text-leaf">
                Verified Batch Ledger
              </span>
              <p className="font-serif text-sm text-tone-muted">
                Each verified harvest of Haridra, Amalaki, Ashwagandha, and Brahmi is recorded with its actual geographical location and harvest timing.
              </p>
              <SourceLedger />
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-sans text-xs font-semibold uppercase tracking-label text-leaf">
                Gond Art Stewardship Principle
              </span>
              <div className="flex flex-col gap-3 rounded-xs border border-line bg-paper-deep p-6">
                <h4 className="font-serif text-lg font-medium text-primary">
                  Honoring the April 2023 GI Tag
                </h4>
                <p className="font-serif text-xs leading-relaxed text-ink/95">
                  Gond painting belongs to the indigenous artists of Madhya Pradesh. We do not generate tribal artwork via AI or copy motifs in-house. All future packaging artwork will feature direct artist commissioning, named village attribution, and authorised GI licensing.
                </p>
              </div>
            </div>
          </div>
        </Block>
      </Container>
    </Section>
  );
}
