"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

export type RevealProduct = {
  src: string;
  alt: string;
  name: string;
  subtitle: string;
  botanicals: string;
};

export const revealProducts: readonly RevealProduct[] = [
  {
    src: "/brand/products/triphala-bottle.jpg",
    alt: "Baba Ayurveda Triphala Rasayana bottle",
    name: "Triphala Rasayana",
    subtitle: "Shastrokt Classical Rasayana",
    botanicals: "Wild Amalaki · Haritaki · Bibhitaki",
  },
  {
    src: "/brand/products/ashwagandha-pack.jpg",
    alt: "Baba Ayurveda Ashwagandha Churna pack",
    name: "Ashwagandha Churna",
    subtitle: "Shastrokt Classical Churna",
    botanicals: "Withania somnifera (Dried Root)",
  },
  {
    src: "/brand/products/shilajit-tub.jpg",
    alt: "Baba Ayurveda Shuddha Shilajit tub",
    name: "Shuddha Shilajit Rasayana",
    subtitle: "Rare Reserve Rasayana",
    botanicals: "Purified Asphaltum Punjabianum · Triphala Decoction",
  },
] as const;

/**
 * A jar/bottle silhouette, cut into five horizontal bands (cap, shoulder,
 * upper body, lower body, base) so GSAP can stagger each band in from
 * scale(0), assembling the shape rather than just cross-fading a photo.
 * Adapted from a hover-driven "menu + clipped image" pattern, but driven by
 * the step tap that already exists in ArtworkSection — hover never fires on
 * a touchscreen, so this has to react to the same click/tap state the rest
 * of the stepper already uses, not a new hover listener.
 */
const BANDS = [
  { x: 110, y: 10, width: 80, height: 45, rx: 14 },
  { x: 88, y: 58, width: 124, height: 34, rx: 16 },
  { x: 54, y: 95, width: 192, height: 95, rx: 10 },
  { x: 50, y: 193, width: 200, height: 95, rx: 10 },
  { x: 56, y: 291, width: 188, height: 95, rx: 22 },
] as const;

export function ArtworkProductReveal({ activeIndex, className }: { activeIndex: number; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const clipId = `jar-clip-${useId()}`;

  // ArtworkSection sits well below the fold (8th section on the homepage), so
  // this used to pop in and finish its whole assembly animation during/just
  // after hydration while still off-screen — wasted on every visitor who
  // hasn't scrolled there yet, and it also deferred the image fetch itself
  // to that same too-early moment. Gate both behind actually entering the
  // viewport instead; a small negative rootMargin starts it a little before
  // the card is fully visible so it doesn't feel delayed once it's in view.
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isInView]);

  useLayoutEffect(() => {
    if (!isInView) return;
    const product = revealProducts[activeIndex] ?? revealProducts[0];
    if (imageRef.current) {
      imageRef.current.setAttribute("href", product.src);
    }

    const ctx = gsap.context(() => {
      const bands = gsap.utils.toArray<SVGRectElement>(".artwork-jar-band");
      timelineRef.current?.kill();

      // Animate the rect geometry itself (not CSS transforms): transforms on
      // <clipPath> children resolve their origin against the whole viewBox and
      // are unreliable across browsers, which left the image clipped to a tiny
      // fragment in production.
      const full = (b: (typeof BANDS)[number]) => ({ x: b.x, y: b.y, width: b.width, height: b.height });
      if (reduceMotion) {
        bands.forEach((el, i) => gsap.set(el, { attr: full(BANDS[i]) }));
        return;
      }

      const tl = gsap.timeline();
      bands.forEach((el, i) => {
        const b = BANDS[i];
        gsap.set(el, { attr: { x: b.x + b.width / 2, y: b.y + b.height / 2, width: 0, height: 0 } });
        tl.to(el, { attr: full(b), duration: 0.7, ease: "expo.out" }, i * 0.08);
      });
      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex, reduceMotion, isInView]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <svg viewBox="0 0 300 400" className="h-full w-full">
        <defs>
          <clipPath id={clipId}>
            {BANDS.map((band, i) => (
              <rect
                key={i}
                className="artwork-jar-band"
                {...band}
              />
            ))}
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <image ref={imageRef} width="300" height="400" preserveAspectRatio="xMidYMid slice" />
        </g>
      </svg>
    </div>
  );
}
