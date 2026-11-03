"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Flame, History, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function BottomNav() {
  const pathname = usePathname();
  const { totalCount, openCart, isOpen: isCartOpen } = useCart();
  const [, startTransition] = useTransition();

  // Hide on checkout if present
  if (pathname === "/checkout") {
    return null;
  }

  // Active state determination (matching Oriental Sports mutual exclusion)
  const isCartActive = isCartOpen;
  const isRitualsActive =
    !isCartActive &&
    (pathname.startsWith("/rituals") || pathname.includes("#rituals"));
  const isHeritageActive =
    !isCartActive && !isRitualsActive && pathname.includes("#heritage");
  const isCollectionActive =
    !isCartActive &&
    !isRitualsActive &&
    !isHeritageActive &&
    (pathname.startsWith("/shop") || pathname.startsWith("/products"));
  const isHomeActive =
    !isCartActive &&
    !isRitualsActive &&
    !isHeritageActive &&
    !isCollectionActive &&
    pathname === "/";

  // Active tab index for animated glider slider (0 to 4)
  let activeIndex = 0;
  if (isCollectionActive) activeIndex = 1;
  else if (isRitualsActive) activeIndex = 2;
  else if (isHeritageActive) activeIndex = 3;
  else if (isCartActive) activeIndex = 4;

  const handleHeritageClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("heritage");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleRitualsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("rituals");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className="fixed bottom-[max(12px,env(safe-area-inset-bottom,12px))] left-0 right-0 z-[950] flex items-center justify-center pointer-events-none px-4 select-none"
      aria-label="Bottom Navigation Dock"
    >
      <div className="pointer-events-auto relative flex items-center w-full max-w-[420px] rounded-full bg-[#0E0C0B]/95 backdrop-blur-2xl border border-white/15 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.7),0_0_24px_rgba(92,46,6,0.2)]">
        {/* Animated Sliding Active Capsule Pill */}
        <div
          className="absolute top-1.5 bottom-1.5 left-1.5 rounded-full bg-[#5C2E06] border border-white/20 shadow-[0_0_18px_rgba(92,46,6,0.75),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-10"
          style={{
            width: "calc((100% - 12px) / 5)",
            transform: `translateX(calc(${activeIndex} * 100%))`,
          }}
          aria-hidden="true"
        />

        {/* 1. Home */}
        <Link
          href="/"
          className={`relative z-20 flex flex-1 flex-col items-center justify-center py-2 px-1 rounded-full transition-colors ${
            isHomeActive ? "text-white font-bold" : "text-white/65 hover:text-white"
          }`}
          aria-label="Home"
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            <Home size={18} strokeWidth={isHomeActive ? 2.4 : 1.8} />
            {isHomeActive && (
              <span className="absolute -top-0.5 -right-1 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
            )}
          </div>
          <span className="font-sans text-[10px] tracking-wide mt-1 leading-none">
            Home
          </span>
        </Link>

        {/* 2. Collection / Shop */}
        <Link
          href="/shop"
          className={`relative z-20 flex flex-1 flex-col items-center justify-center py-2 px-1 rounded-full transition-colors ${
            isCollectionActive ? "text-white font-bold" : "text-white/65 hover:text-white"
          }`}
          aria-label="Collection"
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            <Sparkles size={18} strokeWidth={isCollectionActive ? 2.4 : 1.8} />
            {isCollectionActive && (
              <span className="absolute -top-0.5 -right-1 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
            )}
          </div>
          <span className="font-sans text-[10px] tracking-wide mt-1 leading-none">
            Collection
          </span>
        </Link>

        {/* 3. Daily Rituals */}
        <Link
          href="/#rituals"
          onClick={handleRitualsClick}
          className={`relative z-20 flex flex-1 flex-col items-center justify-center py-2 px-1 rounded-full transition-colors ${
            isRitualsActive ? "text-white font-bold" : "text-white/65 hover:text-white"
          }`}
          aria-label="Daily Rituals"
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            <Flame size={18} strokeWidth={isRitualsActive ? 2.4 : 1.8} />
            {isRitualsActive && (
              <span className="absolute -top-0.5 -right-1 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
            )}
          </div>
          <span className="font-sans text-[10px] tracking-wide mt-1 leading-none">
            Rituals
          </span>
        </Link>

        {/* 4. Heritage */}
        <Link
          href="/#heritage"
          onClick={handleHeritageClick}
          className={`relative z-20 flex flex-1 flex-col items-center justify-center py-2 px-1 rounded-full transition-colors ${
            isHeritageActive ? "text-white font-bold" : "text-white/65 hover:text-white"
          }`}
          aria-label="Heritage"
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            <History size={18} strokeWidth={isHeritageActive ? 2.4 : 1.8} />
            {isHeritageActive && (
              <span className="absolute -top-0.5 -right-1 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
            )}
          </div>
          <span className="font-sans text-[10px] tracking-wide mt-1 leading-none">
            Heritage
          </span>
        </Link>

        {/* 5. Cart Drawer Button */}
        <button
          type="button"
          onClick={() => openCart()}
          className={`relative z-20 flex flex-1 flex-col items-center justify-center py-2 px-1 rounded-full transition-colors cursor-pointer ${
            isCartActive ? "text-white font-bold" : "text-white/65 hover:text-white"
          }`}
          aria-label={`Open Cart with ${totalCount} items`}
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            <ShoppingBag size={18} strokeWidth={isCartActive ? 2.4 : 1.8} />
            {isCartActive && (
              <span className="absolute -top-0.5 -right-1 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
            )}
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C2392A] px-1 font-mono text-[9px] font-bold text-white shadow-[0_0_8px_rgba(194,57,42,0.8)]">
                {totalCount > 9 ? "9+" : totalCount}
              </span>
            )}
          </div>
          <span className="font-sans text-[10px] tracking-wide mt-1 leading-none">
            Cart
          </span>
        </button>
      </div>
    </nav>
  );
}
