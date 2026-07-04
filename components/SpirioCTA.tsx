// 7.6 SPIRIO CTA. UTM: utm_source=tarotolasce&utm_medium=referral
// &utm_content={spread}_{umisteni}
export function spirioUrl(spread: string, placement: string): string {
  const params = new URLSearchParams({
    utm_source: "tarotolasce",
    utm_medium: "referral",
    utm_content: `${spread}_${placement}`,
  });
  return `https://spirio.cz/landing-TBD?${params.toString()}`;
}

export default function SpirioCTA({
  spread,
  placement,
  prominent = false,
}: {
  spread: string;
  placement: string;
  prominent?: boolean;
}) {
  const href = spirioUrl(spread, placement);

  if (prominent) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-gold/60 bg-night-soft p-6 shadow-glow">
        {/* Podpisový Spirio gradient (viz prototyp spirio.cz) */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#3B0764] to-[#BE185D]" />
        <h3 className="font-display text-2xl font-semibold text-cream">
          Tohle pouto se nerozváže samo.
        </h3>
        <p className="mt-3 text-cream-dim">
          Karty ti ukázaly, co tě drží. Jestli to chceš doopravdy pustit, živá
          průvodkyně s tebou projde, co se dnes otevřelo. První výklad 10 minut
          za 99 Kč, s garancí vrácení peněz.
        </p>
        <a
          href={href}
          className="mt-5 inline-block rounded-xl bg-gold px-6 py-3 font-medium text-night hover:bg-gold-soft"
        >
          Promluvit si s průvodkyní
        </a>
        <p className="mt-3 text-xs text-cream-dim">
          4,8 z 5 ★ · 14 000+ sezení · Čas se počítá až od připojení průvodkyně
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-night-line bg-night-soft/60 p-5">
      {/* Podpisový Spirio gradient (viz prototyp spirio.cz) */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#3B0764] to-[#BE185D]" />
      <h3 className="font-display text-xl font-semibold text-cream">
        Chceš to probrat s živým člověkem?
      </h3>
      <p className="mt-2 text-sm text-cream-dim">
        Ověřené průvodkyně na Spirio tě vyslechnou přes chat nebo hovor. První
        výklad 10 minut za 99 Kč. Když ti nic nedá, peníze ti vrátíme.
      </p>
      <a
        href={href}
        className="mt-4 inline-block rounded-xl border border-gold-dim px-5 py-2.5 text-sm text-gold-soft hover:border-gold"
      >
        Vybrat průvodkyni na Spirio
      </a>
      <p className="mt-3 text-xs text-cream-dim">
        4,8 z 5 ★ · 14 000+ sezení · Čas se počítá až od připojení průvodkyně
      </p>
    </div>
  );
}
