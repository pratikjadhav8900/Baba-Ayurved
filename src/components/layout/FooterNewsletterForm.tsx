"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <p className="font-sans text-sm text-brand-sand" role="status">
        Thank you — you&apos;re on the list for seasonal ritual notes.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-sm">
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        className="min-h-11 w-full rounded-sm border border-solid border-brand-sand/40 bg-[#3E240C]/50 px-4 pr-12 font-sans text-sm text-brand-ivory placeholder:text-brand-sand/82 outline-none transition-colors duration-(--duration-calm) focus-visible:border-brand-sand focus-visible:ring-2 focus-visible:ring-brand-sand/50"
        // Some extensions (password managers, anti-phishing shields) tag email/
        // password inputs before React hydrates, causing a cosmetic, extension-
        // only className mismatch. See the same note on <body> in layout.tsx.
        suppressHydrationWarning
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="absolute right-1.5 top-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-sand text-brand-primary transition-transform duration-(--duration-calm) hover:scale-105 hover:bg-brand-ivory"
      >
        <Send aria-hidden size={14} strokeWidth={1.75} />
      </button>
    </form>
  );
}
