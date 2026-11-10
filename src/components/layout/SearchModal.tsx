"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { featuredProducts } from "@/content/products";
import { rituals } from "@/content/rituals";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedProducts = trimmed
    ? featuredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.sanskritName.includes(trimmed) ||
          p.description.toLowerCase().includes(trimmed) ||
          p.botanicals.some((b) => b.toLowerCase().includes(trimmed))
      )
    : [];

  const matchedRituals = trimmed
    ? rituals.filter(
        (r) =>
          r.name.toLowerCase().includes(trimmed) ||
          r.term.toLowerCase().includes(trimmed) ||
          r.summary.toLowerCase().includes(trimmed) ||
          r.sequence.some((s) => s.practice.toLowerCase().includes(trimmed))
      )
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search classical preparations and rituals"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:p-6 sm:pt-24 md:pt-32"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/75 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Search Container */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-sm border border-line bg-paper text-ink shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search className="h-5 w-5 text-tone-muted" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search classical herbs, formulations or rituals (e.g. Ashwagandha, Ushapan, Triphala)..."
            className="flex-1 bg-transparent font-serif text-base text-ink placeholder:font-serif placeholder:text-tone-muted focus:outline-none sm:text-lg"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-tone-muted hover:text-ink"
              aria-label="Clear query"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden rounded-xs border border-line bg-paper-deep px-2 py-0.5 font-sans text-[13px] text-tone-muted sm:inline-block">
              ESC
            </kbd>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="ml-1 text-tone-muted hover:text-ink focus-visible:outline-indigo"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {trimmed ? (
            <div className="space-y-6">
              {/* Product Matches */}
              {matchedProducts.length > 0 && (
                <div>
                  <span className="block mb-3 font-sans text-xs font-semibold uppercase tracking-label text-tone-muted">
                    Classical Preparations ({matchedProducts.length})
                  </span>
                  <ul className="space-y-2">
                    {matchedProducts.map((product) => (
                      <li key={product.id}>
                        <Link
                          href="/shop"
                          onClick={handleClose}
                          className="flex items-center justify-between rounded-sm p-3 transition-colors hover:bg-paper-deep focus-visible:bg-paper-deep focus-visible:outline-indigo"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-medium text-ink">{product.name}</span>
                              <span className="font-hindi text-xs text-tone-muted">{product.sanskritName}</span>
                            </div>
                            <span className="block font-sans text-xs text-tone-muted">
                              {product.form} &middot; {product.packSize} &middot; ₹{product.indicativePrice}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-tone-muted" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ritual Matches */}
              {matchedRituals.length > 0 && (
                <div>
                  <span className="block mb-3 font-sans text-xs font-semibold uppercase tracking-label text-tone-muted">
                    Daily Rituals ({matchedRituals.length})
                  </span>
                  <ul className="space-y-2">
                    {matchedRituals.map((ritual) => (
                      <li key={ritual.slug}>
                        <Link
                          href={`/rituals/${ritual.slug}`}
                          onClick={handleClose}
                          className="flex items-center justify-between rounded-sm p-3 transition-colors hover:bg-paper-deep focus-visible:bg-paper-deep focus-visible:outline-indigo"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-medium text-ink">{ritual.name}</span>
                              <span className="font-sans text-xs uppercase tracking-label text-tone-muted">
                                {ritual.term}
                              </span>
                            </div>
                            <span className="block font-serif text-xs text-tone-muted">
                              {ritual.summary}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-tone-muted" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {matchedProducts.length === 0 && matchedRituals.length === 0 && (
                <div className="py-10 text-center font-serif text-tone-muted">
                  No classical preparations or rituals found matching &ldquo;{query}&rdquo;.
                </div>
              )}
            </div>
          ) : (
            /* Quick Suggestions */
            <div className="space-y-4 py-2">
              <span className="block font-sans text-xs font-semibold uppercase tracking-label text-tone-muted">
                Suggested Explorations
              </span>
              <div className="grid gap-2 sm:grid-cols-2">
                <Link
                  href="/rituals/morning"
                  onClick={handleClose}
                  className="block rounded-sm border border-line p-3 transition-colors hover:bg-paper-deep"
                >
                  <span className="block font-serif text-sm font-medium text-ink">Morning Dinacharya</span>
                  <span className="block font-sans text-xs text-tone-muted">Ushapan, Kavala, Danta Dhavana</span>
                </Link>

                <Link
                  href="/rituals/evening"
                  onClick={handleClose}
                  className="block rounded-sm border border-line p-3 transition-colors hover:bg-paper-deep"
                >
                  <span className="block font-serif text-sm font-medium text-ink">Evening Ratricharya</span>
                  <span className="block font-sans text-xs text-tone-muted">Padabhyanga, calming taila</span>
                </Link>

                <Link
                  href="/#provenance"
                  onClick={handleClose}
                  className="block rounded-sm border border-line p-3 transition-colors hover:bg-paper-deep"
                >
                  <span className="block font-serif text-sm font-medium text-ink">Botanical Sourcing</span>
                  <span className="block font-sans text-xs text-tone-muted">Central Indian wild-harvested herbs</span>
                </Link>

                <Link
                  href="/shop"
                  onClick={handleClose}
                  className="block rounded-sm border border-line p-3 transition-colors hover:bg-paper-deep"
                >
                  <span className="block font-serif text-sm font-medium text-ink">Catalogue of Churnas</span>
                  <span className="block font-sans text-xs text-tone-muted">Ashwagandha, Triphala, Brahmi</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
