// Světlá poloha pro marketingové plochy (zadání paleta §2):
// landing, ceník, karta dne, významy karet, intent stránky, kontakt.
// Rituál a výklad (mimo tuto skupinu) zůstávají v tmavé noční fialové;
// přechod světlá -> tmavá dramaturgicky značí "teď to začíná doopravdy".
export default function LightLayout({ children }: { children: React.ReactNode }) {
  return <div className="light-surface">{children}</div>;
}
