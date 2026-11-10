"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const GOOGLE_AUTH_ENABLED = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/account");
    }
  }, [status, router]);

  return (
    <Section tone="paper" className="py-16 md:py-24">
      <Container className="mx-auto flex max-w-sm justify-center">
        <div className="flex w-full flex-col items-center rounded-3xl border border-brand-sand/60 bg-gradient-to-b from-brand-cream/70 to-white p-8 text-center shadow-xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
            <LogIn className="h-7 w-7 text-brand-primary" />
          </div>

          <h1 className="font-serif text-2xl font-bold text-brand-primary">Sign In</h1>
          <p className="mt-2 mb-6 font-sans text-sm text-brand-primary/82">
            Sign in to sync your orders, wishlist, and addresses across devices.
          </p>

          {GOOGLE_AUTH_ENABLED ? (
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/account" })}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-brand-primary to-[#2A1808] py-3 font-sans text-sm font-semibold text-brand-ivory shadow-md transition-all hover:brightness-110 active:scale-[0.99]"
            >
              <GoogleIcon className="h-5 w-5" />
              Continue with Google
            </button>
          ) : (
            <div className="w-full rounded-xl border border-dashed border-brand-sand/60 bg-brand-cream/40 p-5 text-left">
              <p className="font-sans text-sm font-semibold text-brand-primary">
                Sign-in is launching soon
              </p>
              <p className="mt-1 font-sans text-xs text-brand-primary/76">
                Google Sign-In is being set up. Your cart, wishlist, and orders are saved on this
                device in the meantime.
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.48a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.26A12 12 0 0 0 0 12c0 1.94.46 3.77 1.26 5.38l4.01-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.62l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  );
}
