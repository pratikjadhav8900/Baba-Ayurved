"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type GsapFadeUpProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use for a short stagger between adjacent instances. */
  delay?: number;
  /** Starting vertical offset in px — keep small for a calm, non-bouncy feel. */
  y?: number;
};

const EASE = "power3.out";

/**
 * Single-element GSAP/ScrollTrigger fade-up, for spots the existing
 * `motion`-powered <Reveal> doesn't already cover (see SmoothScrollProvider
 * for why both systems coexist rather than one replacing the other).
 * Tagged [data-gsap-reveal] so globals.css can force it visible with no JS
 * or under reduced motion — same safety net <Reveal> uses for [data-reveal].
 * That CSS rule only forces opacity (not transform/clip-path, unlike
 * <Reveal>'s rule) — under reduced motion the effect below never calls
 * gsap.fromTo at all, so no inline transform is ever applied here, and not
 * forcing `transform: none` keeps this element's own CSS hover/active
 * transforms (if its className has any) working normally.
 */
export function GsapFadeUp({ children, className, delay = 0, y = 28 }: GsapFadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reduceMotion) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: EASE,
          // Hand control back to CSS once settled, so any hover/active
          // transform on this element (or its children) still works.
          clearProps: "transform",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref, dependencies: [reduceMotion], revertOnUpdate: true }
  );

  return (
    <div ref={ref} data-gsap-reveal className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
