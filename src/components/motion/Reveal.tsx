"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /**
   * rise: fades in while rising a short distance (text, lists).
   * plate: opens like a clipped plate from the top (images, artwork frames).
   */
  variant?: "rise" | "plate";
  /** Seconds. Use for a short stagger between siblings, never more than ~0.3. */
  delay?: number;
  className?: string;
};

const EASE = [0.22, 0.61, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * Scroll-triggered entrance, played once. The animated element is tagged
 * [data-reveal] so globals.css keeps it fully visible when scripting is off or motion
 * is reduced. Opacity, transform and clip-path never change layout, so there is no
 * layout shift.
 *
 * IMPORTANT: the element that is *observed* must never be clipped. A fully clipped
 * element has no visible area, so a visitor who jumps into a section (an in-page
 * link, or the browser restoring scroll) would never trigger it and the content would
 * stay invisible. So the plate variant observes an un-clipped outer wrapper and animates
 * the clipped inner element through variants. `className` goes on the outer wrapper, so
 * it can carry grid placement.
 */
export function Reveal({ children, variant = "rise", delay = 0, className }: RevealProps) {
  if (variant === "plate") {
    return (
      <m.div className={className} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
        <m.div
          data-reveal
          variants={{
            hidden: { opacity: 0.001, clipPath: "inset(0 0 100% 0)" },
            shown: {
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              transition: { duration: 1, ease: EASE, delay },
            },
          }}
        >
          {children}
        </m.div>
      </m.div>
    );
  }

  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}
