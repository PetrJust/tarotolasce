// Rub karty: vlastní brand design, tmavě fialová + zlatý geometrický ornament
// (hvězda/měsíc). Líce: placeholder v RWS duchu (rámeček + název + symbol),
// připravený na výměnu za finální artwork.
import { Card } from "@/lib/cards";

export function CardBack({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      role="img"
      aria-label="Rub karty"
    >
      <defs>
        <linearGradient id="backGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2D1B4E" />
          <stop offset="100%" stopColor="#1A1033" />
        </linearGradient>
      </defs>
      <rect width="120" height="200" rx="10" fill="url(#backGrad)" />
      <rect x="5" y="5" width="110" height="190" rx="7" fill="none" stroke="#D4AF37" strokeWidth="1.4" />
      <rect x="10" y="10" width="100" height="180" rx="5" fill="none" stroke="#8A7530" strokeWidth="0.7" />
      {/* Centrální osmicípá hvězda */}
      <g stroke="#D4AF37" strokeWidth="1.2" fill="none">
        <path d="M60 62 L68 92 L98 100 L68 108 L60 138 L52 108 L22 100 L52 92 Z" />
        <path d="M60 76 L65 95 L84 100 L65 105 L60 124 L55 105 L36 100 L55 95 Z" strokeWidth="0.8" />
        <circle cx="60" cy="100" r="7" />
      </g>
      {/* Srpek měsíce nahoře a dole */}
      <g fill="#D4AF37">
        <path d="M60 24 a 9 9 0 1 0 0.01 0 M60 27 a 7 7 0 1 1 -0.01 0" fillRule="evenodd" opacity="0.9" />
        <path d="M60 162 a 9 9 0 1 0 0.01 0 M60 165 a 7 7 0 1 1 -0.01 0" fillRule="evenodd" opacity="0.9" />
      </g>
      {/* Rohové hvězdičky */}
      <g fill="#E8CC6E" opacity="0.85">
        {[
          [22, 28],
          [98, 28],
          [22, 172],
          [98, 172],
        ].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y - 4} L${x + 1.4} ${y - 1.4} L${x + 4} ${y} L${x + 1.4} ${y + 1.4} L${x} ${y + 4} L${x - 1.4} ${y + 1.4} L${x - 4} ${y} L${x - 1.4} ${y - 1.4} Z`} />
        ))}
      </g>
      {/* Tečkovaný geometrický rastr */}
      <g fill="#8A7530" opacity="0.5">
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={36 + c * 24} cy={44 + r * 28} r="0.9" />
          ))
        )}
      </g>
    </svg>
  );
}

export function CardFace({
  card,
  reversed = false,
  className = "",
}: {
  card: Pick<Card, "name" | "symbol">;
  reversed?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      role="img"
      aria-label={`${card.name}${reversed ? ", obráceně" : ""}`}
    >
      <rect width="120" height="200" rx="10" fill="#F5F0E8" />
      <rect x="6" y="6" width="108" height="188" rx="7" fill="none" stroke="#1A1033" strokeWidth="1.6" />
      <rect x="11" y="11" width="98" height="178" rx="4" fill="none" stroke="#D4AF37" strokeWidth="1" />
      <g transform={reversed ? "rotate(180 60 100)" : undefined}>
        <text
          x="60"
          y="118"
          textAnchor="middle"
          fontSize="44"
          fill="#2D1B4E"
        >
          {card.symbol}
        </text>
        <text
          x="60"
          y="176"
          textAnchor="middle"
          fontSize="11"
          fontFamily="serif"
          fill="#1A1033"
        >
          {card.name.length > 16 ? card.name.slice(0, 15) + "…" : card.name}
        </text>
        <line x1="28" y1="160" x2="92" y2="160" stroke="#D4AF37" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
