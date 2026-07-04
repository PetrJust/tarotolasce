"use client";
// Hlavní flow (kapitola 5): otázka → moderace → klasifikace → checkout
// → platba (mock) → rituál → streamovaný výklad → 3 cesty.
// Aplikační stránka, noindex (viz layout v této složce).
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CrisisScreen from "@/components/CrisisScreen";
import Ritual, { PickedCard } from "@/components/Ritual";
import ReadingStream from "@/components/ReadingStream";
import ThreePaths from "@/components/ThreePaths";
import ReadingFeedback from "@/components/ReadingFeedback";
import { spirioUrl } from "@/components/SpirioCTA";
import { SPREADS, SpreadKey, betweenUsPositions } from "@/lib/spreads";
import { PRICES, PRICE_IDS } from "@/lib/pricing";
import { vykladu } from "@/lib/declension";
import {
  getCredits, setCredits, getSinglePurchases, bumpSinglePurchases,
  getFirstDone, setFirstDone, getEmail, setEmail as persistEmail,
  bumpReadingCount,
} from "@/lib/clientState";

type Step =
  | "question"
  | "crisis_a" | "crisis_b" | "crisis_c"
  | "checkout"
  | "paying"
  | "payment_failed"
  | "ritual"
  | "reading"
  | "reading_error"
  | "paths";

const SUGGESTIONS = ["Miluje mě?", "Mám mu odpustit?", "Přijde někdo nový?"];

function FlowInner() {
  const params = useSearchParams();
  const [step, setStep] = useState<Step>("question");
  const [question, setQuestion] = useState(params.get("q") ?? "");
  const [spread, setSpread] = useState<Exclude<SpreadKey, "daily">>("between_us");
  const [showSpreadPicker, setShowSpreadPicker] = useState(false);
  const [email, setEmail] = useState("");
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [consent, setConsent] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [cards, setCards] = useState<PickedCard[]>([]);
  const [readingId, setReadingId] = useState("");
  const [credits, setCreditsState] = useState(0);
  const [singles, setSingles] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [creditUsed, setCreditUsed] = useState(false);
  // Otázka přišla z úvodní stránky (?q=) → zpracovat rovnou, neukazovat
  // formulář podruhé. processing drží mezistav, než se rozhodne další krok.
  const [processing, setProcessing] = useState(!!params.get("q")?.trim());
  const autoStarted = useRef(false);
  const countedRef = useRef(false); // výklad se počítá jen jednou

  useEffect(() => {
    setCreditsState(getCredits());
    setSingles(getSinglePurchases());
    setIsFirst(!getFirstDone());
    const saved = getEmail();
    if (saved) {
      setEmail(saved);
      setEmailConfirmed(true);
    }
  }, []);

  // Automaticky zpracuj otázku z úvodní stránky (jen jednou)
  useEffect(() => {
    const q = params.get("q")?.trim();
    if (q && !autoStarted.current) {
      autoStarted.current = true;
      submitQuestion(q).finally(() => setProcessing(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submitQuestion(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuestion(trimmed);
    // 2. Moderace (neviditelná)
    const mod = await fetch("/api/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: trimmed }),
    }).then((r) => r.json());
    if (mod.status !== "ok") {
      setStep(mod.status as Step);
      return;
    }
    // 3. Klasifikace (neviditelná)
    const cls = await fetch("/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: trimmed }),
    }).then((r) => r.json());
    setSpread(cls.spread);
    // Má kredit z balíčku → bez platby. Pokud už známe e-mail, jdeme rovnou
    // do rituálu; jinak zobrazíme odlehčený checkout jen pro e-mail a souhlas
    // (bez platebních tlačítek). Kredit se strhne až při vydání výkladu (7.5).
    if (getCredits() > 0 && getEmail()) {
      await startRitual(cls.spread);
      return;
    }
    setStep("checkout");
  }

  async function pay() {
    if (!consent || !email.includes("@")) return;
    // Má kredit z balíčku → bez platby
    if (credits > 0) {
      persistEmail(email);
      await startRitual(spread);
      return;
    }
    setStep("paying");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        priceId: isFirst ? PRICE_IDS.first : PRICE_IDS.single,
      }),
    });
    if (!res.ok) {
      setStep("payment_failed");
      return;
    }
    persistEmail(email);
    if (isFirst) setFirstDone();
    else {
      bumpSinglePurchases();
      setSingles((s) => s + 1);
    }
    await startRitual();
  }

  async function startRitual(useSpread?: typeof spread) {
    const sp = useSpread ?? spread;
    const res = await fetch("/api/session/shuffle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spread: sp }),
    }).then((r) => r.json());
    setSessionId(res.sessionId);
    setStep("ritual");
  }

  function onRitualComplete(picked: PickedCard[]) {
    setCards(picked);
    const current = getCredits();
    if (current > 0) {
      // Kredit se strhává až při vydání výkladu; při chybě se vrací (7.5)
      setCredits(current - 1);
      setCreditsState(current - 1);
      setCreditUsed(true);
    }
    setStep("reading");
  }

  const spreadDef = SPREADS[spread];
  const positions =
    spread === "between_us" ? betweenUsPositions(question) : spreadDef.positions;
  const price = isFirst ? PRICES.first : PRICES.single;

  // ---------- KROK: OTÁZKA ----------
  if (step === "question") {
    // Otázka přišla z úvodní stránky a právě se zpracovává → krátký mezistav,
    // ne formulář podruhé.
    if (processing) {
      return (
        <div className="flex min-h-[50dvh] flex-col items-center justify-center gap-4 py-12 text-center">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gold" />
          <p className="font-display text-2xl text-cream">Připravuji tvé karty…</p>
        </div>
      );
    }
    return (
      <div className="py-12">
        <h1 className="font-display text-4xl font-semibold text-cream">
          Na co se chceš zeptat?
        </h1>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          placeholder="Napiš otázku vlastními slovy…"
          className="mt-6 w-full rounded-2xl border border-night-line bg-night-soft/60 p-4 text-lg text-cream placeholder:text-cream-dim/60 focus:border-gold"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => submitQuestion(s)}
              className="rounded-full border border-night-line px-4 py-2 text-sm text-cream-dim hover:border-gold-dim hover:text-cream"
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={() => submitQuestion(question)}
          disabled={!question.trim()}
          className="mt-8 w-full rounded-xl bg-gold px-6 py-4 text-lg font-medium text-night hover:bg-gold-soft disabled:opacity-40 sm:w-auto"
        >
          Pokračovat ke kartám
        </button>
      </div>
    );
  }

  // ---------- KRIZOVÉ OBRAZOVKY ----------
  if (step === "crisis_a" || step === "crisis_b" || step === "crisis_c") {
    return (
      <CrisisScreen
        variant={step}
        spirioHref={spirioUrl("none", "krize")}
        onBack={() => {
          setQuestion("");
          setStep("question");
        }}
      />
    );
  }

  // ---------- CHECKOUT (texty 7.1 doslovně) ----------
  if (step === "checkout" || step === "paying" || step === "payment_failed") {
    return (
      <div className="py-12">
        {step === "payment_failed" ? (
          <div className="rounded-2xl border border-night-line bg-night-soft/60 p-6">
            <h1 className="font-display text-3xl font-semibold text-cream">
              Platba neproběhla.
            </h1>
            <p className="mt-3 text-cream-dim">
              Nic jsme ti nestrhli. Zkus to znovu, nebo vyber jinou platební
              metodu. Tvoje otázka i karty zůstávají připravené.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setStep("checkout")}
                className="rounded-xl bg-gold px-6 py-3 font-medium text-night hover:bg-gold-soft"
              >
                Zkusit znovu
              </button>
              <button
                onClick={() => setStep("checkout")}
                className="rounded-xl border border-night-line px-6 py-3 text-cream-dim hover:text-cream"
              >
                Jiná platební metoda
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="font-display text-4xl font-semibold text-cream">
              Tvoje karty jsou připravené.
            </h1>
            <p className="mt-4 text-cream-dim">
              Tvoje otázka: „{question}"
              <br />
              Rozklad: {spreadDef.name}
            </p>
            <button
              onClick={() => setShowSpreadPicker((v) => !v)}
              className="mt-2 text-sm text-cream-dim underline decoration-night-line underline-offset-4 hover:text-cream"
            >
              Raději chci jiný rozklad
            </button>
            {showSpreadPicker && (
              <div className="mt-3 flex flex-col gap-2">
                {(["yesno", "between_us", "my_ex"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setSpread(k);
                      setShowSpreadPicker(false);
                    }}
                    className={`rounded-xl border px-4 py-3 text-left text-sm ${
                      spread === k
                        ? "border-gold text-cream"
                        : "border-night-line text-cream-dim hover:text-cream"
                    }`}
                  >
                    {SPREADS[k].name} · {SPREADS[k].cardCount}{" "}
                    {SPREADS[k].cardCount === 1 ? "karta" : SPREADS[k].cardCount <= 4 ? "karty" : "karet"}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-gold-dim/40 bg-night-soft/60 p-6">
              <p className="font-display text-2xl text-gold-soft">
                {credits > 0
                  ? "Výklad z tvého balíčku"
                  : isFirst
                    ? "První výklad za 29 Kč (běžně 49 Kč)"
                    : `Výklad za ${price} Kč`}
              </p>

              <div className="mt-6">
                {emailConfirmed ? (
                  <p className="text-sm text-cream-dim">
                    Výklad ti uložíme na {email} ·{" "}
                    <button
                      onClick={() => setEmailConfirmed(false)}
                      className="underline underline-offset-2 hover:text-cream"
                    >
                      upravit
                    </button>
                  </p>
                ) : (
                  <>
                    <label htmlFor="email" className="block text-sm text-cream">
                      Tvůj e-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => email.includes("@") && setEmailConfirmed(true)}
                      className="mt-2 w-full rounded-xl border border-night-line bg-night-deep/60 p-3 text-cream focus:border-gold"
                    />
                    <p className="mt-2 text-xs text-cream-dim">
                      Sem ti výklad uložíme, ať se k němu můžeš kdykoli vrátit.
                      A každé ráno ti pošleme kartu dne zdarma. Žádné heslo,
                      žádné ověřování.
                    </p>
                  </>
                )}
              </div>

              <label className="mt-6 flex items-start gap-3 text-xs text-cream-dim">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-gold"
                  required
                />
                <span>
                  Souhlasím s dodáním digitálního obsahu ihned po zaplacení a
                  beru na vědomí, že tím ztrácím právo na odstoupení od smlouvy
                  ve 14denní lhůtě.
                </span>
              </label>

              <div className="mt-6 grid gap-3">
                {credits > 0 ? (
                  <button
                    onClick={pay}
                    disabled={!consent || !email.includes("@")}
                    className="rounded-xl bg-gold px-6 py-3.5 font-medium text-night hover:bg-gold-soft disabled:opacity-40"
                  >
                    Použít výklad z balíčku
                  </button>
                ) : (
                  [" Pay", "G Pay", "Zaplatit kartou"].map((label) => (
                    <button
                      key={label}
                      onClick={pay}
                      disabled={!consent || !email.includes("@") || step === "paying"}
                      className="rounded-xl bg-cream px-6 py-3.5 font-medium text-night hover:bg-white disabled:opacity-40"
                    >
                      {step === "paying" ? "Zpracovává se…" : label}
                    </button>
                  ))
                )}
              </div>

              <p className="mt-5 text-xs text-cream-dim">
                {credits > 0
                  ? `Výklady generuje AI kartářka Nomi. Po vydání výkladu ti ${vykladu(credits - 1)}.`
                  : "Výklady generuje AI kartářka Nomi. Pokud ti první výklad nic nedá, napiš nám a 29 Kč ti vrátíme."}
              </p>
            </div>
          </>
        )}
      </div>
    );
  }

  // ---------- RITUÁL ----------
  if (step === "ritual") {
    return (
      <Ritual
        sessionId={sessionId}
        cardCount={spreadDef.cardCount}
        positions={positions}
        onReshuffle={async () => {
          const res = await fetch("/api/session/shuffle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ spread }),
          }).then((r) => r.json());
          setSessionId(res.sessionId);
          return res.sessionId as string;
        }}
        onComplete={onRitualComplete}
      />
    );
  }

  // ---------- VÝKLAD + 3 CESTY ----------
  if (step === "reading" || step === "paths" || step === "reading_error") {
    return (
      <div className="py-8">
        {/* Rozložené karty zůstávají nahoře */}
        <div className="mx-auto grid max-w-xl grid-cols-3 gap-3">
          {cards.map((c) => (
            <div key={c.position} className="text-center">
              <span className="text-[11px] leading-tight text-gold-soft">{c.position}</span>
              <div className="mt-1 rounded-lg border border-night-line bg-cream/95 p-2 text-night">
                <span className="block text-2xl">{c.symbol ?? "✦"}</span>
                <span className="block text-[11px] font-medium leading-tight">
                  {c.name}
                  {c.reversed ? " (obráceně)" : ""}
                </span>
              </div>
            </div>
          ))}
        </div>

        {step === "reading_error" ? (
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-night-line bg-night-soft/60 p-6">
            <h2 className="font-display text-2xl font-semibold text-cream">
              Karty potřebují chvilku navíc.
            </h2>
            <p className="mt-3 text-cream-dim">
              Výklad se připravuje déle, než je obvyklé. Máš ho zaplacený a
              nikam nezmizí. Zkus obnovit stránku, nebo se vrať za pár minut.
              Výklad najdeš ve své historii.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-gold px-6 py-3 font-medium text-night hover:bg-gold-soft"
            >
              Obnovit stránku
            </button>
          </div>
        ) : (
          <ReadingStream
            sessionId={sessionId}
            question={question}
            spread={spread}
            cards={cards}
            onMeta={(id) => {
              setReadingId(id);
              // Cesta ke průvodkyni: napočítej výklad (jen jednou na výklad)
              if (!countedRef.current) {
                countedRef.current = true;
                bumpReadingCount();
              }
              // Refresh-safe: jakmile je výklad uložený na serveru, přepíšeme
              // URL na kanonickou /vyklad/[id]. Obnovení stránky (i během
              // streamování) tak skončí na server-rendered uloženém výkladu,
              // ne zpět na otázce. Bez tvrdé navigace, stream běží dál.
              window.history.replaceState(null, "", `/vyklad/${id}`);
            }}
            onDone={() => setStep("paths")}
            onError={() => {
              // Kredit se NIKDY nestrhne za nevydaný výklad
              if (creditUsed) {
                const restored = getCredits() + 1;
                setCredits(restored);
                setCreditsState(restored);
                setCreditUsed(false);
              }
              setStep("reading_error");
            }}
          />
        )}

        {step === "paths" && (
          <>
            {readingId && <ReadingFeedback readingId={readingId} />}
            <ThreePaths spread={spread} credits={getCredits()} singlePurchases={singles} />
            {readingId && (
              <p className="mt-8 text-center text-sm text-cream-dim">
                Trvalý odkaz na výklad:{" "}
                <Link href={`/vyklad/${readingId}`} className="text-gold-soft underline underline-offset-2">
                  otevřít uložený výklad
                </Link>
              </p>
            )}
            <p className="mt-10 border-t border-night-line/60 pt-6 text-center text-xs text-cream-dim">
              Tarot o Lásce je nástroj reflexe pro zábavu a sebepoznání.
              Nenahrazuje profesionální terapii ani medicínskou péči. V krizi
              kontaktuj Linku první psychické pomoci: 116 123.
            </p>
          </>
        )}
      </div>
    );
  }

  return null;
}

export default function NovyVykladPage() {
  return (
    <Suspense>
      <FlowInner />
    </Suspense>
  );
}
