import { cn } from "@/lib/cn";

type WordmarkProps = {
  /** "stacked" centres the lines (primary lockup); "horizontal" left-aligns them. */
  align?: "center" | "start";
  tone?: "default" | "reversed";
  /** Scales the whole wordmark; the serif line is 1em of this size. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "text-[1.25rem]",
  md: "text-[1.5rem]",
  lg: "text-[2rem]",
} as const;

/**
 * Wordmark (brief §3.2): serif "Baba Ayurved" at weight 400, never bold, above
 * tracked sans "PHARMACY" at weight 500 in indigo. "PHARMACY" is the only
 * tracked uppercase in the identity. It is real text uppercased in CSS, so
 * assistive tech reads it as a word.
 */
export function Wordmark({
  align = "start",
  tone = "default",
  size = "md",
  className,
}: WordmarkProps) {
  const reversed = tone === "reversed";

  return (
    <span
      className={cn(
        "inline-flex flex-col leading-none",
        align === "center" ? "items-center text-center" : "items-start",
        sizes[size],
        className,
      )}
    >
      <span
        className={cn(
          "font-serif font-normal tracking-[-0.005em]",
          reversed ? "text-paper" : "text-ink",
        )}
      >
        Baba Ayurved
      </span>
      <span
        className={cn(
          "mt-[0.38em] font-sans text-[0.42em] font-medium uppercase tracking-wordmark",
          // Trailing letter-spacing would push a centred line off-axis; balance it.
          align === "center" && "pl-[0.5em]",
          reversed ? "text-paper" : "text-indigo",
        )}
      >
        Pharmacy
      </span>
    </span>
  );
}
