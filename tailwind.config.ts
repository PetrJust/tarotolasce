import type { Config } from "tailwindcss";

// Paleta „lovely & happy": živá instagramová fialová + gradient
// růžová→oranžová (#833AB4 → #E1306C → #F77737 → #FCAF45).
// Názvy tříd zůstávají (night/gold/cream), mění se hodnoty,
// takže se nová nálada propíše celou aplikací naráz.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: { DEFAULT: "#2A1245", deep: "#1D0B33", soft: "#3D1B63", line: "#573085" },
        gold: { DEFAULT: "#F0426E", soft: "#FF8E53", dim: "#B03D69" },
        cream: { DEFAULT: "#FFF3EE", dim: "#E3C9CF" },
      },
      backgroundImage: {
        love: "linear-gradient(45deg, #833AB4 0%, #E1306C 50%, #F77737 100%)",
        "love-full": "linear-gradient(45deg, #833AB4, #E1306C, #F77737, #FCAF45)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 24px rgba(0,0,0,0.45)",
        glow: "0 0 32px rgba(240,66,110,0.25)",
      },
      dropShadow: {
        card: "0 6px 12px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
