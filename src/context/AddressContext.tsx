"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Address = {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
};

type AddressContextType = {
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => Address;
  updateAddress: (id: string, address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
};

const AddressContext = createContext<AddressContextType | null>(null);

const STORAGE_KEY = "baba_ayurved_addresses_v1";

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAddresses(JSON.parse(stored));
      }
    } catch {
      // Ignore local storage parse errors
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
      } catch {
        // Ignore quota/storage errors
      }
    }
  }, [addresses, isInitialized]);

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddress: Address = { ...address, id: crypto.randomUUID() };
    setAddresses((prev) => [...prev, newAddress]);
    return newAddress;
  };

  const updateAddress = (id: string, address: Omit<Address, "id">) => {
    setAddresses((prev) =>
      prev.map((item) => (item.id === id ? { ...address, id } : item))
    );
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress, updateAddress, removeAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddresses() {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddresses must be used within an AddressProvider");
  }
  return context;
}
