import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  /** Surface. Typography components adapt through --tone-* variables. */
  tone?: "paper" | "paper-deep" | "indigo" | "primary" | "sand" | "cream" | "ivory";
  spacing?: "default" | "tight" | "none";
} & ComponentPropsWithoutRef<"section">;

const tones = {
  paper: "tone-paper",
  "paper-deep": "tone-paper-deep",
  indigo: "tone-indigo",
  primary: "tone-primary",
  sand: "tone-sand",
  cream: "tone-cream",
  ivory: "tone-paper",
} as const;

const spacings = {
  default: "py-section",
  tight: "py-section-tight",
  none: "",
} as const;

/** Full-bleed band with consistent vertical rhythm. Put a Container inside. */
export function Section({
  tone = "paper",
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(tones[tone], spacings[spacing], className)}
      {...props}
    />
  );
}
