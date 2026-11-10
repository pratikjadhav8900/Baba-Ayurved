"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

const SEEN_KEY = "baba-intro-seen";
const HOLD_MS = 2600;
const EXIT_MS = 650;
const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * One-time brand opener: the Gond leaf motif draws itself in, the wordmark
 * settles beneath it, then the whole thing dissolves into the homepage.
 * Homepage only, once per browser session — `sessionStorage` (not
 * `localStorage`) so it replays on the next visit, just not on every
 * internal navigation back to "/" or every refresh within the same visit.
 */
export function SiteIntro() {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname !== "/" || reduceMotion) return;
    if (sessionStorage.getItem(SEEN_KEY)) return;
    setShow(true);
    document.body.style.overflow = "hidden";
  }, [pathname, reduceMotion]);

  const dismiss = () => {
    sessionStorage.setItem(SEEN_KEY, "1");
    document.body.style.overflow = "";
    setShow(false);
  };

  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(dismiss, HOLD_MS);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          role="presentation"
          aria-hidden="true"
          onClick={dismiss}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: EXIT_MS / 1000, ease: EASE }}
          className="fixed inset-0 z-[999] flex cursor-pointer flex-col items-center justify-center bg-[#1C140D]"
        >
          {/* The real brand monogram (public/brand/logos/baba-monogram.svg), inlined so
              each path can draw as a stroke first, then ink in with its true fill —
              not an approximation, the exact path data from that file. */}
          <svg viewBox="0 0 95.27 71.42" className="h-16 w-auto sm:h-20" aria-hidden="true">
            <m.path
              d="M 33.41 7.52 C 40.81 7.41, 58.11 6.00, 60.73 15.14 C 61.37 17.41, 61.08 19.84, 59.93 21.90 C 56.62 27.74, 48.15 30.21, 42.07 31.89 C 47.18 31.97, 53.37 32.44, 58.22 34.96 C 53.92 42.77, 53.12 51.93, 57.70 61.14 C 57.73 61.19, 57.76 61.25, 57.79 61.31 C 56.85 61.90, 55.85 62.44, 54.83 62.91 C 53.05 63.66, 51.21 64.23, 49.32 64.60 C 45.30 65.42, 42.15 65.32, 38.11 65.30 L 27.76 65.21 C 24.93 65.21, 22.10 65.18, 19.28 65.13 C 16.04 65.05, 11.17 65.21, 10.27 60.91 C 9.66 58.04, 9.96 53.91, 9.96 50.87 L 9.94 25.68 L 9.96 18.14 C 9.96 16.27, 10.04 13.85, 9.68 12.05 C 9.25 9.97, 7.59 9.04, 6.00 7.97 C 6.72 7.94, 7.48 7.94, 8.20 7.93 C 16.61 7.80, 25.01 7.56, 33.41 7.52 M 47.90 36.96 C 44.72 34.77, 40.19 33.67, 36.45 34.27 C 32.35 34.72, 28.19 36.13, 25.49 39.39 C 22.85 42.52, 22.76 46.27, 22.80 50.14 C 22.84 53.80, 22.50 58.14, 25.84 60.60 C 29.35 63.18, 34.50 63.65, 38.71 63.16 C 38.84 63.14, 38.97 63.13, 39.10 63.11 C 43.47 62.43, 47.96 60.66, 50.51 57.00 C 54.57 51.17, 54.10 41.22, 47.90 36.96 M 48.05 20.95 C 51.49 11.97, 41.90 9.28, 35.30 9.54 C 31.32 9.74, 26.30 10.15, 23.09 12.60 C 23.03 18.23, 23.01 23.87, 23.03 29.50 C 23.03 31.66, 23.16 36.35, 22.92 38.21 C 25.67 35.38, 26.84 34.11, 30.59 32.31 C 36.17 29.88, 45.84 26.72, 48.05 20.95 Z"
              fill="#FBF7F3"
              stroke="#FBF7F3"
              strokeWidth="1"
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={{
                pathLength: { duration: 1.3, delay: 0.3, ease: EASE },
                fillOpacity: { duration: 0.6, delay: 1.1 },
              }}
            />
            <m.path
              d="M 89.13 19.84 L 89.24 19.87 L 89.27 20.07 C 88.26 21.73, 87.65 22.19, 86.81 24.23 C 85.97 26.30, 85.68 27.89, 85.09 30.02 C 83.73 34.88, 81.93 38.60, 77.96 41.86 C 73.83 45.23, 69.17 46.08, 65.34 49.82 C 62.36 52.73, 60.64 56.69, 60.58 60.86 C 60.12 59.98, 59.67 59.09, 59.25 58.20 C 53.77 46.02, 59.37 34.34, 69.67 27.27 C 75.14 23.51, 82.50 20.38, 89.13 19.84 Z"
              fill="#E6D3BA"
              stroke="#E6D3BA"
              strokeWidth="1"
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={{
                pathLength: { duration: 0.6, delay: 0.9, ease: EASE },
                fillOpacity: { duration: 0.4, delay: 1.3 },
              }}
            />
            <m.path
              d="M 85.86 43.71 C 86.45 43.67, 87.43 43.76, 88.05 43.79 C 87.26 44.66, 85.93 45.57, 85.29 46.56 C 82.61 50.68, 82.02 54.67, 78.58 58.45 C 74.82 62.60, 70.37 64.64, 64.82 64.94 L 63.16 64.92 C 63.12 64.16, 62.99 63.41, 62.97 62.65 C 62.68 50.57, 75.41 44.07, 85.86 43.71 Z"
              fill="#565924"
              stroke="#565924"
              strokeWidth="1"
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={{
                pathLength: { duration: 0.5, delay: 1.0, ease: EASE },
                fillOpacity: { duration: 0.4, delay: 1.3 },
              }}
            />
          </svg>

          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
            className="mt-5 flex flex-col items-center gap-2"
          >
            <span className="font-sans text-xl font-bold uppercase tracking-[0.28em] text-[#FAF6F0] sm:text-2xl">
              Baba Ayurveda
            </span>
            <span className="font-serif text-sm italic text-[#E2B784]">
              159 years of unbroken lineage
            </span>
          </m.div>

          <m.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.9 }}
            className="absolute bottom-8 font-sans text-[11px] uppercase tracking-[0.2em] text-[#E2B784]/60"
          >
            Tap to skip
          </m.span>
        </m.div>
      )}
    </AnimatePresence>
  );
}
