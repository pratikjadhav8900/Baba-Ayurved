"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, Heart, ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { site } from "@/lib/site";

/**
 * Global SiteHeader matching the sleek dark floating glassmorphic navbar UI/UX
 * (Reversed BrandLogo, floating pill navigation, circular user & cart buttons).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { totalCount, openCart } = useCart();
  const { totalCount: wishlistCount } = useWishlist();
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // On the homepage, Hero.tsx already seamlessly hosts this exact navbar in its dark canvas
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0D11]/95 px-6 py-4 md:px-12 backdrop-blur-xl text-white shadow-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Brand Wordmark & Authentic Logo (Top-Left) */}
        <Link 
          href="/" 
          aria-label={`${site.name}, home`}
          className="flex items-center hover:opacity-85 transition-opacity"
        >
          <BrandLogo
            variant="primary"
            tone="reversed"
            size="sm"
            className="h-8 md:h-10 w-auto"
            priority
            alt="Baba Ayurved Pharmacy"
          />
        </Link>

        {/* Center Floating Pill Menu */}
        <nav 
          aria-label="Site navigation"
          style={{ 
            backgroundColor: "rgba(255, 255, 255, 0.06)", 
            borderColor: "rgba(255, 255, 255, 0.12)" 
          }}
          className="hidden lg:flex items-center gap-1 rounded-full border p-1.5 backdrop-blur-xl shadow-2xl"
        >
          <Link
            href="/"
            className="rounded-full px-5 py-2 font-sans text-xs font-semibold text-white/85 hover:text-white hover:bg-white/10 transition-colors"
          >
            Home
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCollectionOpen(!isCollectionOpen)}
              style={{ color: "rgba(255, 255, 255, 0.85)" }}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-xs font-semibold hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span>Collection</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>

            {isCollectionOpen && (
              <div 
                style={{ backgroundColor: "rgba(18, 22, 30, 0.98)", borderColor: "rgba(255, 255, 255, 0.15)" }}
                className="absolute left-0 top-full mt-2 w-52 rounded-2xl border p-2 backdrop-blur-2xl shadow-2xl z-40"
                onMouseLeave={() => setIsCollectionOpen(false)}
              >
                <Link
                  href="/shop"
                  onClick={() => setIsCollectionOpen(false)}
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  className="block rounded-xl px-3 py-2 font-sans text-xs hover:bg-white/10 hover:text-white"
                >
                  All Classical Formulations
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setIsCollectionOpen(false)}
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  className="block rounded-xl px-3 py-2 font-sans text-xs hover:bg-white/10 hover:text-white"
                >
                  Single Herbs (Churna)
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setIsCollectionOpen(false)}
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  className="block rounded-xl px-3 py-2 font-sans text-xs hover:bg-white/10 hover:text-white"
                >
                  Medicated Oils (Taila)
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setIsCollectionOpen(false)}
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  className="block rounded-xl px-3 py-2 font-sans text-xs hover:bg-white/10 hover:text-white"
                >
                  Avaleh &amp; Rasayana
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/rituals"
            style={{ color: "rgba(255, 255, 255, 0.85)" }}
            className="rounded-full px-4 py-2 font-sans text-xs font-semibold hover:text-white hover:bg-white/10 transition-colors"
          >
            Rituals
          </Link>

          <Link
            href="/community"
            style={{ color: "rgba(255, 255, 255, 0.85)" }}
            className="rounded-full px-4 py-2 font-sans text-xs font-semibold hover:text-white hover:bg-white/10 transition-colors"
          >
            Community
          </Link>
        </nav>

        {/* Right Action Icons (Account, Wishlist & Bag) */}
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            style={{ backgroundColor: "#FFFFFF", color: "#0A0D11" }}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 shadow-md"
            aria-label="Account profile"
          >
            <User className="h-4 w-4" />
          </Link>

          {/* Wishlist & Cart hidden below md — the bottom dock already covers these on mobile */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/wishlist"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 shadow-md"
              aria-label={`Open wishlist (${wishlistCount} items)`}
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span
                  style={{ backgroundColor: "#FFFFFF", color: "#0A0D11" }}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full font-sans text-[10px] font-bold shadow-md"
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCart}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF"
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
              aria-label={`Open shopping cart (${totalCount} items)`}
            >
              <ShoppingBag className="h-4 w-4" />
              {totalCount > 0 && (
                <span
                  style={{ backgroundColor: "#FFFFFF", color: "#0A0D11" }}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full font-sans text-[10px] font-bold shadow-md"
                >
                  {totalCount}
                </span>
              )}
            </button>
          </div>

          {/* Tablet Menu Toggle — mobile already has the bottom dock, so this only
              covers the md-to-lg gap where neither the pill nav nor the dock shows. */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white md:flex lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Tablet Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mt-4 hidden border-t border-white/10 pt-4 md:block lg:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 font-sans text-sm font-semibold hover:bg-white/10 text-white"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 font-sans text-sm font-semibold hover:bg-white/10 text-white"
            >
              Collection
            </Link>
            <Link
              href="/rituals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 font-sans text-sm font-semibold hover:bg-white/10 text-white"
            >
              Rituals
            </Link>
            <Link
              href="/community"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 font-sans text-sm font-semibold hover:bg-white/10 text-white"
            >
              Community
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 font-sans text-sm font-semibold hover:bg-white/10 text-white"
            >
              Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
            </Link>
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 font-sans text-sm font-semibold hover:bg-white/10 text-white"
            >
              Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
