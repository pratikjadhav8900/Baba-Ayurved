"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Package, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";

export function BottomNav() {
  const pathname = usePathname();
  const { totalCount, openCart, isOpen: isCartOpen } = useCart();
  const { orders } = useOrders();
  const [, startTransition] = useTransition();

  // Hide on checkout if present
  if (pathname === "/checkout") {
    return null;
  }

  // Active state determination (mutual exclusion across tabs)
  const isCartActive = isCartOpen;
  const isOrdersActive = !isCartActive && pathname.startsWith("/account/orders");
  const isAccountActive =
    !isCartActive && !isOrdersActive && pathname.startsWith("/account");
  const isCollectionActive =
    !isCartActive &&
    !isOrdersActive &&
    !isAccountActive &&
    (pathname.startsWith("/shop") || pathname.startsWith("/products"));
  const isHomeActive =
    !isCartActive &&
    !isOrdersActive &&
    !isAccountActive &&
    !isCollectionActive &&
    pathname === "/";

  // Active tab index for animated glider slider (0 to 4)
  let activeIndex = 0;
  if (isCollectionActive) activeIndex = 1;
  else if (isOrdersActive) activeIndex = 2;
  else if (isCartActive) activeIndex = 3;
  else if (isAccountActive) activeIndex = 4;

  return (
    <nav
      className="fixed bottom-[max(12px,env(safe-area-inset-bottom,12px))] left-0 right-0 z-[950] flex md:!hidden items-center justify-center pointer-events-none px-4 select-none"
      aria-label="Bottom Navigation Dock"
    >
      <div className="pointer-events-auto relative flex items-center w-full max-w-[420px] rounded-full bg-[#1C140D] p-1.5 shadow-[8px_8px_16px_rgba(0,0,0,0.65),-8px_-8px_16px_rgba(255,255,255,0.035)]">
        {/* Animated Sliding Active Capsule — pressed-in neumorphic well */}
        <div
          className="absolute top-1.5 bottom-1.5 left-1.5 rounded-full bg-[#1C140D] shadow-[inset_4px_4px_8px_rgba(0,0,0,0.65),inset_-4px_-4px_8px_rgba(255,255,255,0.035)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-10"
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
            isHomeActive ? "text-[#E2B784] font-bold" : "text-white/55 hover:text-white/80"
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

        {/* 2. Products / Shop */}
        <Link
          href="/shop"
          className={`relative z-20 flex flex-1 flex-col items-center justify-center py-2 px-1 rounded-full transition-colors ${
            isCollectionActive ? "text-[#E2B784] font-bold" : "text-white/55 hover:text-white/80"
          }`}
          aria-label="Products"
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            <Sparkles size={18} strokeWidth={isCollectionActive ? 2.4 : 1.8} />
            {isCollectionActive && (
              <span className="absolute -top-0.5 -right-1 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
            )}
          </div>
          <span className="font-sans text-[10px] tracking-wide mt-1 leading-none">
            Products
          </span>
        </Link>

        {/* 3. Orders */}
        <Link
          href="/account/orders"
          className={`relative z-20 flex flex-1 flex-col items-center justify-center py-2 px-1 rounded-full transition-colors ${
            isOrdersActive ? "text-[#E2B784] font-bold" : "text-white/55 hover:text-white/80"
          }`}
          aria-label={`Orders${orders.length > 0 ? `, ${orders.length} placed` : ""}`}
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            <Package size={18} strokeWidth={isOrdersActive ? 2.4 : 1.8} />
            {orders.length > 0 && (
              <span className="absolute -top-2 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C2392A] px-1 font-mono text-[9px] font-bold text-white shadow-[0_0_8px_rgba(194,57,42,0.8)]">
                {orders.length > 9 ? "9+" : orders.length}
              </span>
            )}
          </div>
          <span className="font-sans text-[10px] tracking-wide mt-1 leading-none">
            Orders
          </span>
        </Link>

        {/* 4. Cart Drawer Button */}
        <button
          type="button"
          onClick={() => openCart()}
          className={`relative z-20 flex flex-1 flex-col items-center justify-center py-2 px-1 rounded-full transition-colors cursor-pointer ${
            isCartActive ? "text-[#E2B784] font-bold" : "text-white/55 hover:text-white/80"
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

        {/* 5. Account */}
        <Link
          href="/account"
          className={`relative z-20 flex flex-1 flex-col items-center justify-center py-2 px-1 rounded-full transition-colors ${
            isAccountActive ? "text-[#E2B784] font-bold" : "text-white/55 hover:text-white/80"
          }`}
          aria-label="Account"
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            <User size={18} strokeWidth={isAccountActive ? 2.4 : 1.8} />
            {isAccountActive && (
              <span className="absolute -top-0.5 -right-1 h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
            )}
          </div>
          <span className="font-sans text-[10px] tracking-wide mt-1 leading-none">
            Account
          </span>
        </Link>
      </div>
    </nav>
  );
}
