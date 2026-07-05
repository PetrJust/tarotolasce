import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Dev",
  robots: { index: false, follow: false },
};

// v1.3 §5: gate přes VERCEL_ENV - na preview jsou dev nástroje zapnuté,
// na produkci NEEXISTUJÍ (404). Lokálně (bez VERCEL_ENV) zapnuto.
export default function Layout({ children }: { children: React.ReactNode }) {
  if (process.env.VERCEL_ENV === "production") {
    notFound();
  }
  return children;
}
