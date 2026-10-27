import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/content/categories";

/**
 * Typographic index of product categories. Rows are large, full-width tap
 * targets; the hover/focus response is a short indent, so nothing essential is
 * hover-only. Renders names and neutral descriptions only: no counts (unverified)
 * and no products.
 */
export function CategoryIndex({ className }: { className?: string }) {
  return (
    <ul className={["border-t border-solid border-tone", className].filter(Boolean).join(" ")}>
      {categories.map((category) => (
        <li key={category.id} className="border-b border-solid border-tone">
          <Link
            href={`/shop/${category.id}`}
            className="group flex min-h-16 items-center justify-between gap-6 py-4 transition-[padding] duration-(--duration-calm) ease-(--ease-calm) hover:pl-3 focus-visible:pl-3 md:py-5"
          >
            <span className="flex flex-col gap-0.5">
              <span className="font-serif text-product font-medium">{category.label}</span>
              <span className="font-sans text-value text-tone-muted">{category.description}</span>
            </span>
            <ArrowRight
              aria-hidden
              size={18}
              strokeWidth={1.5}
              className="shrink-0 transition-transform duration-(--duration-calm) group-hover:translate-x-1 group-focus-visible:translate-x-1"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
