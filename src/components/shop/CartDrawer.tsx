"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { imageSlots } from "@/content/assets";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalCount } =
    useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key and lock background scroll
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-primary/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-brand-off-white text-brand-primary shadow-2xl transition-transform duration-300 animate-in slide-in-from-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-solid border-brand-sand/60 bg-brand-ivory/80 px-6 py-5 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-brand-primary" />
            <h2 className="font-serif text-xl font-bold tracking-tight text-brand-primary">
              Your Ritual Bag
            </h2>
            <span className="flex h-5 items-center justify-center rounded-full bg-brand-leaf-green/15 px-2 font-sans text-xs font-semibold text-brand-leaf-green">
              {totalCount} {totalCount === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-2 text-brand-primary/82 transition-colors hover:bg-brand-sand/50 hover:text-brand-primary focus-visible:outline-brand-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-sand/30 text-brand-primary/64">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-brand-primary">
                Your bag is quiet
              </h3>
              <p className="mt-1 max-w-xs font-sans text-xs leading-relaxed text-brand-primary/82">
                Explore our classical single herbs, medicated oils, and avalehas to begin your daily dinacharya.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory transition-transform hover:scale-[1.02] active:scale-95"
              >
                <span>Browse Catalogue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(({ product, quantity }) => {
                const slot = imageSlots[product.imageSlot] || imageSlots.hero;
                return (
                  <div
                    key={product.id}
                    className="flex gap-4 rounded-xl border border-solid border-brand-sand/60 bg-white p-3.5 shadow-2xs transition-shadow hover:shadow-xs"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-cream">
                      {slot.src && (
                        <Image
                          src={slot.src}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif text-base font-bold leading-tight text-brand-primary line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className="text-brand-primary/58 transition-colors hover:text-red-700 p-0.5"
                            aria-label={`Remove ${product.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-hindi text-[11px] text-brand-leaf-green">
                          {product.sanskritName} &middot; {product.packSize}
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-brand-sand bg-brand-off-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 text-brand-primary transition-colors hover:bg-brand-sand/40"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center font-sans text-xs font-semibold text-brand-primary">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 text-brand-primary transition-colors hover:bg-brand-sand/40"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="font-sans text-sm font-bold text-brand-primary">
                            ₹{product.indicativePrice * quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-solid border-brand-sand/60 bg-brand-ivory/80 p-6 backdrop-blur-xs">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-wider text-brand-primary/82">
                Subtotal
              </span>
              <span className="font-sans text-xl font-bold text-brand-primary">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="mb-4 font-sans text-[11px] text-brand-leaf-green">
              <span>Complimentary shipping &amp; Vaidya-verified packaging included.</span>
            </p>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory shadow-md transition-all hover:bg-brand-primary/95 hover:shadow-lg active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={closeCart}
              className="mt-3 block w-full text-center font-sans text-xs font-medium text-brand-primary/82 transition-colors hover:text-brand-primary"
            >
              Continue exploring preparations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
