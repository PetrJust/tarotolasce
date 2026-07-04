// MOCK: replace with production (Supabase auth)
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (typeof email !== "string") {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }
  // E-mail se nikam neposílá. Dev režim nabídne tlačítko „Otevřít odkaz z e-mailu".
  return NextResponse.json({ ok: true });
}
