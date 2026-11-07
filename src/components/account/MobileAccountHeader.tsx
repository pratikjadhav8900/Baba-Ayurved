import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function MobileAccountHeader({ title, backHref = "/account" }: { title: string; backHref?: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 md:hidden">
      <Link
        href={backHref}
        aria-label="Back"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-sand/60 text-brand-primary transition-colors hover:bg-brand-cream/40"
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>
      <h1 className="font-serif text-lg font-bold text-brand-primary">{title}</h1>
    </div>
  );
}
