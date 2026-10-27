"use client";

import React, { type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds for full cycle
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * 21st.dev style infinite Marquee component.
 * Uses GPU-accelerated CSS translation with seamless looping and optional hover pause.
 */
export function Marquee({
  children,
  speed = 35,
  reverse = false,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`group flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] ${className}`}
    >
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-8 ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `marquee-scroll ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {children}
      </div>

      <div
        aria-hidden="true"
        className={`flex min-w-full shrink-0 items-center justify-around gap-8 ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `marquee-scroll ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
