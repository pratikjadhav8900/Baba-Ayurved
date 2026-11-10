"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { useOrders } from "@/context/OrderContext";
import { MobileAccountHeader } from "@/components/account/MobileAccountHeader";

const statusLabel: Record<string, string> = {
  placed: "Order Placed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrdersPage() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div>
        <MobileAccountHeader title="My Orders" />
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-brand-sand/60 bg-brand-cream/40 py-20 text-center">
          <Package className="h-8 w-8 text-brand-sand" strokeWidth={1.5} />
          <p className="font-serif text-sm text-brand-primary/82">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/shop"
            className="rounded-xl bg-brand-primary px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory"
          >
            Browse the Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MobileAccountHeader title="My Orders" />
      <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/account/orders/${order.id}`}
          className="flex flex-col gap-3 rounded-2xl border border-solid border-brand-sand/60 bg-white p-5 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-serif text-base font-bold text-brand-primary">{order.displayId}</p>
            <p className="font-sans text-xs text-brand-primary/72">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}{" "}
              &middot; {order.items.reduce((n, i) => n + i.quantity, 0)} items
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-brand-leaf-green/15 px-3 py-1 font-sans text-[13px] font-semibold uppercase tracking-wider text-brand-leaf-green">
              {statusLabel[order.status]}
            </span>
            <span className="font-sans text-base font-bold text-brand-primary">
              ₹{order.subtotal.toLocaleString("en-IN")}
            </span>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
}
