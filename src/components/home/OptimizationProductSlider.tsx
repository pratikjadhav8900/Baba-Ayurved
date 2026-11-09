"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { featuredProducts, type Product } from "@/content/products";
import { useCart } from "@/context/CartContext";
import { Reveal } from "@/components/motion/Reveal";

type SliderProduct = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: "BEST SELLER" | "NEW" | "SEASONAL" | "RARE RESERVE";
  image: string;
  priceFormatted: string;
  baseProduct: Product;
};

// Map authentic Baba Ayurved formulations to high-impact slider items matching reference layout
const triphalaBase = featuredProducts.find((p) => p.id === "triphala-churna") || featuredProducts[0];
const ashwagandhaBase = featuredProducts.find((p) => p.id === "ashwagandha-churna") || featuredProducts[1];
const shilajitBase = featuredProducts.find((p) => p.id === "shilajit-resin") || featuredProducts[2];
const brahmiBase = featuredProducts.find((p) => p.id === "brahmi-churna") || featuredProducts[3];
const ksheerabalaBase = featuredProducts.find((p) => p.id === "ksheerabala-taila") || featuredProducts[4];

const sliderItems: SliderProduct[] = [
  {
    id: "triphala-optimization",
    title: "TRIPHALA®",
    subtitle: "90 CAPSULES - DIETARY SUPPLEMENT",
    description: "Cognitive support, including memory, digestive balance & whole-body vitality†",
    badge: "BEST SELLER",
    image: "/brand/products/triphala-bottle.jpg",
    priceFormatted: "₹280",
    baseProduct: triphalaBase,
  },
  {
    id: "ashwagandha-optimization",
    title: "ASHWAGANDHA®",
    subtitle: "DAY & NIGHT PACKS - 30 SACHETS",
    description: "Day & night packs for optimal stress adaptation, stamina & deep recovery†",
    badge: "BEST SELLER",
    image: "/brand/products/ashwagandha-pack.jpg",
    priceFormatted: "₹340",
    baseProduct: ashwagandhaBase,
  },
  {
    id: "shilajit-optimization",
    title: "SHUDDHA SHILAJIT",
    subtitle: "PURIFIED HIMALAYAN RESIN - 100G",
    description: "Build Ojas. Support muscle recovery while working out. Fuel your vitality.†",
    badge: "NEW",
    image: "/brand/products/shilajit-tub.jpg",
    priceFormatted: "₹890",
    baseProduct: shilajitBase,
  },
  {
    id: "brahmi-optimization",
    title: "BRAHMI MEDHYA®",
    subtitle: "60 VEG CAPSULES - NOOTROPIC BLEND",
    description: "Elite-level focus for cognitive endurance, mental processing speed & memory†",
    badge: "NEW",
    image: "/brand/products/brahmi-bottle.jpg",
    priceFormatted: "₹320",
    baseProduct: brahmiBase,
  },
  {
    id: "ksheerabala-optimization",
    title: "KSHEERABALA TAILA®",
    subtitle: "100ML CALIBRATED DROPPER - ELIXIR",
    description: "Classical 16-boil medicated taila for sensory grounding & evening recovery†",
    badge: "BEST SELLER",
    image: "/brand/products/taila-bottle.jpg",
    priceFormatted: "₹420",
    baseProduct: ksheerabalaBase,
  },
];

export function OptimizationProductSlider() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [poppingId, setPoppingId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Drag to scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Update scroll indicators & active slide based on scroll position
  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active card index
    const totalItems = sliderItems.length;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setActiveIndex(0);
    } else {
      const fraction = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
      const computedIndex = Math.round(fraction * (totalItems - 1));
      setActiveIndex(computedIndex);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    updateScrollState();

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Navigate left / right by one card width
  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const firstCard = el.querySelector("[data-slider-card]") as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth : 320;

    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  // Jump to specific slide when pagination dot is clicked
  const scrollToSlide = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-slider-card]");
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const el = scrollContainerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Add to cart click
  const handleAddToCart = (e: React.MouseEvent, item: SliderProduct) => {
    e.stopPropagation();
    addToCart(item.baseProduct, 1);
    setAddedId(item.id);
    setPoppingId(item.id);
    setTimeout(() => {
      setPoppingId((curr) => (curr === item.id ? null : curr));
    }, 220);
    setTimeout(() => {
      setAddedId((curr) => (curr === item.id ? null : curr));
    }, 1800);
  };

  return (
    <section
      id="shop"
      aria-label="Product Optimization Collection"
      className="w-full bg-[#F4ECE1] py-14 sm:py-16 md:py-20 border-y border-[#DFCDB7]"
    >
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 md:px-10 lg:px-12">
        {/* Top Header Row with Bold Headline and Carousel Arrows */}
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8 md:mb-12">
          <div className="max-w-3xl">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#8C5E28] block mb-2">
              Classical Botanical Formulations
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-[#2A1808] leading-[1.05]">
              SUPPORT FOR MENTAL AND PHYSICAL OPTIMIZATION<sup>†</sup>
            </h2>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 pt-1">
            <button
              type="button"
              onClick={() => scrollByCard("left")}
              disabled={!canScrollLeft}
              aria-label="Previous products"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8DAC8] text-[#3E240C] transition-all hover:bg-[#3E240C] hover:text-[#FAF6F0] hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer border border-[#D5BF9F] shadow-xs"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("right")}
              disabled={!canScrollRight}
              aria-label="Next products"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8DAC8] text-[#3E240C] transition-all hover:bg-[#3E240C] hover:text-[#FAF6F0] hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer border border-[#D5BF9F] shadow-xs"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        {/* Product Carousel Grid with Sleek Vertical Divider Borders */}
        <Reveal delay={0.1}>
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing border-l border-t border-b border-[#DFCDB7] touch-pan-x"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorX: "contain",
          }}
        >
          {sliderItems.map((item) => {
            const isAdded = addedId === item.id;
            const isPopping = poppingId === item.id;
            return (
              <div
                key={item.id}
                data-slider-card
                className="group relative flex flex-col justify-between w-[85vw] sm:w-[48vw] md:w-[36vw] lg:w-[28.5vw] xl:w-[25vw] shrink-0 snap-start rounded-2xl border-r border-[#DFCDB7] bg-[#FAF5ED] hover:bg-[#FFFDF9] p-6 sm:p-7 select-none transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:z-10"
              >
                {/* Top Badge: Refined Antique Brass / Botanical Olive badge */}
                <div className="flex justify-end w-full min-h-[26px]">
                  <span
                    className={`font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-xs ${
                      item.badge === "NEW"
                        ? "bg-[#5C5E27] text-[#FAF6F0]"
                        : "bg-[#C49A45] text-[#2A1808]"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Centered Packshot Product Image framed in clean display mat */}
                <div className="relative my-4 flex h-60 sm:h-64 md:h-72 w-full items-center justify-center rounded-2xl bg-white border border-[#E8DAC7]/75 p-3 sm:p-4 shadow-[0_4px_16px_rgba(62,36,12,0.03)] overflow-hidden transition-all duration-300 group-hover:border-[#C49A45]/40 group-hover:shadow-[0_8px_24px_rgba(62,36,12,0.06)]">
                  <div className="relative h-full w-full max-w-[220px] max-h-[240px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={item.id === "triphala-optimization"}
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 29vw, (min-width: 640px) 48vw, 85vw"
                      className="object-contain drop-shadow-sm transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Product Text Details */}
                <div className="flex flex-col pt-2">
                  <h3 className="font-sans text-lg sm:text-xl font-black uppercase tracking-tight text-[#2A1808] line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8C5E28] mt-1">
                    {item.subtitle}
                  </p>

                  <p className="font-sans text-xs text-[#5C2E06]/80 leading-snug line-clamp-2 mt-1.5 min-h-[2.5rem]">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Row: Bold Price on Left & Pill ADD TO CART Button on Right */}
                <div className="mt-6 flex items-center justify-between border-t border-[#DFCDB7]/40 pt-3">
                  <span className="font-sans text-lg sm:text-xl font-black text-[#2A1808]">
                    {item.priceFormatted}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, item)}
                    className={`rounded-full px-4 py-2 font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ease-out active:scale-90 cursor-pointer shadow-xs ${
                      isPopping ? "scale-110" : "scale-100"
                    } ${
                      isAdded
                        ? "bg-[#5C5E27] text-white"
                        : "bg-[#FFFDF9] text-[#3E240C] border border-[#CBB396] hover:bg-[#3E240C] hover:text-[#FAF6F0] hover:border-[#3E240C]"
                    }`}
                  >
                    {isAdded ? (
                      <span className="inline-flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        ADDED
                      </span>
                    ) : (
                      "ADD TO CART"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        </Reveal>

        {/* Bottom Bar: Coffee "SHOP NOW" Button on Left, Pagination Dots on Right */}
        <div className="mt-8 sm:mt-10 flex items-center justify-between">
          <Link
            href="/shop"
            className="rounded-full bg-[#3E240C] px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-[#FAF6F0] transition-all hover:bg-[#2A1808] active:scale-95 shadow-sm inline-block"
          >
            SHOP NOW
          </Link>

          {/* Interactive Pagination Indicators */}
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Slider progress">
            {sliderItems.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                  className={`transition-all duration-300 cursor-pointer rounded-full ${
                    isActive
                      ? "h-1.5 w-8 bg-[#3E240C]"
                      : "h-1.5 w-1.5 bg-[#CBB396] hover:bg-[#8C5E28]"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
