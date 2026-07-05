// OTP request (v1.1 §B.2 + v1.3 §5). Identická odpověď pro existující
// i neexistující e-mail; limity řeší lib/account. Kód jde výhradně do
// e-mailu. Testovací režim (jen preview/lokálně, NIKDY produkce):
// TEST_OTP_CODE přebije vygenerovaný kód a vrací se klientovi pro banner
// „Testovací režim: kód je …"; OTP_DEV_PREVIEW vrací devCode pro /dev.
import { NextResponse } from "next/server";
import { requestOtp, overrideOtpCode } from "@/lib/account";
import { sendOtpEmail } from "@/lib/email";

const IS_PROD = process.env.VERCEL_ENV === "production";

export async function POST(req: Request) {
  const { email, purpose } = await req.json().catch(() => ({}));
  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ ok: true }); // žádný únik informace
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const res = await requestOtp(email, typeof purpose === "string" ? purpose : "login", ip);
  if (res.sent && res.code) {
    let code = res.code;
    // v1.3 §5: TEST_OTP_CODE jen mimo produkci (deploy check to hlídá)
    const testCode = !IS_PROD ? process.env.TEST_OTP_CODE : undefined;
    if (testCode && /^\d{6}$/.test(testCode)) {
      await overrideOtpCode(email, typeof purpose === "string" ? purpose : "login", testCode);
      code = testCode;
    }
    await sendOtpEmail(email, code);
    const payload: Record<string, unknown> = { ok: true };
    if (testCode && /^\d{6}$/.test(testCode)) payload.testCode = code;
    if (process.env.OTP_DEV_PREVIEW === "1" && !IS_PROD) payload.devCode = code;
    return NextResponse.json(payload);
  }
  return NextResponse.json({ ok: true });
}
