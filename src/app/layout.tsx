import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Noto_Sans_Devanagari,
  Playfair_Display,
} from "next/font/google";
import { wedding } from "@/data/wedding";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#F8F5EF",
};

export const metadata: Metadata = {
  title: `${wedding.coupleNames} · Wedding Invitation`,
  description: wedding.metaDescription,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: wedding.coupleNames,
  },
  openGraph: {
    title: `${wedding.coupleNames} · Wedding Invitation`,
    description: wedding.metaDescription,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${wedding.coupleNames} · Wedding Invitation`,
    description: wedding.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-ivory font-[family-name:var(--font-dm-sans)] text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
