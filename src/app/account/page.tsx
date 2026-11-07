"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Package, MapPin, CreditCard, ChevronRight, Pencil } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { useOrders } from "@/context/OrderContext";
import { useAddresses } from "@/context/AddressContext";
import { LogoutButton } from "@/components/account/LogoutButton";

const genderOptions = ["", "Female", "Male", "Prefer not to say"];

const mobileMenuItems = [
  { href: "/account/orders", icon: Package, label: "My Orders", countKey: "orders" as const },
  { href: "/account/addresses", icon: MapPin, label: "Manage Address", countKey: "addresses" as const },
  { href: "/account/payment", icon: CreditCard, label: "Payment Method", countKey: null },
];

export default function PersonalInformationPage() {
  const { profile, updateProfile } = useProfile();
  const { orders } = useOrders();
  const { addresses } = useAddresses();
  const [form, setForm] = useState(profile);
  const [isSaved, setIsSaved] = useState(false);
  const [confirmingClear, setConfirmingClear] = useState(false);

  const counts = { orders: orders.length, addresses: addresses.length };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateProfile(form);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  }

  function handleClearData() {
    if (!confirmingClear) {
      setConfirmingClear(true);
      return;
    }
    localStorage.removeItem("baba_ayurved_cart_v1");
    localStorage.removeItem("baba_ayurved_wishlist_v1");
    localStorage.removeItem("baba_ayurved_addresses_v1");
    localStorage.removeItem("baba_ayurved_orders_v1");
    localStorage.removeItem("baba_ayurved_profile_v2");
    window.location.reload();
  }

  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ");
  const initials = (form.firstName[0] || "") + (form.lastName[0] || "") || "BA";

  return (
    <>
      {/* ============ MOBILE: simple profile card + list ============ */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-solid border-brand-sand/60 bg-white p-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary font-serif text-2xl font-bold uppercase text-brand-ivory">
            {initials}
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-brand-primary">{fullName || "Welcome"}</h1>
            {profile.email && <p className="font-sans text-xs text-brand-primary/60">{profile.email}</p>}
          </div>
          <a
            href="#edit-profile"
            className="mt-1 flex items-center gap-1.5 rounded-full bg-brand-primary px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit Profile
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-solid border-brand-sand/60 bg-white">
          {mobileMenuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-4 transition-colors hover:bg-brand-cream/40 ${
                index > 0 ? "border-t border-brand-sand/40" : ""
              }`}
            >
              <item.icon className="h-[18px] w-[18px] text-brand-primary/70" strokeWidth={1.5} />
              <span className="flex-1 font-sans text-sm font-medium text-brand-primary">{item.label}</span>
              {item.countKey && counts[item.countKey] > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-leaf-green/15 px-1.5 font-sans text-[11px] font-semibold text-brand-leaf-green">
                  {counts[item.countKey]}
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-brand-primary/40" />
            </Link>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-solid border-brand-sand/60 bg-white">
          <LogoutButton />
        </div>

        {/* Edit Profile form, revealed inline via the button above */}
        <form
          id="edit-profile"
          onSubmit={handleSubmit}
          className="scroll-mt-6 flex flex-col gap-4 rounded-2xl border border-solid border-brand-sand/60 bg-white p-5"
        >
          <h2 className="font-serif text-base font-bold text-brand-primary">Edit Profile</h2>
          <input
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            placeholder="First name"
            className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/40 outline-none focus-visible:border-brand-primary"
          />
          <input
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            placeholder="Last name"
            className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/40 outline-none focus-visible:border-brand-primary"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email address"
            className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/40 outline-none focus-visible:border-brand-primary"
          />
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone number"
            className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/40 outline-none focus-visible:border-brand-primary"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-primary py-3 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory"
          >
            {isSaved ? (
              <>
                <Check className="h-4 w-4" /> Saved
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>

        <button
          type="button"
          onClick={handleClearData}
          onBlur={() => setConfirmingClear(false)}
          className="px-1 text-center font-sans text-xs font-semibold text-red-700/80"
        >
          {confirmingClear ? "Tap again to confirm — clears all saved data" : "Clear saved data on this device"}
        </button>
      </div>

      {/* ============ DESKTOP: inline Personal Information form ============ */}
      <div className="hidden rounded-2xl border border-solid border-brand-sand/60 bg-white p-6 sm:p-8 md:block">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-primary font-serif text-lg font-bold uppercase text-brand-ivory">
            {initials}
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-brand-primary">Personal Information</h2>
            <p className="font-sans text-xs text-brand-primary/60">
              Saved on this device — sign-in &amp; cloud sync are launching soon.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-primary/70">
                First Name
              </span>
              <input
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="First name"
                className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/40 outline-none focus-visible:border-brand-primary"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-primary/70">
                Last Name
              </span>
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Last name"
                className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/40 outline-none focus-visible:border-brand-primary"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-primary/70">
              Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/40 outline-none focus-visible:border-brand-primary"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-primary/70">
              Phone
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/40 outline-none focus-visible:border-brand-primary"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-primary/70">
              Gender
            </span>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="rounded-lg border border-brand-sand/60 bg-white px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/40 outline-none focus-visible:border-brand-primary"
            >
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option || "Select"}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="mt-2 flex w-fit items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory transition-transform hover:scale-[1.01]"
          >
            {isSaved ? (
              <>
                <Check className="h-4 w-4" />
                Updated
              </>
            ) : (
              "Update Changes"
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-brand-sand/50 pt-5">
          <button
            type="button"
            onClick={handleClearData}
            onBlur={() => setConfirmingClear(false)}
            className="font-sans text-xs font-semibold text-red-700/80 hover:text-red-700 hover:underline"
          >
            {confirmingClear ? "Tap again to confirm — this clears cart, orders, wishlist & addresses" : "Clear saved data on this device"}
          </button>
        </div>
      </div>
    </>
  );
}
