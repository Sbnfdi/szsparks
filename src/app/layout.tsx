import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SZ Sparks — Authentic Pakistani Handmade Crafts",
  description:
    "Discover beautiful handmade pipe cleaner crafts by SZ Sparks. Unique flowers, bouquets, animals, characters, and decorations — all handcrafted with love in Pakistan.",
  keywords: [
    "handmade crafts",
    "pipe cleaner art",
    "Pakistani crafts",
    "SZ Sparks",
    "handmade flowers",
    "artisan crafts",
  ],
  openGraph: {
    title: "SZ Sparks — Authentic Pakistani Handmade Crafts",
    description:
      "Discover beautiful handmade pipe cleaner crafts by SZ Sparks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
