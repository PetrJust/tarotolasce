"use client";
// Seznam výkladů přihlášené uživatelky (mock: dle e-mailu v cookie).
import { useEffect, useState } from "react";
import Link from "next/link";
import { getEmail } from "@/lib/clientState";

type Item = { id: string; question: string; spreadName: string; createdAt: number };

export default function HistoriePage() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getEmail());
    fetch("/api/readings")
      .then((r) => r.json())
      .then((d) => setItems(d.readings ?? []));
  }, []);

  return (
    <div className="py-12">
      <h1 className="font-display text-4xl font-semibold text-body">
        Tvoje výklady
      </h1>

      {!email && (
        <p className="mt-6 text-body-dim">
          Pro zobrazení historie se{" "}
          <Link href="/prihlaseni" className="text-accent-soft underline underline-offset-2">
            přihlas e-mailem
          </Link>
          . Žádné heslo, jen odkaz do schránky.
        </p>
      )}

      {email && items && items.length === 0 && (
        <div className="mt-8 rounded-2xl border border-surface bg-surface p-6">
          <p className="text-body-dim">
            Zatím tu nic není. Tvůj první výklad na tebe čeká.
          </p>
          <Link
            href="/vyklad/novy"
            className="mt-4 inline-block rounded-xl bg-gold px-6 py-3 font-medium text-night hover:bg-gold-soft"
          >
            Položit otázku
          </Link>
        </div>
      )}

      {items && items.length > 0 && (
        <ul className="mt-8 space-y-3">
          {items.map((r) => (
            <li key={r.id}>
              <Link
                href={`/vyklad/${r.id}`}
                className="block rounded-2xl border border-surface bg-surface p-5 hover:border-accent-dim"
              >
                <span className="text-sm text-body-dim">
                  {new Date(r.createdAt).toLocaleDateString("cs-CZ")} · {r.spreadName}
                </span>
                <span className="mt-1 block font-display text-xl text-body">
                  „{r.question}"
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
