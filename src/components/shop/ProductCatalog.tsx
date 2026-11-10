"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, ArrowUpDown, RefreshCw } from "lucide-react";
import { featuredProducts, productCategories, type Product } from "@/content/products";
import { ModernProductCard } from "./ModernProductCard";
import { ProductDetailModal } from "./ProductDetailModal";
import { Button } from "@/components/ui/Button";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products based on active category / tag
  const filteredProducts = useMemo(() => {
    let list = [...featuredProducts];

    if (activeCategory === "best-sellers") {
      list = list.filter((p) => p.isBestSeller);
    } else if (activeCategory === "new-arrivals") {
      list = list.filter((p) => p.isNewArrival);
    } else if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Apply sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.indicativePrice - b.indicativePrice);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.indicativePrice - a.indicativePrice);
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col gap-4 border-b border-solid border-brand-sand/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills Bar (Horizontal Scroll on Mobile) */}
        <div className="relative -mx-4 sm:mx-0">
          <div className="flex items-center gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:flex-wrap sm:px-0 touch-pan-x">
            {productCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2 font-sans text-xs font-semibold tracking-wider transition-all duration-200 focus-visible:outline-brand-primary ${
                    isActive
                      ? "bg-brand-primary text-brand-ivory shadow-xs"
                      : "bg-white text-brand-primary/90 border border-brand-sand hover:bg-brand-sand/30 hover:text-brand-primary"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
          {/* Fade hint that more pills are scrollable, so the row reads as "scroll" not "cut off" */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-brand-cream to-transparent sm:hidden"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="flex items-center gap-2 rounded-xl border border-brand-sand bg-white px-3 py-2 text-brand-primary shadow-2xs">
            <ArrowUpDown className="h-3.5 w-3.5 text-brand-leaf-green" />
            <label htmlFor="catalog-sort" className="sr-only">
              Sort by
            </label>
            <select
              id="catalog-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent font-sans text-xs font-semibold text-brand-primary focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured (Classical Order)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Counter & Reset row */}
      <div className="flex items-center justify-between text-xs font-medium text-brand-primary/82">
        <p>
          Showing <span className="font-bold text-brand-primary">{filteredProducts.length}</span>{" "}
          {filteredProducts.length === 1 ? "preparation" : "classical preparations"}
        </p>

        {(activeCategory !== "all" || sortBy !== "featured") && (
          <button
            type="button"
            onClick={() => {
              setActiveCategory("all");
              setSortBy("featured");
            }}
            className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-brand-leaf-green hover:underline cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Responsive Product Catalog Grid (3-4 columns on desktop, 2 on tablet, 1 on mobile) */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-sand bg-white py-16 text-center">
          <h3 className="font-serif text-xl font-bold text-brand-primary">
            No preparations match this selection
          </h3>
          <p className="mt-1 font-sans text-xs text-brand-primary/82 max-w-sm">
            Try choosing a different category or resetting filters to explore our full pharmacy catalogue.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className="mt-4 rounded-xl bg-brand-primary px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory"
          >
            Show All Preparations
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-7 lg:gap-8">
          {filteredProducts.map((product) => (
            <ModernProductCard
              key={product.id}
              product={product}
              onInspect={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Trust & Lineage Guidance Notice */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-solid border-brand-sand/70 bg-brand-off-white p-6 shadow-2xs sm:flex-row sm:p-8">
        <div className="flex items-start gap-3 sm:items-center">
          <p className="font-serif text-xs leading-relaxed text-brand-primary sm:text-sm">
            All formulations are prepared according to the classical Shastrokt standards of Phoolchand Aushdhalaya (est. 150+ years).
            Single-batch quality verified by our staff Vaidya.
          </p>
        </div>
        <Button href="/#heritage" variant="secondary" size="sm" className="shrink-0">
          Our Heritage
        </Button>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
