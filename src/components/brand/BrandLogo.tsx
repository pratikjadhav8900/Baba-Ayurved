import Image from "next/image";
import { cn } from "@/lib/cn";

export type LogoVariant =
  | "primary" // Authentic primary vector logo (BABA with leaf & AYURVEDA)
  | "primary-compact" // Compact primary vector logo
  | "monogram" // 'B' monogram with leaf
  | "favicon" // Square favicon badge
  | "leaf" // Standalone botanical leaf icon
  | "dark-bg" // Authentic logo on dark background (#3E240C card)
  | "light-bg" // Authentic logo on light background (#F0E4D3 card)
  | "v2-primary" // Logo Variations V2 primary
  | "v2-monogram" // Logo Variations V2 monogram
  | "v2-favicon" // Logo Variations V2 favicon
  | "v2-dark" // Logo Variations V2 on dark
  | "v2-light"; // Logo Variations V2 on light

export type LogoTone = "default" | "reversed";
export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";

export type BrandLogoProps = {
  variant?: LogoVariant;
  tone?: LogoTone;
  size?: LogoSize;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  alt?: string;
};

// Intrinsic aspect ratios and default heights
const logoDimensions: Record<LogoVariant, { width: number; height: number; defaultPath: string; reversedPath?: string }> = {
  primary: {
    width: 489,
    height: 179,
    defaultPath: "/brand/logos/baba-logo-primary.svg",
    reversedPath: "/brand/logos/baba-logo-reversed.svg",
  },
  "primary-compact": {
    width: 224,
    height: 85,
    defaultPath: "/brand/logos/baba-logo-v1-primary.svg",
    reversedPath: "/brand/logos/baba-logo-reversed.svg",
  },
  monogram: {
    width: 95,
    height: 71,
    defaultPath: "/brand/logos/baba-monogram.svg",
    reversedPath: "/brand/logos/baba-monogram-reversed.svg",
  },
  favicon: {
    width: 76,
    height: 76,
    defaultPath: "/brand/logos/baba-favicon.svg",
  },
  leaf: {
    width: 70,
    height: 93,
    defaultPath: "/brand/logos/baba-leaf-icon.svg",
  },
  "dark-bg": {
    width: 218,
    height: 87,
    defaultPath: "/brand/logos/baba-logo-dark.svg",
  },
  "light-bg": {
    width: 218,
    height: 87,
    defaultPath: "/brand/logos/baba-logo-light.svg",
  },
  "v2-primary": {
    width: 1802,
    height: 872,
    defaultPath: "/brand/logos/baba-logo-v2-primary.png",
  },
  "v2-monogram": {
    width: 1350,
    height: 1165,
    defaultPath: "/brand/logos/baba-logo-v2-monogram.png",
  },
  "v2-favicon": {
    width: 1350,
    height: 1165,
    defaultPath: "/brand/logos/baba-logo-v2-favicon.png",
  },
  "v2-dark": {
    width: 1802,
    height: 872,
    defaultPath: "/brand/logos/baba-logo-v2-dark.png",
  },
  "v2-light": {
    width: 1803,
    height: 872,
    defaultPath: "/brand/logos/baba-logo-v2-light.png",
  },
};

const sizeClasses: Record<LogoSize, string> = {
  xs: "h-6 w-auto",
  sm: "h-8 w-auto md:h-9",
  md: "h-11 w-auto md:h-12",
  lg: "h-16 w-auto md:h-20",
  xl: "h-24 w-auto md:h-28",
};

/**
 * Authentic brand logo component rendering the official extracted assets
 * from Baba brand kit_v2.pdf. Preserves exact letterforms, proportions,
 * leaf geometry, and colors without CSS filters or font-based recreation.
 */
export function BrandLogo({
  variant = "primary",
  tone = "default",
  size = "md",
  width,
  height,
  priority = false,
  className,
  alt = "Baba Ayurved Pharmacy",
}: BrandLogoProps) {
  const meta = logoDimensions[variant] || logoDimensions.primary;
  const src =
    tone === "reversed" && meta.reversedPath ? meta.reversedPath : meta.defaultPath;

  // Render using standard Next.js Image with unoptimized flag for SVGs to keep crisp vector paths
  const isSvg = src.endsWith(".svg");

  return (
    <Image
      src={src}
      alt={alt}
      width={width || meta.width}
      height={height || meta.height}
      priority={priority}
      unoptimized={isSvg}
      className={cn(
        "object-contain select-none transition-opacity",
        sizeClasses[size],
        className,
      )}
    />
  );
}
