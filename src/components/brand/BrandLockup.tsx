import { cn } from "@/lib/cn";
import { BrandLogo, type LogoSize } from "./BrandLogo";

type BrandLockupProps = {
  /** Layout options: horizontal (default), stacked, or icon (monogram) */
  layout?: "stacked" | "horizontal" | "icon";
  tone?: "default" | "reversed";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

/**
 * Authentic brand lockup displaying the official vector logo extracted
 * from Baba brand kit_v2.pdf.
 */
export function BrandLockup({
  layout = "horizontal",
  tone = "default",
  size = "md",
  className,
}: BrandLockupProps) {
  if (layout === "icon") {
    return (
      <BrandLogo
        variant="monogram"
        tone={tone}
        size={size as LogoSize}
        className={className}
        alt="Baba Ayurved Pharmacy Monogram"
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center",
        layout === "stacked" ? "flex-col gap-2 text-center" : "flex-row gap-3",
        className,
      )}
    >
      <BrandLogo
        variant="primary"
        tone={tone}
        size={size as LogoSize}
        alt="Baba Ayurved Pharmacy"
        priority
      />
    </span>
  );
}

