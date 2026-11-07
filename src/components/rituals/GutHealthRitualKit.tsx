"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import {
  GondTreeOfLife,
  GondLeafIcon,
  GondPatternBorder,
} from "@/components/brand/GondArt";
import { AnimatedMatraSpoon } from "@/components/brand/AnimatedMatraSpoon";
import {
  AlertTriangle,
  Clock,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Languages,
  ArrowRight,
  Sun,
  Moon,
  Wind,
} from "lucide-react";

type PhaseId = "phase1" | "phase2" | "phase3";

interface ScheduleRow {
  day: number;
  phase: string;
  phaseId: PhaseId;
  morning: string;
  midMorning: string;
  lunch: string;
  bedtime: string;
  specialNote?: string;
}

const SCHEDULE_DATA: ScheduleRow[] = [
  { day: 1, phase: "Phase 1: Koshtha-Shodhana", phaseId: "phase1", morning: "— Rest —", midMorning: "— Rest —", lunch: "Avipattikar (1/2 Scoop: 1.5g) + 100 steps", bedtime: "Ezee Churna (1 Scoop: 3–5g in warm water)" },
  { day: 2, phase: "Phase 1: Koshtha-Shodhana", phaseId: "phase1", morning: "— Rest —", midMorning: "— Rest —", lunch: "Avipattikar (1/2 Scoop: 1.5g) + 100 steps", bedtime: "Ezee Churna (1 Scoop: 3–5g in warm water)" },
  { day: 3, phase: "Phase 1: Koshtha-Shodhana", phaseId: "phase1", morning: "— Rest —", midMorning: "— Rest —", lunch: "Avipattikar (1/2 Scoop: 1.5g) + 100 steps", bedtime: "Ezee Churna (1 Scoop: 3–5g in warm water)" },
  { day: 4, phase: "Phase 2: Yakrit & Agni Reset", phaseId: "phase2", morning: "Bhoomi Amla (1 Scoop: 50ml shot)", midMorning: "Yashtimadhu (1-2 Tabs + 5 breaths)", lunch: "Avipattikar (1 Full Scoop: 3g Savor)", bedtime: "— Rest (Colon repose) —" },
  { day: 5, phase: "Phase 2: Yakrit & Agni Reset", phaseId: "phase2", morning: "Bhoomi Amla (1 Scoop: 50ml shot)", midMorning: "Yashtimadhu (1-2 Tabs + 5 breaths)", lunch: "Avipattikar (1 Full Scoop: 3g Savor)", bedtime: "— Rest (Colon repose) —" },
  { day: 6, phase: "Phase 2: Yakrit & Agni Reset", phaseId: "phase2", morning: "Bhoomi Amla (1 Scoop: 50ml shot)", midMorning: "Yashtimadhu (1-2 Tabs + 5 breaths)", lunch: "Avipattikar (1 Full Scoop: 3g Savor)", bedtime: "— Rest (Colon repose) —" },
  { day: 7, phase: "Phase 2: Mid-Reset Day", phaseId: "phase2", morning: "Bhoomi Amla (1 Scoop: 50ml shot)", midMorning: "Yashtimadhu (1-2 Tabs + 5 breaths)", lunch: "Avipattikar (1/2 Scoop: 1.5g Half Dose)*", bedtime: "Ezee Churna (1 Scoop: 3g in warm water)", specialNote: "Avipattikar halved to prevent double-purgation" },
  { day: 8, phase: "Phase 2: Yakrit & Agni Reset", phaseId: "phase2", morning: "Bhoomi Amla (1 Scoop: 50ml shot)", midMorning: "Yashtimadhu (1-2 Tabs + 5 breaths)", lunch: "Avipattikar (1 Full Scoop: 3g Savor)", bedtime: "— Rest (Colon repose) —" },
  { day: 9, phase: "Phase 2: Yakrit & Agni Reset", phaseId: "phase2", morning: "Bhoomi Amla (1 Scoop: 50ml shot)", midMorning: "Yashtimadhu (1-2 Tabs + 5 breaths)", lunch: "Avipattikar (1 Full Scoop: 3g Savor)", bedtime: "— Rest (Colon repose) —" },
  { day: 10, phase: "Phase 2: Mid-Reset Day", phaseId: "phase2", morning: "Bhoomi Amla (1 Scoop: 50ml shot)", midMorning: "Yashtimadhu (1-2 Tabs + 5 breaths)", lunch: "Avipattikar (1/2 Scoop: 1.5g Half Dose)*", bedtime: "Ezee Churna (1 Scoop: 3g in warm water)", specialNote: "Avipattikar halved to prevent double-purgation" },
  { day: 11, phase: "Phase 3: Rasayana Transition", phaseId: "phase3", morning: "Bhoomi Amla (1 Scoop: 50ml shot)", midMorning: "Yashtimadhu (1-2 Tabs + 5 breaths)", lunch: "Avipattikar (1 Full Scoop: 3g Savor)", bedtime: "— Rest —" },
  { day: 12, phase: "Phase 3: Rasayana Transition", phaseId: "phase3", morning: "Bhoomi Amla (1 Scoop: 50ml shot)", midMorning: "Yashtimadhu (1-2 Tabs + 5 breaths)", lunch: "Avipattikar (1 Full Scoop: 3g Savor)", bedtime: "— Rest —" },
  { day: 13, phase: "Phase 3: Rasayana Transition", phaseId: "phase3", morning: "Bhoomi Amla (1 Scoop: 50ml shot)", midMorning: "Yashtimadhu (1-2 Tabs + 5 breaths)", lunch: "Avipattikar (1 Full Scoop: 3g Savor)", bedtime: "— Rest —" },
  { day: 14, phase: "Phase 3: Final Seal Day", phaseId: "phase3", morning: "Bhoomi Amla (Final 11th-day shot)", midMorning: "Yashtimadhu (1-2 Tabs + 5 breaths)", lunch: "Avipattikar (1 Full Scoop: 3g Savor)", bedtime: "Ezee Churna (Final 1 Scoop: 3g seal)", specialNote: "Final seal before moving to lifelong 2-product Dinacharya" },
];

export function GutHealthRitualKit() {
  const [activePhase, setActivePhase] = useState<PhaseId>("phase1");
  const [letterLanguage, setLetterLanguage] = useState<"en" | "hi">("en");
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  const products = [
    {
      id: "yashtimadhu",
      name: "Yashtimadhu Tablet",
      botanical: "Glycyrrhiza glabra (Root Powder 500mg)",
      shastra: "Charaka Samhita Chikitsa 1/3.30-31 (Medhya Rasayana), Sutrasthana 4",
      action: "Gastric Mucosal Soother & Mind-Gut Calm",
      netWeight: "30g (60 Coated Tablets)",
      mrp: "₹299.00",
      anupana: "Room-temperature water, cool clay-pot (Matka) water, or warm milk.",
      rationale: "Avoid hot water. Possesses Sheeta Virya (cooling potency) to pacify aggravated Pitta and soothe mucosal inflammation.",
      protocol: "1 to 2 tablets mid-morning post-breakfast. Pair with 5 slow, deep abdominal breaths away from screens.",
      classification: "AYURVEDIC CLASSICAL MEDICINE (Shastrokta Aushadhi)",
      batch: "BY-YST-2024-08",
    },
    {
      id: "avipattikar",
      name: "Avipattikar Churna",
      botanical: "Trivrit (44.4%), Sarkara (50%), Trikatu, Triphala, Vidanga, Ela, Patra",
      shastra: "Bhaishajya Ratnavali (Amlapitta Rogadhikara 56/24-28); Charaka Samhita Sutrasthana 5",
      action: "Acidity, Heartburn & Agni Balancing Formula",
      netWeight: "100g Fine Botanical Powder",
      mrp: "₹249.00",
      anupana: "Room-temperature water or fresh spiced buttermilk (Takra).",
      rationale: "Sensory 'Swallow & Savor': Place 1 level scoop on middle of tongue for 3 seconds to trigger cephalic phase digestive enzyme secretion before swallowing.",
      protocol: "Days 1–3: 1/2 Matra scoop (1.5g) at lunch. Days 4–14: 1 level scoop (3g) at lunch (halved on Days 7 & 10). Follow with 100 unhurried steps (Shatapavali).",
      classification: "AYURVEDIC CLASSICAL MEDICINE (Shastrokta Aushadhi)",
      batch: "BY-AVI-2024-12",
    },
    {
      id: "bhoomi-amla",
      name: "Bhoomi Amla Churna",
      botanical: "Phyllanthus niruri / Tamalaki (100% Whole Plant Powder)",
      shastra: "Charaka Samhita Sutrasthana 4 & Chikitsa 16 (Pandu/Kamala Chikitsa)",
      action: "Seasonal Liver Detox & Hepatic Protection",
      netWeight: "100g Pure Single-Herb Powder",
      mrp: "₹225.00",
      anupana: "Lukewarm or room-temperature water.",
      rationale: "Delivery Method ('Herbal Shot'): Stir 3g into 50ml water and drink as a single quick shot to eliminate powder fatigue while delivering concentrated bitter (Tikta) principles directly to the liver.",
      protocol: "Early morning empty stomach for 11 consecutive days (Days 4 to 14). Wait 20 minutes before breakfast.",
      classification: "AYURVEDIC CLASSICAL MEDICINE (Shastrokta Aushadhi)",
      batch: "BY-BHM-2024-04",
    },
    {
      id: "ezee-churna",
      name: "Ezee Churna Heritage Blend",
      botanical: "12-Herb Classical Sukhavirechana Formulation",
      shastra: "Heritage Formulation Diaries (Pothis) | Mfg. Lic. No. 25D/23/99",
      action: "Overnight Colon Cleansing & Apana Vata Release",
      netWeight: "100g Heritage Cleansing Blend",
      mrp: "₹275.00",
      anupana: "Strictly lukewarm water (Ushnodaka) at bedtime.",
      rationale: "Warm water relaxes Apana Vata, preventing smooth muscle spasms or abdominal cramping.",
      protocol: "Phase 1 (Nights 1–3): 3g to 5g at bedtime. Phase 2 & 3: 3g ONLY on Nights 7, 10, and 14. Periodic gaps prevent bowel habituation.",
      classification: "AYURVEDIC PROPRIETARY MEDICINE",
      batch: "BY-EZE-2024-09",
    },
  ];

  const currentProduct = products[selectedProductIndex];

  return (
    <div className="relative overflow-hidden bg-brand-off-white text-brand-primary">
      {/* Decorative Gond Art Background Subtle Watermarks */}
      <div className="pointer-events-none absolute -left-20 top-20 text-brand-sand/35 hidden lg:block">
        <GondTreeOfLife className="h-[520px] w-[520px]" />
      </div>
      <div className="pointer-events-none absolute -right-24 top-[900px] text-brand-sand/30 hidden lg:block">
        <GondTreeOfLife className="h-[560px] w-[560px]" />
      </div>

      {/* =========================================================================
          HERO & EXECUTIVE PHILOSOPHY
          ========================================================================= */}
      <section className="relative border-b border-brand-sand/40 py-16 sm:py-24 md:py-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="flex flex-col gap-6 lg:col-span-7">
              {/* Eyebrow with Gond Leaf */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-sand bg-brand-cream/80 px-4 py-1.5 backdrop-blur-xs w-fit">
                <GondLeafIcon className="h-4 w-4 text-brand-leaf-green" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                  3-Phase Panchakarma Architecture
                </span>
                <span className="text-brand-sand">&middot;</span>
                <span className="font-sans text-[11px] font-semibold text-brand-leaf-green">
                  Rooted in Madhya Pradesh
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="flex flex-col gap-2">
                <Heading as="h1" size="display" className="font-serif tracking-tight text-brand-primary">
                  The Unhurried Gut Health Ritual Kit
                </Heading>
                <p className="font-serif text-xl sm:text-2xl italic text-brand-leaf-green">
                  Ancient Wisdom for Modern Living &middot; Pure &bull; Traditional &bull; Natural
                </p>
              </div>

              {/* Shastra Doctrine Quote */}
              <div className="relative rounded-2xl border border-brand-sand/80 bg-brand-cream/60 p-6 backdrop-blur-xs">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-brand-leaf-green shrink-0 mt-1" />
                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-primary">
                      Charaka Samhita &middot; Vimanasthana 2.8–9
                    </span>
                    <p className="font-serif text-sm sm:text-base leading-relaxed italic text-brand-primary/90">
                      &ldquo;Even wholesome, perfectly balanced food turns into Ama (toxic, undigested metabolic residue) when consumed in haste, anxiety, or emotional restlessness.&rdquo;
                    </p>
                    <p className="font-sans text-xs text-brand-primary/75">
                      Modern digestive distress is rarely a failure of nutrition alone; it is a failure of pace. This kit gently decelerates your digestive fire (Agni) through 4 classical formulations, a custom 3g Matra spoon, and conscious pauses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Value Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="flex flex-col border-l-2 border-brand-leaf-green pl-3">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-leaf-green">Lineage</span>
                  <span className="font-serif text-sm font-semibold text-brand-primary">159 Years (Since 1860s)</span>
                </div>
                <div className="flex flex-col border-l-2 border-brand-leaf-green pl-3">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-leaf-green">Origin</span>
                  <span className="font-serif text-sm font-semibold text-brand-primary">Maharaj Bada, Gwalior</span>
                </div>
                <div className="flex flex-col border-l-2 border-brand-leaf-green pl-3">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-leaf-green">Facility</span>
                  <span className="font-serif text-sm font-semibold text-brand-primary">Lic. No. 25D/23/99</span>
                </div>
                <div className="flex flex-col border-l-2 border-brand-leaf-green pl-3">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-leaf-green">Standard</span>
                  <span className="font-serif text-sm font-semibold text-brand-primary">100% Shastrokta AYUSH</span>
                </div>
              </div>
            </div>

            {/* Right: Signature Kit Packaging Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-md rounded-3xl border border-brand-sand bg-brand-cream/90 p-8 shadow-2xl">
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-brand-sand/60 pb-4">
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-leaf-green">
                    Complete 14-Day Protocol Box
                  </span>
                  <span className="rounded-full bg-brand-leaf-green/15 px-2.5 py-0.5 font-sans text-xs font-semibold text-brand-leaf-green">
                    4 Formulations + Spoon
                  </span>
                </div>

                {/* Kit Item List */}
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-brand-ivory">1</span>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-brand-primary">Yashtimadhu Tablet (500mg &middot; 60 Tabs)</h4>
                      <p className="font-sans text-xs text-brand-primary/75">Gastric mucosal soother &amp; mid-morning mind-gut calm</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-brand-ivory">2</span>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-brand-primary">Avipattikar Churna (100g Powder)</h4>
                      <p className="font-sans text-xs text-brand-primary/75">Digestive fire (Agni) balance &amp; lunch sensory ritual</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-brand-ivory">3</span>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-brand-primary">Bhoomi Amla Churna (100g Pure)</h4>
                      <p className="font-sans text-xs text-brand-primary/75">Empty-stomach 50ml rapid herbal shot for liver reset</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-brand-ivory">4</span>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-brand-primary">Ezee Churna Heritage Blend (100g)</h4>
                      <p className="font-sans text-xs text-brand-primary/75">12-herb gentle colon release on scheduled nights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-t border-brand-sand/60 pt-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-leaf-green text-xs font-bold text-brand-ivory">★</span>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-brand-leaf-green">Custom 3g &ldquo;Matra&rdquo; Measuring Spoon</h4>
                      <p className="font-sans text-xs text-brand-primary/75">Hand-carved neem wood or etched brass with Gond handle work</p>
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="mt-8 flex items-center justify-between border-t border-brand-sand pt-6">
                  <div>
                    <span className="block font-sans text-xs text-brand-primary/60 line-through">MRP: ₹1,048.00</span>
                    <span className="font-serif text-2xl font-bold text-brand-primary">₹949.00</span>
                    <span className="block font-sans text-[10px] text-brand-leaf-green">Inclusive of all taxes &amp; tools</span>
                  </div>
                  <Button variant="primary" tone="default" size="lg" className="rounded-full shadow-lg">
                    Begin 14-Day Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Decorative Gond Border */}
      <div className="text-brand-sand py-2">
        <GondPatternBorder />
      </div>

      {/* =========================================================================
          SECTION 2: THE 3-PHASE INTERACTIVE 14-DAY TIMELINE & TRACKER
          ========================================================================= */}
      <section id="tracker" className="py-16 sm:py-24 border-b border-brand-sand/40">
        <Container width="wide" className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <Eyebrow>Progressive Physiology &middot; Charaka Samhita Chikitsa 1/1.24</Eyebrow>
            <Heading as="h2" size="statement" className="font-serif text-brand-primary">
              The 14-Day Ritual Architecture
            </Heading>
            <Text className="text-base text-brand-primary/85">
              &ldquo;Just as a soiled cloth cannot take on a brilliant, pure dye, Rasayana agents and Agni tonics cannot function optimally over an uncleaned, toxic gut (Ashuddha Koshtha).&rdquo;
            </Text>
          </div>

          {/* Phase Selector Tabs (21st.dev style interactive segmented control) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-brand-cream border border-brand-sand max-w-3xl">
            <button
              type="button"
              onClick={() => setActivePhase("phase1")}
              className={`flex flex-col text-left p-4 rounded-xl transition-all cursor-pointer ${
                activePhase === "phase1"
                  ? "bg-brand-primary text-brand-ivory shadow-md scale-[1.01]"
                  : "hover:bg-brand-off-white/70 text-brand-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-bold uppercase tracking-wider">Phase 1</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activePhase === "phase1" ? "bg-brand-ivory/20" : "bg-brand-sand/40"}`}>
                  Days 1–3
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold mt-1">Koshtha-Shodhana</h3>
              <p className={`text-xs mt-1 ${activePhase === "phase1" ? "text-brand-ivory/80" : "text-brand-primary/70"}`}>
                Clearing pathways &amp; trapped colon waste
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActivePhase("phase2")}
              className={`flex flex-col text-left p-4 rounded-xl transition-all cursor-pointer ${
                activePhase === "phase2"
                  ? "bg-brand-primary text-brand-ivory shadow-md scale-[1.01]"
                  : "hover:bg-brand-off-white/70 text-brand-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-bold uppercase tracking-wider">Phase 2</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activePhase === "phase2" ? "bg-brand-ivory/20" : "bg-brand-sand/40"}`}>
                  Days 4–10
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold mt-1">Yakrit &amp; Agni Reset</h3>
              <p className={`text-xs mt-1 ${activePhase === "phase2" ? "text-brand-ivory/80" : "text-brand-primary/70"}`}>
                Hepatic bile cool &amp; mucosal healing
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActivePhase("phase3")}
              className={`flex flex-col text-left p-4 rounded-xl transition-all cursor-pointer ${
                activePhase === "phase3"
                  ? "bg-brand-primary text-brand-ivory shadow-md scale-[1.01]"
                  : "hover:bg-brand-off-white/70 text-brand-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-bold uppercase tracking-wider">Phase 3</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activePhase === "phase3" ? "bg-brand-ivory/20" : "bg-brand-sand/40"}`}>
                  Days 11–14 &amp; Daily
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold mt-1">Rasayana &amp; Samagni</h3>
              <p className={`text-xs mt-1 ${activePhase === "phase3" ? "text-brand-ivory/80" : "text-brand-primary/70"}`}>
                Sealing rhythm &amp; lifelong Dinacharya
              </p>
            </button>
          </div>

          {/* Phase Deep-Dive Card */}
          <div className="rounded-3xl border border-brand-sand bg-brand-cream/60 p-6 sm:p-8">
            {activePhase === "phase1" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-sand/50 pb-4">
                  <div>
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-leaf-green">
                      Days 1 to 3 &middot; Primary Goal
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-brand-primary mt-1">
                      Koshtha-Shodhana: Gentle Colon Pathways Clearance
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-leaf-green/15 text-brand-leaf-green text-xs font-semibold">
                    <Clock className="h-3.5 w-3.5" /> 3-Day Preparation Window
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-3 rounded-2xl bg-brand-off-white/90 p-5 border border-brand-sand/60">
                    <div className="flex items-center gap-2 text-brand-primary">
                      <Sun className="h-4 w-4 text-brand-leaf-green" />
                      <h4 className="font-serif text-base font-bold">Lunch (Unhurried Meal Ritual)</h4>
                    </div>
                    <p className="font-sans text-sm text-brand-primary/85 leading-relaxed">
                      Take a <strong>half-dose of Avipattikar Churna (1.5g to 2g = 1/2 Matra scoop)</strong> mixed in room-temperature water or fresh spiced buttermilk (Takra). Follow with 100 unhurried steps (Shatapavali).
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 rounded-2xl bg-brand-off-white/90 p-5 border border-brand-sand/60">
                    <div className="flex items-center gap-2 text-brand-primary">
                      <Moon className="h-4 w-4 text-brand-leaf-green" />
                      <h4 className="font-serif text-base font-bold">Bedtime (Letting-Go Ritual)</h4>
                    </div>
                    <p className="font-sans text-sm text-brand-primary/85 leading-relaxed">
                      Take <strong>Ezee Churna (3g to 5g = 1 level Matra scoop)</strong> stirred into a 50ml lukewarm herbal shot, followed by a full glass of warm water (Ushnodaka) on Nights 1, 2, and 3.
                    </p>
                  </div>
                </div>

                {/* Clinical Safety Banner */}
                <div className="rounded-2xl border-l-4 border-amber-600 bg-amber-500/10 p-4.5 text-brand-primary flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-amber-900">
                      Mandatory Clinical Safety Rule &middot; Double-Virechana Prevention
                    </h5>
                    <p className="font-sans text-xs leading-relaxed text-brand-primary/90">
                      Avipattikar contains ~50% Nishot (Trivrit), and Ezee Churna contains 50% active Virechana herbs (Sanay 20%, Nishot 10%, Kala Dana 10%, Revanchini 10%). To prevent excessive purgation, intestinal cramping, or fluid loss, <strong>Avipattikar Churna must be strictly restricted to a 1.5g half-dose</strong> on all days when Ezee Churna is administered.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activePhase === "phase2" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-sand/50 pb-4">
                  <div>
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-leaf-green">
                      Days 4 to 10 &middot; Primary Goal
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-brand-primary mt-1">
                      Yakrit Shuddhi &amp; Agni Deepana: Liver &amp; Gastric Mucosal Healing
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-leaf-green/15 text-brand-leaf-green text-xs font-semibold">
                    <Sparkles className="h-3.5 w-3.5" /> 7-Day Deep Core Reset
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col gap-2 rounded-2xl bg-brand-off-white/90 p-4 border border-brand-sand/60">
                    <span className="font-sans text-[11px] font-bold uppercase text-brand-leaf-green">1. Early Morning Empty Stomach</span>
                    <h4 className="font-serif text-base font-bold text-brand-primary">Bhoomi Amla 50ml Shot</h4>
                    <p className="font-sans text-xs text-brand-primary/80 leading-relaxed">
                      3g (1 level scoop) stirred into 50ml water. Quick shot followed by plain water. Wait 20 mins before tea/breakfast.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 rounded-2xl bg-brand-off-white/90 p-4 border border-brand-sand/60">
                    <span className="font-sans text-[11px] font-bold uppercase text-brand-leaf-green">2. Mid-Morning Post-Breakfast</span>
                    <h4 className="font-serif text-base font-bold text-brand-primary">Yashtimadhu Tablet</h4>
                    <p className="font-sans text-xs text-brand-primary/80 leading-relaxed">
                      1 to 2 tablets with clay-pot water or warm milk. Pair with 5 slow, deep abdominal breaths away from screens.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 rounded-2xl bg-brand-off-white/90 p-4 border border-brand-sand/60">
                    <span className="font-sans text-[11px] font-bold uppercase text-brand-leaf-green">3. Lunch Unhurried Meal</span>
                    <h4 className="font-serif text-base font-bold text-brand-primary">Avipattikar &ldquo;Savor&rdquo;</h4>
                    <p className="font-sans text-xs text-brand-primary/80 leading-relaxed">
                      Full dose of 3g placed on tongue for 3 seconds to trigger cephalic digestive enzymes. Follow with water &amp; 100 steps. (Halved on Days 7 &amp; 10).
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 rounded-2xl bg-brand-off-white/90 p-4 border border-brand-sand/60">
                    <span className="font-sans text-[11px] font-bold uppercase text-brand-leaf-green">4. Bedtime Periodic Release</span>
                    <h4 className="font-serif text-base font-bold text-brand-primary">Days 7 &amp; 10 ONLY</h4>
                    <p className="font-sans text-xs text-brand-primary/80 leading-relaxed">
                      Take 3g Ezee Churna with warm water ONLY on Nights 7 and 10. Rest days prevent bowel dependency and habituation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activePhase === "phase3" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-sand/50 pb-4">
                  <div>
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-leaf-green">
                      Days 11 to 14 &amp; Ongoing &middot; Primary Goal
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-brand-primary mt-1">
                      Rasayana &amp; Samagni Sthapana: Sealing the Rhythm
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-leaf-green/15 text-brand-leaf-green text-xs font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" /> Sustainable Daily Habit
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-3 rounded-2xl bg-brand-off-white/90 p-5 border border-brand-sand/60">
                    <div className="flex items-center gap-2 text-brand-primary">
                      <Sparkles className="h-4 w-4 text-brand-leaf-green" />
                      <h4 className="font-serif text-base font-bold">Days 11–14: Concluding the Cleanse</h4>
                    </div>
                    <p className="font-sans text-sm text-brand-primary/85 leading-relaxed">
                      Complete the 11-day liver reset with 3g Bhoomi Amla on empty stomach through Day 14. Take a final bedtime release of 3g Ezee Churna on Night 14 to seal the 14-day reset. After Day 14, pause both.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 rounded-2xl bg-brand-primary p-5 text-brand-ivory border border-brand-primary">
                    <div className="flex items-center gap-2 text-brand-sand">
                      <Wind className="h-4 w-4" />
                      <h4 className="font-serif text-base font-bold">Lifelong Daily Dinacharya (Day 15+)</h4>
                    </div>
                    <p className="font-sans text-sm text-brand-ivory/90 leading-relaxed">
                      Continue <strong>Yashtimadhu Tablet (Mid-Morning Mind-Gut Pause)</strong> and <strong>Avipattikar Churna (Lunch Unhurried Meal + 100 Steps)</strong> as your permanent, non-habit forming gut-brain balance.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 14-Day Master Schedule Table */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-primary">
                  14-Day Master Ritual Schedule
                </h3>
                <p className="font-sans text-xs text-brand-primary/70">
                  Sequential protocol across all 3 phases &middot; Designed for steady digestive pacing without bowel habituation.
                </p>
              </div>
              <span className="font-sans text-xs font-semibold px-3 py-1 rounded-full bg-brand-cream border border-brand-sand text-brand-primary w-fit">
                Panchakarma Protocol Matrix
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-brand-sand bg-brand-off-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-brand-sand bg-brand-cream/80 text-brand-primary uppercase tracking-wider font-sans text-[10px]">
                    <th className="py-3 px-4 font-bold">Day</th>
                    <th className="py-3 px-4 font-bold">Phase</th>
                    <th className="py-3 px-4 font-bold">Early Morning (Shot)</th>
                    <th className="py-3 px-4 font-bold">Mid-Morning (Mind Pause)</th>
                    <th className="py-3 px-4 font-bold">Lunch (Unhurried Meal)</th>
                    <th className="py-3 px-4 font-bold">Bedtime (Letting-Go)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-sand/40 font-sans">
                  {SCHEDULE_DATA.map((row) => (
                    <tr
                      key={row.day}
                      className="hover:bg-brand-cream/40 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-brand-primary">
                        {row.day < 10 ? `0${row.day}` : row.day}
                      </td>
                      <td className="py-3 px-4 font-serif font-medium text-brand-primary">
                        {row.phase}
                        {row.specialNote && (
                          <span className="block text-[10px] text-amber-900 font-sans mt-0.5">
                            * {row.specialNote}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-brand-primary/80">{row.morning}</td>
                      <td className="py-3 px-4 text-brand-primary/80">{row.midMorning}</td>
                      <td className="py-3 px-4 font-medium text-brand-primary">{row.lunch}</td>
                      <td className="py-3 px-4 text-brand-primary/90">{row.bedtime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3: THE 4 FORMULATIONS & AYUSH COMPOSITION PANELS
          ========================================================================= */}
      <section id="formulations" className="py-16 sm:py-24 border-b border-brand-sand/40 bg-brand-cream/30">
        <Container width="wide" className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <Eyebrow>Shastrokta Classical Medicines &middot; Zero Synthetic Binders</Eyebrow>
            <Heading as="h2" size="statement" className="font-serif text-brand-primary">
              The 4 Classical Formulations
            </Heading>
            <Text className="text-base text-brand-primary/80">
              In strict accordance with Indian AYUSH guidelines, all formulations are classified as Classical Shastrokta Aushadhi or Heritage Proprietary formulations. No US FDA &ldquo;Supplement Facts&rdquo; or vague claims.
            </Text>
          </div>

          {/* Product Selector Buttons (Cosmos & 21st.dev style tabs) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {products.map((prod, idx) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => setSelectedProductIndex(idx)}
                className={`flex flex-col p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedProductIndex === idx
                    ? "bg-brand-primary text-brand-ivory border-brand-primary shadow-lg scale-[1.02]"
                    : "bg-brand-off-white text-brand-primary border-brand-sand hover:border-brand-primary/40"
                }`}
              >
                <span className={`font-sans text-[10px] font-bold uppercase tracking-widest ${selectedProductIndex === idx ? "text-brand-sand" : "text-brand-leaf-green"}`}>
                  Formula 0{idx + 1}
                </span>
                <span className="font-serif text-base font-bold mt-1">{prod.name}</span>
                <span className={`font-sans text-xs mt-1 ${selectedProductIndex === idx ? "text-brand-ivory/80" : "text-brand-primary/70"}`}>
                  {prod.mrp} &middot; {prod.netWeight}
                </span>
              </button>
            ))}
          </div>

          {/* Active Product Detailed Card */}
          <div className="rounded-3xl border border-brand-sand bg-brand-off-white p-6 sm:p-10 shadow-xl grid gap-8 lg:grid-cols-12">
            {/* Left 7 Cols: Clinical & Methodological Details */}
            <div className="flex flex-col gap-5 lg:col-span-7">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-brand-leaf-green/15 px-3 py-1 font-sans text-xs font-bold uppercase text-brand-leaf-green">
                  {currentProduct.classification}
                </span>
                <span className="font-sans text-xs text-brand-primary/60">Batch: {currentProduct.batch}</span>
              </div>

              <div>
                <h3 className="font-serif text-3xl font-bold text-brand-primary">{currentProduct.name}</h3>
                <p className="font-sans text-sm font-semibold text-brand-leaf-green mt-1">{currentProduct.action}</p>
              </div>

              <div className="flex flex-col gap-2 rounded-xl bg-brand-cream/60 p-4 border border-brand-sand/60">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand-primary">Classical Shastra Authority</span>
                <p className="font-serif text-sm italic text-brand-primary/90">{currentProduct.shastra}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1 border-l-2 border-brand-leaf-green pl-3">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-leaf-green">Anupana (Vehicle)</span>
                  <span className="font-sans text-xs text-brand-primary/85">{currentProduct.anupana}</span>
                </div>
                <div className="flex flex-col gap-1 border-l-2 border-brand-leaf-green pl-3">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-leaf-green">Daily Protocol</span>
                  <span className="font-sans text-xs text-brand-primary/85">{currentProduct.protocol}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand-primary">Sensory &amp; Physiological Rationale</span>
                <p className="font-sans text-xs text-brand-primary/80 leading-relaxed">{currentProduct.rationale}</p>
              </div>

              {/* If Ezee Churna, Render the 4-Tier Pharmacological Synergy Table */}
              {currentProduct.id === "ezee-churna" && (
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-brand-sand bg-brand-cream/50 p-4">
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-primary">
                    Ezee Churna: 4-Tier Pharmacological Synergy Matrix
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-brand-off-white border border-brand-sand/60">
                      <span className="font-bold text-brand-primary block">Tier 1: Active Virechana (50%)</span>
                      <span className="text-[11px] text-brand-primary/75">Sanay (20%), Nishot (10%), Kala Dana (10%), Revanchini (10%)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-brand-off-white border border-brand-sand/60">
                      <span className="font-bold text-brand-primary block">Tier 2: Mucosal Buffers (18%)</span>
                      <span className="text-[11px] text-brand-primary/75">Belgiri (10%), Amla (5%), Isabgol (3%)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-brand-off-white border border-brand-sand/60">
                      <span className="font-bold text-brand-primary block">Tier 3: Vata Anulomana (22%)</span>
                      <span className="text-[11px] text-brand-primary/75">Sendha Namak (5%), Kala Namak (5%), Harad (10%), Sada Namak (2%)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-brand-off-white border border-brand-sand/60">
                      <span className="font-bold text-brand-primary block">Tier 4: Krimi-Nashaka (10%)</span>
                      <span className="text-[11px] text-brand-primary/75">Vaividang (10%) clears pathogenic microflora</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Cols: Standardized Indian AYUSH Label Preview */}
            <div className="lg:col-span-5 flex flex-col gap-4 justify-between rounded-2xl border border-brand-sand bg-[#2A1808] p-6 text-brand-ivory">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-brand-sand/20 pb-3">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-brand-sand">
                    Official AYUSH Box Label
                  </span>
                  <span className="font-mono text-xs text-brand-sand">Lic: 25D/23/99</span>
                </div>

                <div>
                  <span className="block font-sans text-xs uppercase tracking-wider text-brand-sand">BABA AYURVEDA</span>
                  <h4 className="font-serif text-xl font-bold text-brand-ivory">{currentProduct.name}</h4>
                  <span className="text-xs text-brand-sand/80">{currentProduct.netWeight} &middot; MRP: {currentProduct.mrp}</span>
                </div>

                <div className="flex flex-col gap-1 border-t border-brand-sand/20 pt-3">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-sand">Ayurvedic Composition:</span>
                  <p className="font-sans text-xs text-brand-ivory/85 leading-relaxed">{currentProduct.botanical}</p>
                </div>

                <div className="flex flex-col gap-1 border-t border-brand-sand/20 pt-3">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-sand">Manufactured By:</span>
                  <p className="font-sans text-xs text-brand-ivory/85">
                    Baba Ayurved Pharmacy, Industrial Area, Gwalior, M.P.
                  </p>
                </div>
              </div>

              <div className="border-t border-brand-sand/20 pt-4 flex items-center justify-between text-xs text-brand-sand/80">
                <span>Shastrokta Standard</span>
                <span className="font-bold text-brand-ivory">Pure &bull; Traditional &bull; Natural</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4: TACTILE RITUAL TOOL: THE 3G "MATRA" MEASURING SPOON
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-brand-sand/40">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="flex flex-col gap-5 lg:col-span-6">
              <Eyebrow>Precision Dosing &middot; Tactile Calibration</Eyebrow>
              <Heading as="h2" size="statement" className="font-serif text-brand-primary">
                The Custom 3g &ldquo;Matra&rdquo; Measuring Spoon
              </Heading>
              <Text className="text-base text-brand-primary/85 leading-relaxed">
                In classical Ayurveda, a <em>Matra</em> is not a casual pinch or an inconsistent kitchen tablespoon; it is a calibrated therapeutic unit. To eliminate measuring guesswork and ensure clinical efficacy across all 14 days, every kit includes our custom-crafted measuring spoon.
              </Text>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-start gap-3">
                  <GondLeafIcon className="h-4 w-4 text-brand-leaf-green shrink-0 mt-1" />
                  <p className="font-sans text-sm text-brand-primary/85">
                    <strong>Solid Hand-Carved Neem Wood or Etched Brass:</strong> Naturally antimicrobial materials chosen to maintain raw botanical energetics.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <GondLeafIcon className="h-4 w-4 text-brand-leaf-green shrink-0 mt-1" />
                  <p className="font-sans text-sm text-brand-primary/85">
                    <strong>Single Debossed Fill Line (1 Level Scoop = 3g):</strong> Exact calibrated dosage for Bhoomi Amla, Avipattikar, and Ezee Churna.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <GondLeafIcon className="h-4 w-4 text-brand-leaf-green shrink-0 mt-1" />
                  <p className="font-sans text-sm text-brand-primary/85">
                    <strong>Gond Tribal Motif Handle Engraving:</strong> Subtle dot-work honoring the indigenous tribal artisans of Madhya Pradesh.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <GondLeafIcon className="h-4 w-4 text-brand-leaf-green shrink-0 mt-1" />
                  <p className="font-sans text-sm text-brand-primary/85">
                    <strong>Natural Jute Twine Binding:</strong> Hand-tied securely to the inner recycled board box divider.
                  </p>
                </div>
              </div>
            </div>

            {/* Vector Tool Display Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-brand-sand bg-brand-cream/60 p-8 shadow-xl flex flex-col items-center justify-center text-center">
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-brand-leaf-green mb-6">
                  Tactile Ritual Specimen &middot; 1 Level Scoop = 3g
                </span>

                <div className="w-full py-6 flex items-center justify-center">
                  <AnimatedMatraSpoon className="w-full max-w-md text-brand-primary" />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-brand-sand/60 pt-6 w-full text-center">
                  <div>
                    <span className="block font-sans text-[10px] uppercase tracking-wider text-brand-primary/60">Calibrated Matra</span>
                    <span className="font-serif text-sm font-bold text-brand-primary">Exactly 3.0 Grams</span>
                  </div>
                  <div>
                    <span className="block font-sans text-[10px] uppercase tracking-wider text-brand-primary/60">Material</span>
                    <span className="font-serif text-sm font-bold text-brand-primary">Neem Wood / Brass</span>
                  </div>
                  <div>
                    <span className="block font-sans text-[10px] uppercase tracking-wider text-brand-primary/60">Craftsmanship</span>
                    <span className="font-serif text-sm font-bold text-brand-primary">Gond Engraved Handle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5: VERBATIM BILINGUAL LETTER OF GRATITUDE (PARCHMENT CARD)
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-brand-sand/40 bg-brand-cream/40">
        <Container width="wide" className="flex flex-col items-center">
          <div className="max-w-3xl w-full flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <Eyebrow>From Our Family to Yours</Eyebrow>
                <Heading as="h2" size="statement" className="font-serif text-brand-primary mt-1">
                  Letter of Gratitude
                </Heading>
              </div>

              {/* Language Switcher Pill */}
              <div className="inline-flex items-center gap-1 p-1 rounded-full border border-brand-sand bg-brand-off-white shadow-xs">
                <button
                  type="button"
                  onClick={() => setLetterLanguage("en")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
                    letterLanguage === "en"
                      ? "bg-brand-primary text-brand-ivory shadow-xs"
                      : "text-brand-primary/70 hover:text-brand-primary"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLetterLanguage("hi")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
                    letterLanguage === "hi"
                      ? "bg-brand-primary text-brand-ivory shadow-xs"
                      : "text-brand-primary/70 hover:text-brand-primary"
                  }`}
                >
                  हिंदी (Hindi)
                </button>
              </div>
            </div>

            {/* Parchment Styled Letter Card */}
            <div className="relative rounded-3xl border border-brand-sand/90 bg-[#FAF5ED] p-8 sm:p-12 shadow-xl backdrop-blur-xs">
              {/* Subtle Decorative Corner Accent */}
              <div className="absolute right-6 top-6 text-brand-sand/60">
                <GondLeafIcon className="h-8 w-8" />
              </div>

              {letterLanguage === "en" ? (
                <div className="flex flex-col gap-5 font-serif text-base sm:text-lg leading-relaxed text-brand-primary">
                  <p className="font-semibold text-xl">Dear Friend,</p>
                  <p>Welcome to the Baba Ayurveda family.</p>
                  <p>
                    Nearly 159 years ago, our ancestors journeyed from Rajasthan to the vibrant heart of Gwalior, establishing a lineage of healing around Maharaj Bada. Practicing as Hakims, they prepared every churna, syrup, and tablet by hand, guided by classical Shastras and an unwavering reverence for nature.
                  </p>
                  <p>
                    This clinical wisdom was meticulously recorded in handwritten formulation diaries—our family <em>Pothis</em>—passed down through generations. In 1999, our father fulfilled a lifelong dream by setting up our dedicated manufacturing facility in Gwalior under License Number <strong>25D/23/99</strong>, ensuring these sacred formulas could be preserved without compromise.
                  </p>
                  <p>
                    In creating <em>The Unhurried Gut Health Ritual Kit</em>, we invite you to honor not just the herbs, but the rhythm with which you consume them. True healing begins when we slow down, respect our digestive fire (Agni), and grant the body the time it needs to restore itself.
                  </p>
                  <p>
                    May this 14-day ritual bring deep harmony, lightness, and vitality to your life.
                  </p>
                  <div className="pt-4 border-t border-brand-sand/50 flex flex-col gap-1 font-sans text-sm">
                    <span className="font-serif italic font-semibold text-lg text-brand-primary">
                      With warm regards and blessings,
                    </span>
                    <span className="font-bold text-brand-primary">The Family Behind Baba Ayurved Pharmacy</span>
                    <span className="text-xs text-brand-leaf-green">Gwalior, Madhya Pradesh &middot; Est. 1860s</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5 font-hindi text-base sm:text-lg leading-relaxed text-brand-primary">
                  <p className="font-semibold text-xl font-serif">प्रिय मित्र,</p>
                  <p>बाबा आयुर्वेद परिवार में आपका सहहृदय स्वागत है।</p>
                  <p>
                    लगभग 159 वर्ष पूर्व, हमारे पूर्वज राजस्थान से ग्वालियर के ऐतिहासिक महाराज बाड़ा क्षेत्र में आए और जनकल्याण हेतु आयुर्वेद सेवा की नींव रखी। हमारे परदादा जी ने एक हकीम व वैद्य के रूप में शास्त्रीय विधियों द्वारा स्वयं अपने हाथों से चूर्ण, सिरप और वटियाँ तैयार कर चिकित्सा कार्य प्रारंभ किया।
                  </p>
                  <p>
                    पीढ़ियों से चली आ रही इस गहन चिकित्सीय ज्ञान परंपरा को हमारी हस्तलिखित पोथियों में सुरक्षित रखा गया। इसी परंपरा को आगे बढ़ाते हुए, हमारे पूज्य पिता जी ने वर्ष 1999 में ग्वालियर में लाइसेंस नं. <strong>25D/23/99</strong> के तहत हमारी अपनी समर्पित निर्माण इकाई की स्थापना की, ताकि इन पवित्र औषधियों की शुद्धता और प्रभावकारिता बनी रहे।
                  </p>
                  <p>
                    &lsquo;द अनहरिड गट हेल्थ रिचुअल किट&rsquo; के माध्यम से हम आपको न केवल इन जड़ी-बूटियों का लाभ लेने, बल्कि अपने आहार और जीवन की गति को थोड़ा धीमा करने का निमंत्रण देते हैं। वास्तविक स्वास्थ्य तब प्रारंभ होता है जब हम ठहराव लाते हैं, अपनी जठराग्नि का सम्मान करते हैं और शरीर को स्वयं स्वस्थ होने का समय देते हैं।
                  </p>
                  <p>
                    आशा है कि यह 14-दिवसीय अनुष्ठान आपके जीवन में आरोग्य, सुपाच्यता और नई ऊर्जा लेकर आएगा।
                  </p>
                  <div className="pt-4 border-t border-brand-sand/50 flex flex-col gap-1 font-sans text-sm">
                    <span className="font-hindi font-medium text-lg text-brand-primary">
                      सस्नेह एवं शुभकामनाओं सहित,
                    </span>
                    <span className="font-bold text-brand-primary">बाबा आयुर्वेद फार्मेसी परिवार</span>
                    <span className="text-xs text-brand-leaf-green">ग्वालियर, मध्य प्रदेश</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6: BOTTOM CALL TO ACTION
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-brand-primary text-brand-ivory text-center">
        <Container width="wide" className="flex flex-col items-center gap-6 max-w-2xl">
          <GondLeafIcon className="h-8 w-8 text-brand-sand" />
          <Heading as="h2" size="statement" className="font-serif text-brand-ivory">
            Begin Your 14-Day Unhurried Journey
          </Heading>
          <p className="font-serif text-base sm:text-lg italic text-brand-sand/90">
            Restore the natural rhythm of Agni with Shastrokta precision, conscious meal pauses, and Central Indian botanical heritage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button variant="primary" tone="reversed" size="lg" className="rounded-full shadow-xl">
              Order The Kit (₹949 &middot; Complete 14-Day Box)
            </Button>
            <Link
              href="/shop"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-sand/40 px-8 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory hover:bg-white/10 transition-colors"
            >
              Explore All Preparations <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

