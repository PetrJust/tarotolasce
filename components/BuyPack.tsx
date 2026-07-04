"use client";
// Mock nákup balíčku: projde přes /api/checkout a připíše kredity do cookie.
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCredits, setCredits, getEmail } from "@/lib/clientState";
import { vykladu } from "@/lib/declension";

export default function BuyPack({
  priceId,
  credits,
}: {
  priceId: string | null;
  credits: number;
}) {
  const [state, setState] = useState<"idle" | "paying" | "done" | "failed">("idle");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(getCredits());
  }, []);

  if (!priceId) {
    return (
      <Link
        href="/vyklad/novy"
        className="mt-5 block rounded-xl bg-gold px-5 py-3 text-center font-medium text-night hover:bg-gold-soft"
      >
        Položit otázku
      </Link>
    );
  }

  async function buy() {
    setState("paying");
    const email = getEmail() ?? "mock@tarotolasce.cz";
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, priceId }),
    });
    if (!res.ok) {
      setState("failed");
      return;
    }
    const next = getCredits() + credits;
    setCredits(next);
    setBalance(next);
    setState("done");
  }

  return (
    <div className="mt-5">
      <button
        onClick={buy}
        disabled={state === "paying"}
        className="w-full rounded-xl border border-gold-dim px-5 py-3 font-medium text-gold-soft hover:border-gold disabled:opacity-50"
      >
        {state === "paying" ? "Zpracovává se…" : "Koupit balíček"}
      </button>
      {state === "done" && (
        <p className="mt-2 text-center text-xs text-gold-soft">
          Hotovo, {vykladu(balance)}.
        </p>
      )}
      {state === "failed" && (
        <p className="mt-2 text-center text-xs text-cream-dim">
          Platba neproběhla. Nic jsme ti nestrhli, zkus to znovu.
        </p>
      )}
    </div>
  );
}
