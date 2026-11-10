"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const GOOGLE_AUTH_ENABLED = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export function LogoutButton({ variant = "row" }: { variant?: "row" | "sidebar" }) {
  const base =
    variant === "sidebar"
      ? "flex items-center gap-3 rounded-xl px-4 py-3 font-sans text-sm font-semibold"
      : "flex items-center gap-3 px-5 py-4 font-sans text-sm font-medium";

  if (!GOOGLE_AUTH_ENABLED) {
    return (
      <div aria-disabled="true" className={`${base} cursor-not-allowed text-brand-primary/55`}>
        <LogOut className="h-4 w-4" strokeWidth={1.75} />
        <span className="flex-1">Logout</span>
        <span className="rounded-full bg-brand-sand/50 px-2 py-0.5 font-sans text-[12px] font-semibold uppercase tracking-wider text-brand-primary/72">
          Soon
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className={`${base} w-full text-left text-red-700/90 transition-colors hover:bg-red-50 hover:text-red-700`}
    >
      <LogOut className="h-4 w-4" strokeWidth={1.75} />
      <span className="flex-1">Logout</span>
    </button>
  );
}
