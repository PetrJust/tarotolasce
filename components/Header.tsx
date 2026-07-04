import Link from "next/link";
import CreditBadge from "./CreditBadge";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-night-line/60 bg-night-deep/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="font-display text-xl font-semibold tracking-wide text-cream">
          Tarot <span className="text-gold">o Lásce</span>
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="hidden rounded-full border border-gold-dim/60 px-2.5 py-1 text-[11px] uppercase tracking-wider text-gold-soft sm:inline"
            title="Výklady na tomto webu vykládá AI kartářka Nomi"
          >
            Vykládá AI Nomi
          </span>
          <CreditBadge />
          <Link
            href="/cenik"
            className="text-sm text-cream-dim transition-colors hover:text-cream"
          >
            Ceník
          </Link>
          <Link
            href="/historie"
            className="text-sm text-cream-dim transition-colors hover:text-cream"
          >
            Historie
          </Link>
        </div>
      </div>
    </header>
  );
}
