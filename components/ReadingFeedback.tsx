"use client";
// Hodnocení výkladu po jeho dočtení. Klidné, bez nátlaku, dá se přeskočit.
// „Jak ti výklad sedl?" + palec nahoru/dolů + volitelný komentář.
import { useState } from "react";

export default function ReadingFeedback({ readingId }: { readingId: string }) {
  const [rating, setRating] = useState<"up" | "down" | null>(null);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  async function send(r: "up" | "down", withComment: boolean) {
    setRating(r);
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ readingId, rating: r, comment: withComment ? comment : "" }),
    }).catch(() => {});
    if (withComment || r === "up") setSent(true);
  }

  if (!readingId) return null;

  if (sent) {
    return (
      <div className="mt-10 rounded-2xl border border-night-line bg-night-soft/40 p-5 text-center">
        <p className="text-cream-dim">Děkujeme, že ses podělila. Nomi se díky tobě učí.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl border border-night-line bg-night-soft/40 p-5">
      <p className="text-center font-display text-xl text-cream">Jak ti výklad sedl?</p>
      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={() => send("up", false)}
          aria-pressed={rating === "up"}
          className={`rounded-xl border px-5 py-2.5 text-sm transition-colors ${
            rating === "up"
              ? "border-gold bg-gold/10 text-gold-soft"
              : "border-night-line text-cream-dim hover:text-cream"
          }`}
        >
          Sedl mi
        </button>
        <button
          onClick={() => setRating("down")}
          aria-pressed={rating === "down"}
          className={`rounded-xl border px-5 py-2.5 text-sm transition-colors ${
            rating === "down"
              ? "border-gold bg-gold/10 text-gold-soft"
              : "border-night-line text-cream-dim hover:text-cream"
          }`}
        >
          Spíš ne
        </button>
      </div>

      {rating && (
        <div className="mt-4">
          <label htmlFor="fb" className="block text-center text-xs text-cream-dim">
            Chceš se podělit, co bys změnila? (nepovinné)
          </label>
          <textarea
            id="fb"
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-2 w-full rounded-xl border border-night-line bg-night-deep/60 p-3 text-sm text-cream focus:border-gold"
          />
          <div className="mt-2 flex justify-center gap-3">
            <button
              onClick={() => send(rating, true)}
              className="rounded-xl bg-gold px-5 py-2.5 text-sm font-medium text-night hover:bg-gold-soft"
            >
              Odeslat
            </button>
            <button
              onClick={() => setSent(true)}
              className="rounded-xl px-5 py-2.5 text-sm text-cream-dim hover:text-cream"
            >
              Přeskočit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
