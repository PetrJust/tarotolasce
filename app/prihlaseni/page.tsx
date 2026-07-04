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
    router.push("/historie");
  }

  return (
    <div className="mx-auto max-w-md py-16">
      {expired && !sent ? (
        <>
          <h1 className="font-display text-3xl font-semibold text-cream">
            Tenhle odkaz už vypršel.
          </h1>
          <p className="mt-3 text-cream-dim">
            Přihlašovací odkazy platí 7 dní. Zadej svůj e-mail a hned ti
            pošleme nový.
          </p>
        </>
      ) : (
        <h1 className="font-display text-3xl font-semibold text-cream">
          Přihlášení
        </h1>
      )}

      {!sent ? (
        <div className="mt-8">
          <label htmlFor="email" className="block text-sm text-cream">
            Tvůj e-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-night-line bg-night-soft/60 p-3 text-cream focus:border-gold"
          />
          <button
            onClick={send}
            disabled={!email.includes("@")}
            className="mt-4 w-full rounded-xl bg-gold px-6 py-3.5 font-medium text-night hover:bg-gold-soft disabled:opacity-40"
          >
            {expired ? "Poslat nový odkaz" : "Poslat přihlašovací odkaz"}
          </button>
          <p className="mt-3 text-xs text-cream-dim">
            Žádné heslo, žádné ověřování. Do schránky ti přijde odkaz, kterým
            se přihlásíš.
          </p>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-night-line bg-night-soft/60 p-6">
          <p className="text-cream">Odkaz je na cestě do tvé schránky.</p>
          <p className="mt-2 text-sm text-cream-dim">
            Mock režim: e-maily se nikam neposílají.
          </p>
          <button
            onClick={openLink}
            className="mt-5 w-full rounded-xl border border-gold-dim px-6 py-3 text-gold-soft hover:border-gold"
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
