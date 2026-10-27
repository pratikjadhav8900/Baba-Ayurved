import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
  /**
   * hero: the working tagline (oversized, weight 400). One per page.
   * display: page titles (34–44px, weight 400)
   * statement: pull statements and closing lines (28–52px, weight 400)
   * section: section heading (22–26px, weight 500)
   * product: product / card names (20–24px, weight 500)
   * Weight is fixed per size on purpose: the serif is never bolder than 500.
   */
  size?: "hero" | "display" | "statement" | "section" | "product";
} & Omit<ComponentPropsWithoutRef<"h2">, "as">;

const sizes = {
  hero: "text-hero font-normal",
  display: "text-display font-normal text-balance",
  statement: "text-statement font-normal text-balance",
  section: "text-heading font-medium text-balance",
  product: "text-product font-medium text-balance",
} as const;

export function Heading({
  as: Tag = "h2",
  size = "section",
  className,
  ...props
}: HeadingProps) {
  return <Tag className={cn("font-serif", sizes[size], className)} {...props} />;
}
