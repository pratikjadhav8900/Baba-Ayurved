"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Circle, Package, Truck, Home } from "lucide-react";
import { useOrders, type Order } from "@/context/OrderContext";
import { imageSlots, type ImageSlotName } from "@/content/assets";
import { MobileAccountHeader } from "@/components/account/MobileAccountHeader";

const timelineSteps: { key: Order["status"]; label: string; icon: typeof Package }[] = [
  { key: "placed", label: "Order Placed", icon: Package },
  { key: "processing", label: "Processing", icon: Circle },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
];

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const { getOrder } = useOrders();
  const order = getOrder(params.id);

  if (!order) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-brand-sand/60 bg-brand-cream/40 py-20 text-center">
        <MobileAccountHeader title="Order" backHref="/account/orders" />
        <h1 className="font-serif text-xl font-bold text-brand-primary">Order not found</h1>
        <p className="font-serif text-sm text-brand-primary/86">
          We couldn&apos;t find this order on this device.
        </p>
        <Link
          href="/account/orders"
          className="mt-2 rounded-xl bg-brand-primary px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory"
        >
          View All Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = timelineSteps.findIndex((s) => s.key === order.status);

  return (
    <div className="flex flex-col gap-6">
      <MobileAccountHeader title="Order Details" backHref="/account/orders" />
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-xl font-bold text-brand-primary">{order.displayId}</h1>
        <p className="font-sans text-sm text-brand-primary/82">
          Placed on{" "}
          {new Date(order.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

        {/* Tracking Timeline */}
        <div className="rounded-2xl border border-solid border-brand-sand/60 bg-white p-6">
          <h2 className="mb-6 font-serif text-lg font-bold text-brand-primary">Tracking</h2>
          <div className="flex items-center">
            {timelineSteps.map((step, index) => {
              const isComplete = index <= currentStepIndex;
              const Icon = isComplete ? CheckCircle2 : step.icon;
              return (
                <div key={step.key} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                        isComplete
                          ? "border-brand-leaf-green bg-brand-leaf-green text-white"
                          : "border-brand-sand/60 text-brand-sand"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span
                      className={`text-center font-sans text-[10px] font-semibold uppercase tracking-wider ${
                        isComplete ? "text-brand-primary" : "text-brand-primary/58"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 flex-1 ${
                        index < currentStepIndex ? "bg-brand-leaf-green" : "bg-brand-sand/40"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-6 font-sans text-xs text-brand-primary/72">
            {order.status === "placed"
              ? "We've received your order and are preparing it. We'll update this page as it progresses."
              : `Current status: ${order.status}.`}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Items */}
          <div className="rounded-2xl border border-solid border-brand-sand/60 bg-white p-6 lg:col-span-7">
            <h2 className="mb-4 font-serif text-lg font-bold text-brand-primary">Items</h2>
            <div className="flex flex-col gap-3">
              {order.items.map((item) => {
                const slot = imageSlots[item.imageSlot as ImageSlotName] || imageSlots.hero;
                return (
                  <div key={item.productId} className="flex gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-cream">
                      {slot.src && (
                        <Image src={slot.src} alt={item.name} fill className="object-cover" sizes="56px" />
                      )}
                    </div>
                    <div className="flex flex-1 items-center justify-between font-sans text-sm text-brand-primary">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-brand-primary/72">Qty {item.quantity}</p>
                      </div>
                      <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-brand-sand/50 pt-4">
              <span className="font-sans text-xs uppercase tracking-wider text-brand-primary/82">Total</span>
              <span className="font-sans text-xl font-bold text-brand-primary">
                ₹{order.subtotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Shipping + Payment */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-2xl border border-solid border-brand-sand/60 bg-white p-6">
              <h2 className="mb-3 font-serif text-lg font-bold text-brand-primary">Shipping Address</h2>
              <p className="font-sans text-sm text-brand-primary/90">
                {order.shippingAddress.fullName} &middot; {order.shippingAddress.phone}
                <br />
                {order.shippingAddress.line1}
                {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
            </div>

            <div className="rounded-2xl border border-solid border-brand-sand/60 bg-white p-6">
              <h2 className="mb-3 font-serif text-lg font-bold text-brand-primary">Payment</h2>
              <p className="font-sans text-sm text-brand-primary/90">
                {order.paymentMethod === "cod" ? "Cash on Delivery" : "Paid Online"} &middot;{" "}
                <span className="capitalize">{order.paymentStatus}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
