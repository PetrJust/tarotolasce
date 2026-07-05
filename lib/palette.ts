// JEDINÝ ZDROJ PRAVDY PRO BARVY (zadání paleta §1).
// Mění se TADY a propíše se do: tailwind.config.ts (UI třídy jako bg-gold,
// text-cream…), components/TarotCard.tsx (SVG rub/líc karet), Stories
// exportu a OG obrázku karty dne. Světlá/tmavá poloha stránek (app/globals.css)
// z těchto hodnot taky vychází, ale tam jsou samostatně opsané do CSS
// proměnných (CSS soubor neumí importovat TS) - při změně palety uprav
// hodnoty na obou místech, ideálně shodně s tímto souborem.
export const palette = {
  night: { DEFAULT: "#2A1245", deep: "#1D0B33", soft: "#3D1B63", line: "#573085" },
  gold: { DEFAULT: "#F15BB5", soft: "#FFA07A", dim: "#A24BB5" },
  cream: { DEFAULT: "#FFF3EE", dim: "#E3C9CF" },
  lila: { DEFAULT: "#9B5DE5", soft: "#C7A4F5" },
} as const;

// Tmavý podklad pro Stories export a OG obrázek (stejný gradient jako
// .dark-surface v app/globals.css - tam je nutně opsaný do CSS, protože
// CSS soubor neumí importovat TS).
export const NIGHT_GRADIENT = ["#1D0B33", "#2A1245", "#4A2070"] as const;

// Body gradientu „zamilovaná": lila -> korálová -> broskvová. Posunuto od
// přesných instagramových hexů (#833AB4/#E1306C/#F77737/#FCAF45), viz
// zadání paleta §1. Lila stop je o trochu světlejší (#A46BEA) než
// palette.lila.DEFAULT, aby gradient s tmavým textem splnil WCAG AA i v
// nejsvětlejším bodě (viz contrastRatio níže, měřeno 5.11:1).
export const GRADIENT_STOPS = ["#A46BEA", "#F15BB5", "#FFA07A"] as const;

export function loveGradient(angle = 45): string {
  return `linear-gradient(${angle}deg, ${GRADIENT_STOPS[0]} 0%, ${GRADIENT_STOPS[1]} 55%, ${GRADIENT_STOPS[2]} 100%)`;
}

export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ---------- WCAG kontrast (zadání paleta §3): min. 4,5:1 pro text ---------- */
function relLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hexA: string, hexB: string): number {
  const [l1, l2] = [relLuminance(hexA), relLuminance(hexB)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Ověří text/pozadí proti WCAG AA (4.5:1). Použij v testech nebo ad-hoc
 * skriptu při další změně palety, ať se AA nerozbije omylem. */
export function meetsAA(textHex: string, bgHex: string): boolean {
  return contrastRatio(textHex, bgHex) >= 4.5;
}
