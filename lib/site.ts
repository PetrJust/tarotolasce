// Základní URL webu. V produkci nastav NEXT_PUBLIC_SITE_URL v prostředí,
// např. NEXT_PUBLIC_SITE_URL=https://tarotolasce.cz
// Lokálně se použije produkční doména jako výchozí.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://tarotolasce.cz";
