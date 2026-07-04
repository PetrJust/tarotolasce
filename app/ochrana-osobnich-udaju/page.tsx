import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description:
    "Jak Tarot o Lásce nakládá s osobními údaji: e-mail, otázky, výklady a cookies.",
  alternates: { canonical: "https://tarotolasce.cz/ochrana-osobnich-udaju" },
};

export default function Page() {
  return (
    <article className="prose-tarot py-10 leading-relaxed text-cream-dim">
      <h1 className="font-display text-4xl font-semibold text-cream">
        Ochrana osobních údajů
      </h1>
      <p className="mt-6 rounded-xl border border-gold-dim/40 bg-night-soft/60 p-3 text-xs text-gold-soft">
        TODO: Finální znění dodá právník. Níže je struktura s pracovními texty.
      </p>
      <h2 className="mt-8 font-display text-2xl text-cream">1. Správce údajů</h2>
      <p>TODO: identifikace správce a kontakt na pověřence, pokud je ustanoven.</p>
      <h2 className="mt-6 font-display text-2xl text-cream">2. Jaké údaje zpracováváme</h2>
      <p>
        E-mailovou adresu (uložení výkladů, zasílání karty dne), text otázky a
        vygenerovaný výklad (poskytnutí služby), technické cookies. Otázky a
        výklady jsou citlivé povahy a nikdy se nezobrazují nikomu jinému než
        jejich autorce.
      </p>
      <h2 className="mt-6 font-display text-2xl text-cream">3. Účel a právní základ</h2>
      <p>TODO: plnění smlouvy, oprávněný zájem, souhlas u marketingu.</p>
      <h2 className="mt-6 font-display text-2xl text-cream">4. Doba uchování a práva</h2>
      <p>
        TODO: doba uchování, právo na výmaz, přístup, přenositelnost a podání
        stížnosti u ÚOOÚ.
      </p>
      <h2 className="mt-6 font-display text-2xl text-cream">5. Cookies</h2>
      <p>
        Web používá nezbytné cookies pro fungování služby a volitelné cookies
        pro analytiku. Volbu lze kdykoli změnit. TODO: výčet konkrétních cookies.
      </p>
    </article>
  );
}
