import { Cormorant_Garamond, Montserrat, Tiro_Devanagari_Hindi } from "next/font/google";

/**
 * Brand typefaces from Baba brand kit_v2.pdf (§05 & §06).
 * Primary font: Cormorant Garamond (display, editorial, section titles, product names)
 * Secondary font: Montserrat (navigation, UI, body copy, buttons, metadata)
 * Companion: Tiro Devanagari Hindi (authentic Devanagari / Hindi script fallback)
 */

/** Primary display serif: Cormorant Garamond */
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Secondary functional sans-serif: Montserrat */
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

/** Hindi / Devanagari companion for classical Sanskrit & Hindi terminology */
export const tiroDevanagariHindi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-tiro-devanagari",
  display: "swap",
});

/** Class string registering all brand font variables on <html> */
export const fontVariables = [
  cormorantGaramond.variable,
  montserrat.variable,
  tiroDevanagariHindi.variable,
].join(" ");

