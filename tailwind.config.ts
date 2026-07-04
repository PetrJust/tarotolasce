import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: { DEFAULT: "#1A1033", deep: "#140C28", soft: "#2D1B4E", line: "#3D2A63" },
        gold: { DEFAULT: "#D4AF37", soft: "#E8CC6E", dim: "#8A7530" },
        cream: { DEFAULT: "#F5F0E8", dim: "#C9BFAF" },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 24px rgba(0,0,0,0.45)",
        glow: "0 0 32px rgba(212,175,55,0.18)",
      },
      dropShadow: {
        card: "0 6px 12px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
