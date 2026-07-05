// Automatický check při deployi (v1.3 §5): na PRODUKCI nesmí existovat
// TEST_OTP_CODE ani přístupné /dev/* nástroje. Spouští se před next build
// (package.json "build"). Selhání = build spadne, nic se nenasadí.
//
// Co hlídá:
// 1. VERCEL_ENV === "production" && TEST_OTP_CODE nastavené -> FAIL
// 2. VERCEL_ENV === "production" && OTP_DEV_PREVIEW === "1" -> FAIL
// 3. app/dev/layout.tsx musí obsahovat produkční notFound() gate -> jinak FAIL
//    (ochrana proti omylem smazanému gate; runtime gate je v layoutu samém)

import { readFileSync } from "node:fs";

const isProd = process.env.VERCEL_ENV === "production";
const errors = [];

if (isProd && process.env.TEST_OTP_CODE) {
  errors.push("TEST_OTP_CODE je nastavené na produkci - smaž env proměnnou.");
}
if (isProd && process.env.OTP_DEV_PREVIEW === "1") {
  errors.push("OTP_DEV_PREVIEW=1 na produkci - smaž env proměnnou.");
}

const devLayout = readFileSync(new URL("../app/dev/layout.tsx", import.meta.url), "utf8");
if (!devLayout.includes('process.env.VERCEL_ENV === "production"') || !devLayout.includes("notFound()")) {
  errors.push("app/dev/layout.tsx ztratil produkční notFound() gate (v1.3 §5).");
}

if (errors.length) {
  console.error("\n✗ Deploy check (v1.3 §5) NEPROŠEL:\n");
  for (const e of errors) console.error("  - " + e);
  console.error("");
  process.exit(1);
}
console.log("✓ Deploy check (v1.3 §5): TEST_OTP_CODE ani /dev/* na produkci neexistují.");
