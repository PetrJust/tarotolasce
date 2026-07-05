// MOCK: replace with production (Stripe později)
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, priceId } = await req.json();
  if (typeof email !== "string" || typeof priceId !== "string") {
    return NextResponse.json({ error: "email and priceId required" }, { status: 400 });
  }
  // Mock: 1,5 s zpoždění, e-mail obsahující „fail@" simuluje selhání platby
  await new Promise((r) => setTimeout(r, 1500));
  if (email.includes("fail@")) {
    return NextResponse.json({ error: "payment_failed" }, { status: 402 });
  }
  return NextResponse.json({
    paymentIntent: `pi_mock_${Date.now().toString(36)}`,
  });
}
