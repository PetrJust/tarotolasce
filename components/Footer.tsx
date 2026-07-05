import Link from "next/link";
import { OPERATOR, OPERATOR_ICO, CONTACT_EMAIL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-night-line/60 bg-night-deep/60 px-4 py-10 text-sm text-cream-dim">
      <div className="mx-auto max-w-3xl space-y-4">
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/cenik" className="hover:text-cream">Ceník</Link>
          <Link href="/vyznam-karet" className="hover:text-cream">Významy karet</Link>
          <Link href="/karta-dne" className="hover:text-cream">Karta dne</Link>
          <Link href="/kontakt" className="hover:text-cream">Kontakt</Link>
          <Link href="/obchodni-podminky" className="hover:text-cream">Obchodní podmínky</Link>
          <Link href="/ochrana-osobnich-udaju" className="hover:text-cream">Ochrana osobních údajů</Link>
          <Link href="/reklamace" className="hover:text-cream">Reklamace</Link>
        </nav>
        <p>
          18+ · Všechny výklady vytváří AI kartářka Nomi · Provozovatel: {OPERATOR}{OPERATOR_ICO ? `, IČO: ${OPERATOR_ICO}` : ""} · <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-soft">{CONTACT_EMAIL}</a>
        </p>
        <p>
          Tarot o Lásce je nástroj reflexe pro zábavu a sebepoznání. Nenahrazuje
          profesionální terapii ani medicínskou péči. V krizi kontaktuj Linku
          první psychické pomoci: <a href="tel:116123" className="text-gold-soft">116 123</a>.
        </p>
      </div>
    </footer>
  );
}
