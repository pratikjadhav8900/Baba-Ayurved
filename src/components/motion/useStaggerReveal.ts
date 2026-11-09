"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type StaggerRevealOptions = {
  /** Starting vertical offset in px. */
  y?: number;
  /** Seconds between each item's entrance. */
  stagger?: number;
  /** ScrollTrigger "start" position relative to the container. */
  start?: string;
  /**
   * Extra dependencies that should re-run the reveal — pass anything that
   * changes which DOM nodes match `itemSelector` (e.g. a filtered list's
   * length), so re-filtered-in cards still get queried and animated. Paired
   * with `revertOnUpdate: true` below, so the previous run's tween/
   * ScrollTrigger is torn down before the new one is created — without that
   * flag, @gsap/react only reverts on unmount, and every dependency change
   * would stack another ScrollTrigger on top of the last instead of
   * replacing it (e.g. switching ritual tabs or re-filtering the catalog).
   */
  deps?: readonly unknown[];
};

/**
 * Attach the returned ref to a grid/list container; every element inside it
 * matching `itemSelector` fades up on a stagger as the container scrolls
 * into view. Pairs with [data-gsap-reveal] in globals.css so items stay
 * visible with no JS or under reduced motion.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  itemSelector: string,
  options?: StaggerRevealOptions
): RefObject<T | null> {
  const containerRef = useRef<T>(null);
  const reduceMotion = usePrefersReducedMotion();
  const deps = options?.deps ?? [];

  useGSAP(
    () => {
      if (!containerRef.current || reduceMotion) return;
      const items = containerRef.current.querySelectorAll<HTMLElement>(itemSelector);
      if (!items.length) return;

      items.forEach((item) => item.setAttribute("data-gsap-reveal", ""));

      gsap.fromTo(
        items,
        { opacity: 0, y: options?.y ?? 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: options?.stagger ?? 0.12,
          // Many of these cards have their own CSS hover transforms (e.g.
          // `hover:-translate-y-1.5`); a leftover inline transform from this
          // tween would out-specificity those and silently kill the hover
          // effect, so hand control back to CSS once the reveal settles.
          clearProps: "transform",
          scrollTrigger: {
            trigger: containerRef.current,
            start: options?.start ?? "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [reduceMotion, ...deps], revertOnUpdate: true }
  );

  return containerRef;
}
