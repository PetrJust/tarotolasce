import type { Config } from "tailwindcss";

// Paleta „zamilovaná růžovo-lila" (zadání paleta-a-kontrast):
// inspirace Instagramem, ne jeho kopie. Lila -> korálová -> broskvová,
// žádné původní instagramové hexy. Vše centrálně odsud.
// Kontrast: gradient s tmavým textem #1D0B33 = 5.11 / 6.01 / 9.20 (WCAG AA
// i proti nejsvětlejšímu bodu; měřeno, viz zadání bod 3).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: { DEFAULT: "#2A1245", deep: "#1D0B33", soft: "#3D1B63", line: "#573085" },
        gold: { DEFAULT: "#F15BB5", soft: "#FFA07A", dim: "#A24BB5" },
        cream: { DEFAULT: "#FFF3EE", dim: "#E3C9CF" },
        lila: { DEFAULT: "#9B5DE5", soft: "#C7A4F5" },
      },
      backgroundImage: {
        love: "linear-gradient(45deg, #A46BEA 0%, #F15BB5 55%, #FFA07A 100%)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 24px rgba(0,0,0,0.45)",
        glow: "0 0 32px rgba(241,91,181,0.25)",
      },
      dropShadow: {
        card: "0 6px 12px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
