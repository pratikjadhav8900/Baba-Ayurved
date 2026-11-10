import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteIntro } from "@/components/brand/SiteIntro";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { CartRouteWatcher } from "@/components/shop/CartRouteWatcher";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AddressProvider } from "@/context/AddressContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { SessionProviderWrapper } from "@/components/providers/SessionProviderWrapper";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  // Foundation preview: keep out of search indexes until launch.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F4EFE5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} overflow-x-hidden max-w-full`}>
      {/*
        suppressHydrationWarning on <body> only: some browser extensions (e.g.
        Bitdefender's anti-tracker) inject attributes like bis_skin_checked into
        every element before React hydrates, causing a cosmetic, extension-only
        mismatch warning that React explicitly documents as unfixable from app
        code. This does not hide real hydration bugs in children.
      */}
      <body className="flex min-h-dvh flex-col overflow-x-hidden max-w-full" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-gutter focus:top-3 focus:z-50 focus:rounded-sm focus:bg-indigo focus:px-4 focus:py-2 focus:font-sans focus:text-ui focus:text-paper"
        >
          Skip to content
        </a>
        <SessionProviderWrapper>
          <CartProvider>
            <WishlistProvider>
              <AddressProvider>
                <OrderProvider>
                  <ProfileProvider>
                    <MotionProvider>
                      <Suspense fallback={null}>
                        <SiteIntro />
                      </Suspense>
                      <Suspense fallback={null}>
                        <SiteHeader />
                      </Suspense>
                      <main id="main" className="flex-1">
                        {children}
                      </main>
                      <SiteFooter />
                      <CartDrawer />
                      <Suspense fallback={null}>
                        <CartRouteWatcher />
                        <BottomNav />
                      </Suspense>
                    </MotionProvider>
                  </ProfileProvider>
                </OrderProvider>
              </AddressProvider>
            </WishlistProvider>
          </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
