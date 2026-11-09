"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductOrbitCarousel, type OrbitProduct } from "@/components/ui/product-orbit-carousel";
import { featuredProducts, type Product } from "@/content/products";
import { useCart } from "@/context/CartContext";
import { useLenis } from "@/components/motion/SmoothScrollProvider";

const findProduct = (id: string): Product => featuredProducts.find((p) => p.id === id) ?? featuredProducts[0];

const bestSellers: { base: Product; orbit: Omit<OrbitProduct, "accent" | "rating" | "description" | "formulation" | "actives"> }[] = [
  {
    base: findProduct("triphala-churna"),
    orbit: { title: "TRIPHALA", subtitle: "CHURNA", image: "/brand/products/triphala-bottle-cutout.png", highlight: "Digestive Balance & Whole-Body Vitality" },
  },
  {
    base: findProduct("ashwagandha-churna"),
    orbit: { title: "ASHWAGANDHA", subtitle: "CHURNA", image: "/brand/products/ashwagandha-pack-cutout.png", highlight: "Stress Adaptation & Deep Recovery" },
  },
  {
    base: findProduct("shilajit-resin"),
    orbit: { title: "SHUDDHA", subtitle: "SHILAJIT", image: "/brand/products/shilajit-tub-cutout.png", highlight: "Builds Ojas & Supports Vitality" },
  },
  {
    base: findProduct("brahmi-churna"),
    orbit: { title: "BRAHMI", subtitle: "MEDHYA CHURNA", image: "/brand/products/brahmi-bottle-cutout.png", highlight: "Cognitive Endurance & Memory" },
  },
  {
    base: findProduct("ksheerabala-taila"),
    orbit: { title: "KSHEERABALA", subtitle: "TAILA", image: "/brand/products/taila-bottle-cutout.png", highlight: "Sensory Grounding & Evening Recovery" },
  },
];

const ACCENTS = ["#E2B784", "#8A903E", "#C49A45", "#8C5E28", "#5C5E27"];

const orbitProducts: OrbitProduct[] = bestSellers.map(({ base, orbit }, i) => ({
  ...orbit,
  rating: base.rating ?? 4.8,
  formulation: base.classicalReference,
  description: base.description,
  actives: [...base.botanicals],
  accent: ACCENTS[i % ACCENTS.length],
}));

export function CatalogHero() {
  const { addToCart } = useCart();
  const lenis = useLenis();

  const handleAddToCart = (_product: OrbitProduct, index: number) => {
    addToCart(bestSellers[index].base, 1);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-grid");
    if (!el) return;
    // Lenis owns window scrolling once mounted — the native smooth-scroll
    // API would otherwise fight it.
    if (lenis) {
      lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      aria-label="Catalogue Hero"
      className="relative overflow-hidden bg-[#180E08] text-[#F0E4D3] pt-6 pb-16 md:pt-8 md:pb-24 border-b border-solid border-[#3D2516]"
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
        {/* Central Stage: Best-Selling Formulations Orbit Carousel */}
        <div className="relative w-full max-w-[1600px]">
          {/* Spotlight Pedestal Glow behind the stage */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[80%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(214,166,112,0.22)_0%,transparent_70%)] blur-2xl"
          />

          <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-2xl border border-solid border-[#4A2D1B] bg-gradient-to-b from-[#24160E] to-[#140B06] shadow-2xl">
            <ProductOrbitCarousel products={orbitProducts} onAddToCart={handleAddToCart} autoplayDelay={2800} />
          </div>

          <p className="mt-4 text-center font-sans text-xs text-[#D6C4B0]/70">
            5 of our most-loved formulations &mdash; the full 174-piece formulary is listed below.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
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
