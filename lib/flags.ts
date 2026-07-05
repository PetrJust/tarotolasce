// Feature flagy (zadání paleta §4 + backlog):
// Kreditní počítadlo a prodej balíčků jsou VYPNUTÉ, dokud nestojí
// server-side ledger vázaný na účet (P0). Současná čísla jsou jen
// klientská cookie (demo), nesmí budit dojem hotové funkce.
export const CREDITS_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_CREDITS === "1";
