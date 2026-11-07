"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Product Orbit Carousel: adapted from a "smart-kitchen-display" dish carousel
 * for showcasing a small set of best-selling formulations. The product jar
 * sits on the left; changing product swings it out over the top on a wide
 * orbit while the next jar swings in from the other side. The two-weight
 * title wipes out and back in, the formulation card and its rating badge
 * cross-fade, and a pastel arc behind the scene turns and takes the
 * product's accent colour. By default the carousel is driven by its own
 * arrows, thumbnails, keyboard and (optional) autoplay — set `scrollDriven`
 * to pin the section and let page scroll advance it instead.
 */

export type OrbitProduct = {
  /** The thin first title line, e.g. "Triphala". */
  title: string;
  /** The heavy second title line, e.g. "Churna". */
  subtitle: string;
  /** Jar/bottle cutout photo, ideally transparent. */
  image: string;
  alt?: string;
  /** Small line above the title. Defaults to "#n Best Seller". */
  eyebrow?: string;
  /** Two-line label under the thumbnail. Defaults to title + subtitle. */
  label?: string;
  rating: number;
  /** Short benefit / use-case line, e.g. "Supports Digestion & Detox". */
  highlight: string;
  /** Classical reference or pack detail, under the highlight line. */
  formulation?: string;
  description: string;
  /** Key botanical actives shown under the "Key Actives" tab. */
  actives?: string[];
  /** Badge and band colour: hex or rgb(), so the band can morph between products. */
  accent: string;
};

export type ProductOrbitCarouselProps = {
  products: OrbitProduct[];
  /** Root height. A definite length: percentages collapse on a host page. */
  height?: string;
  /** Optional photo behind the display, washed by the theme background. */
  backdrop?: string;
  /** Scroll on forever: past the last product comes the first again. */
  loop?: boolean;
  /** When true, pins the section and lets page scroll drive the swap (heavy — a lot of extra scroll). When false (default), the carousel is self-contained and driven by arrows/thumbnails/keys/autoplay only. */
  scrollDriven?: boolean;
  /** Advance automatically when not scroll-driven. Pauses on hover. */
  autoplay?: boolean;
  autoplayDelay?: number;
  onAddToCart?: (product: OrbitProduct, index: number) => void;
  onChange?: (index: number) => void;
  className?: string;
};

// #region carousel
export function wrapIndex(i: number, n: number): number {
  if (n <= 0) return 0;
  return ((Math.round(i) % n) + n) % n;
}

/** Which way to swing when jumping from one product to another: the shorter way round. */
export function stepDirection(from: number, to: number, n: number): 1 | -1 {
  if (n <= 0) return 1;
  const fwd = (((to - from) % n) + n) % n;
  return fwd <= n - fwd ? 1 : -1;
}

/** Scroll stretches in the section: one per product change, plus one back round to the first when looping. */
export function scrollSteps(n: number, loop: boolean): number {
  return Math.max(0, loop ? n : n - 1);
}

/** The scroll stretch for item `i` nearest the current one (when looping, item 0 is also the last stretch). */
export function segmentFor(i: number, current: number, n: number, loop: boolean): number {
  return loop && i === 0 && current > n / 2 ? n : i;
}

/** First thumbnail shown in the strip window, keeping the current one in view. */
export function stripStart(index: number, n: number, visible: number): number {
  if (n <= visible) return 0;
  return Math.max(0, Math.min(index - 1, n - visible));
}

/** Title font size so a line of `chars` characters fits `width` px at `em` average glyph width. */
export function fitSize(chars: number, max: number, width: number, em: number): number {
  return Math.min(max, width / (Math.max(1, chars) * em));
}

/**
 * The pastel band: a thick stroke along the jars' orbit circle, tapering at
 * both ends. Angles in degrees, screen space (0 = right, 90 = straight down).
 */
export function arcPath(a0: number, a1: number, cx: number, cy: number, r: number, w: number, steps = 48): string {
  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180;
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.45);
    const c = Math.cos(a);
    const s = Math.sin(a);
    outer.push((cx + c * (r + h)).toFixed(1) + " " + (cy + s * (r + h)).toFixed(1));
    inner.push((cx + c * (r - h)).toFixed(1) + " " + (cy + s * (r - h)).toFixed(1));
  }
  return "M" + outer.join("L") + "L" + inner.reverse().join("L") + "Z";
}

/** Where the band rests for each item, as [start, end] angles along the orbit. Measured off the reference. */
export const ARC_REST = [
  [50, 98],
  [46, 124],
  [60, 126],
  [40, 100],
];
export function arcRest(index: number): number[] {
  return ARC_REST[((index % ARC_REST.length) + ARC_REST.length) % ARC_REST.length];
}

/** The band mid-swap: it stretches to trail between the outgoing and incoming jar. */
export const ARC_SWEEP = [38, 146];
// #endregion

// The jars' orbit: its pivot sits above the canvas (the .dsh-orbit transform-origin).
const ORBIT_X = 299;
const ORBIT_Y = -450;
const ORBIT_R = 650;
const SCROLL_PER_DISH = 0.7; // stage heights of scroll per product (only when scrollDriven)
const SWING = 50; // degrees the jar travels round the orbit's pivot
const ITEM = 118; // thumbnail pitch in canvas px
const VISIBLE = 4;

const FONT = "dsh-face";

// Dark "onyx apothecary" palette matching the Shastrokt Apothecary hero this lives in.
const BG = "#180E08";
const FG = "#FAF5EE";
const ACCENT = "#E2B784";
const MUTED = "#D6C4B0";

const CSS =
  // `.dsh-trk` is the sizing container (inline-size, no height/aspect of its own — it
  // just wraps `.dsh-root` in normal flow). `.dsh-root`'s own height/aspect-ratio come
  // in via inline style (see rootStyle below): aspect-ratio 960:520 by default, or an
  // explicit `height` when the caller opts out of that. Both are reset on mobile below.
  ".dsh-trk{position:relative;width:100%;container-type:inline-size}" +
  ".dsh-root{position:sticky;top:0;overflow:hidden;width:100%;background:" + BG + ";color:" + FG + ";" +
  "font-family:" + FONT + ",ui-sans-serif,system-ui,sans-serif;-webkit-tap-highlight-color:transparent}" +
  ".dsh-root *{box-sizing:border-box}" +
  ".dsh-bd{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;pointer-events:none}" +
  ".dsh-wash{position:absolute;inset:0;background:color-mix(in oklab," + BG + " 38%,transparent);pointer-events:none}" +
  // multiply by the background: a no-op on a light theme, lights-off on a dark one
  ".dsh-dim{position:absolute;inset:0;background:" + BG + ";mix-blend-mode:multiply;opacity:.72;pointer-events:none}" +
  ".dsh-root:focus-visible{outline:2px solid " + ACCENT + ";outline-offset:-4px}" +
  ".dsh-canvas{position:absolute;left:50%;top:50%;width:960px;height:520px;transform:translate(-50%,-50%) scale(var(--dsh-s,1));transform-origin:50% 50%}" +
  ".dsh-arc{position:absolute;left:0;top:0;width:960px;height:520px;overflow:visible;pointer-events:none}" +
  ".dsh-btn{appearance:none;border:0;background:none;color:inherit;font:inherit;padding:0;margin:0;cursor:pointer}" +
  ".dsh-btn:focus-visible{outline:2px solid " + ACCENT + ";outline-offset:3px;border-radius:10px}" +
  ".dsh-ico{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}" +
  ".dsh-pager{position:absolute;left:10px;top:172px;display:flex;flex-direction:column;align-items:center;gap:7px}" +
  ".dsh-dot{width:14px;height:10px;display:grid;place-items:center}" +
  ".dsh-dot i{display:block;width:3px;height:3px;border-radius:3px;background:" + FG + ";opacity:.45;transition:height .45s cubic-bezier(.3,.7,.2,1),opacity .3s}" +
  ".dsh-dot[aria-current] i{height:22px;opacity:.9}" +
  ".dsh-dot[aria-current]{height:26px}" +
  ".dsh-dot{transition:height .45s cubic-bezier(.3,.7,.2,1)}" +
  ".dsh-plates{position:absolute;left:40px;top:40px;width:320px;height:320px;touch-action:pan-y}" +
  ".dsh-orbit{position:absolute;inset:0;transform-origin:69% -217%;visibility:hidden;will-change:transform}" +
  ".dsh-orbit>img{display:block;width:320px;height:320px;max-width:none;object-fit:contain;user-select:none;-webkit-user-drag:none;" +
  "filter:drop-shadow(0 16px 22px rgba(0,0,0,.2)) drop-shadow(0 3px 5px rgba(0,0,0,.12))}" +
  ".dsh-head{position:absolute;left:388px;top:96px;width:330px;height:150px}" +
  ".dsh-hd{position:absolute;inset:0;visibility:hidden}" +
  ".dsh-eye{font-size:12.5px;font-weight:600;letter-spacing:.01em;margin:0 0 4px 2px;color:" + ACCENT + "}" +
  ".dsh-t1,.dsh-t2{display:block;white-space:nowrap;line-height:1;text-transform:uppercase;margin:0}" +
  ".dsh-t1{font-weight:200;letter-spacing:-.015em;margin-top:6px}" +
  ".dsh-t2{font-weight:800;letter-spacing:-.025em;margin-top:6px;color:color-mix(in oklab," + FG + " 86%,transparent)}" +
  ".dsh-acts{position:absolute;left:396px;top:280px;display:flex;gap:16px;font-size:12.5px;font-weight:500}" +
  ".dsh-acts .dsh-btn{display:flex;align-items:center;gap:9px;padding:9px 18px;border-radius:9999px;background:" + FG + ";color:" + BG + ";font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-size:11px;transition:transform 200ms ease,background-color 200ms ease}" +
  ".dsh-acts .dsh-btn:hover{background:" + ACCENT + "}" +
  ".dsh-acts .dsh-btn:active{transform:scale(0.95)}" +
  ".dsh-acts .dsh-ico{width:14px;height:14px}" +
  ".dsh-acts .dsh-fill{fill:currentColor;stroke:none}" +
  ".dsh-card{position:absolute;left:722px;top:137px;width:223px;padding:18px 20px 20px;border-radius:20px;" +
  "background:color-mix(in oklab," + BG + " 72%,transparent);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);" +
  "box-shadow:0 1px 0 color-mix(in oklab," + FG + " 6%,transparent) inset,0 18px 40px -24px rgba(0,0,0,.25)}" +
  ".dsh-tabs{display:flex;justify-content:space-between;gap:12px;padding:0 6px 0 20px;font-size:12px;margin-bottom:20px;" +
  "border-bottom:1px solid color-mix(in oklab," + FG + " 14%,transparent)}" +
  ".dsh-tab{color:" + MUTED + ";font-weight:500;padding:6px 2px 10px;position:relative;transition:color 200ms ease}" +
  ".dsh-tab::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;border-radius:2px;background:" + ACCENT + ";" +
  "transform:scaleX(0);transition:transform 200ms ease}" +
  ".dsh-tab[aria-selected=true]::after{transform:scaleX(1)}" +
  ".dsh-tab[aria-selected=true]{color:" + FG + ";font-weight:600}" +
  ".dsh-bodies{display:grid}" +
  ".dsh-body{grid-area:1/1;visibility:hidden}" +
  ".dsh-rate{position:relative;height:62px;margin:0 0 14px 6px}" +
  ".dsh-badge{position:absolute;left:0;top:0;width:46px;height:62px;border-radius:10px}" +
  ".dsh-badge svg{position:absolute;left:17px;bottom:9px;width:12px;height:12px;fill:" + FG + ";opacity:.8}" +
  ".dsh-num{position:absolute;left:10px;top:4px;font-size:36px;font-weight:700;letter-spacing:-.04em;line-height:1}" +
  ".dsh-chef{font-size:19px;font-weight:600;letter-spacing:-.01em;margin:0}" +
  ".dsh-kit{font-size:10.5px;color:" + MUTED + ";margin:3px 0 12px}" +
  ".dsh-desc{font-size:12.5px;line-height:1.38;margin:0;min-height:52px}" +
  ".dsh-ing{display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;min-height:52px}" +
  ".dsh-ing li{font-size:11px;padding:4px 9px;border-radius:99px;background:color-mix(in oklab," + FG + " 7%,transparent);" +
  "max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
  ".dsh-strip{position:absolute;left:130px;top:362px;width:550px;height:122px;display:flex;align-items:center}" +
  ".dsh-arrow{width:36px;height:36px;display:grid;place-items:center;flex:none}" +
  ".dsh-arrow svg{width:12px;height:16px;fill:currentColor}" +
  ".dsh-win{position:relative;width:" + ITEM * VISIBLE + "px;height:122px;overflow:hidden;flex:none;margin:0 2px;" +
  "-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}" +
  ".dsh-track{position:absolute;left:0;top:0;display:flex;transition:transform .6s cubic-bezier(.65,0,.35,1)}" +
  ".dsh-th{width:" + ITEM + "px;height:122px;display:flex;justify-content:center;padding-top:3px}" +
  ".dsh-th .dsh-btn{width:80px;height:116px;border-radius:14px;display:flex;flex-direction:column;align-items:center;gap:7px;padding-top:9px;transition:background .45s}" +
  ".dsh-th .dsh-btn[aria-current]{background:color-mix(in oklab," + BG + " 62%,transparent);box-shadow:0 10px 24px -16px rgba(0,0,0,.3)}" +
  ".dsh-th img{width:56px;height:56px;max-width:none;object-fit:contain;filter:drop-shadow(0 4px 6px rgba(0,0,0,.18));transition:transform .45s}" +
  ".dsh-th .dsh-btn[aria-current] img{transform:scale(1.06)}" +
  ".dsh-th span{font-size:10px;line-height:1.25;text-align:center;font-weight:500;color:color-mix(in oklab," + FG + " 78%,transparent);max-width:78px}" +
  ".dsh-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}" +
  "@container (max-width:639px){" +
  ".dsh-root{height:auto !important;aspect-ratio:auto !important}" +
  ".dsh-canvas{position:relative;left:auto;top:auto;width:100%;height:auto;transform:none;display:flex;flex-direction:column;align-items:center;padding:14px 16px 18px}" +
  ".dsh-arc{width:200%;height:auto;left:-60%;top:-30px}" +
  ".dsh-pager{left:14px;top:150px}" +
  ".dsh-plates{position:relative;left:auto;top:auto;width:min(52vw,32svh);height:min(52vw,32svh);margin-top:0}" +
  ".dsh-orbit>img{width:100%;height:100%}" +
  ".dsh-head{position:relative;left:auto;top:auto;width:100%;height:132px;margin-top:10px}" +
  ".dsh-hd{text-align:center;transform:none}" +
  // the JS-computed inline size assumes the fixed 330px desktop column; on a narrow
  // phone that overflows, so clamp to the viewport width instead and let it wrap.
  ".dsh-t1{font-size:clamp(1.25rem,7.5vw,2.25rem) !important;white-space:normal !important}" +
  ".dsh-t2{font-size:clamp(1.5rem,9vw,2.75rem) !important;white-space:normal !important}" +
  ".dsh-acts{position:relative;left:auto;top:auto;margin-top:4px;justify-content:center}" +
  ".dsh-card{position:relative;left:auto;top:auto;width:100%;max-width:420px;margin-top:12px}" +
  // long botanical names wrap unevenly as inline pills on a narrow phone; stack them instead
  ".dsh-ing{flex-direction:column;align-items:flex-start}" +
  ".dsh-ing li{width:100%}" +
  // phone: the pinned stage has to fit one screen; the pager, swipes and scroll cover the strip
  ".dsh-strip{display:none}" +
  "}" +
  "@media (prefers-reduced-motion:reduce){.dsh-track,.dsh-dot,.dsh-dot i,.dsh-th .dsh-btn,.dsh-th img{transition:none}}";

const HIDE_1 = "inset(0% 0% 0% 100%)"; // thin line: wipes in from the right
const HIDE_2 = "inset(0% 100% 0% 0%)"; // heavy line: wipes in from the left
const SHOW = "inset(0% 0% 0% 0%)";

const Icon = {
  cart: (
    <svg className="dsh-ico dsh-fill" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5 3 15h18zM3 18h18v2.5H3z" />
    </svg>
  ),
};

export function ProductOrbitCarousel({
  products,
  height,
  backdrop,
  loop = true,
  scrollDriven = false,
  autoplay = true,
  autoplayDelay = 5000,
  onAddToCart,
  onChange,
  className,
}: ProductOrbitCarouselProps) {
  const n = products.length;
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState("overview");
  const [isHovered, setIsHovered] = useState(false);

  const trackRef = useRef(null as HTMLDivElement | null);
  const rootRef = useRef(null as HTMLDivElement | null);
  const stRef = useRef(null as ScrollTrigger | null);
  const segRef = useRef(0);
  const indexRef = useRef(0);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  const orbits = useRef([] as (HTMLDivElement | null)[]);
  const heads = useRef([] as (HTMLDivElement | null)[]);
  const bodies = useRef([] as (HTMLDivElement | null)[]);
  const arcRef = useRef(null as SVGPathElement | null);
  const arc = useRef({ a0: 0, a1: 0 });
  const shown = useRef(-1);
  const dirRef = useRef(1 as 1 | -1);
  const tlRef = useRef(null as gsap.core.Timeline | null);
  const reducedRef = useRef(false);
  const swipe = useRef(null as { x: number; y: number } | null);

  // Fit the 960 x 520 design canvas to the root. Measured on resize only.
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      el.style.setProperty("--dsh-s", String(Math.min(w / 960, h / 520, 2)));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => (reducedRef.current = mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // The swap. Every product is in the DOM; GSAP only moves the outgoing and incoming ones.
  useLayoutEffect(() => {
    const from = shown.current;
    const to = index;
    const parts = (i: number) => {
      const head = heads.current[i];
      return {
        orbit: orbits.current[i],
        head,
        eye: head && head.querySelector(".dsh-eye"),
        t1: head && head.querySelector(".dsh-t1"),
        t2: head && head.querySelector(".dsh-t2"),
        body: bodies.current[i],
      };
    };
    // Writes the band's path only; no layout is read.
    const drawArc = () => arcRef.current?.setAttribute("d", arcPath(arc.current.a0, arc.current.a1, ORBIT_X, ORBIT_Y, ORBIT_R, 118));
    const rest = arcRest(to);
    const tint = products[to] ? products[to].accent : "transparent";
    if (tlRef.current) tlRef.current.progress(1).kill();
    const b = parts(to);
    if (from === -1 || from === to || reducedRef.current) {
      for (let i = 0; i < n; i++)
        if (i !== to) {
          const p = parts(i);
          gsap.set([p.orbit, p.head, p.body], { autoAlpha: 0 });
        }
      gsap.set([b.orbit, b.head, b.body, b.eye], { autoAlpha: 1, rotation: 0, y: 0 });
      gsap.set(b.t1, { clipPath: SHOW });
      gsap.set(b.t2, { clipPath: SHOW });
      arc.current.a0 = rest[0];
      arc.current.a1 = rest[1];
      drawArc();
      if (arcRef.current) gsap.set(arcRef.current, { fill: tint });
      shown.current = to;
      return;
    }
    const a = parts(from);
    const d = dirRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        tlRef.current = null;
      },
    });
    tlRef.current = tl;
    // jar: out over the top on the orbit, the next one swings in from the far side
    tl.to(a.orbit, { rotation: SWING * d, duration: 0.62, ease: "power2.in" }, 0)
      .set(a.orbit, { autoAlpha: 0, rotation: 0 }, 0.62)
      .fromTo(b.orbit, { autoAlpha: 1, rotation: -SWING * d }, { rotation: 0, duration: 0.95, ease: "power3.out" }, 0.3);
    // title: thin line clips away to the right, heavy line to the left, then the next wipes in
    tl.to(a.t1, { clipPath: HIDE_1, duration: 0.42, ease: "power2.in" }, 0)
      .to(a.t2, { clipPath: HIDE_2, duration: 0.42, ease: "power2.in" }, 0.06)
      .to(a.eye, { autoAlpha: 0, duration: 0.25 }, 0)
      .set(a.head, { autoAlpha: 0 }, 0.5)
      .set(b.head, { autoAlpha: 1 }, 0.5)
      .fromTo(b.eye, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.55)
      .fromTo(b.t1, { clipPath: HIDE_1 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.55)
      .fromTo(b.t2, { clipPath: HIDE_2 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.62);
    // card: cross-fade, the incoming rows rise in turn
    tl.to(a.body, { autoAlpha: 0, y: -6, duration: 0.3, ease: "power1.in" }, 0.05).set(b.body, { autoAlpha: 1, y: 0 }, 0.4);
    if (b.body) tl.fromTo(b.body.children, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }, 0.4);
    // the band stretches along the orbit with the jars, then settles into the next item's span, morphing colour
    tl.to(arc.current, { a0: ARC_SWEEP[0], a1: ARC_SWEEP[1], duration: 0.6, ease: "power2.inOut", onUpdate: drawArc }, 0).to(
      arc.current,
      { a0: rest[0], a1: rest[1], duration: 0.85, ease: "power3.out", onUpdate: drawArc },
      0.6
    );
    if (arcRef.current) tl.to(arcRef.current, { fill: tint, duration: 1.1, ease: "power1.inOut" }, 0.1);
    shown.current = to;
  }, [index, n, products]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const select = (next: number, dir: 1 | -1) => {
    if (next === indexRef.current) return;
    dirRef.current = dir;
    indexRef.current = next;
    setIndex(next);
    onChangeRef.current?.(next);
  };

  // The page scroll drives the item: the stage pins, one stretch of scroll per product, snapping between them.
  const steps = scrollDriven ? scrollSteps(n, loop) : 0;
  useEffect(() => {
    const track = trackRef.current;
    if (!scrollDriven || !track || steps < 1) return;
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      snap: { snapTo: 1 / steps, duration: { min: 0.3, max: 0.8 }, delay: 0.08, ease: "power2.inOut" },
      onUpdate: (self) => {
        // Looping: the last stretch shows the first item, so jump back to the top unseen.
        if (loop && self.progress >= 1 && self.direction > 0) {
          segRef.current = 0;
          self.scroll(self.start + 1);
          select(0, 1);
          return;
        }
        const seg = Math.round(self.progress * steps);
        if (seg === segRef.current) return;
        const dir = seg > segRef.current ? 1 : -1;
        segRef.current = seg;
        select(wrapIndex(seg, n), dir);
      },
    });
    // At the very top no scroll is left to fire onUpdate, so scrolling up there wraps round to the last item.
    // Deferred a frame so the browser's own wheel scroll has landed first.
    let raf = 0;
    const onWheel = (e: WheelEvent) => {
      const y = trigger.scroll();
      if (!loop || e.deltaY >= 0 || y < trigger.start - 1 || y > trigger.start + 1) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        segRef.current = n - 1;
        trigger.scroll(trigger.start + ((trigger.end - trigger.start) * (n - 1)) / steps);
        select(n - 1, -1);
      });
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    stRef.current = trigger;
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      trigger.kill();
      stRef.current = null;
    };
  }, [steps, loop, n, scrollDriven]);

  // Buttons, keys and swipes jump to an item and move the scroll to its stretch (when scroll-driven), so the two stay in step.
  const go = (to: number, dir?: 1 | -1) => {
    if (n < 2) return;
    const next = wrapIndex(to, n);
    if (next === index) return;
    const st = stRef.current;
    const y = st ? st.scroll() : 0;
    if (st && y >= st.start - 1 && y <= st.end + 1) {
      const seg = segmentFor(next, segRef.current, n, loop);
      segRef.current = seg;
      st.scroll(st.start + ((st.end - st.start) * seg) / steps);
    }
    select(next, dir ?? stepDirection(index, next, n));
  };
  const step = (d: 1 | -1) => go(index + d, d);

  // Calm autoplay when the carousel isn't scroll-driven. Pauses on hover.
  useEffect(() => {
    if (scrollDriven || !autoplay || isHovered || n <= 1) return;
    const id = setInterval(() => step(1), autoplayDelay);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollDriven, autoplay, autoplayDelay, isHovered, n, index]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };
  const onPointerDown = (e: PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.4) step(dx < 0 ? 1 : -1);
  };

  const start = stripStart(index, n, VISIBLE);
  const product = products[index];

  // Default: aspect-ratio 960:520 (the design canvas) fills whatever width the
  // caller gives it. Passing `height` opts out and uses that fixed height instead
  // (e.g. for a scroll-driven hero). Both are reset to natural/auto on mobile.
  const rootStyle: CSSProperties = height ? { height } : { aspectRatio: "960 / 520" };
  const trkStyle: CSSProperties | undefined =
    scrollDriven && steps > 0 && height ? { height: "calc(" + height + " * " + (1 + steps * SCROLL_PER_DISH) + ")" } : undefined;

  return (
    <div ref={trackRef} className={"dsh-trk" + (className ? " " + className : "")} style={trkStyle}>
      <div
        ref={rootRef}
        className="dsh-root"
        style={rootStyle}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured products"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <style>{CSS}</style>
        {backdrop ? <img className="dsh-bd" src={backdrop} alt="" width={1200} height={900} /> : null}
        {backdrop ? <div className="dsh-dim" /> : null}
        {backdrop ? <div className="dsh-wash" /> : null}

        <div className="dsh-canvas">
          <svg className="dsh-arc" viewBox="0 0 960 520" aria-hidden="true">
            <path ref={arcRef} style={{ opacity: 0.34 }} />
          </svg>

          <div className="dsh-pager" role="tablist" aria-label="Choose a product">
            {products.map((d, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                className="dsh-btn dsh-dot"
                aria-selected={i === index}
                aria-current={i === index ? "true" : undefined}
                aria-label={d.title + " " + d.subtitle}
                onClick={() => go(i)}
              >
                <i />
              </button>
            ))}
          </div>

          <div className="dsh-plates" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (swipe.current = null)}>
            {products.map((d, i) => (
              <div
                key={i}
                ref={(el) => {
                  orbits.current[i] = el;
                }}
                className="dsh-orbit"
                aria-hidden={i !== index}
              >
                <img src={d.image} alt={d.alt ?? d.title + " " + d.subtitle} width={320} height={320} draggable={false} />
              </div>
            ))}
          </div>

          <div className="dsh-head" aria-live="polite">
            {products.map((d, i) => (
              <div
                key={i}
                ref={(el) => {
                  heads.current[i] = el;
                }}
                className="dsh-hd"
                aria-hidden={i !== index}
              >
                <p className="dsh-eye">{d.eyebrow ?? "#" + (i + 1) + " Best Seller"}</p>
                <h2 style={{ margin: 0, font: "inherit" }}>
                  <span className="dsh-t1" style={{ fontSize: fitSize(d.title.length, 56, 330, 0.56) + "px" }}>
                    {d.title}
                  </span>
                  <span className="dsh-t2" style={{ fontSize: fitSize(d.subtitle.length, 62, 320, 0.64) + "px" }}>
                    {d.subtitle}
                  </span>
                </h2>
              </div>
            ))}
          </div>

          <div className="dsh-acts">
            <button type="button" className="dsh-btn" onClick={() => product && onAddToCart?.(product, index)}>
              {Icon.cart}
              Add to Cart
            </button>
          </div>

          <div className="dsh-card">
            <div className="dsh-tabs" role="tablist" aria-label="Product details">
              {["overview", "actives"].map((t) => (
                <button key={t} type="button" role="tab" className="dsh-btn dsh-tab" aria-selected={tab === t} onClick={() => setTab(t)}>
                  {t === "overview" ? "Overview" : "Key Actives"}
                </button>
              ))}
            </div>
            <div className="dsh-bodies">
              {products.map((d, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    bodies.current[i] = el;
                  }}
                  className="dsh-body"
                  aria-hidden={i !== index}
                >
                  <div className="dsh-rate">
                    <div className="dsh-badge" style={{ background: d.accent }}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                      </svg>
                    </div>
                    <span className="dsh-num" aria-label={"Rated " + d.rating.toFixed(1) + " out of 5"}>
                      {d.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="dsh-chef">{d.highlight}</p>
                  <p className="dsh-kit">{d.formulation ?? " "}</p>
                  {tab === "overview" || !d.actives?.length ? (
                    <p className="dsh-desc">{d.description}</p>
                  ) : (
                    <ul className="dsh-ing">
                      {d.actives.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="dsh-strip">
            <button type="button" className="dsh-btn dsh-arrow" aria-label="Previous product" onClick={() => step(-1)}>
              <svg viewBox="0 0 12 16" aria-hidden="true">
                <path d="M11 0v16L0 8z" />
              </svg>
            </button>
            <div className="dsh-win">
              <div className="dsh-track" style={{ transform: "translateX(" + -start * ITEM + "px)" }}>
                {products.map((d, i) => (
                  <div key={i} className="dsh-th">
                    <button type="button" className="dsh-btn" aria-current={i === index ? "true" : undefined} onClick={() => go(i)}>
                      <img src={d.image} alt="" width={56} height={56} draggable={false} />
                      <span>{d.label ?? d.title + " " + d.subtitle}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" className="dsh-btn dsh-arrow" aria-label="Next product" onClick={() => step(1)}>
              <svg viewBox="0 0 12 16" aria-hidden="true">
                <path d="M1 0v16l11-8z" />
              </svg>
            </button>
          </div>
        </div>
        <p className="dsh-sr" aria-live="polite">
          {product ? "Product " + (index + 1) + " of " + n + ": " + product.title + " " + product.subtitle : ""}
        </p>
      </div>
    </div>
  );
}

export default ProductOrbitCarousel;
