"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/content/products";
import { imageSlots } from "@/content/assets";
import { useCart } from "@/context/CartContext";

type ModernProductCardProps = {
  product: Product;
  onInspect: (product: Product) => void;
};

export function ModernProductCard({ product, onInspect }: ModernProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const slot = imageSlots[product.imageSlot] || imageSlots.hero;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 220);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.indicativePrice
      ? Math.round(
          ((product.originalPrice - product.indicativePrice) / product.originalPrice) * 100
        )
      : null;

  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-solid border-brand-sand/70 bg-white shadow-2xs transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-xl"
    >
      {/* Top Image Poster Container */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-gradient-to-b from-[#FAF6F0] to-[#EFE4D6]">
        {slot.src ? (
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-xs text-brand-leaf-green">
            Photograph pending
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2 pointer-events-none">
          {product.badge ? (
            <span className="rounded-full bg-brand-primary/90 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-brand-ivory shadow-xs backdrop-blur-xs">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          <span className="rounded-full border border-brand-sand/70 bg-brand-ivory/95 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-brand-primary shadow-2xs backdrop-blur-xs">
            {product.form.split(" ")[0]}
          </span>
        </div>

        {/* Hover Quick Action Bar (slides up) */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/65 via-black/30 to-transparent p-3.5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onInspect(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/95 px-3 py-2 font-sans text-xs font-semibold text-brand-primary shadow-xs backdrop-blur-xs transition-all hover:bg-white hover:scale-[1.02] active:scale-95"
            aria-label={`View details of ${product.name}`}
          >
            <Eye className="h-3.5 w-3.5 text-brand-primary" />
            <span>Quick View</span>
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 font-sans text-xs font-semibold shadow-xs backdrop-blur-xs transition-all duration-200 ease-out hover:scale-[1.02] active:scale-90 ${
              isPopping ? "scale-110" : "scale-100"
            } ${
              isAdded
                ? "bg-brand-leaf-green text-brand-ivory"
                : "bg-brand-primary text-brand-ivory hover:bg-brand-primary/95"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5 text-white" />
                <span className="text-white">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content Information Hierarchy */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 bg-white">
        <div className="flex flex-col gap-2">
          {/* Top Sanskrit & Ritual metadata */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-hindi text-xs font-medium text-brand-leaf-green">
              {product.sanskritName}
            </span>
            <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-brand-primary/60">
              {product.ritualTiming.split(" ")[0]}
            </span>
          </div>

          {/* Product Title in clean bold font */}
          <h3
            onClick={() => onInspect(product)}
            className="cursor-pointer font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-primary transition-colors hover:text-brand-leaf-green line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short description (1-2 lines) */}
          <p className="line-clamp-2 font-sans text-xs sm:text-sm leading-relaxed text-brand-primary/75">
            {product.description}
          </p>

          {/* Scripture badge */}
          <div className="mt-1 text-[11px] text-brand-primary/60">
            <span className="truncate font-sans italic block">{product.classicalReference}</span>
          </div>
        </div>

        {/* Price & Primary Action Row */}
        <div className="mt-5 border-t border-solid border-brand-sand/50 pt-4">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] uppercase tracking-wider text-brand-primary/60">
                {product.packSize}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-xl sm:text-2xl font-bold text-brand-primary">
                  ₹{product.indicativePrice}
                </span>
                {product.originalPrice && (
                  <span className="font-sans text-xs text-brand-primary/45 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {discountPercent && (
                  <span className="font-sans text-[10px] font-semibold text-brand-leaf-green">
                    ({discountPercent}% off)
                  </span>
                )}
              </div>
            </div>

            {/* Prominent Action Button */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onInspect(product)}
                className="hidden rounded-xl border border-brand-sand bg-brand-off-white p-2.5 text-brand-primary transition-colors hover:bg-brand-sand/40 sm:flex"
                title="View Full Details"
                aria-label={`View details of ${product.name}`}
              >
                <Eye className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 ease-out active:scale-90 shadow-xs ${
                  isPopping ? "scale-110" : "scale-100"
                } ${
                  isAdded
                    ? "bg-brand-leaf-green text-brand-ivory"
                    : "bg-brand-primary text-brand-ivory hover:bg-brand-primary/90 hover:shadow-md"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4 text-white" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
