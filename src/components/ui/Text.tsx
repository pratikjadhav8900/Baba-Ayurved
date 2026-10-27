import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type TextProps = {
  as?: "p" | "span" | "div";
  /**
   * body: story copy, serif 16–18px
   * step: ritual / practice-card steps, serif 15–17px
   * ui: functional sans 14–15px
   * value: evidence values, sans 13–14px
   */
  variant?: "body" | "step" | "ui" | "value";
  /** Soft colour for secondary copy; adapts to the surface tone. */
  muted?: boolean;
  /** Cap line length to a readable measure. */
  measure?: boolean;
} & Omit<ComponentPropsWithoutRef<"p">, "as">;

const variants = {
  body: "font-serif text-body",
  step: "font-serif text-step",
  ui: "font-sans text-ui",
  value: "font-sans text-value",
} as const;

export function Text({
  as: Tag = "p",
  variant = "body",
  muted = false,
  measure = false,
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        variants[variant],
        muted && "text-tone-muted",
        measure && "max-w-measure",
        className,
      )}
      {...props}
    />
  );
}
