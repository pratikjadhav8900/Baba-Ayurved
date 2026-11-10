"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ShoppingBag, Check } from "lucide-react";
import { imageSlots } from "@/content/assets";
import type { Product } from "@/content/products";
import { useCart } from "@/context/CartContext";

type ProductDetailModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setQuantity(1);
      setIsAdded(false);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const slot = imageSlots[product.imageSlot] || imageSlots.hero;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-primary/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        ref={dialogRef}
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-solid border-brand-sand bg-white text-brand-primary shadow-2xl animate-in zoom-in-95 duration-200 md:flex-row"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-primary shadow-xs backdrop-blur-xs transition-colors hover:bg-brand-primary hover:text-white focus-visible:outline-brand-primary"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Product Image Panel (Poster Style) */}
        <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-gradient-to-b from-[#FAF6F0] to-[#EFE4D6] sm:aspect-16/9 md:aspect-auto md:w-5/12">
          {slot.src ? (
            <Image
              src={slot.src}
              alt={slot.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 400px, 100vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-6 text-center font-serif text-brand-leaf-green">
              Classical preparation image pending
            </div>
          )}

          {/* Form and Badge Overlays */}
          <div className="absolute left-4 top-4 flex flex-col gap-1.5">
            {product.badge && (
              <span className="rounded-full bg-brand-primary/95 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-brand-ivory shadow-xs backdrop-blur-xs">
                {product.badge}
              </span>
            )}
            <span className="rounded-full border border-brand-sand/70 bg-white/95 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-brand-primary shadow-2xs backdrop-blur-xs">
              {product.form}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8 scrollbar-thin">
          <div className="mb-4">
            <span className="font-hindi text-sm text-brand-leaf-green font-medium">
              {product.sanskritName} &middot; {product.ritualTiming}
            </span>
            <h2
              id="modal-product-title"
              className="mt-1 font-serif text-2xl font-bold tracking-tight text-brand-primary sm:text-3xl"
            >
              {product.name}
            </h2>

            {/* Price section */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-sans text-2xl font-bold text-brand-primary">
                ₹{product.indicativePrice}
              </span>
              {product.originalPrice && (
                <span className="font-sans text-sm text-brand-primary/60 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="rounded-full bg-brand-cream px-2.5 py-0.5 font-sans text-xs font-semibold uppercase tracking-wider text-brand-primary/90">
                {product.packSize}
              </span>
            </div>
          </div>

          <p className="font-sans text-sm leading-relaxed text-brand-primary/90">
            {product.description}
          </p>

          <div className="my-5 space-y-3.5 border-y border-solid border-brand-sand/60 py-4">
            <div>
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-wider text-brand-leaf-green">
                Classical Scripture Reference
              </span>
              <span className="font-serif text-sm font-medium text-brand-primary">
                {product.classicalReference}
              </span>
            </div>

            <div>
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-wider text-brand-leaf-green">
                Ritual Timing
              </span>
              <span className="font-serif text-sm text-brand-primary">
                {product.ritualTiming}
              </span>
            </div>

            <div>
              <span className="block font-sans text-[11px] font-semibold uppercase tracking-wider text-brand-leaf-green">
                Classical Guidance
              </span>
              <span className="font-serif text-sm text-brand-primary">
                {product.classicalGuidance}
              </span>
            </div>
          </div>

          {/* Botanicals */}
          <div className="mb-6">
            <span className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-wider text-brand-leaf-green">
              Key Classical Botanicals
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.botanicals.map((botanical) => (
                <span
                  key={botanical}
                  className="rounded-lg border border-brand-sand bg-brand-off-white px-3 py-1 font-sans text-xs font-medium text-brand-primary"
                >
                  {botanical}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-auto pt-2">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 font-sans text-xs font-semibold uppercase tracking-wider shadow-md transition-all active:scale-95 ${
                  isAdded
                    ? "bg-brand-leaf-green text-brand-ivory"
                    : "bg-brand-primary text-brand-ivory hover:bg-brand-primary/95"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4 text-white" />
                    <span>Added to Ritual Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Cart &middot; ₹{product.indicativePrice * quantity}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-brand-sand bg-brand-off-white px-5 py-3 font-sans text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-sand/40"
              >
                Close
              </button>
            </div>

            <p className="mt-4 text-center font-sans text-[11px] text-brand-primary/72">
              <span>Prepared to Shastrokt standards by Phoolchand Aushdhalaya</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
