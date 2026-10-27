"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { RosetteSurround, type Treatment } from "@/components/brand/RosetteSurround";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";

interface StepData {
  id: string;
  stepNumber: string;
  treatment: Treatment;
  name: string;
  sanskrit: string;
  application: string;
  ritualPhase: string;
  timeframe: string;
  description: string;
  productGuidance: {
    phase: string;
    action: string;
    herbalSynergy: string;
  };
}

const steps: readonly StepData[] = [
  {
    id: "dinacharya",
    stepNumber: "01",
    treatment: "sunray",
    name: "Sunray dots",
    sanskrit: "दिनचर्या · Dawn Solar Vitality",
    application: "Primary Amber Glass Packaging",
    ritualPhase: "Morning Ritual",
    timeframe: "Brahma Muhurta (Dawn)",
    description:
      "Concentric solar halos drawn strictly from the seven-circle rosette geometry. Designed for daily morning formulations that awaken metabolic agni and digestive clarity.",
    productGuidance: {
      phase: "Morning Awakening",
      action: "Take 2 Triphala capsules with warm mountain spring water at sunrise.",
      herbalSynergy: "Wild Amalaki delivers fresh natural ascorbic potency to stimulate digestion.",
    },
  },
  {
    id: "ratricharya",
    stepNumber: "02",
    treatment: "halfmoon",
    name: "Half-moon ring",
    sanskrit: "रात्रिचर्या · Dusk Lunar Repose",
    application: "Secondary Archival Cotton Carton",
    ritualPhase: "Evening Repose",
    timeframe: "Sandhya Kala (Twilight)",
    description:
      "A soft crescent perimeter celebrating the cooling lunar phase. Hand-embossed on unbleached, acid-free cotton cartons to house evening grounding preparations.",
    productGuidance: {
      phase: "Evening Peristalsis",
      action: "Take 1 Triphala capsule before sleep with lukewarm water or organic cow's ghee.",
      herbalSynergy: "Haritaki and Bibhitaki tone mucosal tissues and support overnight elimination.",
    },
  },
  {
    id: "rasayana",
    stepNumber: "03",
    treatment: "rays",
    name: "Radiating lines",
    sanskrit: "रसायन · Seasonal Rejuvenation",
    application: "Seasonal & Single-Origin Editions",
    ritualPhase: "Seasonal Cycles",
    timeframe: "Ritu-Sandhi (Solstices)",
    description:
      "Expansive linear rays radiating outward, aligned with seasonal transitions. Reserved exclusively for rare, single-origin botanical harvest batches.",
    productGuidance: {
      phase: "Full Tridoshic Balance",
      action: "A 90-day continuous rasayana cycle during autumn and spring seasonal pivots.",
      herbalSynergy: "Harmonizes Vata, Pitta, and Kapha to restore cellular vitality across changing climates.",
    },
  },
];

/**
 * Indigenous Art Stewardship & Sacred Surround Language
 *
 * Built with pure typography, archival paper tones, and authentic geometric rosettes.
 * Completely free of generic SaaS icons or template decorations.
 */
export function ArtworkSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = steps[activeStepIndex];

  return (
    <section
      id="artwork"
      aria-labelledby="artwork-heading"
      className="relative w-full overflow-hidden bg-[#FAF6F0] py-16 sm:py-20 md:py-24 lg:py-28 border-t border-b border-[#E6D3BA]/60"
    >
      {/* Compatibility anchor for provenance ledger */}
      <span id="provenance-ledger" className="sr-only" aria-hidden="true" />

      {/* Ambient warm background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(230,211,186,0.35),rgba(250,246,240,0))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-[#EADCC7]/25 blur-3xl"
      />

      <Container width="wide" className="relative z-10">
        {/* Unified 2-Column Grid with Synchronized Top Alignment */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Heading, Narrative, Covenant Box, and Stepper */}
          <div className="flex flex-col gap-8 lg:col-span-7 xl:col-span-7">
            {/* Header Lockup */}
            <Reveal>
              <div className="inline-flex items-center rounded-full border border-[#C49A45]/40 bg-[#F4EADA]/80 px-4 py-1.5 shadow-xs mb-5">
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#5C2E06]">
                  Indigenous Art Stewardship · GI Tag #442
                </span>
              </div>

              <h2
                id="artwork-heading"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-medium tracking-tight text-[#2A1808] leading-[1.1] mb-5"
              >
                Artwork that is not ours to draw.
              </h2>

              <p className="font-serif text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#5C2E06]/90">
                Gond painting originated in Madhya Pradesh, the same state our family pharmacy has worked in since 1999. In April 2023, Gond art received a formal Geographical Indication (GI) tag recognizing the cultural heritage of its indigenous artists.
              </p>
            </Reveal>

            {/* Archival Non-Imitation Covenant Card */}
            <Reveal delay={0.05}>
              <div className="relative rounded-2xl border border-[#E6D3BA] bg-[#FFFDF9] p-5 sm:p-6 shadow-[0_8px_24px_rgba(62,36,12,0.03)]">
                <div className="mb-2.5">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#A87E30] block">
                    Phoolchand Aushdhalaya · Board of Provenance
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-[#2A1808] mt-0.5">
                    Our Non-Imitation Covenant
                  </h3>
                </div>

                <blockquote className="border-l-2 border-[#C49A45]/60 pl-3.5 my-3 text-xs sm:text-sm font-serif italic text-[#3E240C]/90 leading-relaxed">
                  &ldquo;We do not illustrate Gond-style motifs in-house, nor do we generate digital imitations. When commissioned, each piece will be reproduced in its authentic full colors, alongside the artist&rsquo;s name, village, and formal GI authorised-user license record.&rdquo;
                </blockquote>

                <p className="font-sans text-[11px] text-[#5C2E06]/75 leading-relaxed pt-1">
                  Madhya Pradesh Geographical Indication Authorised User Registration: <strong className="text-[#3E240C] font-semibold">#AU-442/2023</strong>.
                </p>
              </div>
            </Reveal>

            {/* The Brand's Own Surround System */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#5C2E06]">
                  The Brand&rsquo;s Own Surround Language
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#5C2E06]/85 leading-relaxed">
                  Derived from the seven-circle rosette geometry in indigo and warm cream. A minimalist technique-only surround system that remains strictly secondary to commissioned tribal art.
                </p>
              </div>
            </Reveal>

            {/* Interactive Process Stepper (3 Interactive Connected Cards) */}
            <Reveal delay={0.15}>
              <div className="flex flex-col gap-3" role="tablist" aria-label="Brand Surround System Steps">
                {steps.map((step, idx) => {
                  const isActive = idx === activeStepIndex;

                  return (
                    <m.button
                      key={step.id}
                      type="button"
                      role="tab"
                      id={`step-tab-${step.id}`}
                      aria-selected={isActive}
                      aria-controls={`step-panel-${step.id}`}
                      onClick={() => setActiveStepIndex(idx)}
                      whileHover={{ scale: 1.008 }}
                      whileTap={{ scale: 0.995 }}
                      transition={{ duration: 0.2 }}
                      className={`relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl p-4 sm:p-5 text-left transition-all duration-300 w-full cursor-pointer ${
                        isActive
                          ? "bg-[#FFFDF9] border-2 border-[#5C2E06] shadow-[0_10px_28px_rgba(62,36,12,0.08)] ring-1 ring-[#5C2E06]/20"
                          : "bg-[#FDFBF7]/80 hover:bg-[#FFFDF9] border border-[#E6D3BA]/80 hover:border-[#C49A45]/50 shadow-xs"
                      }`}
                    >
                      {/* Left: Step indicator, rosette thumbnail, and copy */}
                      <div className="flex items-start gap-3.5">
                        {/* Number Badge */}
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors ${
                            isActive
                              ? "bg-[#3E240C] text-[#FBF7F3] shadow-xs"
                              : "bg-[#F0E4D3] text-[#5C2E06]/80"
                          }`}
                        >
                          {step.stepNumber}
                        </div>

                        {/* Text Details */}
                        <div className="flex flex-col gap-0.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-serif text-base sm:text-lg font-semibold text-[#2A1808]">
                              {step.name}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 font-sans text-[9.5px] font-bold uppercase tracking-wider ${
                                isActive
                                  ? "bg-[#5C2E06]/10 text-[#5C2E06]"
                                  : "bg-[#E6D3BA]/40 text-[#5C2E06]/70"
                              }`}
                            >
                              {step.ritualPhase}
                            </span>
                          </div>

                          <span className="font-serif text-xs text-[#A87E30] italic font-medium">
                            {step.sanskrit}
                          </span>

                          <p className="font-sans text-xs text-[#5C2E06]/80 leading-relaxed mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Right: Rosette Surround Icon & Active Indicator */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E6D3BA]/40">
                        <div className="relative flex items-center justify-center size-12">
                          <RosetteSurround
                            size={48}
                            treatment={step.treatment}
                            lineWidth={isActive ? 1.6 : 1.2}
                            color={isActive ? "#3E240C" : "#A87E30"}
                            spin={isActive}
                            className="transition-transform duration-500"
                          />
                        </div>

                        <span className="font-sans text-[9.5px] uppercase font-bold tracking-wider text-[#A87E30]">
                          {step.timeframe}
                        </span>
                      </div>
                    </m.button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Perfectly Top-Aligned Large Product Apothecary Card */}
          <div className="lg:col-span-5 xl:col-span-5 relative">
            <Reveal delay={0.15}>
              <div className="relative rounded-3xl border border-[#E6D3BA] bg-[#FFFDF9] p-6 sm:p-7 shadow-[0_20px_50px_rgba(62,36,12,0.06)] overflow-hidden flex flex-col justify-between">
                {/* Decorative Rosette Watermark in Card Background */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 opacity-[0.08]"
                >
                  <RosetteSurround
                    size={380}
                    treatment={activeStep.treatment}
                    lineWidth={1.5}
                    color="#5C2E06"
                    spin
                  />
                </div>

                {/* Top Provenance Badges (Pure typography, no generic icons) */}
                <div className="relative z-10 flex items-center justify-between gap-2 border-b border-[#E6D3BA]/60 pb-3.5 mb-5">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#5C5E27] bg-[#5C5E27]/10 px-3 py-1 rounded-full">
                    GI Tag Compliant
                  </span>

                  <span className="font-mono text-xs font-semibold text-[#5C2E06]/80 tracking-wider">
                    BATCH #042/100
                  </span>
                </div>

                {/* LARGE HERO PRODUCT PHOTOGRAPH */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[3/4] rounded-2xl overflow-hidden border border-[#E6D3BA]/70 shadow-[0_12px_35px_rgba(62,36,12,0.07)] bg-[#FAF6F0] group">
                    <Image
                      src="/brand/triphala-product-full.jpg"
                      alt="Baba Ayurveda Triphala Organic Rasayana Apothecary Bottle"
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(min-width: 1024px) 440px, (min-width: 640px) 400px, 90vw"
                      priority
                    />

                    {/* Subtle warm vignette on the image edges */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5"
                    />
                  </div>

                  {/* Botanical Spec Subtitle */}
                  <div className="text-center mt-4">
                    <span className="text-[#A87E30] text-[11px] font-semibold uppercase tracking-[0.22em] block mb-1">
                      Shastrokt Classical Rasayana
                    </span>
                    <h4 className="font-serif text-2xl font-semibold text-[#2A1808]">
                      Triphala Rasayana
                    </h4>
                    <p className="font-sans text-xs uppercase tracking-[0.15em] text-[#5C2E06]/75 mt-0.5">
                      Wild Amalaki · Haritaki · Bibhitaki
                    </p>
                  </div>
                </div>

                {/* Dynamic Step Guidance Box (Synchronized with selected stepper) */}
                <div className="relative z-10 mt-5 pt-4 border-t border-[#E6D3BA]/60">
                  <AnimatePresence mode="wait">
                    <m.div
                      key={activeStep.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-xl bg-[#F7EFE4]/70 border border-[#E6D3BA]/80 p-3.5"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#3E240C]">
                          {activeStep.productGuidance.phase}
                        </span>
                        <span className="font-sans text-[10px] text-[#A87E30] font-semibold tracking-wider uppercase">
                          Step {activeStep.stepNumber} of 03
                        </span>
                      </div>

                      <p className="font-serif text-sm text-[#2A1808] leading-relaxed mb-1 font-medium">
                        {activeStep.productGuidance.action}
                      </p>

                      <p className="font-sans text-xs text-[#5C2E06]/85 leading-relaxed">
                        {activeStep.productGuidance.herbalSynergy}
                      </p>
                    </m.div>
                  </AnimatePresence>

                  {/* Call to Action Button */}
                  <div className="mt-4">
                    <Link
                      href="/shop"
                      className="inline-flex items-center justify-center rounded-xl bg-[#3E240C] px-5 py-3.5 font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#FBF7F3] shadow-sm transition-all duration-300 hover:bg-[#2A1808] hover:shadow-md w-full text-center"
                    >
                      Explore Triphala Formulation
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
