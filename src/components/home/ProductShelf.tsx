"use client";

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, LazyMotion, animate, domMax, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import { ChevronDown, ChevronLeft, Minus, Plus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { featuredProducts, type Product } from "@/content/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

/**
 * Store wall of three floating shelves. Every pack is drawn as SVG (cylinder shading, printed
 * type, ridged caps, glass with visible liquid) so the print can wrap round the body when the
 * product is picked up and turned. Click one and it moves from the shelf to a product page;
 * drag to spin it, release and it carries your speed then settles facing front.
 * Based on Aakash Mehra's Product Shelf, reskinned to the Baba Ayurved catalogue.
 */

type Kind = "jar" | "dropper" | "bottle";

type ShelfItem = {
  source: Product;
  kind: Kind;
  /** Print on the pack: product line, form line, short pack size. */
  short: string;
  sub: string;
  pack: string;
  /** Body colour, cap colour, paper-label colour, print colour. */
  color: string;
  cap: string;
  label: string;
  ink: string;
  glass?: boolean;
  liquid?: string;
};

type ShelfConfig = Omit<ShelfItem, "source"> & { id: string };

const BLACK = "#17120e";
const GOLD = "#D9B878";
const PAPER = "#F0E4D3";
const COFFEE = "#2A1808";

const shelfConfigs: readonly ShelfConfig[] = [
  // Shelf 1: single herbs
  { id: "ashwagandha-churna", kind: "jar", short: "Ashwagandha", sub: "Churna", pack: "100 g", color: BLACK, cap: BLACK, label: BLACK, ink: GOLD },
  { id: "amalaki-rasayana", kind: "jar", short: "Amalaki", sub: "Churna", pack: "100 g", color: COFFEE, cap: COFFEE, label: COFFEE, ink: GOLD },
  { id: "brahmi-churna", kind: "jar", short: "Brahmi Medhya", sub: "Churna", pack: "80 g", color: "#1d1a16", cap: "#1d1a16", label: "#1d1a16", ink: GOLD },
  { id: "shatavari-churna", kind: "jar", short: "Shatavari", sub: "Wild Churna", pack: "100 g", color: "#2f1d0f", cap: "#2f1d0f", label: "#2f1d0f", ink: GOLD },
  // Shelf 2: medicated oils
  { id: "ksheerabala-taila", kind: "dropper", short: "Ksheerabala", sub: "101 Taila", pack: "200 ml", color: "#6b3a12", cap: "#141414", label: PAPER, ink: COFFEE, glass: true, liquid: "#a8601d" },
  { id: "kumkumadi-taila", kind: "dropper", short: "Kumkumadi", sub: "Taila", pack: "30 ml", color: "#7a3f14", cap: "#C49A45", label: PAPER, ink: COFFEE, glass: true, liquid: "#c0652a" },
  { id: "mahanarayan-taila", kind: "bottle", short: "Mahanarayan", sub: "Taila", pack: "200 ml", color: "#5e3210", cap: "#141414", label: PAPER, ink: COFFEE, glass: true, liquid: "#9c561a" },
  { id: "dhanwantharam-taila", kind: "bottle", short: "Dhanwantharam", sub: "21 Taila", pack: "200 ml", color: "#6b3a12", cap: "#141414", label: PAPER, ink: COFFEE, glass: true, liquid: "#a8601d" },
  // Shelf 3: rasayana and classical formulations
  { id: "triphala-churna", kind: "jar", short: "Triphala", sub: "Churna", pack: "100 g", color: BLACK, cap: BLACK, label: BLACK, ink: GOLD },
  { id: "shilajit-resin", kind: "jar", short: "Shuddha Shilajit", sub: "Rasayana", pack: "30 g", color: "#0f0d0b", cap: "#C49A45", label: "#0f0d0b", ink: GOLD },
  { id: "chyawanprash-avaleh", kind: "jar", short: "Chyawanprash", sub: "Avaleh", pack: "500 g", color: "#3E240C", cap: BLACK, label: "#3E240C", ink: "#E8D9B8" },
  { id: "yashtimadhu-tablet", kind: "bottle", short: "Yashtimadhu", sub: "Vati 500 mg", pack: "60 tabs", color: BLACK, cap: "#C49A45", label: PAPER, ink: COFFEE },
];

const shelfItems: ShelfItem[] = shelfConfigs.flatMap(({ id, ...config }) => {
  const source = featuredProducts.find((p) => p.id === id);
  return source ? [{ source, ...config }] : [];
});

const shelfLabels = ["Single herbs", "Medicated oils", "Rasayana & classical formulations"];

// ---------- colour ----------

type RGB = [number, number, number];
const hexRgb = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mixRgb = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const css = (c: RGB, k = 1, a = 1) => `rgba(${[0, 1, 2].map((i) => Math.round(Math.min(255, Math.max(0, c[i] * k)))).join(",")},${a})`;
const WHITE: RGB = [255, 255, 255];
const lum = (c: RGB) => c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11;

// ---------- packaging (viewBox 200 x 300, everything stands on y = 286) ----------

type Box = { x: number; y: number; w: number; h: number };
type Shape = {
  body: string;
  box: Box;
  print: Box & { paper?: boolean };
  fill?: number;
  tube?: boolean;
  cap: (id: string) => ReactNode;
};

const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;

const ridges = (x: number, y: number, w: number, h: number, step = 2.6) =>
  Array.from({ length: Math.floor(w / step) }, (_, i) => (
    <line key={i} x1={x + 1 + i * step} y1={y + 1.5} x2={x + 1 + i * step} y2={y + h - 1.5} stroke="#000" strokeOpacity={i % 2 ? 0.14 : 0.06} strokeWidth="1" />
  ));

const SHAPES: Record<Kind, Shape> = {
  jar: {
    body: "M42 208 H158 Q162 208 162 214 V276 Q162 286 150 286 H50 Q38 286 38 276 V214 Q38 208 42 208 Z",
    box: { x: 38, y: 208, w: 124, h: 78 },
    print: { x: 38, y: 226, w: 124, h: 46 },
    cap: (id) => (
      <>
        <path d={rr(36, 172, 128, 38, 6)} fill={`url(#${id}-cap)`} />
        <g>{ridges(36, 178, 128, 30, 2.2)}</g>
        <path d={rr(36, 172, 128, 38, 6)} fill={`url(#${id}-capv)`} />
        <path d="M42 173.2 H158" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.2" />
        <rect x="38" y="208" width="124" height="3" fill="#000" opacity="0.22" />
      </>
    ),
  },
  dropper: {
    body: "M64 170 Q64 152 86 150 L86 140 L114 140 L114 150 Q136 152 136 170 L136 272 Q136 286 122 286 L78 286 Q64 286 64 272 Z",
    box: { x: 64, y: 140, w: 72, h: 146 },
    print: { x: 64, y: 192, w: 72, h: 70, paper: true },
    fill: 168,
    cap: (id) => (
      <>
        <path d="M86 118 V86 Q86 62 100 62 Q114 62 114 86 V118 Z" fill={`url(#${id}-bulb)`} />
        <path d="M91 74 Q93 66 100 65" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d={rr(80, 114, 40, 28, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(80, 114, 40, 28, 2)}</g>
        <path d={rr(80, 114, 40, 28, 3)} fill={`url(#${id}-capv)`} />
      </>
    ),
  },
  bottle: {
    body: "M62 114 Q62 86 86 82 L114 82 Q138 86 138 114 L141 268 Q141 286 122 286 L78 286 Q59 286 59 268 Z",
    box: { x: 59, y: 82, w: 82, h: 204 },
    print: { x: 59, y: 140, w: 82, h: 100, paper: true },
    fill: 110,
    cap: (id) => (
      <>
        <path d={rr(78, 50, 44, 34, 6)} fill={`url(#${id}-cap)`} />
        <path d={rr(78, 50, 44, 34, 6)} fill={`url(#${id}-capv)`} />
        <path d="M80 63 H120" stroke="#000" strokeOpacity="0.45" />
        <path d="M80 51.5 H120" stroke="#fff" strokeOpacity="0.4" />
      </>
    ),
  },
};

const EXTENT: Record<Kind, { top: number; w: number }> = {
  jar: { top: 172, w: 128 },
  dropper: { top: 60, w: 72 },
  bottle: { top: 48, w: 84 },
};
const pageZoom = (k: Kind) => Math.min(2.2, 262 / (290 - EXTENT[k].top), 190 / EXTENT[k].w);

// Tailwind needs these as literal strings to generate the classes (a computed
// `aspect-[${n}]` is invisible to it) — one static ratio per kind, matching the
// `tight` crop above: width 200 over (300 - (EXTENT.top - 14)).
const THUMB_ASPECT: Record<Kind, string> = {
  jar: "aspect-[200/142]",
  dropper: "aspect-[200/254]",
  bottle: "aspect-[200/266]",
};

// ---------- the product drawing ----------

function ProductArt({ item, spin, className, tight }: { item: ShelfItem; spin?: MotionValue<number>; className?: string; tight?: boolean }) {
  const id = "ps" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const s = SHAPES[item.kind];
  const c = hexRgb(item.color);
  const k = hexRgb(item.cap);
  const lab = hexRgb(item.label);
  const a = item.glass ? (lum(c) > 200 ? 0.28 : 0.8) : 1;
  const liq = hexRgb(item.liquid ?? item.color);
  const { print: P, box: B } = s;
  const period = P.w * 2.6;
  const fallback = useMotionValue(0);
  const x = useTransform(spin ?? fallback, (v) => -((((v * period) % period) + period) % period));
  const brand = "BABA AYURVEDA";
  const brandSize = Math.min(6.5, P.w * 0.075, (P.w * 1.05) / brand.length);
  const nameSize = Math.min(10.5, P.w * 0.12, (P.w * 1.12) / item.short.length);
  const subSize = Math.min(7, P.w * 0.08, (P.w * 1.25) / item.sub.length);
  const printArt = (dx: number) => (
    <g transform={`translate(${dx} 0)`}>
      {P.paper && <rect x={P.x} y={P.y} width={P.w} height={P.h} fill={css(lab)} />}
      <text x={P.x + P.w / 2} y={P.y + P.h * 0.2} fill={item.ink} fontSize={brandSize} fontWeight="600" letterSpacing={Math.min(1.6, P.w * 0.02)} textAnchor="middle">{brand}</text>
      <text x={P.x + P.w / 2} y={P.y + P.h * 0.46} fill={item.ink} fontSize={nameSize} fontWeight="500" letterSpacing="-0.15" textAnchor="middle">{item.short}</text>
      <text x={P.x + P.w / 2} y={P.y + P.h * 0.62} fill={item.ink} fontSize={subSize} opacity="0.8" textAnchor="middle">{item.sub}</text>
      <text x={P.x + P.w / 2} y={P.y + P.h * 0.86} fill={item.ink} opacity="0.6" fontSize={Math.min(5.8, P.w * 0.07)} textAnchor="middle">{item.pack}</text>
    </g>
  );
  // The shelf thumbnail crops tightly to where each kind's artwork actually starts
  // (EXTENT.top) instead of the full 300-unit canvas: a jar's cap sits at y=172, so
  // rendering the uncropped viewBox leaves >50% of the thumbnail transparent above it.
  // The full product page keeps the uncropped canvas — it already zooms/frames via
  // pageZoom on its own wrapper.
  const top = tight ? Math.max(0, EXTENT[item.kind].top - 14) : 0;
  const viewBox = `0 ${top} 200 ${300 - top}`;
  return (
    <svg viewBox={viewBox} className={className} aria-hidden overflow="visible">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" x2="1">
          <stop offset="0" stopColor={css(c, 0.42, a)} />
          <stop offset="0.06" stopColor={css(c, 0.64, a)} />
          <stop offset="0.1" stopColor={css(c, 0.92, a)} />
          <stop offset="0.16" stopColor={css(mixRgb(c, WHITE, 0.16), 1, a)} />
          <stop offset="0.36" stopColor={css(c, 1.02, a)} />
          <stop offset="0.55" stopColor={css(c, 0.93, a)} />
          <stop offset="0.76" stopColor={css(c, 0.78, a)} />
          <stop offset="0.9" stopColor={css(c, 0.6, a)} />
          <stop offset="0.95" stopColor={css(mixRgb(c, WHITE, 0.14), 0.9, a)} />
          <stop offset="1" stopColor={css(c, 0.5, a)} />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" x2="1">
          <stop offset="0" stopColor={css(k, 0.4)} />
          <stop offset="0.1" stopColor={css(k, 0.7)} />
          <stop offset="0.22" stopColor={css(mixRgb(k, WHITE, 0.6))} />
          <stop offset="0.3" stopColor={css(k, 1.02)} />
          <stop offset="0.6" stopColor={css(k, 0.86)} />
          <stop offset="0.85" stopColor={css(k, 0.62)} />
          <stop offset="0.93" stopColor={css(mixRgb(k, WHITE, 0.2), 0.9)} />
          <stop offset="1" stopColor={css(k, 0.4)} />
        </linearGradient>
        <linearGradient id={`${id}-capv`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.86" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${id}-wrap`} x1="0" x2="1">
          <stop offset="0" stopColor={css(c, 0.42)} stopOpacity="1" />
          <stop offset="0.14" stopColor={css(c, 0.42)} stopOpacity="0" />
          <stop offset="0.86" stopColor={css(c, 0.42)} stopOpacity="0" />
          <stop offset="1" stopColor={css(c, 0.42)} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${id}-liquid`} x1="0" x2="1">
          <stop offset="0" stopColor={css(liq, 0.7)} />
          <stop offset="0.3" stopColor={css(liq, 1)} />
          <stop offset="0.7" stopColor={css(liq, 0.92)} />
          <stop offset="1" stopColor={css(liq, 0.7)} />
        </linearGradient>
        <filter id={`${id}-soft`} x="-50%" y="-10%" width="200%" height="120%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <clipPath id={`${id}-clip`}>
          <path d={s.body} />
        </clipPath>
        <radialGradient id={`${id}-bulb`} cx="0.35" cy="0.25" r="0.9">
          <stop offset="0" stopColor={css(mixRgb(k, WHITE, 0.4))} />
          <stop offset="0.55" stopColor={css(k, 0.9)} />
          <stop offset="1" stopColor={css(k, 0.55)} />
        </radialGradient>
        <radialGradient id={`${id}-floor`}>
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="287" rx={B.w * 0.7} ry="6" fill={`url(#${id}-floor)`} />
      <ellipse cx="100" cy="286.3" rx={B.w * 0.47} ry="1.4" fill="#000" opacity="0.35" />

      <path d={s.body} fill={`url(#${id}-body)`} />
      <g clipPath={`url(#${id}-clip)`}>
        {item.glass && s.fill !== undefined && (
          <>
            <rect x={B.x + 3} y={s.fill} width={B.w - 6} height={286 - s.fill - 9} fill={`url(#${id}-liquid)`} opacity="0.75" />
            <rect x={B.x + 3} y={s.fill} width={B.w - 6} height="1.6" fill="#fff" opacity="0.45" />
            {s.tube && <rect x="98.6" y={B.y - 4} width="2.8" height={286 - B.y - 4} fill="#fff" opacity="0.4" />}
            <rect x={B.x} y="274" width={B.w} height="12" fill={css(c, 0.5, 0.55)} />
            <path d={`M${B.x + 6} 275 H${B.x + B.w - 6}`} stroke="#fff" strokeOpacity="0.5" strokeWidth="0.8" />
          </>
        )}
        <m.g style={{ x }}>
          {printArt(0)}
          {printArt(period)}
        </m.g>
        <rect x={B.x} y={P.y - 2} width={B.w} height={P.h + 4} fill={`url(#${id}-wrap)`} opacity="0.5" />
        <rect x={B.x} y={B.y} width={B.w} height={B.h} fill={`url(#${id}-shade)`} />
        <rect x={B.x + B.w * 0.07} y={B.y + 4} width={B.w * 0.11} height={B.h - 8} rx="3" fill="#fff" opacity={lum(c) > 200 ? 0.45 : 0.3} filter={`url(#${id}-soft)`} />
        <rect x={B.x + B.w * 0.11} y={B.y + 6} width={B.w * 0.028} height={B.h - 12} rx="1" fill="#fff" opacity="0.85" />
        <rect x={B.x + B.w * 0.86} y={B.y + 8} width={B.w * 0.025} height={B.h - 16} rx="1" fill="#fff" opacity="0.3" />
      </g>
      <path d={s.body} fill="none" stroke={css(c, 0.45, 0.45)} strokeWidth="0.7" />
      {s.cap(id)}
    </svg>
  );
}

// ---------- the shelf ----------

const SPRING = { type: "spring" as const, bounce: 0, duration: 0.55 };

export function ProductShelf() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { addToCart } = useCart();

  // addToCart opens the CartDrawer, which also locks body scroll. Close the product page
  // first so its cleanup doesn't undo the drawer's lock a tick later.
  const handleAdd = (item: ShelfItem, qty: number) => {
    setOpenId(null);
    window.setTimeout(() => addToCart(item.source, qty), 60);
  };
  const rows = [shelfItems.slice(0, 4), shelfItems.slice(4, 8), shelfItems.slice(8, 12)];
  const open = shelfItems.find((item) => item.source.id === openId) ?? null;

  // The product page renders in-flow (not a fixed overlay) so the site header, bottom
  // nav and footer stay reachable — only Escape-to-close applies here, no scroll lock.
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <section
      id="shop"
      aria-label="Classical botanical formulations"
      className="w-full overflow-hidden bg-[#F4ECE1] py-14 sm:py-16 md:py-20 border-y border-[#DFCDB7]"
    >
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 md:px-10 lg:px-12">
        <Reveal className="mb-10 md:mb-14 max-w-3xl">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#8C5E28] block mb-2">
            Classical Botanical Formulations
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-[#2A1808] leading-[1.05]">
            SUPPORT FOR MENTAL AND PHYSICAL OPTIMIZATION<sup>†</sup>
          </h2>
          {!open && (
            <p className="mt-3 font-sans text-sm text-[#5C2E06]/80 sm:text-base">
              Pick any pack off the shelf to turn it over and read the details.
            </p>
          )}
        </Reveal>

        {/*
          layoutId shared-element morphing needs Motion's `layout` feature, which
          the site-wide MotionProvider deliberately leaves out of its `domAnimation`
          bundle (see MotionProvider.tsx) to keep the global bundle small. Load the
          heavier `domMax` bundle locally, scoped to just this shelf.
        */}
        <LazyMotion features={domMax} strict>
        <LayoutGroup>
          {/*
            The shelf grid and the open product page are mutually exclusive (not
            grid-always-mounted-behind-a-fixed-overlay): whichever is hidden still
            shares its layoutId with the visible one, so Motion still FLIP-animates
            the morph between them. Rendering the product page in normal flow (no
            `fixed`) keeps the site header, bottom nav and footer reachable instead
            of being hidden behind a full-screen takeover.
          */}
          <AnimatePresence mode="popLayout" initial={false}>
            {open ? (
              <ProductPage
                key={open.source.id}
                item={open}
                onClose={() => setOpenId(null)}
                onAdd={(qty) => handleAdd(open, qty)}
                onSelect={(id) => setOpenId(id)}
              />
            ) : (
              <div key="shelf-grid" className="mx-auto w-full max-w-[1080px]">
                {rows.map((row, r) => (
                  <Reveal key={r} delay={r * 0.08}>
                    <section
                      aria-label={shelfLabels[r]}
                      className={cn("relative", r < rows.length - 1 && "mb-16 sm:mb-20")}
                    >
                      <span className="mb-3 block px-3 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[#8C5E28] sm:px-8 sm:text-[11px]">
                        {shelfLabels[r]}
                      </span>
                      <div className="relative z-10 grid grid-cols-4 items-end gap-3 px-3 sm:gap-8 sm:px-8">
                        {row.map((item) => (
                          <div key={item.source.id} className="flex flex-col items-center">
                            <m.button
                              layoutId={`shelf-product-${item.source.id}`}
                              type="button"
                              onClick={() => setOpenId(item.source.id)}
                              aria-label={`${item.source.name}, ₹${item.source.indicativePrice}`}
                              transition={SPRING}
                              className={cn(
                                "relative w-full max-w-[160px] cursor-pointer rounded-xl outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#3E240C]",
                                THUMB_ASPECT[item.kind],
                              )}
                            >
                              <ProductArt item={item} className="size-full" tight />
                            </m.button>
                          </div>
                        ))}
                      </div>
                      {/* floating shelf: lit top, crisp front edge, soft shadow on the wall */}
                      <div aria-hidden className="relative -mt-[6px] h-[16px]">
                        <div className="absolute inset-x-0 top-0 h-[8px] bg-[linear-gradient(to_bottom,#E3D3BE,#FBF7F0)]" />
                        <div className="absolute inset-x-0 top-[8px] h-[8px] bg-[linear-gradient(to_bottom,#FFFFFF,#EBDFCF)] shadow-[0_1px_0_rgba(62,36,12,0.06)]" />
                        <div className="absolute inset-x-[2%] top-[16px] h-[34px] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(62,36,12,0.16),transparent)]" />
                      </div>
                      <div className="mt-5 grid grid-cols-4 gap-3 px-3 sm:gap-8 sm:px-8">
                        {row.map((item) => (
                          <div key={item.source.id} className="text-center">
                            <div className="font-sans text-[12px] leading-tight font-semibold text-[#2A1808] sm:text-[14px]">{item.short}</div>
                            <div className="mt-0.5 font-sans text-[12px] text-[#8C5E28] tabular-nums sm:text-[13px]">₹{item.source.indicativePrice}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                ))}
              </div>
            )}
          </AnimatePresence>
        </LayoutGroup>
        </LazyMotion>
      </div>
    </section>
  );
}

function ProductPage({
  item,
  onClose,
  onAdd,
  onSelect,
}: {
  item: ShelfItem;
  onClose: () => void;
  onAdd: (qty: number) => void;
  onSelect: (id: string) => void;
}) {
  const p = item.source;
  // Rotate through the catalogue starting just after the open item, instead of always
  // slicing the same static first four — so suggestions actually vary by what's open.
  const openIndex = shelfItems.findIndex((i) => i.source.id === item.source.id);
  const suggestions = Array.from({ length: 4 }, (_, k) => shelfItems[(openIndex + 1 + k) % shelfItems.length]);
  const reduce = useReducedMotion();
  const spin = useMotionValue(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [section, setSection] = useState<string | null>("Botanicals");
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const drag = useRef<{ x: number; v: number; samples: { x: number; t: number }[] } | null>(null);

  const idleRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    if (reduce) return;
    const entrance = animate(spin, 1, { duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 });
    entrance.then(() => {
      // A slow, barely-there sway once the one-turn entrance settles — like the pack
      // catching ambient light — so it doesn't just sit dead still waiting to be dragged.
      idleRef.current = animate(spin, [1, 1.035, 0.975, 1], {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      });
    });
    return () => {
      entrance.stop();
      idleRef.current?.stop();
    };
  }, [spin, reduce]);

  const add = () => {
    setAdded(true);
    setTimeout(() => onAdd(qty), 900);
  };

  // drag to turn: 1:1 while held, then keep the release speed and settle facing front
  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    idleRef.current?.stop();
    spin.stop();
    drag.current = { x: e.clientX, v: spin.get(), samples: [{ x: e.clientX, t: e.timeStamp }] };
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    spin.set(d.v - (e.clientX - d.x) / 380);
    d.samples.push({ x: e.clientX, t: e.timeStamp });
    if (d.samples.length > 5) d.samples.shift();
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const first = d.samples[0];
    const last = d.samples[d.samples.length - 1];
    const vx = last.t > first.t ? ((last.x - first.x) / (last.t - first.t)) * 1000 : 0;
    const velocity = -vx / 380;
    const projected = spin.get() + ((velocity / 1000) * 0.998) / (1 - 0.998);
    animate(spin, Math.round(projected), { type: "spring", bounce: 0, duration: 0.9, velocity });
  };

  const sections: [string, ReactNode][] = [
    ["Botanicals", <ul key="b" className="list-disc space-y-1 pl-5">{p.botanicals.map((b) => <li key={b}>{b}</li>)}</ul>],
    ["Classical guidance", <p key="g">{p.classicalGuidance}</p>],
    ["Scripture reference", <p key="r">{p.classicalReference}</p>],
  ];

  return (
    <m.section
      aria-label={p.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto w-full max-w-[1080px]"
    >
      <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1.05fr_1fr] md:gap-14">
        <div className="relative flex flex-col items-center justify-center py-6 md:py-10">
          <m.div
            layoutId={`shelf-product-${p.id}`}
            transition={SPRING}
            className="relative z-10 aspect-[2/3] h-[46vh] max-h-[460px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <m.div
              className="pointer-events-none size-full"
              style={{ transformOrigin: "50% 96.7%" }}
              initial={{ scale: 1 }}
              animate={{ scale: pageZoom(item.kind) }}
              exit={{ scale: 1 }}
              transition={SPRING}
            >
              <ProductArt item={item} spin={spin} className="size-full" />
            </m.div>
          </m.div>
          <m.div
            aria-hidden
            className="relative -mt-[1.5%] h-[18px] w-[86%] rounded-[3px] bg-[linear-gradient(to_bottom,#FFFFFF,#EBDFCF)] shadow-[0_18px_40px_-12px_rgba(62,36,12,0.25)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <p className="mt-6 font-sans text-[12px] text-[#8C5E28]">Drag to turn</p>
        </div>

        <m.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="relative z-20 text-[#2A1808]"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="-ml-1.5 mb-6 inline-flex items-center gap-0.5 rounded-md px-1.5 py-1 font-sans text-[15px] text-[#2A1808] underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-[#3E240C]"
          >
            <ChevronLeft className="size-4" strokeWidth={2.2} /> Back to shelf
          </button>
          <div className="font-hindi text-sm font-medium text-brand-leaf-green">{p.sanskritName} &middot; {p.form}</div>
          <h2 className="mt-1 font-serif text-[clamp(28px,4vw,40px)] leading-[1.08] font-semibold tracking-[-0.015em]">{p.name}</h2>
          <p className="mt-2 font-sans text-[15px] font-semibold uppercase tracking-wider text-[#8C5E28]">{p.ritualTiming}</p>

          <div className="mt-6 flex items-baseline gap-2.5 tabular-nums">
            <span className="font-sans text-[26px] font-bold tracking-[-0.01em]">₹{p.indicativePrice}</span>
            {p.originalPrice && <span className="font-sans text-[17px] text-[#8C5E28]/70 line-through">₹{p.originalPrice}</span>}
            <span className="ml-1 rounded-full bg-[#E8DAC8] px-2.5 py-0.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#3E240C]">{p.packSize}</span>
          </div>
          <p className="mt-4 max-w-[54ch] font-sans text-[16px] leading-[1.5] text-[#2A1808]/85 sm:text-[17px]">{p.description}</p>

          <div className="mt-7 flex items-stretch gap-3">
            <div className="flex items-center rounded-xl border border-[#D5BF9F] bg-white">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-full w-11 place-items-center rounded-l-xl text-[#2A1808] transition-colors active:bg-black/[0.06] disabled:text-[#D5BF9F]" disabled={qty === 1}>
                <Minus className="size-4" />
              </button>
              <span className="w-7 text-center font-sans text-[17px] tabular-nums" aria-live="polite">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(9, q + 1))} className="grid h-full w-11 place-items-center rounded-r-xl text-[#2A1808] transition-colors active:bg-black/[0.06]">
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={add}
              className={cn(
                "h-12 flex-1 rounded-xl font-sans text-[13px] font-semibold uppercase tracking-wider text-[#FAF6F0] shadow-md transition-[background-color,transform] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3E240C]",
                added ? "bg-brand-leaf-green" : "bg-[#3E240C] hover:bg-[#2A1808]",
              )}
            >
              <span aria-live="polite">{added ? "Added to Ritual Bag" : `Add to Cart · ₹${p.indicativePrice * qty}`}</span>
            </button>
          </div>

          <dl className="mt-6 grid gap-1.5 font-sans text-[14px] leading-snug">
            <div className="flex gap-3"><dt className="w-24 shrink-0 font-semibold">Dispatch</dt><dd className="text-[#5C2E06]/80">Cold-sealed and dispatched directly from Gwalior</dd></div>
            <div className="flex gap-3"><dt className="w-24 shrink-0 font-semibold">Prepared by</dt><dd className="text-[#5C2E06]/80">Phoolchand Aushdhalaya, Mfg. Lic. 25D/23/99</dd></div>
          </dl>

          <div className="mt-8 border-t border-[#D5BF9F]">
            {sections.map(([title, body]) => {
              const isOpen = section === title;
              return (
                <div key={title} className="border-b border-[#D5BF9F]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setSection(isOpen ? null : title)}
                    className="flex w-full items-center justify-between py-4 text-left font-serif text-[17px] font-semibold focus-visible:outline-2 focus-visible:outline-[#3E240C]"
                  >
                    {title}
                    <ChevronDown className={cn("size-[18px] text-[#8C5E28] transition-transform duration-300", isOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={SPRING} className="overflow-hidden">
                        <div className="pb-5 font-sans text-[15px] leading-relaxed text-[#2A1808]/80">{body}</div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </m.div>
      </div>

      {suggestions.length > 0 && (
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ ...SPRING, delay: 0.1 }}
          className="mt-14 border-t border-[#DFCDB7] pt-10 sm:mt-16"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[#8C5E28] sm:text-[11px]">
              You may also like
            </span>
            <Link
              href="/shop"
              className="shrink-0 font-sans text-[11px] font-semibold text-[#3E240C] underline-offset-4 hover:underline sm:text-xs"
            >
              Browse full catalogue &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {suggestions.map((s) => (
              <button
                key={s.source.id}
                type="button"
                onClick={() => onSelect(s.source.id)}
                className="flex flex-col items-center gap-2 rounded-xl p-2 text-center outline-none transition-colors hover:bg-[#EADFCB]/50 focus-visible:ring-2 focus-visible:ring-[#3E240C]"
              >
                <div className={cn("w-full max-w-[120px]", THUMB_ASPECT[s.kind])}>
                  <ProductArt item={s} className="size-full" tight />
                </div>
                <span className="font-sans text-[12px] font-semibold text-[#2A1808]">{s.short}</span>
                <span className="font-sans text-[12px] text-[#8C5E28] tabular-nums">₹{s.source.indicativePrice}</span>
              </button>
            ))}
          </div>
        </m.div>
      )}
    </m.section>
  );
}
