"use client";
// Zobrazí počet zbývajících výkladů z balíčku (kredity) v hlavičce.
// Aktualizuje se i po nákupu/použití přes vlastní event "tol-credits".
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCredits } from "@/lib/clientState";
import { useCreditsEnabled } from "@/lib/flags";
import { pocetVykladu } from "@/lib/declension";

export default function CreditBadge() {
  const creditsEnabled = useCreditsEnabled();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const read = () => setCredits(getCredits());
    read();
    // změny z jiných záložek i z aktuální stránky
    window.addEventListener("storage", read);
    window.addEventListener("tol-credits", read as EventListener);
    const t = setInterval(read, 1500); // jednoduchý mock fallback
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("tol-credits", read as EventListener);
      clearInterval(t);
    };
  }, []);

  if (!creditsEnabled) return null; // ledger ještě nestojí (zadání paleta §4)
  if (!credits || credits <= 0) return null;
  return (
    <Link
      href="/cenik"
      title="Zbývající výklady z balíčku"
      className="rounded-full border border-accent/50 bg-surface px-2.5 py-1 text-[11px] font-medium text-accent-soft hover:border-accent"
    >
      {pocetVykladu(credits)}
    </Link>
  );
}
