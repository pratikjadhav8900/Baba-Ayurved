"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { imageSlots } from "@/content/assets";

const metadataItems = [
  { label: "ROLE", value: "Master Vaidya" },
  { label: "LINEAGE", value: "150+ Years (5 Gen)" },
  { label: "LOCATION", value: "Madhya Pradesh" },
  { label: "STANDARD", value: "Shastrokt Classical" },
];

const livingPrinciples = [
  "Bedside diagnosis before commercial packaging",
  "Slow-simmered in seasoned brass vessels",
  "Wild-gathered from indigenous MP terroir",
];

const painPoints = [
  "No synthetic binders, talc, or parabens",
  "Zero unverified claims or disease hype",
  "Exact canonical Bhavaprakasha ratios",
];

const babaDelivers = [
  "100% Shastrokt classical authenticity",
  "Single-lot verification by resident Vaidya",
  "5 generations of unbroken bedside lineage",
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
            <p className="max-w-xl font-sans text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-[#5C2E06]/85">
              For more than 150 years across five continuous generations, our family has practiced classical Ayurveda in Madhya Pradesh. Formulations were refined through generational bedside diagnosis and authentic Shastrokt knowledge, long before commercial wellness marketing existed.
            </p>

            {/* Footer Reference */}
            <p className="font-sans text-xs tracking-wide text-[#8C5E28]/80">
              Archival lineage from Phoolchand Aushdhalaya ledger &middot; Est. Pre-1900s, Central India
            </p>

          </div>

          {/* Right Column: Laboratory Compounding Imagery + Overlapping Cards */}
          <div className="relative mx-auto w-full max-w-lg lg:col-span-6 lg:max-w-none">
            
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
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C49A45]" />
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
                {painPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-snug">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C49A45]" />
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
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C49A45]" />
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

