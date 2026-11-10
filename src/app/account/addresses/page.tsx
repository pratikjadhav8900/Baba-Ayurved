"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { useAddresses, type Address } from "@/context/AddressContext";
import { MobileAccountHeader } from "@/components/account/MobileAccountHeader";

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

export default function AddressesPage() {
  const { addresses, addAddress, removeAddress } = useAddresses();
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<AddressFormState>(emptyAddressForm);

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addAddress(form);
    setForm(emptyAddressForm);
    setIsAdding(false);
  }

  return (
    <div className="flex flex-col gap-6">
        <MobileAccountHeader title="Manage Address" />
        <div className="flex items-center justify-between gap-4">
          <h1 className="hidden font-serif text-xl font-bold text-brand-primary md:block">Saved Addresses</h1>
          {!isAdding && (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1.5 rounded-xl bg-brand-primary px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Address
            </button>
          )}
        </div>

        {isAdding && (
          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 gap-3 rounded-2xl border border-solid border-brand-sand/60 bg-white p-5 sm:grid-cols-2 sm:p-6"
          >
            <input
              required
              placeholder="Full name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/58 outline-none focus-visible:border-brand-primary"
            />
            <input
              required
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-lg border border-brand-sand/60 px-3 py-2.5 font-sans text-sm text-brand-primary placeholder:text-brand-primary/58 outline-none focus-visible:border-brand-primary"
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
                className="flex-1 rounded-xl bg-brand-primary py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-brand-ivory"
              >
                Save Address
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="rounded-xl border border-brand-sand px-4 py-2.5 font-sans text-xs font-semibold text-brand-primary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {addresses.length === 0 && !isAdding ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-brand-sand/60 bg-brand-cream/40 py-20 text-center">
            <MapPin className="h-8 w-8 text-brand-sand" strokeWidth={1.5} />
            <p className="font-serif text-sm text-brand-primary/82">No saved addresses yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="flex items-start justify-between gap-3 rounded-2xl border border-solid border-brand-sand/60 bg-white p-5"
              >
                <div className="font-sans text-sm text-brand-primary">
                  <p className="font-semibold">{address.fullName} &middot; {address.phone}</p>
                  <p className="mt-1 text-brand-primary/86">
                    {address.line1}{address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeAddress(address.id)}
                  aria-label={`Remove address for ${address.fullName}`}
                  className="shrink-0 text-brand-primary/58 transition-colors hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
