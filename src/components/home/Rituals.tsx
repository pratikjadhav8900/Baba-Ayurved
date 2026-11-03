"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Container } from "@/components/ui/Container";

interface RitualStep {
  id: string;
  stepNumber: string;
  practice: string;
  sanskrit: string;
  term: string;
  shortSummary: string;
  classicalText: string;
  actionGuidance: string;
  timing: string;
  vesselOrTool: string;
  tag: string;
  imageSrc: string;
}

const morningSteps: RitualStep[] = [
  {
    id: "ushapan",
    stepNumber: "01",
    practice: "Warm Water on Waking",
    sanskrit: "उषःपान",
    term: "Ushapan",
    shortSummary: "Warm, ionized water consumed immediately upon opening the eyes at dawn to stimulate natural peristalsis.",
    classicalText: "Charaka Samhita, Sutrasthana Ch. 5",
    actionGuidance: "Drink 250–500ml of warm water stored in a pure brass or copper vessel overnight. Sip while seated unhurriedly.",
    timing: "05:30 – 06:30 AM (Brahma Muhurta)",
    vesselOrTool: "Pure brass or tamra (copper) lota",
    tag: "Internal Cleansing",
    imageSrc: "/images/lota.jpg",
  },
  {
    id: "jihwa",
    stepNumber: "02",
    practice: "Tongue Scraping",
    sanskrit: "जिह्वा निर्लेखन",
    term: "Jihwa Nirlekhana",
    shortSummary: "Clearing nocturnal digestive biofilm (ama) before it can be reabsorbed into the system.",
    classicalText: "Sushruta Samhita, Chikitsasthana Ch. 24",
    actionGuidance: "Gently glide a smooth copper scraper from the root of the tongue to the tip 7 to 14 times without pressing harshly.",
    timing: "Directly after waking",
    vesselOrTool: "Pure curved copper or silver scraper",
    tag: "Oral Hygiene",
    imageSrc: "/images/mortar-pestle.jpg",
  },
  {
    id: "kavala",
    stepNumber: "03",
    practice: "Oil Pulling & Gargle",
    sanskrit: "कवल धारण",
    term: "Kavala / Gandusha",
    shortSummary: "Holding and swishing cold-pressed botanical oil to nourish teeth roots and clarify sensory channels.",
    classicalText: "Charaka Samhita, Sutrasthana 5:78",
    actionGuidance: "Take one tablespoon of warm cold-pressed black sesame (tila) taila. Swish gently between teeth for 3–5 minutes until thin and milky.",
    timing: "Post-tongue cleansing",
    vesselOrTool: "Cold-pressed Tila Taila or Arimedadi Taila",
    tag: "Sensory Clarification",
    imageSrc: "/images/taila-oil.jpg",
  },
  {
    id: "danta",
    stepNumber: "04",
    practice: "Astringent Tooth Cleansing",
    sanskrit: "दन्त धावन",
    term: "Danta Dhavana",
    shortSummary: "Cleansing the teeth with bitter and astringent herbal churnas to fortify oral enamel.",
    classicalText: "Ashtanga Hridaya, Sutrasthana Ch. 2",
    actionGuidance: "Brush with herbal tooth powders containing Babool bark, Neem, Clove, and Saindhava salt to protect oral flora.",
    timing: "Morning ritual completion",
    vesselOrTool: "Classical Kashaya tooth powder or neem twig",
    tag: "Gum Fortification",
    imageSrc: "/brand/packaging/packaging-tins-boxes.webp",
  },
  {
    id: "abhyanga",
    stepNumber: "05",
    practice: "Rhythmic Warm Oil Bath",
    sanskrit: "अभ्यङ्ग एवं स्नान",
    term: "Abhyanga & Snana",
    shortSummary: "Grounding the nervous system with warm medicinal oil before the morning bath.",
    classicalText: "Charaka Samhita, Sutrasthana 5:88",
    actionGuidance: "Apply warm botanical oil in long strokes over limbs and circular motions over joints. Allow 15 minutes before warm water bath.",
    timing: "Prior to breakfast",
    vesselOrTool: "Warm Dhanwantharam or Sesame Taila",
    tag: "Longevity & Agni",
    imageSrc: "/brand/packaging/packaging-bottles-dropper.webp",
  },
];

const eveningSteps: RitualStep[] = [
  {
    id: "laghu-ahara",
    stepNumber: "01",
    practice: "Light, Early Dinner",
    sanskrit: "लघु आहार",
    term: "Laghu Ahara",
    shortSummary: "A warm, digestible meal consumed before or near sunset to avoid nocturnal digestive burden.",
    classicalText: "Charaka Samhita, Chikitsasthana",
    actionGuidance: "Easily digestible khichari, spiced lentil soups, or steamed vegetables. Avoid raw, heavy, or curd-based foods at night.",
    timing: "06:30 – 07:30 PM",
    vesselOrTool: "Warm earthen or brass katori",
    tag: "Metabolic Peace",
    imageSrc: "/brand/packaging/packaging-boxes-stack.webp",
  },
  {
    id: "padabhyanga",
    stepNumber: "02",
    practice: "Warm Foot Massage",
    sanskrit: "पादाभ्यङ्ग",
    term: "Padabhyanga",
    shortSummary: "Massaging warm herbal oil into the soles to draw excess mental heat downward and calm Vata.",
    classicalText: "Sushruta Samhita, Chikitsasthana",
    actionGuidance: "Warm a few drops of Ksheerabala or sesame oil. Rub firmly into the arch, balls, and pads of the feet for 5 minutes.",
    timing: "30 minutes before sleep",
    vesselOrTool: "Warm Ksheerabala Taila & bronze bowl",
    tag: "Deep Somatic Calm",
    imageSrc: "/brand/packaging/packaging-bottles-dropper.webp",
  },
  {
    id: "soumya-paana",
    stepNumber: "03",
    practice: "Warm Calming Infusion",
    sanskrit: "सौम्य कषाय",
    term: "Soumya Kashayam",
    shortSummary: "A small cup of warm spiced milk or herbal infusion to settle restless thoughts.",
    classicalText: "Bhavaprakasha Nighantu",
    actionGuidance: "Boil milk or water with a pinch of nutmeg (jaiphal), green cardamom, and ashwagandha to settle restless thoughts.",
    timing: "Pre-bedtime",
    vesselOrTool: "Warm brass or ceramic mug",
    tag: "Ojas Nourishment",
    imageSrc: "/images/lamp.jpg",
  },
  {
    id: "nidra",
    stepNumber: "04",
    practice: "Unhurried Rest",
    sanskrit: "निद्रा",
    term: "Nidra",
    shortSummary: "Entering slumber in complete darkness to rebuild ojas and tissue vitality.",
    classicalText: "Charaka Samhita, Sutrasthana 21:35",
    actionGuidance: "Darken sleeping quarters completely, disconnect from artificial screens, and sleep facing east or south.",
    timing: "By 10:00 PM (Kapha cycle)",
    vesselOrTool: "Clean natural fiber bedding",
    tag: "Cellular Rejuvenation",
    imageSrc: "/images/lamp.jpg",
  },
];

const rasayanaSteps: RitualStep[] = [
  {
    id: "amalaki-rasayana",
    stepNumber: "01",
    practice: "Wild Amalaki Awaleha",
    sanskrit: "आमलकी रसायन",
    term: "Amalaki",
    shortSummary: "Prime classical Rasayana fruit, cooling Pitta while preserving cellular longevity and ascorbic vitality.",
    classicalText: "Charaka Samhita, Chikitsasthana 1:1",
    actionGuidance: "Consume 1 teaspoon at sunrise with lukewarm mountain spring water or raw forest honey to fortify metabolic immunity.",
    timing: "Sunrise / Dawn",
    vesselOrTool: "Silver or wooden spoon",
    tag: "Ascorbic Vitality",
    imageSrc: "/brand/rituals/rasayana-glow-1.jpg",
  },
  {
    id: "ashwagandha-rasayana",
    stepNumber: "02",
    practice: "Vindhya Ashwagandha",
    sanskrit: "अश्वगन्धा चूर्ण",
    term: "Ashwagandha",
    shortSummary: "Wild-harvested roots traditionally compounded to fortify Ojas, ground restless Vata, and support physical endurance.",
    classicalText: "Charaka Samhita, Chikitsasthana",
    actionGuidance: "Mix 1 sachet into warm grass-fed cow's milk or nut milk before evening meditation or sleep.",
    timing: "Post-workout or Dusk",
    vesselOrTool: "Warm milk & brass tumbler",
    tag: "Cellular Stamina",
    imageSrc: "/brand/rituals/rasayana-glow-2.jpg",
  },
  {
    id: "triphala-rasayana",
    stepNumber: "03",
    practice: "Three Sacred Fruits",
    sanskrit: "त्रिफला चूर्ण",
    term: "Triphala",
    shortSummary: "Haritaki, Bibhitaki, and Amalaki compounded in classical balance to harmonize digestion and gently detoxify tissues.",
    classicalText: "Sushruta Samhita, Sutrasthana 38",
    actionGuidance: "Take 2 capsules or 1/2 tsp churna with warm water before sleep for nightly cellular reset and whole-body vitality.",
    timing: "Pre-bedtime",
    vesselOrTool: "Copper or earthen water vessel",
    tag: "Tridoshic Balance",
    imageSrc: "/brand/rituals/rasayana-glow-3.jpg",
  },
  {
    id: "brahmi-rasayana",
    stepNumber: "04",
    practice: "Medhya Brahmi Ghrita",
    sanskrit: "ब्राह्मी घृत",
    term: "Brahmi",
    shortSummary: "Classical Medhya rasayana celebrated in Charaka Samhita for cognitive tranquility, sharp focus, and mental equilibrium.",
    classicalText: "Charaka Samhita, Sharirasthana",
    actionGuidance: "Consume 1 capsule or 1/2 tsp warm infused ghrita upon morning meditation to sharpen neural recall and calm mental chatter.",
    timing: "Morning meditation",
    vesselOrTool: "Warm water or pure A2 Ghee",
    tag: "Cognitive Radiance",
    imageSrc: "/brand/rituals/rasayana-glow-4.jpg",
  },
];

interface GlowCardItem {
  step: RitualStep;
  verticalText: string;
  taglinePrimary: string;
  taglineSecondary: string;
  taglineStyle?: "standard" | "glow-from-within";
  bgImage: string;
  productImage: string;
  productPos: "bottom-left" | "bottom-right";
}

const morningGlowCards: GlowCardItem[] = [
  {
    step: morningSteps[0], // Ushapan
    verticalText: "USHAPAN",
    taglinePrimary: "Youthful Awakening.",
    taglineSecondary: "Effortless Glow.",
    taglineStyle: "standard",
    bgImage: "/brand/rituals/glow-card-1.jpg",
    productImage: "/brand/products/triphala-bottle.jpg",
    productPos: "bottom-right",
  },
  {
    step: morningSteps[1], // Jihwa Nirlekhana
    verticalText: "JIHWA",
    taglinePrimary: "Botanical Reset.",
    taglineSecondary: "Sensory Clarity.",
    taglineStyle: "standard",
    bgImage: "/brand/rituals/glow-card-2.jpg",
    productImage: "/brand/products/ashwagandha-pack.jpg",
    productPos: "bottom-left",
  },
  {
    step: morningSteps[2], // Kavala
    verticalText: "KAVALA",
    taglinePrimary: "glow",
    taglineSecondary: "from\nwithin",
    taglineStyle: "glow-from-within",
    bgImage: "/brand/rituals/glow-card-3.jpg",
    productImage: "/brand/products/taila-bottle.jpg",
    productPos: "bottom-left",
  },
  {
    step: morningSteps[4], // Abhyanga
    verticalText: "ABHYANGA",
    taglinePrimary: "Pure Abhyanga.",
    taglineSecondary: "Deep Grounding.",
    taglineStyle: "standard",
    bgImage: "/brand/rituals/glow-card-4.jpg",
    productImage: "/brand/products/shilajit-tub.jpg",
    productPos: "bottom-right",
  },
  {
    step: morningSteps[3], // Danta Dhavana
    verticalText: "DANTA",
    taglinePrimary: "Astringent Purity.",
    taglineSecondary: "Oral Radiance.",
    taglineStyle: "standard",
    bgImage: "/brand/rituals/glow-card-1.jpg",
    productImage: "/brand/products/brahmi-bottle.jpg",
    productPos: "bottom-right",
  },
];

const eveningGlowCards: GlowCardItem[] = [
  {
    step: eveningSteps[0], // Laghu Ahara
    verticalText: "AHARA",
    taglinePrimary: "Sunset Nourishment.",
    taglineSecondary: "Metabolic Ease.",
    taglineStyle: "standard",
    bgImage: "/brand/rituals/evening-glow-1.jpg",
    productImage: "/brand/products/triphala-bottle.jpg",
    productPos: "bottom-right",
  },
  {
    step: eveningSteps[1], // Padabhyanga
    verticalText: "PADABHYANGA",
    taglinePrimary: "Warm Taila.",
    taglineSecondary: "Somatic Calm.",
    taglineStyle: "standard",
    bgImage: "/brand/rituals/evening-glow-2.jpg",
    productImage: "/brand/products/taila-bottle.jpg",
    productPos: "bottom-left",
  },
  {
    step: eveningSteps[2], // Soumya Paana
    verticalText: "SOUMYA",
    taglinePrimary: "soothe",
    taglineSecondary: "the\nsenses",
    taglineStyle: "glow-from-within",
    bgImage: "/brand/rituals/evening-glow-3.jpg",
    productImage: "/brand/products/ashwagandha-pack.jpg",
    productPos: "bottom-left",
  },
  {
    step: eveningSteps[3], // Nidra
    verticalText: "NIDRA",
    taglinePrimary: "Unhurried Rest.",
    taglineSecondary: "Ojas Renewal.",
    taglineStyle: "standard",
    bgImage: "/brand/rituals/evening-glow-4.jpg",
    productImage: "/brand/products/brahmi-bottle.jpg",
    productPos: "bottom-right",
  },
];

const rasayanaGlowCards: GlowCardItem[] = [
  {
    step: rasayanaSteps[0], // Amalaki
    verticalText: "AMALAKI",
    taglinePrimary: "Wild Ascorbic.",
    taglineSecondary: "Solar Longevity.",
    taglineStyle: "standard",
    bgImage: "/brand/rituals/rasayana-glow-1.jpg",
    productImage: "/brand/products/amalaki-product-card.jpg",
    productPos: "bottom-right",
  },
  {
    step: rasayanaSteps[1], // Ashwagandha
    verticalText: "ASHWAGANDHA",
    taglinePrimary: "Deep Ojas.",
    taglineSecondary: "Root Vitality.",
    taglineStyle: "standard",
    bgImage: "/brand/rituals/rasayana-glow-2.jpg",
    productImage: "/brand/products/ashwagandha-pack.jpg",
    productPos: "bottom-left",
  },
  {
    step: rasayanaSteps[2], // Triphala
    verticalText: "TRIPHALA",
    taglinePrimary: "pure",
    taglineSecondary: "tridoshic\nbalance",
    taglineStyle: "glow-from-within",
    bgImage: "/brand/rituals/rasayana-glow-3.jpg",
    productImage: "/brand/products/triphala-bottle.jpg",
    productPos: "bottom-right",
  },
  {
    step: rasayanaSteps[3], // Brahmi
    verticalText: "BRAHMI",
    taglinePrimary: "Nootropic Clarity.",
    taglineSecondary: "Mental Stillness.",
    taglineStyle: "standard",
    bgImage: "/brand/rituals/rasayana-glow-4.jpg",
    productImage: "/brand/products/brahmi-bottle.jpg",
    productPos: "bottom-left",
  },
];

export function Rituals() {
  const [selectedStep, setSelectedStep] = useState<RitualStep | null>(null);
  const [activeTab, setActiveTab] = useState<"morning" | "evening" | "rasayana">("morning");
  const morningScrollRef = useRef<HTMLDivElement>(null);
  const eveningScrollRef = useRef<HTMLDivElement>(null);
  const rasayanaScrollRef = useRef<HTMLDivElement>(null);

  // Drag to scroll & touch gesture state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasMovedRef = useRef(false);
  const activeContainerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent, container: HTMLDivElement | null) => {
    if (!container) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    activeContainerRef.current = container;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !activeContainerRef.current) return;
    const x = e.pageX - activeContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    if (Math.abs(walk) > 8) {
      hasMovedRef.current = true;
    }
    activeContainerRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      hasMovedRef.current = false;
      activeContainerRef.current = null;
    }, 100);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    hasMovedRef.current = false;
    if (e.touches[0]) {
      startXRef.current = e.touches[0].pageX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      const diff = Math.abs(e.touches[0].pageX - startXRef.current);
      if (diff > 10) {
        hasMovedRef.current = true;
      }
    }
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 150);
  };

  const handleCardClick = (step: RitualStep) => {
    if (hasMovedRef.current) return;
    setSelectedStep(step);
  };

  const scrollMorning = (direction: "left" | "right") => {
    if (!morningScrollRef.current) return;
    const card = morningScrollRef.current.querySelector("[data-glow-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 360;
    morningScrollRef.current.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const scrollEvening = (direction: "left" | "right") => {
    if (!eveningScrollRef.current) return;
    const card = eveningScrollRef.current.querySelector("[data-glow-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 360;
    eveningScrollRef.current.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const scrollRasayana = (direction: "left" | "right") => {
    if (!rasayanaScrollRef.current) return;
    const card = rasayanaScrollRef.current.querySelector("[data-glow-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 360;
    rasayanaScrollRef.current.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <div id="rituals" className="relative flex flex-col scroll-mt-20">
      
      {/* Section Header */}
      <section className="bg-[#FAF6F0] border-t border-[#DFCDB7] pt-10 pb-5 md:pt-14 md:pb-6">
        <Container className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#8C5E28]" />
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#8C5E28]">
                The Science of Daily Living
              </span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2A1808]">
              Ritual, not remedy.
            </h2>
            
            <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5C2E06]/85 font-normal">
              Ayurveda was never a reactive shelf of pills. In the classical texts of <em>Charaka</em> and <em>Sushruta</em>, health is the cumulative byproduct of an ordered day: what enters the senses upon waking, how the body winds down at dusk, and how living conforms to the seasons.
            </p>
          </div>

          {/* Interactive Mode Switcher Tabs */}
          <div
            className="flex items-center gap-3 overflow-x-auto py-1.5 scrollbar-none touch-pan-x"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "contain",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("morning")}
              className={`group inline-flex h-11 sm:h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 sm:px-6 font-sans text-xs sm:text-[13px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none shadow-xs ${
                activeTab === "morning"
                  ? "bg-[#3E240C] text-[#FAF6F0] shadow-md ring-2 ring-[#3E240C]/20 border border-[#3E240C]"
                  : "bg-[#FAF5ED] border border-[#DFCDB7] text-[#5C2E06] hover:bg-[#FFFDF9] hover:border-[#C49A45]/60"
              }`}
            >
              <span className="whitespace-nowrap">01 &middot; Morning (Dinacharya)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("evening")}
              className={`group inline-flex h-11 sm:h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 sm:px-6 font-sans text-xs sm:text-[13px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none shadow-xs ${
                activeTab === "evening"
                  ? "bg-[#3E240C] text-[#FAF6F0] shadow-md ring-2 ring-[#3E240C]/20 border border-[#3E240C]"
                  : "bg-[#FAF5ED] border border-[#DFCDB7] text-[#5C2E06] hover:bg-[#FFFDF9] hover:border-[#C49A45]/60"
              }`}
            >
              <span className="whitespace-nowrap">02 &middot; Evening (Ratricharya)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("rasayana")}
              className={`group inline-flex h-11 sm:h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 sm:px-6 font-sans text-xs sm:text-[13px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none shadow-xs ${
                activeTab === "rasayana"
                  ? "bg-[#3E240C] text-[#FAF6F0] shadow-md ring-2 ring-[#3E240C]/20 border border-[#3E240C]"
                  : "bg-[#FAF5ED] border border-[#DFCDB7] text-[#5C2E06] hover:bg-[#FFFDF9] hover:border-[#C49A45]/60"
              }`}
            >
              <span className="whitespace-nowrap">03 &middot; Seasonal (Rasayana)</span>
            </button>
          </div>
        </Container>
      </section>

      {/* 01 THE MORNING: COSMOS VISUAL BENTO GRID */}
      {activeTab === "morning" && (
        <section id="morning-chapter" className="bg-[#FAF6F0] pt-2 pb-12 md:pt-4 md:pb-16 border-t border-[#DFCDB7]">
          <div className="mx-auto max-w-[1536px] px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-4 sm:gap-6">
            
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-[#DFCDB7] pb-5">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-hindi text-base sm:text-lg text-[#8C5E28] font-bold tracking-wide">दिनचर्या</span>
                  <span className="text-[#CBB396] font-bold">&middot;</span>
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#8C5E28]">
                    Daily Dawn Ritual
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2A1808] leading-tight">
                  The Morning Awakening
                </h3>
                <p className="font-sans text-sm sm:text-base font-normal text-[#5C2E06]/85 leading-relaxed max-w-2xl">
                  Five sequential classical gestures designed to awaken digestive agni, sharpen sensory acuity, and fortify immunity before food is consumed.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3E240C] text-[#FAF6F0] px-4 py-1.5 font-sans text-xs font-bold tracking-wide shadow-xs border border-[#3E240C]">
                  5 Sequential Steps
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EADD] border border-[#C49A45]/50 px-4 py-1.5 font-sans text-xs font-bold text-[#5C2E06] shadow-2xs">
                  Charaka Samhita &middot; Sutrasthana 5
                </span>
              </div>
            </div>

            {/* Editorial Radiant Rituals Carousel (Matching Reference Design) */}
            <div className="relative">
              {/* Carousel Navigation Arrow Controls in Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#8C5E28]">
                    Classical Dinacharya
                  </span>
                  <span className="text-[#CBB396] font-bold">&middot;</span>
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#5C2E06]/80">
                    Tap any card to inspect classical methods &amp; sacred vessels
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollMorning("left")}
                    aria-label="Previous ritual"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D5BF9F] bg-[#E8DAC8] text-[#3E240C] transition-all hover:bg-[#3E240C] hover:text-[#FAF6F0] hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollMorning("right")}
                    aria-label="Next ritual"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D5BF9F] bg-[#E8DAC8] text-[#3E240C] transition-all hover:bg-[#3E240C] hover:text-[#FAF6F0] hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Radiant Glow Cards Horizontal Carousel */}
              <div className="relative">
                <div
                  ref={morningScrollRef}
                  onMouseDown={(e) => handleMouseDown(e, morningScrollRef.current)}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing touch-pan-x"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                    overscrollBehaviorX: "contain",
                  }}
                >
                  {morningGlowCards.map((card, idx) => (
                    <div
                      key={card.step.id}
                      data-glow-card
                      onClick={() => handleCardClick(card.step)}
                      className="group relative flex-none w-[85vw] sm:w-[48vw] md:w-[32vw] lg:w-[31.8%] xl:w-[32%] aspect-[4/5] min-h-[480px] sm:min-h-[520px] md:min-h-[560px] rounded-3xl sm:rounded-[32px] overflow-hidden shadow-xl border border-black/10 cursor-pointer snap-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 select-none"
                    >
                      {/* 1. Full-Bleed Radiant Model Beauty Portrait */}
                      <Image
                        src={card.bgImage}
                        alt={card.step.practice}
                        fill
                        priority={idx === 0}
                        sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 85vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />

                      {/* 2. Gradient Scrim for crisp readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 transition-opacity group-hover:opacity-90" />

                      {/* 3. Top-Corner Halftone Dot Grid Pattern (Exact Image 1 Detail) */}
                      <div className="absolute top-4 left-4 z-10 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none opacity-45">
                        <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                          <defs>
                            <pattern id={`dot-pattern-${idx}`} x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1.1" fill="currentColor" />
                            </pattern>
                            <radialGradient id={`dot-fade-${idx}`} cx="15%" cy="15%" r="85%">
                              <stop offset="0%" stopColor="white" stopOpacity="1" />
                            </radialGradient>
                            <mask id={`dot-mask-${idx}`}>
                              <rect width="100" height="100" fill={`url(#dot-fade-${idx})`} />
                            </mask>
                          </defs>
                          <rect width="100" height="100" fill={`url(#dot-pattern-${idx})`} mask={`url(#dot-mask-${idx})`} />
                        </svg>
                      </div>

                      {/* 4. Large Vertical Rotated Sans-Serif Text along Right Edge (Image 1 Signature) */}
                      <div className="absolute right-3 sm:right-4 top-6 bottom-6 z-10 flex items-center pointer-events-none">
                        <span
                          className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-white/90 uppercase tracking-[0.18em] drop-shadow-md select-none transition-transform duration-300 group-hover:scale-105"
                          style={{ writingMode: "vertical-rl" }}
                        >
                          {card.verticalText}
                        </span>
                      </div>

                      {/* 5. Authentic Baba Ayurved Product Packaging Standing in Lower Corner (with mix-blend-multiply to remove white background box) */}
                      <div
                        className={`absolute z-10 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-108 mix-blend-multiply ${
                          card.productPos === "bottom-right"
                            ? "bottom-3 right-12 sm:right-14 w-28 sm:w-32 h-36 sm:h-44"
                            : "bottom-3 left-4 sm:left-5 w-28 sm:w-32 h-36 sm:h-44"
                        }`}
                      >
                        <Image
                          src={card.productImage}
                          alt={`${card.step.practice} packaging`}
                          fill
                          sizes="140px"
                          className="object-contain"
                        />
                      </div>

                      {/* 6. Tagline & Modern Copy (Positioned on the opposite side) */}
                      <div
                        className={`absolute z-10 p-5 sm:p-6 text-white drop-shadow-md pointer-events-none ${
                          card.productPos === "bottom-right"
                            ? "bottom-2 left-2 max-w-[65%]"
                            : "bottom-2 right-12 sm:right-14 text-right max-w-[65%]"
                        }`}
                      >
                        {card.taglineStyle === "glow-from-within" ? (
                          <div>
                            <div className="font-sans font-light text-2xl sm:text-3xl text-white tracking-tight leading-tight lowercase">
                              glow<br />from<br />within
                            </div>
                            <span className="inline-block mt-2 font-sans text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/90">
                              Step {card.step.stepNumber} &middot; {card.step.sanskrit}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-tight">
                              {card.taglinePrimary}
                              <span className="block font-medium opacity-95">{card.taglineSecondary}</span>
                            </h4>
                            <span className="inline-block mt-1.5 font-sans text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/90">
                              Step {card.step.stepNumber} &middot; {card.step.sanskrit}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Quick Inspect Hover Pill Button */}
                      <div className="absolute top-4 right-14 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="rounded-full bg-[#FAF6F0]/95 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-[#2A1808] border border-[#DFCDB7] backdrop-blur-md shadow-sm">
                          Inspect &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 7. Floating Vertical Launch Offer Tab on Far Right (Apothecary Coffee & Gold Styling) */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center pointer-events-none">
                  <div className="bg-[#3E240C] text-[#FAF6F0] py-5 px-2 rounded-l-2xl shadow-xl border-l border-y border-[#C49A45]/40 flex items-center justify-center">
                    <span
                      className="font-sans font-black text-[11px] uppercase tracking-widest text-[#FAF6F0] select-none"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      NEW LAUNCH OFFER
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 02 THE EVENING: RATRICHARYA TWILIGHT SANCTUARY */}
      {activeTab === "evening" && (
        <section id="evening-chapter" className="bg-[#FAF6F0] pt-2 pb-12 md:pt-4 md:pb-16 border-t border-[#DFCDB7]">
          <div className="mx-auto max-w-[1536px] px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-4 sm:gap-6">
            
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-[#DFCDB7] pb-5">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-hindi text-base sm:text-lg text-[#8C5E28] font-bold tracking-wide">रात्रिचर्या</span>
                  <span className="text-[#CBB396] font-bold">&middot;</span>
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#8C5E28]">
                    Daily Dusk Sanctuary
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2A1808] leading-tight">
                  The Twilight Deceleration
                </h3>
                <p className="font-sans text-sm sm:text-base font-normal text-[#5C2E06]/85 leading-relaxed max-w-2xl">
                  A tranquil sequence designed to dissipate mental heat (Pitta) and excess movement (Vata), grounding the nervous system before unhurried slumber.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3E240C] text-[#FAF6F0] px-4 py-1.5 font-sans text-xs font-bold tracking-wide shadow-xs border border-[#3E240C]">
                  4 Sequential Steps
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EADD] border border-[#C49A45]/50 px-4 py-1.5 font-sans text-xs font-bold text-[#5C2E06] shadow-2xs">
                  Sushruta Samhita &middot; Chikitsasthana
                </span>
              </div>
            </div>

            {/* Editorial Radiant Rituals Carousel */}
            <div className="relative">
              {/* Carousel Navigation Arrow Controls in Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#8C5E28]">
                    Classical Ratricharya
                  </span>
                  <span className="text-[#CBB396] font-bold">&middot;</span>
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#5C2E06]/80">
                    Tap any card to inspect classical methods &amp; sacred vessels
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollEvening("left")}
                    aria-label="Previous evening ritual"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D5BF9F] bg-[#E8DAC8] text-[#3E240C] transition-all hover:bg-[#3E240C] hover:text-[#FAF6F0] hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollEvening("right")}
                    aria-label="Next evening ritual"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D5BF9F] bg-[#E8DAC8] text-[#3E240C] transition-all hover:bg-[#3E240C] hover:text-[#FAF6F0] hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Radiant Glow Cards Horizontal Carousel */}
              <div className="relative">
                <div
                  ref={eveningScrollRef}
                  onMouseDown={(e) => handleMouseDown(e, eveningScrollRef.current)}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing touch-pan-x"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                    overscrollBehaviorX: "contain",
                  }}
                >
                  {eveningGlowCards.map((card, idx) => (
                    <div
                      key={card.step.id}
                      data-glow-card
                      onClick={() => handleCardClick(card.step)}
                      className="group relative flex-none w-[85vw] sm:w-[48vw] md:w-[32vw] lg:w-[31.8%] xl:w-[32%] aspect-[4/5] min-h-[480px] sm:min-h-[520px] md:min-h-[560px] rounded-3xl sm:rounded-[32px] overflow-hidden shadow-xl border border-black/10 cursor-pointer snap-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 select-none"
                    >
                      {/* 1. Full-Bleed Radiant Model Beauty Portrait */}
                      <Image
                        src={card.bgImage}
                        alt={card.step.practice}
                        fill
                        priority={idx === 0}
                        sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 85vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />

                      {/* 2. Gradient Scrim for crisp readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 transition-opacity group-hover:opacity-90" />

                      {/* 3. Top-Corner Halftone Dot Grid Pattern */}
                      <div className="absolute top-4 left-4 z-10 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none opacity-45">
                        <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                          <defs>
                            <pattern id={`dot-pattern-evening-${idx}`} x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1.1" fill="currentColor" />
                            </pattern>
                            <radialGradient id={`dot-fade-evening-${idx}`} cx="15%" cy="15%" r="85%">
                              <stop offset="0%" stopColor="white" stopOpacity="1" />
                            </radialGradient>
                            <mask id={`dot-mask-evening-${idx}`}>
                              <rect width="100" height="100" fill={`url(#dot-fade-evening-${idx})`} />
                            </mask>
                          </defs>
                          <rect width="100" height="100" fill={`url(#dot-pattern-evening-${idx})`} mask={`url(#dot-mask-evening-${idx})`} />
                        </svg>
                      </div>

                      {/* 4. Large Vertical Rotated Sans-Serif Text along Right Edge */}
                      <div className="absolute right-3 sm:right-4 top-6 bottom-6 z-10 flex items-center pointer-events-none">
                        <span
                          className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-white/90 uppercase tracking-[0.18em] drop-shadow-md select-none transition-transform duration-300 group-hover:scale-105"
                          style={{ writingMode: "vertical-rl" }}
                        >
                          {card.verticalText}
                        </span>
                      </div>

                      {/* 5. Authentic Baba Ayurved Product Packaging Standing in Lower Corner */}
                      <div
                        className={`absolute z-10 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-108 mix-blend-multiply ${
                          card.productPos === "bottom-right"
                            ? "bottom-3 right-12 sm:right-14 w-28 sm:w-32 h-36 sm:h-44"
                            : "bottom-3 left-4 sm:left-5 w-28 sm:w-32 h-36 sm:h-44"
                        }`}
                      >
                        <Image
                          src={card.productImage}
                          alt={`${card.step.practice} packaging`}
                          fill
                          sizes="140px"
                          className="object-contain"
                        />
                      </div>

                      {/* 6. Tagline & Modern Copy */}
                      <div
                        className={`absolute z-10 p-5 sm:p-6 text-white drop-shadow-md pointer-events-none ${
                          card.productPos === "bottom-right"
                            ? "bottom-2 left-2 max-w-[65%]"
                            : "bottom-2 right-12 sm:right-14 text-right max-w-[65%]"
                        }`}
                      >
                        {card.taglineStyle === "glow-from-within" ? (
                          <div>
                            <div className="font-sans font-light text-2xl sm:text-3xl text-white tracking-tight leading-tight lowercase">
                              soothe<br />the<br />senses
                            </div>
                            <span className="inline-block mt-2 font-sans text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/90">
                              Step {card.step.stepNumber} &middot; {card.step.sanskrit}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-tight">
                              {card.taglinePrimary}
                              <span className="block font-medium opacity-95">{card.taglineSecondary}</span>
                            </h4>
                            <span className="inline-block mt-1.5 font-sans text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/90">
                              Step {card.step.stepNumber} &middot; {card.step.sanskrit}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Quick Inspect Hover Pill Button */}
                      <div className="absolute top-4 right-14 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="rounded-full bg-[#FAF6F0]/95 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-[#2A1808] border border-[#DFCDB7] backdrop-blur-md shadow-sm">
                          Inspect &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 7. Floating Vertical Launch Offer Tab on Far Right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center pointer-events-none">
                  <div className="bg-[#3E240C] text-[#FAF6F0] py-5 px-2 rounded-l-2xl shadow-xl border-l border-y border-[#C49A45]/40 flex items-center justify-center">
                    <span
                      className="font-sans font-black text-[11px] uppercase tracking-widest text-[#FAF6F0] select-none"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      DUSK SANCTUARY
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 03 THE RASAYANA: SEASONAL HERBARIUM */}
      {activeTab === "rasayana" && (
        <section id="rasayana-chapter" className="bg-[#FAF6F0] pt-2 pb-12 md:pt-4 md:pb-16 border-t border-[#DFCDB7]">
          <div className="mx-auto max-w-[1536px] px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-4 sm:gap-6">
            
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-[#DFCDB7] pb-5">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-hindi text-base sm:text-lg text-[#8C5E28] font-bold tracking-wide">ऋतुचर्या एवं रसायन</span>
                  <span className="text-[#CBB396] font-bold">&middot;</span>
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#8C5E28]">
                    Seasonal Solar Adaptation
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2A1808] leading-tight">
                  Rasayana: The Seasonal Foundation
                </h3>
                <p className="font-sans text-sm sm:text-base font-normal text-[#5C2E06]/85 leading-relaxed max-w-2xl">
                  In classical Ayurveda, <em>Rasayana</em> is not a single bottle bought off a shelf; it is the art of nourishing deep body tissues (Dhatus) in sync with seasonal solar solstices.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3E240C] text-[#FAF6F0] px-4 py-1.5 font-sans text-xs font-bold tracking-wide shadow-xs border border-[#3E240C]">
                  4 Botanical Pillars
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EADD] border border-[#C49A45]/50 px-4 py-1.5 font-sans text-xs font-bold text-[#5C2E06] shadow-2xs">
                  Charaka Samhita &middot; Chikitsasthana 1:1
                </span>
              </div>
            </div>

            {/* Editorial Radiant Rituals Carousel */}
            <div className="relative">
              {/* Carousel Navigation Arrow Controls in Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#8C5E28]">
                    Classical Rasayana
                  </span>
                  <span className="text-[#CBB396] font-bold">&middot;</span>
                  <span className="font-sans text-xs sm:text-sm font-medium text-[#5C2E06]/80">
                    Tap any card to inspect botanical harvests &amp; formulations
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollRasayana("left")}
                    aria-label="Previous seasonal ritual"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D5BF9F] bg-[#E8DAC8] text-[#3E240C] transition-all hover:bg-[#3E240C] hover:text-[#FAF6F0] hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollRasayana("right")}
                    aria-label="Next seasonal ritual"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D5BF9F] bg-[#E8DAC8] text-[#3E240C] transition-all hover:bg-[#3E240C] hover:text-[#FAF6F0] hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Radiant Glow Cards Horizontal Carousel */}
              <div className="relative">
                <div
                  ref={rasayanaScrollRef}
                  onMouseDown={(e) => handleMouseDown(e, rasayanaScrollRef.current)}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing touch-pan-x"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                    overscrollBehaviorX: "contain",
                  }}
                >
                  {rasayanaGlowCards.map((card, idx) => (
                    <div
                      key={card.step.id}
                      data-glow-card
                      onClick={() => handleCardClick(card.step)}
                      className="group relative flex-none w-[85vw] sm:w-[48vw] md:w-[32vw] lg:w-[31.8%] xl:w-[32%] aspect-[4/5] min-h-[480px] sm:min-h-[520px] md:min-h-[560px] rounded-3xl sm:rounded-[32px] overflow-hidden shadow-xl border border-black/10 cursor-pointer snap-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 select-none"
                    >
                      {/* 1. Full-Bleed Radiant Model Beauty Portrait */}
                      <Image
                        src={card.bgImage}
                        alt={card.step.practice}
                        fill
                        priority={idx === 0}
                        sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 85vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />

                      {/* 2. Gradient Scrim for crisp readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 transition-opacity group-hover:opacity-90" />

                      {/* 3. Top-Corner Halftone Dot Grid Pattern */}
                      <div className="absolute top-4 left-4 z-10 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none opacity-45">
                        <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                          <defs>
                            <pattern id={`dot-pattern-rasayana-${idx}`} x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1.1" fill="currentColor" />
                            </pattern>
                            <radialGradient id={`dot-fade-rasayana-${idx}`} cx="15%" cy="15%" r="85%">
                              <stop offset="0%" stopColor="white" stopOpacity="1" />
                            </radialGradient>
                            <mask id={`dot-mask-rasayana-${idx}`}>
                              <rect width="100" height="100" fill={`url(#dot-fade-rasayana-${idx})`} />
                            </mask>
                          </defs>
                          <rect width="100" height="100" fill={`url(#dot-pattern-rasayana-${idx})`} mask={`url(#dot-mask-rasayana-${idx})`} />
                        </svg>
                      </div>

                      {/* 4. Large Vertical Rotated Sans-Serif Text along Right Edge */}
                      <div className="absolute right-3 sm:right-4 top-6 bottom-6 z-10 flex items-center pointer-events-none">
                        <span
                          className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-white/90 uppercase tracking-[0.18em] drop-shadow-md select-none transition-transform duration-300 group-hover:scale-105"
                          style={{ writingMode: "vertical-rl" }}
                        >
                          {card.verticalText}
                        </span>
                      </div>

                      {/* 5. Authentic Baba Ayurved Product Packaging Standing in Lower Corner */}
                      <div
                        className={`absolute z-10 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-108 mix-blend-multiply ${
                          card.productPos === "bottom-right"
                            ? "bottom-3 right-12 sm:right-14 w-28 sm:w-32 h-36 sm:h-44"
                            : "bottom-3 left-4 sm:left-5 w-28 sm:w-32 h-36 sm:h-44"
                        }`}
                      >
                        <Image
                          src={card.productImage}
                          alt={`${card.step.practice} packaging`}
                          fill
                          sizes="140px"
                          className="object-contain"
                        />
                      </div>

                      {/* 6. Tagline & Modern Copy */}
                      <div
                        className={`absolute z-10 p-5 sm:p-6 text-white drop-shadow-md pointer-events-none ${
                          card.productPos === "bottom-right"
                            ? "bottom-2 left-2 max-w-[65%]"
                            : "bottom-2 right-12 sm:right-14 text-right max-w-[65%]"
                        }`}
                      >
                        {card.taglineStyle === "glow-from-within" ? (
                          <div>
                            <div className="font-sans font-light text-2xl sm:text-3xl text-white tracking-tight leading-tight lowercase">
                              pure<br />tridoshic<br />balance
                            </div>
                            <span className="inline-block mt-2 font-sans text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/90">
                              Step {card.step.stepNumber} &middot; {card.step.sanskrit}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-tight">
                              {card.taglinePrimary}
                              <span className="block font-medium opacity-95">{card.taglineSecondary}</span>
                            </h4>
                            <span className="inline-block mt-1.5 font-sans text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/90">
                              Step {card.step.stepNumber} &middot; {card.step.sanskrit}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Quick Inspect Hover Pill Button */}
                      <div className="absolute top-4 right-14 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="rounded-full bg-[#FAF6F0]/95 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-[#2A1808] border border-[#DFCDB7] backdrop-blur-md shadow-sm">
                          Inspect &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 7. Floating Vertical Launch Offer Tab on Far Right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center pointer-events-none">
                  <div className="bg-[#3E240C] text-[#FAF6F0] py-5 px-2 rounded-l-2xl shadow-xl border-l border-y border-[#C49A45]/40 flex items-center justify-center">
                    <span
                      className="font-sans font-black text-[11px] uppercase tracking-widest text-[#FAF6F0] select-none"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      SEASONAL EDITIONS
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Interactive Step Detail Drawer Modal */}
      {selectedStep && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedStep(null)}
        >
          <div 
            className="relative w-full max-w-lg rounded-md border border-brand-sand bg-brand-off-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedStep(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-brand-primary/70 hover:bg-brand-cream hover:text-brand-primary"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="rounded-xs bg-brand-cream border border-brand-sand px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-label text-brand-leaf-green">
                  Step {selectedStep.stepNumber} &middot; {selectedStep.tag}
                </span>
                <span className="font-sans text-xs text-brand-primary/60">
                  {selectedStep.timing}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-primary">
                  {selectedStep.practice}
                </h3>
                <span className="font-hindi text-base text-brand-leaf-green mt-0.5 block">
                  {selectedStep.sanskrit} ({selectedStep.term})
                </span>
              </div>

              {/* Photo preview inside modal */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-brand-sand bg-brand-cream">
                <Image
                  src={selectedStep.imageSrc}
                  alt={selectedStep.practice}
                  fill
                  className="object-cover"
                  sizes="480px"
                />
              </div>

              <div className="rounded-sm border border-brand-sand bg-brand-cream/60 p-3.5">
                <span className="block font-sans text-[11px] font-bold uppercase tracking-label text-brand-primary/70">
                  Classical Treatise Reference
                </span>
                <span className="font-serif text-sm italic text-brand-primary">
                  {selectedStep.classicalText}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h4 className="font-sans text-xs font-bold uppercase tracking-label text-brand-primary">
                  How To Practice:
                </h4>
                <p className="font-sans text-sm leading-relaxed text-brand-primary/85">
                  {selectedStep.actionGuidance}
                </p>
              </div>

              <div className="border-t border-brand-sand pt-3 text-brand-primary/80">
                <span className="font-sans text-xs">
                  Required Apothecary Tool: <strong>{selectedStep.vesselOrTool}</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStep(null)}
                className="mt-2 w-full rounded-sm bg-brand-primary py-3 font-sans text-xs font-bold tracking-label uppercase text-brand-ivory shadow-md hover:bg-brand-primary/95 transition-all"
              >
                Return to Daily Rituals
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
