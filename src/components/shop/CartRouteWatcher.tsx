"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

/**
 * Closes the cart drawer on any route change. The drawer is a fixed overlay
 * independent of the current page, so navigating away via any link (header,
 * bottom nav, a product page, back/forward) would otherwise leave it stuck
 * open until the visitor finds the close button themselves.
 */
export function CartRouteWatcher() {
  const pathname = usePathname();
  const { closeCart } = useCart();

  useEffect(() => {
    closeCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
