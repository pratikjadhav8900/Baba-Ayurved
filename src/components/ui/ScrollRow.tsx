import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Horizontal, touch-swipeable row with CSS scroll-snap. No JavaScript: native
 * momentum scrolling and snapping work on touch, trackpad, mouse-drag (via the
 * browser) and keyboard (arrow keys scroll a focused item into view). Children
 * should each carry `snap-start shrink-0`.
 *
 * `edgeFade` lets content bleed to the viewport edge on mobile while still
 * giving a visual cue that more sits off-screen, via a soft gradient mask.
 */
export function ScrollRow({
  edgeFade = true,
  className,
  ...props
}: { edgeFade?: boolean } & ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className={cn(
        "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-2",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        edgeFade && "[mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%-1.25rem),transparent)]",
        className,
      )}
      {...props}
    />
  );
}
