"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Heart } from "lucide-react";
import type { Product } from "@/content/products";
import { imageSlots } from "@/content/assets";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

type ModernProductCardProps = {
  product: Product;
  onInspect: (product: Product) => void;
};

export function ModernProductCard({ product, onInspect }: ModernProductCardProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const slot = imageSlots[product.imageSlot] || imageSlots.hero;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 220);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const badgeLabel = product.isBestSeller ? "Best Seller" : product.isNewArrival ? "New" : product.badge;
  const badgeClass = product.isBestSeller
    ? "bg-[#C9A24D] text-white"
    : "bg-brand-leaf-green text-white";

  const subtitle = `${product.packSize} · ${product.form.split(" (")[0]}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-solid border-brand-sand/60 bg-white shadow-2xs transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg">
      {/* Image Panel */}
      <div className="relative m-3 aspect-square overflow-hidden rounded-xl bg-[#F4F1EB]">
        {slot.src ? (
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
            className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-xs text-brand-leaf-green">
            Photograph pending
          </div>
        )}

        {badgeLabel && (
          <span
            className={`absolute right-2.5 top-2.5 rounded-md px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider shadow-xs ${badgeClass}`}
          >
            {badgeLabel}
          </span>
        )}

        <button
          type="button"
          onClick={handleToggleWishlist}
          className="absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-brand-primary/82 shadow-2xs backdrop-blur-xs transition-all hover:scale-110 hover:text-brand-primary active:scale-90"
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wishlisted}
        >
          <Heart className="h-3.5 w-3.5" fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 px-5 pb-5">
        <h3
          onClick={() => onInspect(product)}
          className="cursor-pointer font-sans text-base font-extrabold uppercase tracking-tight text-brand-primary transition-colors hover:text-brand-leaf-green"
        >
          {product.name}
          <sup className="ml-0.5 text-[10px]">®</sup>
        </h3>

        <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#B8863B]">
          {subtitle}
        </p>

        <p className="line-clamp-2 font-sans text-xs leading-relaxed text-brand-primary/76">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-solid border-brand-sand/50 pt-4">
          <span className="font-sans text-lg font-bold text-brand-primary">
            ₹{product.indicativePrice}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2 font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ease-out active:scale-95 ${
              isPopping ? "scale-105" : "scale-100"
            } ${
              isAdded
                ? "border-brand-leaf-green bg-brand-leaf-green text-white"
                : "border-brand-primary/70 bg-white text-brand-primary hover:bg-brand-primary hover:text-brand-ivory"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
