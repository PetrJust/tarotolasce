import type { Config } from "tailwindcss";
import { palette, loveGradient, hexToRgba } from "./lib/palette";

// Barvy čti a měň v lib/palette.ts (jediný zdroj pravdy, zadání paleta §1).
// Tenhle soubor je jen "zapojení" té palety do Tailwindu.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: palette.night,
        gold: palette.gold,
        cream: palette.cream,
        lila: palette.lila,
      },
      backgroundImage: {
        love: loveGradient(),
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 24px rgba(0,0,0,0.45)",
        glow: `0 0 32px ${hexToRgba(palette.gold.DEFAULT, 0.25)}`,
      },
      dropShadow: {
        card: "0 6px 12px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
