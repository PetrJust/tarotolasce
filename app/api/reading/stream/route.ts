// MOCK: replace with production (vlastní AI model na AWS, reálné SSE)
// Streamuje výklad po slovech. Výklad se uloží PŘED začátkem streamu,
// takže kredit se nikdy nestrhne za nevydaný výklad.
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { mockReading } from "@/lib/mockReadings";
import { saveReading } from "@/lib/store";
import { SPREADS, SpreadKey } from "@/lib/spreads";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { sessionId, question, cards, spread } = await req.json();
  if (!sessionId || !Array.isArray(cards) || !spread || !(spread in SPREADS)) {
    return new Response("bad request", { status: 400 });
  }

  const text = mockReading(spread as SpreadKey, question ?? "", cards);
  const email = cookies().get("tol_email")?.value ?? null;
  const saved = await saveReading({
    email,
    question: question ?? "",
    spreadKey: spread,
    spreadName: SPREADS[spread as SpreadKey].name,
    cards,
    text,
  });

  const words = text.split(" ");
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(
        encoder.encode(`event: meta\ndata: ${JSON.stringify({ readingId: saved.id })}\n\n`)
      );
      for (const word of words) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ t: word + " " })}\n\n`)
        );
        // 30 az 60 ms na slovo s mírnou variancí pro organický dojem;
        // delší pauza po konci věty (dojem odstavce)
        const endsSentence = /[.!?]$/.test(word);
        const base = 30 + Math.random() * 30;
        await new Promise((r) => setTimeout(r, endsSentence ? base + 300 : base));
      }
      controller.enqueue(encoder.encode("event: done\ndata: {}\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
