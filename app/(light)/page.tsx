// Landing: SSR, plný obsah v prvním HTML.
import type { Metadata } from "next";
import Link from "next/link";
import QuestionBox from "@/components/QuestionBox";
import SampleReadings from "@/components/SampleReadings";
import { CardBack } from "@/components/TarotCard";
import { PERSONA_NAME, PERSONA_FULL } from "@/lib/persona";

export const metadata: Metadata = {
  title: "Tarot o Lásce: AI tarotový výklad o lásce za 29 Kč",
  description:
    `Polož otázku, vyber si karty a ${PERSONA_FULL} ti napíše osobní výklad o lásce a vztazích. První výklad za 29 Kč, karta dne zdarma.`,
  alternates: { canonical: "https://tarotolasce.cz/" },
};


const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Kdo mi karty vykládá?",
      acceptedAnswer: { "@type": "Answer", text: `Všechny výklady vytváří ${PERSONA_NAME}, AI kartářka aplikace Tarot o Lásce. Není to člověk; je to umělá inteligence vyladěná na laskavé a osobní výklady o lásce.` },
    },
    {
      "@type": "Question",
      name: "Kolik výklad stojí?",
      acceptedAnswer: { "@type": "Answer", text: "První výklad stojí 29 Kč, další 49 Kč. Balíček 5 výkladů vychází na 199 Kč a 20 výkladů na 599 Kč. Karta dne je zdarma." },
    },
    {
      "@type": "Question",
      name: "Předpoví mi karty budoucnost?",
      acceptedAnswer: { "@type": "Answer", text: "Ne. Tarot v aplikaci slouží jako nástroj reflexe: pomáhá utřídit pocity a vidět situaci jinak. Rozhodnutí zůstává na tobě." },
    },
  ],
};


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
        <h1 className="font-display text-[42px] leading-[1.1] font-semibold text-body sm:text-5xl">
          Když tě něco v lásce tíží, zeptej se {PERSONA_NAME}.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-body-dim">
          Polož otázku, vyber si vlastníma rukama karty z vějíře a {PERSONA_NAME},
          tvoje AI kartářka, ti je osobně vyloží. Klidně, beze spěchu, jen pro
          tebe. První výklad za 29 Kč.
        </p>
      </section>

      <section className="mt-10">
        <QuestionBox />
      </section>

      {/* Jak to funguje (F.2) - zkráceno. NÁVRH: definitivní zkrácené znění
          (GPT bod 5) nebylo dodáno, tohle čeká na schválení zakladatelem. */}
      <section className="mt-14">
        <h2 className="font-display text-[32px] leading-[1.15] font-semibold text-body">
          Jak to funguje
        </h2>
        <ol className="mt-6 space-y-4 text-body-dim">
          <li>
            <strong className="text-body">1. Polož otázku.</strong> Vlastními
            slovy, jak ti to přijde.
          </li>
          <li>
            <strong className="text-body">2. Vyber si karty.</strong> Z vějíře
            78 karet, zamíchaných jen pro tebe.
          </li>
          <li>
            <strong className="text-body">3. Přečti si výklad.</strong>{" "}
            {PERSONA_NAME}, tvoje AI kartářka, ti karty vyloží osobně, ke tvé
            otázce. Výklad ti zůstane uložený.
          </li>
        </ol>
        <p className="mt-6 text-sm text-body-dim">
          Výklady generuje AI. Pokud ti první výklad nic nedá, napiš nám a
          29 Kč ti vrátíme.
        </p>
      </section>

      {/* Ukázkové výklady (F.4): 1 rozbalená + 2 sbalené */}
      <section className="mt-14">
        <h2 className="font-display text-[32px] leading-[1.15] font-semibold text-body">
          Jak vypadá výklad
        </h2>
        <SampleReadings />
      </section>

      {/* Karta dne teaser (F.5: pod ukázkami) */}
      <section className="mt-14 rounded-2xl border border-surface bg-surface p-6 text-center">
        <h2 className="font-display text-[30px] leading-[1.15] font-semibold text-body">
          Karta dne zdarma
        </h2>
        <p className="mt-2 text-body-dim">
          Každý den ti {PERSONA_NAME} otočí jednu kartu a napíše krátký vzkaz
          pro tvoje srdce. Bez placení, bez závazků.
        </p>
        <Link
          href="/karta-dne"
          className="mt-4 inline-block rounded-xl border border-accent-dim px-6 py-3 text-accent-soft hover:border-accent"
        >
          Otočit dnešní kartu
        </Link>
      </section>

      {/* SKRYTO do launche: smyšlené recenze jsou po novele zákona o ochraně
          spotřebitele zakázaná praktika. Sekce se zapne až se skutečnými
          recenzemi (komponenta zachována). */}
      {false && (
      <section className="mt-14">
        <h2 className="font-display text-[30px] leading-[1.15] font-semibold text-body">
          Zkušenosti
        </h2>
        <div className="mt-5 space-y-4">
          {[
            {
              text: `${PERSONA_NAME} mi pomohla vidět situaci s bývalým úplně jinak. Konečně jsem si přiznala, co jsem dlouho věděla.`,
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
              className="rounded-2xl border border-surface bg-surface p-5"
            >
              <p className="text-body">„{r.text}"</p>
              <footer className="mt-2 text-sm text-body-dim">
                {r.who} · {r.when}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
      )}


      {/* FAQ (schváleno zadáním paleta-a-kontrast; FAQPage JSON-LD níže) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="mt-14">
        <h2 className="font-display text-[30px] leading-[1.15] font-semibold text-body">
          Časté otázky
        </h2>
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-surface bg-surface p-5">
            <h3 className="font-medium text-body">Kdo mi karty vykládá?</h3>
            <p className="mt-1 text-sm text-body-dim">
              Všechny výklady vytváří {PERSONA_NAME}, naše AI kartářka. Není to člověk;
              je to umělá inteligence vyladěná na laskavé a osobní výklady o
              lásce. Píše jen pro tebe, ke tvé otázce a tvým kartám.
            </p>
          </div>
          <div className="rounded-2xl border border-surface bg-surface p-5">
            <h3 className="font-medium text-body">Kolik výklad stojí?</h3>
            <p className="mt-1 text-sm text-body-dim">
              První výklad stojí 29 Kč, další 49 Kč. Balíček 5 výkladů vychází
              na 199 Kč a 20 výkladů na 599 Kč. Karta dne je každý den zdarma.
            </p>
          </div>
          <div className="rounded-2xl border border-surface bg-surface p-5">
            <h3 className="font-medium text-body">Předpoví mi karty budoucnost?</h3>
            <p className="mt-1 text-sm text-body-dim">
              Ne, a ani se o to nesnažíme. Tarot u nás slouží jako zrcadlo:
              pomáhá ti utřídit pocity a vidět situaci jinýma očima. Rozhodnutí
              zůstává vždycky na tobě.
            </p>
          </div>
        </div>
      </section>

      {/* Knihovna karet */}
      <section className="mt-14 rounded-2xl border border-surface bg-surface p-6">
        <h2 className="font-display text-[30px] leading-[1.15] font-semibold text-body">
          Co znamenají karty v lásce
        </h2>
        <p className="mt-2 text-body-dim">
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
              className="rounded-full border border-surface px-4 py-2 text-sm text-body-dim hover:border-accent-dim hover:text-body"
            >
              {name}
            </Link>
          ))}
          <Link
            href="/vyznam-karet"
            className="rounded-full border border-accent-dim px-4 py-2 text-sm text-accent-soft hover:border-accent"
          >
            Všechny karty
          </Link>
        </div>
      </section>
    </div>
  );
}
