"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  User,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { useLenis } from "@/components/motion/SmoothScrollProvider";
import { BrandLogo } from "@/components/brand/BrandLogo";

type CarouselSlide = {
  id: string;
  src: string;
  /** Portrait crop, centered on the product, for the mobile full-bleed stage. */
  srcMobile: string;
  alt: string;
  caption: string;
};

const slides: readonly CarouselSlide[] = [
  {
    id: "multi-product",
    src: "/brand/hero-baba-multi-product.jpg",
    srcMobile: "/brand/hero-baba-multi-product-vertical.jpg",
    alt: "Baba Ayurveda full classical formulary range with amber bottle, canister, and formulation box",
    caption: "Full Classical Lineup · 174 SKUs",
  },
  {
    id: "triphala-jar",
    src: "/brand/hero-baba-triphala-horizontal.jpg",
    srcMobile: "/brand/hero-baba-triphala-horizontal-vertical.jpg",
    alt: "Baba Ayurveda Triphala 60 capsules amber jar on dark slate with moody smoke",
    caption: "Triphala 60 Capsules · Digestive Balance",
  },
  {
    id: "triphala-tin",
    src: "/brand/hero-baba-triphala-tin.jpg",
    srcMobile: "/brand/hero-baba-triphala-tin-vertical.jpg",
    alt: "Baba Ayurveda Triphala 200g herbal tin canister with gold brushed lid",
    caption: "Triphala Churna 200g · Pure Micro-Milled Powder",
  },
  {
    id: "taila-dropper",
    src: "/brand/hero-baba-taila-dropper.jpg",
    srcMobile: "/brand/hero-baba-taila-dropper-vertical.jpg",
    alt: "Baba Ayurveda medicated taila herbal dropper bottle on dark slate with smoke",
    caption: "Medicated Taila Dropper · 16-Paka Boils",
  },
  {
    id: "carton-pouch",
    src: "/brand/hero-baba-carton-pouch.jpg",
    srcMobile: "/brand/hero-baba-carton-pouch-vertical.jpg",
    alt: "Baba Ayurveda eco-kraft formulation carton and pouch on dark slate",
    caption: "Formulation Carton & Pouch · Eco-Kraft Line",
  },
] as const;

export function Hero() {
  const { totalCount, openCart } = useCart();
  const { totalCount: wishlistCount } = useWishlist();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const lenis = useLenis();

  const sectionRef = useRef<HTMLElement>(null);
  const bgCarouselRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const desktopCtaRef = useRef<HTMLDivElement>(null);
  const desktopCopyRef = useRef<HTMLParagraphElement>(null);

  // Touch gesture state for mobile swiping
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 40;

  // Auto-advance carousel smoothly every 5 seconds like luxury editorial brands
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById("shop") || document.getElementById("catalog-grid");
    if (!el) return;
    // Lenis owns window scrolling once mounted — asking the native API to
    // smooth-scroll at the same time fights it and produces visible jank.
    if (lenis) {
      lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Elegant entrance on load (not scroll-triggered — the hero is already in
  // view) + a slow, subtle parallax drift on the background carousel as the
  // hero scrolls past. Skipped entirely under reduced motion.
  useGSAP(
    () => {
      if (reduceMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out", clearProps: "transform" } });
      if (headlineRef.current) {
        tl.fromTo(headlineRef.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1 });
      }
      if (desktopCtaRef.current) {
        tl.fromTo(
          desktopCtaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
      }
      if (desktopCopyRef.current) {
        tl.fromTo(
          desktopCopyRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );
      }

      // The background carousel is `hidden md:block` — only create the
      // (per-scroll-frame, scrubbed) parallax ScrollTrigger when it's
      // actually visible, and let matchMedia tear it down automatically if
      // the viewport ever crosses the breakpoint, instead of recalculating
      // a transform on a display:none element on every scroll on mobile.
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          if (!bgCarouselRef.current) return;
          // Slight pre-scale gives the translateY headroom so the parallax
          // drift never reveals an edge beneath the image.
          gsap.set(bgCarouselRef.current, { scale: 1.06 });
          gsap.to(bgCarouselRef.current, {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        },
      });
    },
    { scope: sectionRef, dependencies: [reduceMotion], revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#0A0D11", color: "#FFFFFF" }}
      className="relative min-h-[96vh] w-full overflow-hidden flex flex-col justify-between"
    >
      {/* ======================================================== */}
      {/* DESKTOP BACKGROUND CAROUSEL (hidden on mobile)            */}
      {/* ======================================================== */}
      <div ref={bgCarouselRef} className="absolute inset-0 z-0 hidden md:block">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                sizes="100vw"
                className={`object-cover object-right transition-transform duration-[6000ms] ease-out ${
                  isActive ? "scale-100" : "scale-105"
                }`}
              />
            </div>
          );
        })}

        {/* Cinematic Scrim Gradients for Desktop Text Legibility */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0A0D11] via-[#0A0D11]/70 to-transparent md:w-1/2 pointer-events-none z-10" 
        />
        <div 
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0A0D11] via-transparent to-[#0A0D11]/40 pointer-events-none z-10" 
        />
        <div 
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(10,13,17,0.75)_0%,transparent_60%)] pointer-events-none z-10" 
        />
      </div>

      {/* ======================================================== */}
      {/* MOBILE AMBIENT GLOW BACKDROP (subtle dynamic aura)       */}
      {/* ======================================================== */}
      <div className="absolute inset-0 z-0 md:hidden overflow-hidden pointer-events-none">
        {slides.map((slide, index) => {
          if (index !== currentIndex) return null;
          return (
            <div 
              key={`ambient-${slide.id}`} 
              className="absolute -inset-10 opacity-25 blur-3xl transition-opacity duration-1000"
            >
              <Image
                src={slide.src}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D11] via-[#0A0D11]/70 to-[#0A0D11]" />
      </div>

      {/* ======================================================== */}
      {/* SHARED TOP NAVBAR (Responsive for Mobile & Desktop)      */}
      {/* ======================================================== */}
      <header className="relative z-30 w-full px-4 py-4 md:px-12 md:py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Authentic Original Brand Logo */}
          <Link 
            href="/" 
            aria-label="Baba Ayurved Pharmacy, Home"
            className="flex items-center hover:opacity-85 transition-opacity"
          >
            <BrandLogo
              variant="primary"
              tone="reversed"
              size="sm"
              className="h-8 md:h-10 w-auto"
              priority
              alt="Baba Ayurved Pharmacy"
            />
          </Link>

          {/* Center Floating Pill Menu (Desktop only) */}
          <nav 
            aria-label="Hero navigation"
            style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.06)", 
              borderColor: "rgba(255, 255, 255, 0.12)" 
            }}
            className="hidden lg:flex items-center gap-1 rounded-full border p-1.5 backdrop-blur-xl shadow-2xl"
          >
            <Link
              href="/"
              style={{ backgroundColor: "#FFFFFF", color: "#0A0D11" }}
              className="rounded-full px-5 py-2 font-sans text-xs font-bold transition-all shadow-sm"
            >
              Home
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCollectionOpen(!isCollectionOpen)}
                style={{ color: "rgba(255, 255, 255, 0.85)" }}
                className="flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-xs font-semibold hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Collection</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>

              {isCollectionOpen && (
                <div 
                  style={{ backgroundColor: "rgba(18, 22, 30, 0.98)", borderColor: "rgba(255, 255, 255, 0.15)" }}
                  className="absolute left-0 top-full mt-2 w-52 rounded-2xl border p-2 backdrop-blur-2xl shadow-2xl z-40"
                  onMouseLeave={() => setIsCollectionOpen(false)}
                >
                  <Link
                    href="/shop"
                    onClick={() => setIsCollectionOpen(false)}
                    style={{ color: "rgba(255, 255, 255, 0.85)" }}
                    className="block rounded-xl px-3 py-2 font-sans text-xs hover:bg-white/10 hover:text-white"
                  >
                    All Classical Formulations
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => setIsCollectionOpen(false)}
                    style={{ color: "rgba(255, 255, 255, 0.85)" }}
                    className="block rounded-xl px-3 py-2 font-sans text-xs hover:bg-white/10 hover:text-white"
                  >
                    Single Herbs (Churna)
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => setIsCollectionOpen(false)}
                    style={{ color: "rgba(255, 255, 255, 0.85)" }}
                    className="block rounded-xl px-3 py-2 font-sans text-xs hover:bg-white/10 hover:text-white"
                  >
                    Medicated Oils (Taila)
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => setIsCollectionOpen(false)}
                    style={{ color: "rgba(255, 255, 255, 0.85)" }}
                    className="block rounded-xl px-3 py-2 font-sans text-xs hover:bg-white/10 hover:text-white"
                  >
                    Avaleh &amp; Rasayana
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/rituals"
              style={{ color: "rgba(255, 255, 255, 0.85)" }}
              className="rounded-full px-4 py-2 font-sans text-xs font-semibold hover:text-white hover:bg-white/10 transition-colors"
            >
              Rituals
            </Link>

            <Link
              href="/community"
              style={{ color: "rgba(255, 255, 255, 0.85)" }}
              className="rounded-full px-4 py-2 font-sans text-xs font-semibold hover:text-white hover:bg-white/10 transition-colors"
            >
              Community
            </Link>
          </nav>

          {/* Right Action Icons (Account, Wishlist & Bag) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/account"
              style={{ backgroundColor: "#FFFFFF", color: "#0A0D11" }}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 shadow-md"
              aria-label="Account profile"
            >
              <User className="h-4 w-4" />
            </Link>

            <Link
              href="/wishlist"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
              }}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 shadow-md"
              aria-label={`Open wishlist (${wishlistCount} items)`}
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span
                  style={{ backgroundColor: "#FFFFFF", color: "#0A0D11" }}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full font-sans text-[10px] font-bold shadow-md"
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart hidden below md — the bottom dock already covers it on mobile */}
            <button
              type="button"
              onClick={openCart}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF"
              }}
              className="relative hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 shadow-md cursor-pointer md:flex"
              aria-label={`Open shopping cart (${totalCount} items)`}
            >
              <ShoppingBag className="h-4 w-4" />
              {totalCount > 0 && (
                <span
                  style={{ backgroundColor: "#FFFFFF", color: "#0A0D11" }}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full font-sans text-[10px] font-bold shadow-md"
                >
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* MOBILE VIEW (< md): Dedicated Uncropped Carousel Stage    */}
      {/* ======================================================== */}
      <div className="relative z-20 flex md:hidden flex-col justify-between pb-6 pt-1 gap-4 flex-1">
        {/* Kept for SEO/accessibility structure; the visible headline moved off mobile per design */}
        <h1 className="sr-only">Precision Compounds. Absolute Integrity.</h1>

        {/* Full-Bleed Carousel Stage: edge-to-edge, fills the remaining space */}
        <div
          className="relative w-full flex-1 min-h-0 overflow-hidden bg-[#12161E] shadow-2xl select-none"
          onTouchStart={(e) => { setIsPaused(true); onTouchStart(e); }}
          onTouchMove={onTouchMove}
          onTouchEnd={() => { setIsPaused(false); onTouchEnd(); }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Images */}
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.srcMobile}
                  alt={slide.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
                {/* Subtle vignette for overlay readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
              </div>
            );
          })}

          {/* Top Bar inside Stage: Counter & Swipe Pill */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-0.5 font-sans text-[11px] font-bold text-white tracking-wider">
              0{currentIndex + 1} <span className="text-white/50">/ 0{slides.length}</span>
            </span>
            <span className="rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-2.5 py-0.5 font-sans text-[10px] text-white/80 font-medium tracking-wide">
              Swipe to explore
            </span>
          </div>

          {/* Bottom Bar inside Stage: Caption & Controls */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-1.5">
            <p className="font-sans text-xs font-semibold text-white drop-shadow-md truncate">
              {slides[currentIndex].caption}
            </p>

            <div className="flex items-center justify-between">
              {/* Progress Indicators */}
              <div className="flex items-center gap-1.5">
                {slides.map((slide, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      style={{
                        backgroundColor: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.35)",
                        width: isActive ? "1.75rem" : "0.5rem"
                      }}
                      className="h-1 rounded-full transition-all duration-300 cursor-pointer"
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  );
                })}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-md active:scale-90 transition-all cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-md active:scale-90 transition-all cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button & Short Copy */}
        <div className="shrink-0 flex flex-col gap-2.5 px-5">
          <button
            type="button"
            onClick={scrollToCatalog}
            style={{ backgroundColor: "#FFFFFF", color: "#0A0D11" }}
            className="w-full flex items-center justify-center gap-2.5 rounded-full py-3.5 font-sans text-xs font-bold uppercase tracking-wider shadow-2xl transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>ACCESS THE COLLECTION</span>
            <ShoppingBag className="h-4 w-4" />
          </button>

          <p className="rounded-xl bg-black/35 px-4 py-2.5 text-center font-sans text-[11px] text-white leading-relaxed backdrop-blur-sm">
            Ultra-pure formulations systematically verified from Sanskrit pharmacopeias for clinical reliability.
          </p>
        </div>

      </div>

      {/* ======================================================== */}
      {/* DESKTOP VIEW (hidden on mobile, md:flex)                  */}
      {/* ======================================================== */}
      <div className="hidden md:flex flex-col justify-between flex-1">
        {/* Main Desktop Hero Content Area */}
        <div className="relative z-20 w-full px-6 py-8 md:px-12 md:py-14">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-10">
            {/* Left Text Block */}
            <div className="max-w-2xl">
              {/* Monumental All-Caps Pure White Headline */}
              <h1
                ref={headlineRef}
                data-gsap-reveal
                style={{ color: "#FFFFFF", opacity: 0 }}
                className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-extrabold uppercase tracking-tight leading-[1.03]"
              >
                PRECISION <br />
                COMPOUNDS. <br />
                <span style={{ color: "#FFFFFF" }}>ABSOLUTE INTEGRITY</span>
              </h1>

              {/* High-Contrast Pure White Pill Button */}
              <div ref={desktopCtaRef} data-gsap-reveal style={{ opacity: 0 }} className="mt-8 flex items-center">
                <button
                  type="button"
                  onClick={scrollToCatalog}
                  style={{ backgroundColor: "#FFFFFF", color: "#0A0D11" }}
                  className="group flex items-center gap-3 rounded-full px-8 py-4 font-sans text-xs md:text-sm font-bold uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>ACCESS THE COLLECTION</span>
                  <ShoppingBag className="h-4 w-4 transition-transform group-hover:scale-110" />
                </button>
              </div>

              {/* Precision Technical & Philosophical Copy in Clean White */}
              <p
                ref={desktopCopyRef}
                data-gsap-reveal
                style={{ color: "rgba(255, 255, 255, 0.85)", opacity: 0 }}
                className="mt-7 max-w-xl font-sans text-xs sm:text-sm md:text-base leading-relaxed font-normal"
              >
                Engineered from classical Sanskrit pharmacopeias and 150+ years of uninterrupted Ayurvedic lineage. BABA AYURVED delivers ultra-pure, systematically verified formulations designed to establish a new baseline in botanical precision and therapeutic reliability.
              </p>
            </div>

            {/* Minimalist Editorial Carousel Controls */}
            <div className="flex flex-col items-start md:items-end gap-3 z-20 pb-2">
              <div className="flex items-center gap-3">
                <span 
                  style={{ color: "#FFFFFF" }}
                  className="font-sans text-xs font-bold tracking-widest uppercase opacity-90"
                >
                  0{currentIndex + 1} <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>/ 0{slides.length}</span>
                </span>

                <span 
                  style={{ color: "rgba(255, 255, 255, 0.25)" }}
                  className="text-xs"
                >
                  •
                </span>

                <span 
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  className="font-sans text-[11px] font-medium tracking-wider uppercase"
                >
                  {slides[currentIndex].caption}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Prev Button */}
                <button
                  type="button"
                  onClick={prevSlide}
                  style={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.08)", 
                    borderColor: "rgba(255, 255, 255, 0.18)",
                    color: "#FFFFFF"
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all hover:bg-white hover:text-[#0A0D11] hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Progress Dashes */}
                <div className="flex items-center gap-1.5 px-1">
                  {slides.map((slide, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        style={{
                          backgroundColor: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.25)",
                          width: isActive ? "2.25rem" : "0.6rem"
                        }}
                        className="h-1 rounded-full transition-all duration-500 cursor-pointer hover:bg-white/80"
                        aria-label={`View slide ${idx + 1}: ${slide.caption}`}
                      />
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={nextSlide}
                  style={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.08)", 
                    borderColor: "rgba(255, 255, 255, 0.18)",
                    color: "#FFFFFF"
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all hover:bg-white hover:text-[#0A0D11] hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Soft handoff into the next (cream) section — fades the hero's dark
          base up into the warm cream tone, so the cut from dark to light
          scrolls in gently instead of hitting a hard edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 md:h-36 bg-gradient-to-b from-transparent to-[#F4ECE1]"
      />
    </section>
  );
}

