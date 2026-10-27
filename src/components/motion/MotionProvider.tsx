"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads Motion's lightweight feature set once for the whole site. Components use
 * the tiny `m.*` elements, not the full `motion.*` ones, so the bundle stays small.
 * `reducedMotion="user"` makes Motion skip transform animations when the visitor
 * asks for less motion; globals.css additionally forces [data-reveal] content visible.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
