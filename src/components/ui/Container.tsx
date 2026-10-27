import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** page: 1536px · wide: 1720px · full: 1920px · narrow: 56rem */
  width?: "page" | "wide" | "narrow" | "full";
} & Omit<ComponentPropsWithoutRef<T>, "as">;

const widths = {
  page: "max-w-[1536px]",
  wide: "max-w-[1720px]",
  full: "max-w-[1920px]",
  narrow: "max-w-4xl",
} as const;

/** Centred column with the responsive gutter. */
export function Container<T extends ElementType = "div">({
  as,
  width = "page",
  className,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn("mx-auto w-full px-gutter", widths[width], className)}
      {...props}
    />
  );
}
