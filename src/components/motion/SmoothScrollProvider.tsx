"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const LenisContext = createContext<Lenis | null>(null);

/**
 * Read the live Lenis instance — null under prefers-reduced-motion (native
 * scroll is used instead) or before mount. Consumers that need to pause
 * smooth-scroll while something else owns the viewport (a modal, a drawer)
 * must call `.stop()` / `.start()` on it alongside whatever else they do to
 * lock scroll, since Lenis drives its own rAF loop independent of CSS
 * `overflow`.
 */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Wires Lenis' smooth-scroll loop to GSAP's own ticker — the integration
 * pattern GSAP's docs recommend — so ScrollTrigger reads Lenis' interpolated
 * scroll position instead of the raw (stepped) native one. Mount once, high
 * in the tree; Lenis scrolls `window`, so nesting position doesn't matter
 * beyond "client-side, persists across route changes."
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      // lagSmoothing(0) is a setting on GSAP's shared ticker singleton, used
      // by every GSAP animation in the app, not just Lenis's — restore its
      // default so disabling it here doesn't leak into unrelated tweens
      // after Lenis is torn down (e.g. prefers-reduced-motion toggling on
      // mid-session).
      gsap.ticker.lagSmoothing(1000, 16);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reduceMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
