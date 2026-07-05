"use client";
// Mock magic link: e-mail se nikam neposílá, v dev režimu je tlačítko
// „Otevřít odkaz z e-mailu". Stav expirovaného odkazu: /prihlaseni?expired=1
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setEmail as persistEmail } from "@/lib/clientState";

function PrihlaseniInner() {
  const router = useRouter();
  const params = useSearchParams();
  const expired = params.get("expired") === "1";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function send() {
    if (!email.includes("@")) return;
    await fetch("/api/auth/magiclink", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSent(true);
  }

  function openLink() {
    persistEmail(email);
    router.push("/profil");
  }

  return (
    <div className="mx-auto max-w-md py-16">
      {expired && !sent ? (
        <>
          <h1 className="font-display text-3xl font-semibold text-body">
            Tenhle odkaz už vypršel.
          </h1>
          <p className="mt-3 text-body-dim">
            Přihlašovací odkazy platí 7 dní. Zadej svůj e-mail a hned ti
            pošleme nový.
          </p>
        </>
      ) : (
        <>
          <h1 className="font-display text-3xl font-semibold text-body">
            Přihlášení a registrace
          </h1>
          <p className="mt-3 text-body-dim">
            Účet u nás nemá heslo. Napiš svůj e-mail: pokud u nás účet ještě
            nemáš, tímhle krokem ho rovnou založíme.
          </p>
        </>
      )}

      {!sent ? (
        <div className="mt-8">
          <label htmlFor="email" className="block text-sm text-body">
            Tvůj e-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-surface bg-surface p-3 text-body focus:border-accent"
          />
          <button
            onClick={send}
            disabled={!email.includes("@")}
            className="mt-4 w-full rounded-xl bg-gold px-6 py-3.5 font-medium text-night hover:bg-gold-soft disabled:opacity-40"
          >
            {expired ? "Poslat nový odkaz" : "Poslat přihlašovací odkaz"}
          </button>
          <p className="mt-3 text-xs text-body-dim">
            Žádné heslo, žádné ověřování. Do schránky ti přijde odkaz, kterým
            se přihlásíš.
          </p>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-surface bg-surface p-6">
          <p className="text-body">Odkaz je na cestě do tvé schránky.</p>
          <p className="mt-2 text-sm text-body-dim">
            Mock režim: e-maily se nikam neposílají.
          </p>
          <button
            onClick={openLink}
            className="mt-5 w-full rounded-xl border border-accent-dim px-6 py-3 text-accent-soft hover:border-accent"
          >
            Otevřít odkaz z e-mailu (dev)
          </button>
        </div>
      )}
    </div>
  );
}

export default function PrihlaseniPage() {
  return (
    <Suspense>
      <PrihlaseniInner />
    </Suspense>
  );
}
