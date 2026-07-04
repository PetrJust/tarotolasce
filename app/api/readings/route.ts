// MOCK: replace with production
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readingsByEmail } from "@/lib/store";

export async function GET() {
  const email = cookies().get("tol_email")?.value;
  if (!email) return NextResponse.json({ readings: [] });
  const list = (await readingsByEmail(email)).map((r) => ({
    id: r.id,
    question: r.question,
    spreadName: r.spreadName,
    createdAt: r.createdAt,
  }));
  return NextResponse.json({ readings: list });
}
