"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, ArrowUpRight } from "lucide-react";
import { featuredProducts, productCategories, type Product } from "@/content/products";
import { imageSlots } from "@/content/assets";
import { ProductDetailModal } from "./ProductDetailModal";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts =
    activeCategory === "all"
      ? featuredProducts
      : featuredProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col gap-10">
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap">
        {productCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap rounded-sm px-4 py-2 font-sans text-xs font-semibold tracking-label uppercase transition-all duration-200 focus-visible:outline-brand-primary ${
                isActive
                  ? "bg-brand-primary text-brand-ivory shadow-xs"
                  : "bg-brand-cream text-brand-primary/90 hover:bg-brand-sand hover:text-brand-primary border border-brand-sand"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => {
          const slot = imageSlots[product.imageSlot] || imageSlots.hero;
          return (
            <SpotlightCard
              key={product.id}
              spotlightColor="rgba(230, 211, 186, 0.45)"
              className="group border border-solid border-brand-sand bg-brand-off-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-brand-primary/40 flex flex-col justify-between"
            >
              <div>
                {/* Image Frame with natural packaging display */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-brand-cream">
                  {slot.src ? (
                    <Image
                      src={slot.src}
                      alt={slot.alt}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-serif text-xs text-brand-leaf-green">
                      Photograph pending
                    </div>
                  )}

                  {/* Form Badge */}
                  <div className="absolute left-3 top-3 rounded-xs bg-brand-ivory/95 px-2.5 py-1 font-sans text-[13px] font-semibold tracking-label uppercase text-brand-primary border border-brand-sand/60 shadow-2xs backdrop-blur-xs">
                    {product.form}
                  </div>

                  {/* Quick Inspect Hover Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-ivory/95 text-brand-primary opacity-0 shadow-xs backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100 hover:bg-brand-primary hover:text-brand-ivory focus-visible:opacity-100 focus-visible:outline-brand-primary"
                    aria-label={`Inspect ${product.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-hindi text-xs text-brand-leaf-green font-medium">
                      {product.sanskritName}
                    </span>
                    <span className="font-sans text-[13px] uppercase tracking-label text-brand-primary/72 font-semibold">
                      {product.ritualTiming.split(" ")[0]}
                    </span>
                  </div>

                  <h3 className="mt-1 font-serif text-lg font-semibold tracking-tight text-brand-primary sm:text-xl">
                    {product.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 font-serif text-xs leading-relaxed text-brand-primary/90 sm:text-sm">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-solid border-brand-sand/60 pt-3">
                    <div className="flex flex-col">
                      <span className="font-sans text-[12px] uppercase tracking-label text-brand-primary/72">
                        {product.packSize}
                      </span>
                      <span className="font-sans text-sm font-bold text-brand-primary">
                        ₹{product.indicativePrice}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="inline-flex items-center gap-1 rounded-sm border border-brand-primary/30 px-3 py-1.5 font-sans text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-ivory"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Vaidya Guidance Notice */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-sm border border-solid border-line bg-paper-deep p-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <p className="font-serif text-xs text-ink/95 sm:text-sm">
            All formulations are handcrafted following classical Shastrokt standards of Phoolchand Aushdhalaya.
            Consult our staff Vaidya for personalised dinacharya guidance.
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
