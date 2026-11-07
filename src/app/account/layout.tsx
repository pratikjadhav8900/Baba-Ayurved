"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { User, Package, MapPin, CreditCard } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LogoutButton } from "@/components/account/LogoutButton";

const GOOGLE_AUTH_ENABLED = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

const navItems = [
  { href: "/account", icon: User, label: "Personal Information" },
  { href: "/account/orders", icon: Package, label: "My Orders" },
  { href: "/account/addresses", icon: MapPin, label: "Manage Address" },
  { href: "/account/payment", icon: CreditCard, label: "Payment Method" },
] as const;

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // Only call useSession's gating logic once Google Sign-In actually exists —
  // until then the account section stays open and local-only, as it always has.
  const { status } = useSession();

  useEffect(() => {
    if (GOOGLE_AUTH_ENABLED && status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (GOOGLE_AUTH_ENABLED && status !== "authenticated") {
    return null;
  }

  return (
    <Section tone="paper" className="py-6 md:py-16">
      <Container className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
        {/* Desktop Sidebar only — mobile navigates via the account home list instead */}
        <aside className="hidden shrink-0 flex-col gap-1.5 md:flex md:w-64">
          <h1 className="mb-2 font-serif text-2xl font-bold text-brand-primary">My Account</h1>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-sans text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-brand-primary text-brand-ivory shadow-sm"
                    : "text-brand-primary/75 hover:bg-brand-cream/60"
                }`}
              >
                <item.icon className="h-4 w-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}

          <div className="my-2 border-t border-brand-sand/50" />

          <LogoutButton variant="sidebar" />
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">{children}</div>
      </Container>
    </Section>
  );
}
