"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Lock, MapPin, Plus, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { useCart } from "@/context/CartContext";
import { useAddresses, type Address } from "@/context/AddressContext";
import { useOrders, type PaymentMethod } from "@/context/OrderContext";
import { imageSlots } from "@/content/assets";

const RAZORPAY_ENABLED = Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

type AddressFormState = Omit<Address, "id">;

const emptyAddressForm: AddressFormState = {
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, closeCart } = useCart();
  const { addresses, addAddress } = useAddresses();
  const { createOrder } = useOrders();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses[0]?.id ?? null
  );
  const [isAddingAddress, setIsAddingAddress] = useState(addresses.length === 0);
  const [form, setForm] = useState<AddressFormState>(emptyAddressForm);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isPlacing, setIsPlacing] = useState(false);

  function handleSaveAddress(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newAddress = addAddress(form);
    setSelectedAddressId(newAddress.id);
    setIsAddingAddress(false);
    setForm(emptyAddressForm);
  }

  function handlePlaceOrder() {
    const shippingAddress = addresses.find((a) => a.id === selectedAddressId);
    if (!shippingAddress || items.length === 0) return;

    setIsPlacing(true);
    const order = createOrder({ items, shippingAddress, paymentMethod });
    clearCart();
    closeCart();
    router.push(`/account/orders/${order.id}`);
  }

  if (items.length === 0) {
    return (
      <Section tone="paper" className="py-20 md:py-28">
        <Container className="flex flex-col items-center gap-4 text-center">
          <Truck className="h-8 w-8 text-brand-sand" strokeWidth={1.5} />
          <Heading as="h1" size="statement" className="text-brand-primary">
            Your bag is empty
          </Heading>
          <p className="max-w-md font-serif text-sm text-brand-primary/86">
            Add a few classical preparations to your bag before checking out.
          </p>
          <a
            href="/shop"
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory transition-transform hover:scale-[1.02]"
          >
            Browse the Catalogue
          </a>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="paper" className="py-10 md:py-16">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <Eyebrow>Checkout</Eyebrow>
          <Heading as="h1" size="statement" className="text-brand-primary">
            Review &amp; Place Order
          </Heading>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Address + Payment */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Shipping Address */}
            <div className="rounded-2xl border border-solid border-brand-sand/60 bg-white p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-brand-primary">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </h2>
                {!isAddingAddress && addresses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(true)}
                    className="flex items-center gap-1 font-sans text-xs font-semibold text-brand-leaf-green hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add New
                  </button>
                )}
              </div>

              {!isAddingAddress && addresses.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${
                        selectedAddressId === address.id
                          ? "border-brand-primary bg-brand-cream/50"
                          : "border-brand-sand/50 hover:border-brand-sand"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddressId === address.id}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="mt-1 accent-brand-primary"
                      />
                      <div className="font-sans text-sm text-brand-primary">
                        <p className="font-semibold">{address.fullName} &middot; {address.phone}</p>
                        <p className="text-brand-primary/86">
                          {address.line1}{address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} - {address.pincode}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {isAddingAddress && (
                <form onSubmit={handleSaveAddress} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Full name"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/58 outline-none focus-visible:border-brand-primary sm:col-span-1"
                  />
                  <input
                    required
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/58 outline-none focus-visible:border-brand-primary sm:col-span-1"
                  />
                  <input
                    required
                    placeholder="Address line 1 (House no., street)"
                    value={form.line1}
                    onChange={(e) => setForm({ ...form, line1: e.target.value })}
                    className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/58 outline-none focus-visible:border-brand-primary sm:col-span-2"
                  />
                  <input
                    placeholder="Address line 2 (optional)"
                    value={form.line2}
                    onChange={(e) => setForm({ ...form, line2: e.target.value })}
                    className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/58 outline-none focus-visible:border-brand-primary sm:col-span-2"
                  />
                  <input
                    required
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/58 outline-none focus-visible:border-brand-primary"
                  />
                  <input
                    required
                    placeholder="State"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/58 outline-none focus-visible:border-brand-primary"
                  />
                  <input
                    required
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/58 outline-none focus-visible:border-brand-primary sm:col-span-2"
                  />
                  <div className="flex gap-2 sm:col-span-2">
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-brand-primary py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory transition-transform hover:scale-[1.01]"
                    >
                      Save Address
                    </button>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="rounded-xl border border-brand-sand px-4 py-2.5 font-sans text-xs font-semibold text-brand-primary"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl border border-solid border-brand-sand/60 bg-white p-5 sm:p-6">
              <h2 className="mb-4 font-serif text-lg font-bold text-brand-primary">Payment Method</h2>
              <div className="flex flex-col gap-2.5">
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-colors ${
                    paymentMethod === "cod"
                      ? "border-brand-primary bg-brand-cream/50"
                      : "border-brand-sand/50 hover:border-brand-sand"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-brand-primary"
                  />
                  <div className="font-sans text-sm text-brand-primary">
                    <p className="font-semibold">Cash on Delivery</p>
                    <p className="text-xs text-brand-primary/82">Pay with cash when your order arrives.</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 rounded-xl border p-3.5 transition-colors ${
                    RAZORPAY_ENABLED ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                  } ${
                    paymentMethod === "razorpay"
                      ? "border-brand-primary bg-brand-cream/50"
                      : "border-brand-sand/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    disabled={!RAZORPAY_ENABLED}
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    className="accent-brand-primary"
                  />
                  <div className="font-sans text-sm text-brand-primary">
                    <p className="flex items-center gap-2 font-semibold">
                      Pay Online (UPI / Card)
                      {!RAZORPAY_ENABLED && (
                        <span className="rounded-full bg-brand-sand/60 px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-brand-primary">
                          Coming Soon
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-brand-primary/82">
                      {RAZORPAY_ENABLED
                        ? "Secure payment via Razorpay."
                        : "Online payments are being set up. Cash on Delivery is available now."}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="rounded-2xl border border-solid border-brand-sand/60 bg-white p-5 sm:p-6">
              <h2 className="mb-4 font-serif text-lg font-bold text-brand-primary">Order Summary</h2>
              <div className="flex flex-col gap-3">
                {items.map(({ product, quantity }) => {
                  const slot = imageSlots[product.imageSlot] || imageSlots.hero;
                  return (
                    <div key={product.id} className="flex gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-cream">
                        {slot.src && (
                          <Image src={slot.src} alt={product.name} fill className="object-cover" sizes="56px" />
                        )}
                      </div>
                      <div className="flex flex-1 items-center justify-between font-sans text-sm text-brand-primary">
                        <div>
                          <p className="font-semibold line-clamp-1">{product.name}</p>
                          <p className="text-xs text-brand-primary/72">Qty {quantity}</p>
                        </div>
                        <span className="font-semibold">₹{product.indicativePrice * quantity}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-brand-sand/50 pt-4">
                <span className="font-sans text-xs uppercase tracking-wider text-brand-primary/82">Subtotal</span>
                <span className="font-sans text-xl font-bold text-brand-primary">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="mt-2 font-sans text-[11px] text-brand-leaf-green">
                Complimentary shipping &amp; Vaidya-verified packaging included.
              </p>

              <button
                type="button"
                disabled={!selectedAddressId || isPlacing}
                onClick={handlePlaceOrder}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory shadow-md transition-all hover:bg-brand-primary/95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" />
                Place Order
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 font-sans text-[11px] text-brand-primary/72">
                <Lock className="h-3 w-3" />
                Your information is stored securely on this device.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
