"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import CreditBadge from "./CreditBadge";
import { getEmail } from "@/lib/clientState";

export default function Header() {
  // Přihlášený stav se čte z mock cookie (viz lib/clientState). Až po
  // mountu, ať nedojde k hydratačnímu nesouladu server/klient.
  const [email, setEmailState] = useState<string | null>(null);
  useEffect(() => {
    setEmailState(getEmail());
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-surface bg-surface-2 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="font-display text-xl font-semibold tracking-wide text-body">
          Tarot <span className="text-accent">o Lásce</span>
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="hidden rounded-full border border-accent-dim/60 px-2.5 py-1 text-[11px] uppercase tracking-wider text-accent-soft sm:inline"
            title="Výklady na tomto webu vykládá AI kartářka Nomi"
          >
            Vykládá AI Nomi
          </span>
          <CreditBadge />
          <Link
            href="/cenik"
            className="text-sm text-body-dim transition-colors hover:text-body"
          >
            Ceník
          </Link>
          <Link
            href="/historie"
            className="text-sm text-body-dim transition-colors hover:text-body"
          >
            Historie
          </Link>
          <Link
            href={email ? "/profil" : "/prihlaseni"}
            className="text-sm text-body-dim transition-colors hover:text-body"
          >
            {email ? "Profil" : "Přihlásit se"}
          </Link>
        </div>
      </div>
    </header>
  );
}
