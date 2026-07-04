import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tarot o Lásce: AI tarotové výklady o lásce a vztazích",
    template: "%s | Tarot o Lásce",
  },
  description:
    "Polož otázku, vyber si karty a dostaň osobní tarotový výklad o lásce. První výklad za 29 Kč. Výklady generuje AI.",
  openGraph: {
    siteName: "Tarot o Lásce",
    locale: "cs_CZ",
    type: "website",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tarot o Lásce",
  url: SITE_URL,
  description:
    "Česká aplikace pro AI tarotové výklady zaměřené na lásku a vztahy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        <main className="mx-auto w-full max-w-3xl px-4 pb-24">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
