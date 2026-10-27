import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  as?: "p" | "span" | "div";
} & Omit<ComponentPropsWithoutRef<"p">, "as">;

/**
 * Small functional label above a heading. Archivo, tracked uppercase: the one
 * place besides "PHARMACY" where tracked caps are allowed. Never use the serif
 * for these.
 */
export function Eyebrow({ as: Tag = "p", className, ...props }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "font-sans text-caps font-medium uppercase tracking-caps text-tone-muted",
        className,
      )}
      {...props}
    />
  );
}
