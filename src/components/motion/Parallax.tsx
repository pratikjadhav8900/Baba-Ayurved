"use client";

import * as m from "motion/react-m";
import { useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type ParallaxProps = {
  children: ReactNode;
  /**
   * Total vertical travel in px across the element's pass through the viewport.
   * Positive drifts down against the scroll, negative drifts up. Keep it small.
   */
  distance?: number;
  className?: string;
};

/**
 * Gentle depth: a block drifts slightly against the page scroll, so a plate and its
 * text move at different speeds. Disabled entirely under reduced motion. Use on
 * large plates only, never on text.
 */
export function Parallax({ children, distance = 48, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);

  return (
    <div ref={ref} className={className}>
      <m.div style={reduce ? undefined : { y }}>{children}</m.div>
    </div>
  );
}
