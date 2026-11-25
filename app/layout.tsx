import type { Metadata, Viewport } from "next";
import { Anton, Manrope, Pinyon_Script } from "next/font/google";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const pinyon = Pinyon_Script({ variable: "--font-pinyon", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KM Hair Beauty & Barber · Parrucchiere e barbiere a Cassano Magnago",
  description:
    "Parrucchiere, barbiere ed estetica in Via Mazzini 25b a Cassano Magnago (VA). Taglio, colore, degradè, Olaplex, manicure, nail art e armocromia.",
  // Anteprima: non indicizzare
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  themeColor: "#fbf1ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${anton.variable} ${manrope.variable} ${pinyon.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
