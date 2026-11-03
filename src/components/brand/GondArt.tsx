"use client";

import React from "react";

interface GondProps {
  className?: string;
  color?: string;
  size?: number;
}

/**
 * Gond Botanical Leaf Motif
 * Traditional Gondi dot-and-line infill celebrating the flora of Madhya Pradesh.
 */
export function GondLeafIcon({ className = "w-6 h-6", color = "currentColor" }: GondProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Leaf Silhouette */}
      <path
        d="M24 4C14 14 6 26 12 38C18 50 36 44 42 32C46 20 34 8 24 4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Central Vein */}
      <path
        d="M24 6C24 18 26 28 32 38"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Gond Signature Repeating Dots (Binda) along left lobe */}
      <circle cx="16" cy="22" r="1.2" fill={color} />
      <circle cx="18" cy="26" r="1.2" fill={color} />
      <circle cx="17" cy="31" r="1.2" fill={color} />
      <circle cx="21" cy="35" r="1.2" fill={color} />
      {/* Gond Fine Dashes (Dhingna) along right lobe */}
      <line x1="26" y1="16" x2="31" y2="13" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="27" y1="22" x2="34" y2="19" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="28" y1="28" x2="37" y2="25" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="29" y1="34" x2="38" y2="32" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Gond Decorative Pattern Border
 * Rhythmic tribal geometric repeat (chevron + binda dots) for editorial section breaks.
 */
export function GondPatternBorder({ className = "w-full h-4", color = "currentColor" }: GondProps) {
  return (
    <svg
      viewBox="0 0 600 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 10 Q 25 2 50 10 T 100 10 T 150 10 T 200 10 T 250 10 T 300 10 T 350 10 T 400 10 T 450 10 T 500 10 T 550 10 T 600 10"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      {/* Pattern units of Gond dot clusters */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 25 + i * 50;
        return (
          <g key={i}>
            <circle cx={x} cy="5" r="1" fill={color} fillOpacity="0.6" />
            <circle cx={x - 4} cy="10" r="0.8" fill={color} fillOpacity="0.4" />
            <circle cx={x + 4} cy="10" r="0.8" fill={color} fillOpacity="0.4" />
            <circle cx={x} cy="15" r="1" fill={color} fillOpacity="0.6" />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Gond Sacred Tree of Life (Mahua / Peepal)
 * Stylized backdrop motif representing the deep forest roots of Madhya Pradesh.
 */
export function GondTreeOfLife({ className = "w-96 h-96", color = "currentColor" }: GondProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central Trunk with natural organic curvature */}
      <path
        d="M200 370 C200 280 180 230 190 180 C195 150 200 120 200 80"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Left Roots */}
      <path d="M195 350 C170 365 140 375 110 378" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M198 360 C185 375 165 385 145 392" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Right Roots */}
      <path d="M205 350 C230 365 260 375 290 378" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M202 360 C215 375 235 385 255 392" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Main Branches */}
      {/* Left Branch 1 */}
      <path d="M188 240 C140 230 110 190 90 150" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M140 215 C120 180 115 140 120 100" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Right Branch 1 */}
      <path d="M192 230 C240 220 270 180 290 140" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M240 205 C260 170 265 130 260 90" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Left Upper Branch */}
      <path d="M193 170 C160 140 145 105 140 70" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Right Upper Branch */}
      <path d="M197 160 C230 130 245 95 250 60" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Crown */}
      <path d="M200 100 C190 70 195 40 200 20" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Gond Foliage Clusters with Signature Binda (Dots) and Radiant Dashes */}
      {[
        { cx: 90, cy: 150 },
        { cx: 120, cy: 100 },
        { cx: 140, cy: 70 },
        { cx: 200, cy: 30 },
        { cx: 250, cy: 60 },
        { cx: 260, cy: 90 },
        { cx: 290, cy: 140 },
        { cx: 160, cy: 120 },
        { cx: 225, cy: 110 },
      ].map((pos, idx) => (
        <g key={idx}>
          {/* Central Leaf Node */}
          <circle cx={pos.cx} cy={pos.cy} r="5" stroke={color} strokeWidth="1.5" />
          <circle cx={pos.cx} cy={pos.cy} r="2" fill={color} />
          {/* Gond Dot Ring */}
          {Array.from({ length: 8 }).map((_, dIdx) => {
            const angle = (dIdx * 45 * Math.PI) / 180;
            const rx = pos.cx + Math.cos(angle) * 11;
            const ry = pos.cy + Math.sin(angle) * 11;
            return <circle key={dIdx} cx={rx} cy={ry} r="1.2" fill={color} fillOpacity="0.85" />;
          })}
        </g>
      ))}

      {/* Trunk Texture: Traditional Gond tribal fine hatch lines */}
      <path d="M194 300 Q 198 300 202 300" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M193 280 Q 197 280 201 280" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M192 260 Q 196 260 200 260" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M191 240 Q 195 240 199 240" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M192 210 Q 196 210 200 210" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Tactile Ritual Tool: Custom 3g "Matra" Measuring Spoon
 * High-precision vector illustrating the neem-wood / etched brass spoon with Gond handle engraving.
 */
export function GondMatraSpoon({ className = "w-full max-w-md h-24", color = "currentColor" }: GondProps) {
  return (
    <svg
      viewBox="0 0 460 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Matra 3g Measuring Spoon with Gond handle engraving"
    >
      {/* Spoon Bowl (Deep Oval Scoop) */}
      <path
        d="M40 35 C40 18 58 12 76 12 C96 12 110 22 110 35 C110 48 96 58 76 58 C58 58 40 52 40 35 Z"
        stroke={color}
        strokeWidth="2"
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

      {/* Neck connector */}
      <path
        d="M110 32 C125 32 135 33 150 33 L410 33 C420 33 430 31 436 35 C430 39 420 37 410 37 L150 37 C135 37 125 38 110 38"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
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
    </svg>
  );
}

