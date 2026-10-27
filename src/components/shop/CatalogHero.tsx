"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function CatalogHero() {
  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      aria-label="Catalogue Hero"
      className="relative overflow-hidden bg-[#180E08] text-[#F0E4D3] pt-12 pb-16 md:pt-20 md:pb-24 border-b border-solid border-[#3D2516]"
    >
      {/* Background Radial Glow & Precision Grid Overlay */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(146,84,38,0.35),rgba(24,14,8,0.95)_75%)]"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#F0E4D3_1px,transparent_1px),linear-gradient(to_bottom,#F0E4D3_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Top Eyebrow Pill with Pulse Dot */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#52331E] bg-[#24150C]/90 px-4 py-1.5 backdrop-blur-md shadow-inner mb-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8A903E] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8A903E]" />
          </span>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E6D3BA]">
            Shastrokt Apothecary Architecture &middot; Est. 1870
          </span>
        </div>

        {/* Monumental Onyx-Style Headline */}
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-[#FAF5EE] leading-[1.05]">
            COMPOUNDED <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#E2B784]">PRECISION.</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto font-sans text-sm sm:text-base md:text-lg leading-relaxed text-[#D6C4B0]/90">
            Every formulation at Baba Ayurved is compounded in accordance with the ancient Sanskrit treatises of Charaka, Sushruta, and Sharangadhara. Pure wild botanicals, zero synthetic preservatives, transparent apothecary pricing.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={scrollToCatalog}
            className="group flex items-center gap-2.5 rounded-xl bg-[#FAF5EE] px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-[#180E08] shadow-lg transition-all duration-200 hover:bg-[#E8D9C7] hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <span>Explore 174 Preparations</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <Link
            href="/#heritage"
            className="flex items-center gap-2 rounded-xl border border-[#52331E] bg-[#2A190F]/70 px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#E6D3BA] backdrop-blur-sm transition-colors hover:border-[#8A903E] hover:text-[#FAF5EE]"
          >
            <span>150-Year Lineage</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#8A903E]" />
          </Link>
        </div>

        {/* Central Illuminated Stage / 3D-Style Showcase */}
        <div className="relative mt-12 w-full max-w-5xl">
          {/* Spotlight Pedestal Glow behind image */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[80%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(214,166,112,0.22)_0%,transparent_70%)] blur-2xl"
          />

          {/* Main Showcase Packaging Container */}
          <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-2xl border border-solid border-[#4A2D1B] bg-gradient-to-b from-[#24160E] to-[#140B06] shadow-2xl">
            <Image
              src="/brand/hero-baba-triphala-horizontal.jpg"
              alt="Baba Ayurveda Triphala apothecary presentation"
              fill
              priority
              sizes="(min-width: 1280px) 960px, (min-width: 768px) 80vw, 100vw"
              className="object-cover object-center opacity-95 transition-transform duration-1000 ease-out hover:scale-105"
            />

            {/* Subtle Gradient Vignette Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#180E08]/80 via-transparent to-black/30 pointer-events-none" />

            {/* In-Frame Badge (Lower left) */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-xl border border-[#52331E] bg-[#1C1008]/85 px-3 py-1.5 backdrop-blur-md">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#FAF5EE]">
                Handcrafted in Madhya Pradesh
              </span>
            </div>

            {/* In-Frame Badge (Lower right) */}
            <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 rounded-xl border border-[#52331E] bg-[#1C1008]/85 px-3 py-1.5 backdrop-blur-md">
              <span className="font-hindi text-xs text-[#8A903E]">
                ऋतुचर्या &middot; दिनचर्या
              </span>
            </div>
          </div>

          {/* Floating Onyx-Style Precision Cards (Desktop and Tablet) */}
          <div className="hidden lg:block">
            {/* Floating Card Top-Left: Scripture Authenticated */}
            <div className="absolute -left-6 top-8 z-20 flex w-60 items-start gap-3 rounded-xl border border-[#52331E] bg-[#1C1008]/90 p-4 shadow-xl backdrop-blur-md text-left transition-transform hover:-translate-y-1">
              <span className="font-mono text-xs font-bold text-[#E2B784] bg-[#301B0E] px-2 py-1 rounded-md">
                01
              </span>
              <div>
                <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-[#8A903E]">
                  Treatise Standard
                </span>
                <span className="font-serif text-sm font-bold text-[#FAF5EE]">
                  Charaka Samhita
                </span>
                <p className="mt-0.5 font-sans text-[11px] text-[#D6C4B0]/70">
                  Zero synthetic preservatives or hidden stabilizers.
                </p>
              </div>
            </div>

            {/* Floating Card Top-Right: 16-Paka Slow Extraction */}
            <div className="absolute -right-6 top-8 z-20 flex w-60 items-start gap-3 rounded-xl border border-[#52331E] bg-[#1C1008]/90 p-4 shadow-xl backdrop-blur-md text-left transition-transform hover:-translate-y-1">
              <span className="font-mono text-xs font-bold text-[#E2B784] bg-[#301B0E] px-2 py-1 rounded-md">
                02
              </span>
              <div>
                <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-[#8A903E]">
                  Slow Paka Method
                </span>
                <span className="font-serif text-sm font-bold text-[#FAF5EE]">
                  16 Boiling Cycles
                </span>
                <p className="mt-0.5 font-sans text-[11px] text-[#D6C4B0]/70">
                  Simmered over slow wood fires in seasoned brass pans.
                </p>
              </div>
            </div>

            {/* Floating Card Bottom-Left: Single-Source Botanical */}
            <div className="absolute -left-6 bottom-10 z-20 flex w-60 items-start gap-3 rounded-xl border border-[#52331E] bg-[#1C1008]/90 p-4 shadow-xl backdrop-blur-md text-left transition-transform hover:-translate-y-1">
              <span className="font-mono text-xs font-bold text-[#8A903E] bg-[#301B0E] px-2 py-1 rounded-md">
                03
              </span>
              <div>
                <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-[#8A903E]">
                  Pure Provenance
                </span>
                <span className="font-serif text-sm font-bold text-[#FAF5EE]">
                  Wildcrafted Roots
                </span>
                <p className="mt-0.5 font-sans text-[11px] text-[#D6C4B0]/70">
                  Gathered by generational forest communities.
                </p>
              </div>
            </div>

            {/* Floating Card Bottom-Right: 150+ Years Lineage */}
            <div className="absolute -right-6 bottom-10 z-20 flex w-60 items-start gap-3 rounded-xl border border-[#52331E] bg-[#1C1008]/90 p-4 shadow-xl backdrop-blur-md text-left transition-transform hover:-translate-y-1">
              <span className="font-mono text-xs font-bold text-[#E2B784] bg-[#301B0E] px-2 py-1 rounded-md">
                04
              </span>
              <div>
                <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-[#8A903E]">
                  Verified Lineage
                </span>
                <span className="font-serif text-sm font-bold text-[#FAF5EE]">
                  Phoolchand Aushdhalaya
                </span>
                <p className="mt-0.5 font-sans text-[11px] text-[#D6C4B0]/70">
                  Unbroken Ayurvedic practice across five generations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Precision Proof Metrics Strip (Onyx Technical Spec Bar) */}
        <div className="mt-14 w-full max-w-5xl rounded-2xl border border-solid border-[#4A2D1B] bg-[#1F130B]/80 backdrop-blur-md p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4 sm:divide-x sm:divide-[#3D2516]">
            <div className="flex flex-col items-center px-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] tracking-tight">
                150+
              </span>
              <span className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#E2B784]">
                Years of Family Lineage
              </span>
              <span className="mt-0.5 font-sans text-[10px] text-[#D6C4B0]/60">
                Founded in MP, India
              </span>
            </div>

            <div className="flex flex-col items-center px-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] tracking-tight">
                174
              </span>
              <span className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#E2B784]">
                Classical Formulary SKUs
              </span>
              <span className="mt-0.5 font-sans text-[10px] text-[#D6C4B0]/60">
                Across 7 Traditional Forms
              </span>
            </div>

            <div className="flex flex-col items-center px-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] tracking-tight">
                100%
              </span>
              <span className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#E2B784]">
                Wildcrafted Botanicals
              </span>
              <span className="mt-0.5 font-sans text-[10px] text-[#D6C4B0]/60">
                Single-origin harvest
              </span>
            </div>

            <div className="flex flex-col items-center px-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] tracking-tight">
                0%
              </span>
              <span className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#E2B784]">
                Synthetic Preservatives
              </span>
              <span className="mt-0.5 font-sans text-[10px] text-[#D6C4B0]/60">
                Zero artificial colors or fillers
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
