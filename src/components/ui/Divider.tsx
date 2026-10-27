import { cn } from "@/lib/cn";
import { Rosette } from "@/components/brand/Rosette";

type DividerProps = {
  /** "rosette" centres the compact mark between two hairlines. */
  variant?: "line" | "rosette";
  className?: string;
};

/** Hairline section divider. Decorative: hidden from assistive tech. */
export function Divider({ variant = "line", className }: DividerProps) {
  if (variant === "line") {
    return (
      <hr
        aria-hidden
        className={cn("border-0 border-t border-solid border-tone", className)}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={cn("flex items-center gap-4 text-tone-accent", className)}
    >
      <span className="h-px flex-1 bg-(--tone-line)" />
      <Rosette size={24} />
      <span className="h-px flex-1 bg-(--tone-line)" />
    </div>
  );
}
