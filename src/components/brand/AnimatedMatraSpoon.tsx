"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useMotionValue, useSpring, useTransform, type MouseEvent } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type AnimatedMatraSpoonProps = {
  className?: string;
  color?: string;
};

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Tactile Ritual Tool: Custom 3g "Matra" Measuring Spoon — animated.
 * Draws itself in on scroll, pulses a "measured fill" inside the bowl, and
 * tilts toward the cursor like a physical object catching the light.
 */
export function AnimatedMatraSpoon({ className = "w-full h-24", color = "currentColor" }: AnimatedMatraSpoonProps) {
  const reduceMotion = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 150, damping: 15 });
  const sheenX = useTransform(rotateY, [-8, 8], [-40, 380]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYRaw.set(relX * 16);
    rotateXRaw.set(-relY * 10);
  }

  function handleMouseLeave() {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    <div style={{ perspective: 800 }} className={className}>
      <m.div
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <svg
          viewBox="0 0 460 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full overflow-visible"
          aria-label="Matra 3g Measuring Spoon with Gond handle engraving"
        >
          <defs>
            <radialGradient id="matra-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="matra-sheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Pulsing "measured fill" inside the bowl */}
          <m.ellipse
            cx="76"
            cy="35"
            rx="24"
            ry="16"
            fill="url(#matra-fill)"
            initial={{ opacity: 0.3, scale: 0.85 }}
            animate={reduceMotion ? undefined : { opacity: [0.3, 0.7, 0.3], scale: [0.85, 1, 0.85] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Spoon Bowl (Deep Oval Scoop) — draws itself in on scroll */}
          <m.path
            d="M40 35 C40 18 58 12 76 12 C96 12 110 22 110 35 C110 48 96 58 76 58 C58 58 40 52 40 35 Z"
            stroke={color}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          />
          {/* Bowl Depth Inner Arc */}
          <path
            d="M48 35 C48 44 60 52 76 52 C92 52 102 44 102 35"
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray="2 2"
            strokeOpacity="0.6"
          />
          {/* 1 Level Scoop = 3g Fill Mark inside Bowl */}
          <line x1="56" y1="35" x2="96" y2="35" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <text x="76" y="27" textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace" letterSpacing="0.1em">
            3g LEVEL
          </text>

          {/* Neck connector — draws in just after the bowl */}
          <m.path
            d="M110 32 C125 32 135 33 150 33 L410 33 C420 33 430 31 436 35 C430 39 420 37 410 37 L150 37 C135 37 125 38 110 38"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          />

          {/* Handle End Finial */}
          <circle cx="436" cy="35" r="5" stroke={color} strokeWidth="1.8" />
          <circle cx="436" cy="35" r="2" fill={color} />

          {/* Gond Dot-and-Line Pattern engraved on the handle */}
          {Array.from({ length: 18 }).map((_, i) => {
            const x = 165 + i * 13;
            return (
              <g key={i}>
                <circle cx={x} cy="35" r="1.1" fill={color} />
                {i % 2 === 0 && (
                  <>
                    <line x1={x} y1="30" x2={x} y2="32" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
                    <line x1={x} y1="38" x2={x} y2="40" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
                  </>
                )}
              </g>
            );
          })}

          {/* Measurement Callout Badge */}
          <rect x="230" y="48" width="130" height="18" rx="9" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
          <text x="295" y="60" textAnchor="middle" fill={color} fontSize="8" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.12em">
            1 LEVEL SCOOP = 3g
          </text>

          {/* Light sheen sweeping with cursor tilt, like polished wood/brass catching light */}
          {!reduceMotion && (
            <m.rect x="30" y="0" width="60" height="70" fill="url(#matra-sheen)" style={{ translateX: sheenX }} />
          )}
        </svg>
      </m.div>
    </div>
  );
}
