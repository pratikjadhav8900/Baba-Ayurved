"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { imageSlots } from "@/content/assets";
import { GondTreeOfLife, GondLeafIcon, GondPatternBorder } from "@/components/brand/GondArt";

const metadataItems = [
  { label: "LINEAGE", value: "159 Years (Since 1860s)" },
  { label: "ORIGIN", value: "Rajasthan to Gwalior" },
  { label: "HERITAGE TEXTS", value: "Handwritten Pothis" },
  { label: "MFG. LIC. NO.", value: "25D/23/99 (Est. 1999)" },
];

const livingPrinciples = [
  "Bedside diagnosis before commercial packaging",
  "Wisdom documented in sacred family Pothis",
  "Wild-gathered from indigenous MP forest terroir",
];

const compoundingStandards = [
  "No synthetic binders, talc, or aggressive purgatives",
  "100% Shastrokt classical text citations",
  "Hand-milled botanicals according to Charaka Samhita",
];

const babaDelivers = [
  "159 years of unbroken clinical Hakim lineage",
  "Dedicated Gwalior manufacturing unit (Lic. 25D/23/99)",
  "Rooted in Madhya Pradesh's indigenous botanical roots",
];

export function Heritage() {
  const heritageImage = imageSlots.heritage;

  return (
    <section
      id="heritage"
      aria-labelledby="heritage-heading"
      className="relative overflow-hidden bg-[#FAF6F0] py-16 sm:py-20 md:py-28 border-t border-b border-[#DFCDB7]"
      style={{
        backgroundImage: `radial-gradient(rgba(140, 94, 40, 0.15) 1.5px, transparent 1.5px)`,
        backgroundSize: "24px 24px",
      }}
    >
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Lineage Profile & Metadata */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-6 lg:pr-4">
            
            {/* Pill Tag */}
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#DFCDB7] bg-[#FAF5ED] px-1.5 py-1 shadow-xs backdrop-blur-xs">
              <span className="rounded-full bg-[#3E240C] px-3 py-0.5 font-sans text-[11px] font-bold tracking-wider text-[#FAF6F0] uppercase">
                PHOOLCHAND
              </span>
              <span className="pr-3 font-sans text-[11px] font-bold tracking-[0.2em] text-[#8C5E28] uppercase">
                LIVING LINEAGE
              </span>
            </div>

            {/* Main Headline (Split Dark Coffee Sans + Warm Caramel Italic) */}
            <div className="flex flex-col">
              <h2
                id="heritage-heading"
                className="font-sans text-5xl font-black tracking-tight text-[#2A1808] sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.02]"
              >
                Phoolchand
              </h2>
              <span className="font-sans text-5xl italic font-normal tracking-tight text-[#8C5E28] sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.02]">
                Aushdhalaya
              </span>
            </div>

            {/* 4-Item Metadata Strip */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-y border-[#DFCDB7] py-4 sm:grid-cols-4 sm:gap-x-4">
              {metadataItems.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C5E28]">
                    {item.label}
                  </span>
                  <span className="mt-1 font-sans text-sm sm:text-[15px] font-bold text-[#2A1808]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Bio Paragraph */}
            <div className="flex flex-col gap-3">
              <p className="max-w-xl font-sans text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-[#5C2E06]/90">
                Nearly 159 years ago, our ancestors migrated from Rajasthan to the historic Maharaj Bada in Gwalior. Practicing as dedicated Hakims, they hand-prepared botanical churnas, syrups, and tablets—safeguarding their clinical methodologies in handwritten formulation diaries (<em className="font-serif italic text-brand-primary">Pothis</em>).
              </p>
              <p className="max-w-xl font-sans text-sm sm:text-base font-normal leading-relaxed text-[#5C2E06]/80">
                In 1999, our father established our dedicated, state-approved manufacturing facility in Gwalior under <strong className="font-semibold text-brand-primary">Mfg. Lic. No. 25D/23/99</strong>, ensuring these classical recipes remain uncompromised by modern shortcuts.
              </p>
            </div>

            {/* Gond Art Heritage Callout */}
            <div className="flex items-center gap-3 pt-2">
              <GondLeafIcon className="h-5 w-5 text-brand-leaf-green shrink-0" />
              <p className="font-sans text-xs tracking-wide text-[#8C5E28]">
                Deeply rooted in Madhya Pradesh &middot; Guided by classical Shastras and indigenous forest terroir
              </p>
            </div>

          </div>

          {/* Right Column: Laboratory Compounding Imagery + Overlapping Cards */}
          <div className="relative mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-none">
            
            {/* Background Gond Tree Watermark */}
            <div className="absolute -right-16 -top-16 opacity-10 pointer-events-none text-brand-primary hidden sm:block">
              <GondTreeOfLife className="w-80 h-80" />
            </div>

            {/* Main Photo Frame */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[32px] border border-[#DFCDB7] bg-[#FAF5ED] shadow-xl">
              <Image
                src={heritageImage.src || "/brand/heritage/vaidya-research.jpg"}
                alt={heritageImage.alt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 460px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Card 1: Top Left (Living Principles) */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-left-4 sm:top-6 lg:-left-10 lg:top-8 z-20 w-full sm:w-64 lg:w-72 rounded-2xl border border-[#DFCDB7] bg-[#FAF5ED]/95 p-4.5 shadow-lg backdrop-blur-xs transition-transform duration-300 hover:scale-[1.02]">
              <h3 className="font-sans text-[15px] font-bold text-[#2A1808]">
                Living Principles
              </h3>
              <ul className="mt-2.5 flex flex-col gap-2 font-sans text-xs sm:text-[13px] text-[#5C2E06]/85">
                {livingPrinciples.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-snug">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5C5E27]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Floating Card 2: Middle Right (Zero Compromise / Authentic Standard) */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-right-4 sm:top-[34%] lg:-right-8 lg:top-[36%] z-20 w-full sm:w-64 lg:w-72 rounded-2xl border border-[#DFCDB7] bg-[#FAF5ED]/95 p-4.5 shadow-lg backdrop-blur-xs transition-transform duration-300 hover:scale-[1.02]">
              <h3 className="font-sans text-[15px] font-bold text-[#2A1808]">
                Compounding Standard
              </h3>
              <ul className="mt-2.5 flex flex-col gap-2 font-sans text-xs sm:text-[13px] text-[#5C2E06]/85">
                {compoundingStandards.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-snug">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5C5E27]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Floating Card 3: Bottom Left (Apothecary Espresso & Warm Ivory Card) */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-left-4 sm:bottom-6 lg:-left-10 lg:bottom-8 z-20 w-full sm:w-72 lg:w-80 rounded-2xl bg-[#3E240C] p-5 text-[#FAF6F0] shadow-2xl shadow-[#3E240C]/25 border border-[#5C2E06] transition-transform duration-300 hover:scale-[1.02]">
              <h3 className="font-sans text-[15px] font-bold text-[#FAF6F0]">
                What Baba Ayurved Delivers
              </h3>
              <ul className="mt-2.5 flex flex-col gap-2 font-sans text-xs sm:text-[13px] text-[#F0E4D3]/90">
                {babaDelivers.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-snug">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5C5E27]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}

