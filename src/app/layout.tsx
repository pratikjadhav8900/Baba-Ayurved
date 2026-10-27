import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { CartProvider } from "@/context/CartContext";
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
      <body className="flex min-h-dvh flex-col overflow-x-hidden max-w-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-gutter focus:top-3 focus:z-50 focus:rounded-sm focus:bg-indigo focus:px-4 focus:py-2 focus:font-sans focus:text-ui focus:text-paper"
        >
          Skip to content
        </a>
        <CartProvider>
          <MotionProvider>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <CartDrawer />
          </MotionProvider>
        </CartProvider>
      </body>
    </html>
  );
}
