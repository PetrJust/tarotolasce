// Landing: SSR, plný obsah v prvním HTML.
import type { Metadata } from "next";
import Link from "next/link";
import QuestionBox from "@/components/QuestionBox";
import { CardBack } from "@/components/TarotCard";

export const metadata: Metadata = {
  title: "Tarot o Lásce: AI tarotový výklad o lásce za 29 Kč",
  description:
    "Polož otázku, vyber si karty a dostaň osobní výklad o lásce a vztazích. První výklad za 29 Kč, karta dne zdarma. Výklady generuje AI.",
  alternates: { canonical: "https://tarotolasce.cz/" },
};

const SAMPLES = [
  {
    spread: "Jak to mezi námi je",
    question: "Jak to mezi námi teď doopravdy je?",
    excerpt:
      "Ty cítíš hluboké emoční propojení, jsi v poháru až po okraj. On je ale Rytíř pentaklů: stabilní, ale pomalý, řeší praktické věci místo pocitů. Vaše My je přesto Slunce, mezi vámi je opravdové světlo…",
  },
  {
    spread: "Ano/Ne pro srdce",
    question: "Mám mu napsat?",
    excerpt:
      "Karty teď ukazují spíš ne. Cítíš, že oddaluješ nevyhnutelné. Chceš kontakt, protože se bojíš ticha, ne protože ho potřebuješ…",
  },
  {
    spread: "Já a můj ex",
    question: "Co mě na něm pořád drží?",
    excerpt:
      "Nevyřčená zůstala tvoje vlastní síla. Cítila ses vedle něj malá. Věž říká, že rozchod byl nevyhnutelný, zhroutilo se to, co stálo na nejistých základech…",
  },
];

export default function LandingPage() {
  return (
    <div className="py-10">
      {/* Hero */}
      <section className="text-center">
        <div className="mx-auto mb-6 flex w-fit -space-x-8" aria-hidden>
          <CardBack className="h-32 w-20 -rotate-12 drop-shadow-card" />
          <CardBack className="h-32 w-20 drop-shadow-card" />
          <CardBack className="h-32 w-20 rotate-12 drop-shadow-card" />
        </div>
        <h1 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
          Co ti dnes řeknou karty o lásce?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-cream-dim">
          Polož otázku, vyber si vlastníma rukama karty z vějíře a dostaneš
          osobní výklad. Klidně, beze spěchu, jen pro tebe. První výklad za
          29 Kč.
        </p>
      </section>

      <section className="mt-10">
        <QuestionBox />
      </section>

      {/* Karta dne teaser */}
      <section className="mt-14 rounded-2xl border border-night-line bg-night-soft/50 p-6 text-center">
        <h2 className="font-display text-2xl font-semibold text-cream">
          Karta dne zdarma
        </h2>
        <p className="mt-2 text-cream-dim">
          Každý den jedna karta a krátký vzkaz pro tvoje srdce. Bez placení,
          bez závazků.
        </p>
        <Link
          href="/karta-dne"
          className="mt-4 inline-block rounded-xl border border-gold-dim px-6 py-3 text-gold-soft hover:border-gold"
        >
          Otočit dnešní kartu
        </Link>
      </section>

      {/* Ukázkové výklady */}
      <section className="mt-14">
        <h2 className="font-display text-3xl font-semibold text-cream">
          Jak vypadá výklad
        </h2>
        <div className="mt-6 space-y-4">
          {SAMPLES.map((s) => (
            <article
              key={s.question}
              className="rounded-2xl border border-night-line bg-night-soft/50 p-5"
            >
              <p className="text-xs uppercase tracking-wider text-gold-soft">
                {s.spread}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-cream">
                „{s.question}"
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-dim">
                {s.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Jak to funguje */}
      <section className="mt-14">
        <h2 className="font-display text-3xl font-semibold text-cream">
          Jak to funguje
        </h2>
        <ol className="mt-6 space-y-4 text-cream-dim">
          <li>
            <strong className="text-cream">1. Polož otázku.</strong> Vlastními
            slovy, jak ti to přijde. Podle otázky vybereme rozklad, který jí
            sedne.
          </li>
          <li>
            <strong className="text-cream">2. Vyber si karty.</strong> Z vějíře
            78 karet, zamíchaných jen pro tebe. Nech se vést rukou.
          </li>
          <li>
            <strong className="text-cream">3. Přečti si výklad.</strong>{" "}
            Tvé karty ti vyloží Nomi, naše AI kartářka. Osobně, ke tvé otázce.
            Výklad ti zůstane uložený, kdykoli se k němu vrátíš.
          </li>
        </ol>
        <p className="mt-6 text-sm text-cream-dim">
          Výklady generuje AI. Pokud ti první výklad nic nedá, napiš nám a
          29 Kč ti vrátíme.
        </p>
      </section>

      {/* Zkušenosti (MOCK recenze; stejný rukopis jako na Spirio webu,
          tón reflexe, žádné predikce) */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-cream">
          Zkušenosti
        </h2>
        <div className="mt-5 space-y-4">
          {[
            {
              text: "Nomi mi pomohla vidět situaci s bývalým úplně jinak. Konečně jsem si přiznala, co jsem dlouho věděla.",
              who: "Markéta K.",
              when: "duben 2026",
            },
            {
              text: "Byla jsem skeptická, ale výklad byl laskavý a překvapivě trefný v tom, co teď prožívám. Rituál s kartami je krásný.",
              who: "Lucie N.",
              when: "duben 2026",
            },
            {
              text: "Vracím se ke kartě dne každé ráno. Je to malá chvilka jen pro mě, než začne den.",
              who: "Jana D.",
              when: "březen 2026",
            },
          ].map((r) => (
            <blockquote
              key={r.who}
              className="rounded-2xl border border-night-line bg-night-soft/50 p-5"
            >
              <p className="text-cream">„{r.text}"</p>
              <footer className="mt-2 text-sm text-cream-dim">
                {r.who} · {r.when}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Knihovna karet */}
      <section className="mt-14 rounded-2xl border border-night-line bg-night-soft/50 p-6">
        <h2 className="font-display text-2xl font-semibold text-cream">
          Co znamenají karty v lásce
        </h2>
        <p className="mt-2 text-cream-dim">
          Významy všech 78 tarotových karet se zaměřením na lásku a vztahy.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ["zamilovani", "Zamilovaní"],
            ["vez", "Věž"],
            ["smrt", "Smrt"],
            ["dvojka-pohary", "Dvojka pohárů"],
            ["trojka-mece", "Trojka mečů"],
          ].map(([slug, name]) => (
            <Link
              key={slug}
              href={`/vyznam-karet/${slug}`}
              className="rounded-full border border-night-line px-4 py-2 text-sm text-cream-dim hover:border-gold-dim hover:text-cream"
            >
              {name}
            </Link>
          ))}
          <Link
            href="/vyznam-karet"
            className="rounded-full border border-gold-dim px-4 py-2 text-sm text-gold-soft hover:border-gold"
          >
            Všechny karty
          </Link>
        </div>
      </section>
    </div>
  );
}
