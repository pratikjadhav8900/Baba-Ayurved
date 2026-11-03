"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { GondTreeOfLife, GondLeafIcon, GondMatraSpoon, GondPatternBorder } from "@/components/brand/GondArt";
import { ArrowRight, Sparkles, BookOpen, Clock, ShieldCheck } from "lucide-react";

export function GutKitHeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] py-16 sm:py-20 md:py-24 border-t border-b border-[#DFCDB7]">
      {/* Gond Art Watermark */}
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 opacity-10 text-brand-primary hidden lg:block">
        <GondTreeOfLife className="h-[460px] w-[460px]" />
      </div>

      <Container width="wide">
        <div className="rounded-3xl border border-brand-sand bg-brand-cream/80 p-8 sm:p-12 md:p-14 shadow-2xl backdrop-blur-xs relative overflow-hidden">
          {/* Subtle Inner Gond Top Accent */}
          <div className="text-brand-sand/70 mb-6">
            <GondPatternBorder className="w-full h-3" />
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left 7 Columns: Story & Doctrine */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-sand bg-brand-off-white px-3.5 py-1 w-fit shadow-xs">
                <GondLeafIcon className="h-4 w-4 text-brand-leaf-green" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                  Master Launch &middot; 3-Phase Panchakarma Edition
                </span>
              </div>

              {/* Headline */}
              <div className="flex flex-col gap-2">
                <span className="font-serif text-lg italic text-brand-leaf-green">
                  Charaka Samhita (Vimanasthana 2.8–9)
                </span>
                <Heading as="h2" size="statement" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-primary">
                  The Unhurried Gut Health Ritual Kit
                </Heading>
              </div>

              {/* Core Philosophy Paragraph */}
              <p className="font-sans text-base sm:text-lg leading-relaxed text-brand-primary/85 max-w-xl">
                Modern digestive distress is rarely a failure of nutrition alone; it is a failure of pace. Even wholesome food turns into <em>Ama</em> when consumed in haste. This 14-day progressive ritual gently decelerates your system through 4 classical formulations, a custom 3g Matra measuring spoon, and conscious behavioral pauses.
              </p>

              {/* 3 Phases Micro-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-2xl border border-brand-sand/80 bg-brand-off-white/90 p-3.5 flex flex-col gap-1">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-leaf-green">Days 1–3</span>
                  <span className="font-serif text-sm font-bold text-brand-primary">Phase 1: Colon Clear</span>
                  <span className="font-sans text-[11px] text-brand-primary/75">Avipattikar + Ezee Churna</span>
                </div>
                <div className="rounded-2xl border border-brand-sand/80 bg-brand-off-white/90 p-3.5 flex flex-col gap-1">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-leaf-green">Days 4–10</span>
                  <span className="font-serif text-sm font-bold text-brand-primary">Phase 2: Liver Reset</span>
                  <span className="font-sans text-[11px] text-brand-primary/75">Bhoomi Amla + Yashtimadhu</span>
                </div>
                <div className="rounded-2xl border border-brand-sand/80 bg-brand-off-white/90 p-3.5 flex flex-col gap-1">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-leaf-green">Days 11–14+</span>
                  <span className="font-serif text-sm font-bold text-brand-primary">Phase 3: Daily Rhythm</span>
                  <span className="font-sans text-[11px] text-brand-primary/75">Lifelong 2-product Dinacharya</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/rituals/unhurried-gut-health"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-primary px-8 font-sans text-xs font-bold uppercase tracking-wider text-brand-ivory hover:bg-[#3E240C] transition-all shadow-lg cursor-pointer"
                >
                  <span>Explore 14-Day Protocol &amp; Tracker</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-2 text-xs font-sans text-brand-primary/80">
                  <span className="font-bold font-serif text-lg text-brand-primary">₹949.00</span>
                  <span className="line-through text-brand-primary/50 text-[11px]">₹1,048.00</span>
                  <span className="rounded-full bg-brand-leaf-green/15 px-2 py-0.5 text-[10px] font-bold text-brand-leaf-green">Save ₹99</span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Tactile Matra Spoon & Shastrokta Assurance Card */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Matra Spoon Spotlight */}
              <div className="rounded-2xl border border-brand-sand bg-[#FAF5ED] p-6 shadow-md flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-brand-sand/50 pb-3">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-brand-leaf-green">
                    Included Tactile Tool
                  </span>
                  <span className="font-sans text-[10px] text-brand-primary/60">Gond Engraved Handle</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-primary">
                  Custom 3g &ldquo;Matra&rdquo; Measuring Spoon
                </h3>
                <p className="font-sans text-xs text-brand-primary/80 leading-relaxed">
                  Carved from solid neem wood or etched brass with a debossed 3g fill line. Guarantees calibrated clinical dosage across all 14 days without kitchen guesswork.
                </p>
                <div className="py-2">
                  <GondMatraSpoon className="w-full h-16 text-brand-primary" />
                </div>
              </div>

              {/* Heritage & AYUSH Compliance Strip */}
              <div className="rounded-2xl bg-brand-primary p-5 text-brand-ivory flex flex-col gap-2 border border-brand-primary shadow-xl">
                <div className="flex items-center justify-between text-xs text-brand-sand">
                  <span className="font-bold tracking-widest uppercase text-[10px]">Ayush Classical Medicine</span>
                  <span className="font-mono text-[11px]">Lic. 25D/23/99</span>
                </div>
                <p className="font-sans text-xs text-brand-ivory/90 leading-relaxed">
                  Formulations hand-prepared following 159 years of clinical wisdom from our family Pothis in Gwalior, Madhya Pradesh.
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-brand-sand/80">
                  <ShieldCheck className="h-4 w-4 text-brand-sand shrink-0" />
                  <span>Zero synthetic binders &middot; Zero unverified cure claims</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

