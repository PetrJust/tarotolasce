// Dynamický OG obrázek pro sdílení karty dne (kapitola 10.2)
import { ImageResponse } from "next/og";
import { DECK } from "@/lib/cards";

export const runtime = "edge";
export const alt = "Karta dne | Tarot o Lásce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  // Karta se mění podle dne (deterministicky), obrázek je tak vždy čerstvý
  const dayIndex =
    Math.floor(Date.now() / 86400000) % DECK.length;
  const card = DECK[dayIndex];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #1D0B33 0%, #4A2070 100%)",
          color: "#FFF3EE",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div style={{ fontSize: 34, color: "#F0426E", letterSpacing: 4 }}>
            KARTA DNE
          </div>
          <div style={{ fontSize: 92, fontWeight: 600 }}>{card.name}</div>
          <div style={{ fontSize: 30, color: "#E3C9CF" }}>
            tarotolasce.cz
          </div>
        </div>
      </div>
    ),
    size
  );
}
