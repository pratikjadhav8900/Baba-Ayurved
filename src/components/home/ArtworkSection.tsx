"use client";

import { useState } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { RosetteSurround, type Treatment } from "@/components/brand/RosetteSurround";
import { ArtworkProductReveal, revealProducts } from "@/components/home/ArtworkProductReveal";
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
      "Solar halos marking daily morning formulations that awaken digestive clarity.",
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
      "A cooling crescent mark for evening grounding preparations.",
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
      "Radiating rays reserved for rare, single-origin seasonal harvest batches.",
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
  const activeProduct = revealProducts[activeStepIndex] ?? revealProducts[0];

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
                <span className="font-sans text-[13px] font-bold uppercase tracking-[0.25em] text-[#5C2E06]">
                  Indigenous Art Stewardship · GI Tag #442
                </span>
              </div>

              <h2
                id="artwork-heading"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-medium tracking-tight text-[#2A1808] leading-[1.1] mb-5"
              >
                Artwork that is not ours to draw.
              </h2>

              <p className="font-serif text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#3E240C]">
                Authentic Gond art from Madhya Pradesh, protected under a formal GI tag.
              </p>
            </Reveal>

            {/* Archival Non-Imitation Covenant Card */}
            <Reveal delay={0.05}>
              <div className="relative rounded-2xl border border-[#E6D3BA] bg-[#FFFDF9] p-5 sm:p-6 shadow-[0_8px_24px_rgba(62,36,12,0.03)]">
                <div className="mb-2.5 flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-[#2A1808]">
                    Our Non-Imitation Covenant
                  </h3>
                  <span className="font-sans text-[12px] font-semibold text-[#5C2E06] shrink-0">
                    #AU-442/2023
                  </span>
                </div>

                <blockquote className="border-l-2 border-[#C49A45]/60 pl-3.5 my-1 text-xs sm:text-sm font-serif italic text-[#2A1808] leading-relaxed">
                  &ldquo;Commissioned pieces carry the artist&rsquo;s name, village, and GI license record.&rdquo;
                </blockquote>
              </div>
            </Reveal>

            {/* Interactive Process Stepper — only the active step expands, so all three are never fighting for attention at once */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-2">
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#3E240C]">
                  The Brand&rsquo;s Surround Language
                </span>
                <div className="flex flex-col gap-2.5" role="tablist" aria-label="Brand Surround System Steps">
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
                        whileHover={{ scale: 1.006 }}
                        whileTap={{ scale: 0.995 }}
                        transition={{ duration: 0.2 }}
                        className={`relative flex flex-col gap-3 rounded-xl p-4 text-left transition-all duration-300 w-full cursor-pointer ${
                          isActive
                            ? "bg-[#FFFDF9] border-2 border-[#5C2E06] shadow-[0_10px_28px_rgba(62,36,12,0.08)]"
                            : "bg-[#FDFBF7]/80 hover:bg-[#FFFDF9] border border-[#E6D3BA]/80 hover:border-[#C49A45]/50 shadow-xs"
                        }`}
                      >
                        {/* Always-visible compact row */}
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`flex size-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors ${
                              isActive
                                ? "bg-[#3E240C] text-[#FBF7F3] shadow-xs"
                                : "bg-[#F0E4D3] text-[#5C2E06]"
                            }`}
                          >
                            {step.stepNumber}
                          </div>

                          <div className="flex flex-1 flex-wrap items-center gap-2">
                            <span className="font-serif text-base font-semibold text-[#2A1808]">
                              {step.name}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 font-sans text-[9.5px] font-bold uppercase tracking-wider ${
                                isActive
                                  ? "bg-[#5C2E06]/10 text-[#5C2E06]"
                                  : "bg-[#E6D3BA]/40 text-[#5C2E06]/85"
                              }`}
                            >
                              {step.ritualPhase}
                            </span>
                          </div>

                          <RosetteSurround
                            size={32}
                            treatment={step.treatment}
                            lineWidth={isActive ? 1.6 : 1.2}
                            color={isActive ? "#3E240C" : "#A87E30"}
                            spin={isActive}
                            className="shrink-0 transition-transform duration-500"
                          />
                        </div>

                        {/* Expanded detail — only for the active step */}
                        {isActive && (
                          <m.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col gap-1 pl-[46px]"
                          >
                            <span className="font-serif text-xs text-[#8A6220] italic font-medium">
                              {step.sanskrit} &middot; {step.timeframe}
                            </span>
                            <p className="font-sans text-xs text-[#3E240C] leading-relaxed">
                              {step.description}
                            </p>
                          </m.div>
                        )}
                      </m.button>
                    );
                  })}
                </div>
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
                  <span className="font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-[#5C5E27] bg-[#5C5E27]/10 px-3 py-1 rounded-full">
                    GI Tag Compliant
                  </span>

                  <span className="font-mono text-xs font-semibold text-[#3E240C] tracking-wider">
                    BATCH #042/100
                  </span>
                </div>

                {/* Jar/bottle silhouette assembles itself in bands on every step change —
                    driven by the same tap state as the stepper, not hover (hover never
                    fires on a touchscreen, which is most of this site's traffic). */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4]">
                    <ArtworkProductReveal activeIndex={activeStepIndex} className="h-full w-full" />
                  </div>

                  {/* Botanical Spec Subtitle */}
                  <AnimatePresence mode="wait">
                    <m.div
                      key={activeProduct.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-center mt-4"
                    >
                      <span className="text-[#A87E30] text-[13px] font-semibold uppercase tracking-[0.22em] block mb-1">
                        {activeProduct.subtitle}
                      </span>
                      <h4 className="font-serif text-2xl font-semibold text-[#2A1808]">
                        {activeProduct.name}
                      </h4>
                      <p className="font-sans text-xs uppercase tracking-[0.15em] text-[#5C2E06] mt-0.5">
                        {activeProduct.botanicals}
                      </p>
                    </m.div>
                  </AnimatePresence>
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
                        <span className="font-sans text-[13px] font-bold uppercase tracking-wider text-[#3E240C]">
                          {activeStep.productGuidance.phase}
                        </span>
                        <span className="font-sans text-[12px] text-[#A87E30] font-semibold tracking-wider uppercase">
                          Step {activeStep.stepNumber} of 03
                        </span>
                      </div>

                      <p className="font-serif text-sm text-[#2A1808] leading-relaxed mb-1 font-medium">
                        {activeStep.productGuidance.action}
                      </p>

                      <p className="font-sans text-xs text-[#3E240C] leading-relaxed">
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
                      Explore {activeProduct.name}
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
