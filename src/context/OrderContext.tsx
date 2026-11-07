"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Address } from "./AddressContext";
import type { CartItem } from "./CartContext";

export type OrderLineItem = {
  productId: string;
  name: string;
  sanskritName: string;
  imageSlot: string;
  price: number;
  quantity: number;
};

export type PaymentMethod = "cod" | "razorpay";

export type Order = {
  id: string;
  displayId: string;
  items: OrderLineItem[];
  subtotal: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "paid";
  /**
   * Real fulfillment status. There is no admin/fulfillment backend yet, so every
   * order is created as "placed" and stays there until that exists — never
   * auto-advanced, so the tracking page never claims a shipment that hasn't happened.
   */
  status: "placed" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
};

type OrderContextType = {
  orders: Order[];
  createOrder: (input: {
    items: CartItem[];
    shippingAddress: Address;
    paymentMethod: PaymentMethod;
  }) => Order;
  getOrder: (id: string) => Order | undefined;
};

const OrderContext = createContext<OrderContextType | null>(null);

const STORAGE_KEY = "baba_ayurved_orders_v1";

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch {
      // Ignore local storage parse errors
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      } catch {
        // Ignore quota/storage errors
      }
    }
  }, [orders, isInitialized]);

  const createOrder: OrderContextType["createOrder"] = ({ items, shippingAddress, paymentMethod }) => {
    const id = crypto.randomUUID();
    const displayId = `BA-${Date.now().toString(36).toUpperCase()}`;
    const order: Order = {
      id,
      displayId,
      items: items.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        sanskritName: product.sanskritName,
        imageSlot: product.imageSlot,
        price: product.indicativePrice,
        quantity,
      })),
      subtotal: items.reduce((sum, item) => sum + item.product.indicativePrice * item.quantity, 0),
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      status: "placed",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const getOrder = (id: string) => orders.find((order) => order.id === id);

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
