"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
};

type ProfileContextType = {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

const STORAGE_KEY = "baba_ayurved_profile_v2";

const emptyProfile: Profile = { firstName: "", lastName: "", email: "", phone: "", gender: "" };

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile({ ...emptyProfile, ...JSON.parse(stored) });
      }
    } catch {
      // Ignore local storage parse errors
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch {
        // Ignore quota/storage errors
      }
    }
  }, [profile, isInitialized]);

  const updateProfile = (next: Profile) => setProfile(next);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
