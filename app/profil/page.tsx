"use client";
// Profil (mock: identita = e-mail v cookie, viz lib/clientState). Zatím
// bez serverového ledgeru - jakmile bude, přibude sem reálný kredit,
// historie plateb a správa balíčků (viz lib/flags.ts creditsEnabled).
import Link from "next/link";
import { useEffect, useState } from "react";
import { getEmail, clearEmail, getReadingCount } from "@/lib/clientState";
import { useCreditsEnabled } from "@/lib/flags";

export default function ProfilPage() {
  const creditsEnabled = useCreditsEnabled();
  const [email, setEmail] = useState<string | null>(null);
  const [reads, setReads] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setEmail(getEmail());
    setReads(getReadingCount());
    setReady(true);
  }, []);

  if (ready && !email) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-3xl font-semibold text-body">
          Ještě nejsi přihlášená.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-body-dim">
          Účet si založíš stejným krokem jako přihlášení: stačí e-mail, žádné
          heslo.
        </p>
        <Link
          href="/prihlaseni"
          className="mt-6 inline-block rounded-xl bg-gold px-6 py-3 font-semibold text-night-deep hover:opacity-90"
        >
          Přihlásit se / vytvořit účet
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <h1 className="font-display text-4xl font-semibold text-body">Profil</h1>

      <div className="mt-6 rounded-2xl border border-surface bg-surface p-6">
        <p className="text-xs uppercase tracking-wider text-body-dim">Přihlášena jako</p>
        <p className="mt-1 font-display text-xl font-semibold text-body">{email}</p>
      </div>

      <div className="mt-4 rounded-2xl border border-surface bg-surface p-6">
        <p className="text-xs uppercase tracking-wider text-body-dim">Výklady</p>
        <p className="mt-1 text-body">
          Zatím sis vyložila <strong>{reads}</strong> {reads === 1 ? "výklad" : reads >= 2 && reads <= 4 ? "výklady" : "výkladů"}.{" "}
          <Link href="/historie" className="text-accent-soft underline underline-offset-2 hover:text-accent">
            Zobrazit historii
          </Link>
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-surface bg-surface p-6">
        <p className="text-xs uppercase tracking-wider text-body-dim">Kredit a balíčky</p>
        {creditsEnabled ? (
          <p className="mt-1 text-body">
            Balíčky a kredit najdeš v <Link href="/cenik" className="text-accent-soft underline underline-offset-2 hover:text-accent">ceníku</Link>.
          </p>
        ) : (
          <p className="mt-1 text-body-dim">
            Účet s kreditem a balíčky spustíme, jakmile bude hotový
            server-side ledger. Zatím funguje platba za jednotlivé výklady.
          </p>
        )}
      </div>

      <button
        onClick={() => {
          clearEmail();
          setEmail(null);
        }}
        className="mt-6 rounded-xl border border-surface px-5 py-2.5 text-sm text-body-dim hover:border-accent-dim hover:text-body"
      >
        Odhlásit se
      </button>
    </div>
  );
}
