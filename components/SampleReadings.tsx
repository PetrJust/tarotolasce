"use client";
// Ukázkové výklady na landing page (v1.1 F.4): 1 rozbalená + 2 sbalené
// (štítek + otázka + první věta + „zobrazit víc").
// NÁVRH: texty jsou psané v dikci G (krátké věty, karetní obraz + lidský
// překlad v téže větě, bez inverzí/vibrací/vesmíru/vykřičníků/zdrobnělin)
// a čekají na schválení zakladatelem. Zadání G.3 je samo označuje NÁVRH.
import { useState } from "react";

type Sample = {
  spread: string;
  question: string;
  text: string[]; // odstavce; první věta prvního odstavce = teaser
};

const SAMPLES: Sample[] = [
  {
    spread: "Jak to mezi námi je",
    question: "Jak to mezi námi teď doopravdy je?",
    text: [
      "Tvoje karta je Dvojka pohárů: do vztahu pořád vstupuješ srdcem napřed. Dáváš víc, než říkáš, a čekáš, že to ucítí sám.",
      "Jeho karta je Rytíř pentaklů, muž, který jede pomalu a city ukazuje skutky, ne slovy. To není chlad. Je to jeho tempo.",
      "Vaše společná karta je Slunce, mezi vámi je pořád opravdové světlo. Jen samo nemluví. Řekni si o slova, která potřebuješ slyšet, a dej mu čas je najít.",
    ],
  },
  {
    spread: "Ano/Ne pro srdce",
    question: "Mám mu napsat?",
    text: [
      "Karty říkají spíš ne, aspoň pro teď. Padla ti Osmička pohárů: odcházíš od něčeho, co tě už nesytí, a část tebe to ví.",
      "Psát chceš proto, že tě děsí ticho, ne proto, že ti chybí on. To je rozdíl, který stojí za tři dny trpělivosti.",
      "Nech ticho pracovat. Jestli se ozve sám, řekne ti to víc než jakákoli odpověď na tvou zprávu. Takže za karty: teď nepiš.",
    ],
  },
  {
    spread: "Já a můj ex",
    question: "Co mě na něm pořád drží?",
    text: [
      "Drží tě Kolo štěstí: vzpomínka na dobu, kdy se všechno točilo lehce a rychle. Ta doba byla skutečná. Jen už skončila.",
      "Věž ukazuje, že spadlo něco, co stálo na slabých základech. To se zpátky nestaví, i kdyby ses snažila sebevíc.",
      "Tebe popisuje Královna holí, žena s vlastním ohněm. Nedrží tě on. Drží tě verze tebe, kterou sis vedle něj pamatovala. Tu si můžeš vzít s sebou i bez něj.",
    ],
  },
];

function firstSentence(paragraph: string): string {
  const m = paragraph.match(/^[^.!?]*[.!?]/);
  return (m ? m[0] : paragraph).trim();
}

export default function SampleReadings() {
  // První ukázka rozbalená, další dvě sbalené (F.4)
  const [open, setOpen] = useState<boolean[]>([true, false, false]);

  return (
    <div className="mt-6 space-y-4">
      {SAMPLES.map((s, i) => {
        const expanded = open[i];
        return (
          <article
            key={s.question}
            className="rounded-2xl border border-surface bg-surface p-5"
          >
            <p className="text-xs uppercase tracking-wider text-accent-soft">
              {s.spread}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-body">
              „{s.question}"
            </h3>
            {expanded ? (
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-body-dim">
                {s.text.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            ) : (
              <>
                <p className="mt-2 text-sm leading-relaxed text-body-dim">
                  {firstSentence(s.text[0])}
                </p>
                <button
                  onClick={() =>
                    setOpen((o) => o.map((v, j) => (j === i ? true : v)))
                  }
                  className="mt-2 text-sm text-accent-soft underline underline-offset-2 hover:text-accent"
                >
                  zobrazit víc
                </button>
              </>
            )}
          </article>
        );
      })}
    </div>
  );
}
