"use client";
// Oficiální brandovaný Google Pay button (v1.3 §6 bug 2). Vzhled podle
// brand guidelines pro tmavý „buy button": černý podklad, zaoblení,
// bílé „Pay" a vícebarevné „G". V PRODUKCI tenhle mock nahradí button
// vykreslený Stripe Payment Request / Express Checkout Elementem, který
// oficiální badge dodává sám - tahle komponenta drží vizuál do té doby.

function GPayMark() {
  return (
    <svg viewBox="0 0 435 174" className="h-6 w-auto" aria-hidden focusable="false">
      {/* „G" - oficiální čtyřbarevné */}
      <path fill="#4285F4" d="M86.7 88.8v33.3h47.4c-2 11-8 20.3-17 26.5l27.5 21.3c16-14.8 25.3-36.6 25.3-62.4 0-6-.5-11.8-1.5-17.4H86.7z" transform="scale(0.62) translate(0,20)" />
      <path fill="#34A853" d="M38.2 104.9l-6.2 4.7-21.9 17c13.9 27.6 42.4 46.6 76.6 46.6 23.1 0 42.5-7.6 56.7-20.7l-27.5-21.3c-7.6 5.1-17.4 8.2-29.2 8.2-22.3 0-41.2-15-48-35.3z" transform="scale(0.62) translate(0,20)" />
      <path fill="#FBBC05" d="M10.1 61.9C4.4 73.2 1.2 85.9 1.2 99.3s3.2 26.1 8.9 37.4c0 .1 28.2-21.9 28.2-21.9-1.7-5.1-2.7-10.5-2.7-16.2s1-11.1 2.7-16.2L10.1 61.9z" transform="scale(0.62) translate(0,20)" />
      <path fill="#EA4335" d="M86.7 40.1c12.6 0 23.9 4.3 32.8 12.8l24.5-24.5C129.1 14.6 109.8 6.9 86.7 6.9c-34.2 0-62.7 19-76.6 46.7l28.2 21.9c6.8-20.3 25.7-35.4 48.4-35.4z" transform="scale(0.62) translate(0,20)" />
      {/* „Pay" - bílé */}
      <g fill="#FFFFFF" transform="translate(128,30)">
        <path d="M31.9 42.6v38.2H19.7V0h32.2c8.2 0 15.1 2.7 20.9 8.2 5.8 5.4 8.8 12.1 8.8 20 0 8.1-2.9 14.8-8.8 20.2-5.7 5.4-12.7 8.1-20.9 8.1H31.9zm0-30.9v19.3h20.3c4.8 0 8.8-1.6 12-4.9 3.2-3.2 4.9-7.1 4.9-11.6 0-4.4-1.6-8.2-4.9-11.5-3.2-3.3-7.1-5-12-5H31.9v13.7z" transform="scale(1.35)" />
        <path d="M113.5 27.8c9 0 16.1 2.4 21.3 7.2 5.2 4.8 7.8 11.4 7.8 19.8v40h-11.6v-9h-.5c-5 7.4-11.8 11.1-20.2 11.1-7.2 0-13.2-2.1-18-6.4-4.8-4.2-7.2-9.5-7.2-15.9 0-6.7 2.5-12 7.6-16 5.1-4 11.9-6 20.4-6 7.2 0 13.2 1.3 17.9 4v-2.8c0-4.2-1.7-7.8-5-10.8-3.4-2.9-7.3-4.4-11.8-4.4-6.8 0-12.2 2.9-16.2 8.6l-10.7-6.8c5.9-8.4 14.6-12.6 26.2-12.6zm-15.8 47c0 3.2 1.3 5.8 4 7.9 2.7 2.1 5.9 3.2 9.5 3.2 5.1 0 9.7-1.9 13.7-5.7 4-3.8 6-8.3 6-13.4-3.8-3-9.1-4.5-15.9-4.5-5 0-9.1 1.2-12.5 3.6-3.2 2.4-4.8 5.4-4.8 8.9z" transform="scale(1.35)" />
        <path d="M212.9 29.9l-40.6 93.3h-12.5l15.1-32.7-26.7-60.6h13.2l19.3 46.5h.3l18.7-46.5h13.2z" transform="scale(1.35)" />
      </g>
    </svg>
  );
}

export default function GooglePayButton({
  onClick,
  disabled,
  busy,
}: {
  onClick: () => void;
  disabled?: boolean;
  busy?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="Zaplatit přes Google Pay"
      className="flex min-h-[52px] items-center justify-center rounded-full bg-black px-6 py-3 hover:bg-neutral-900 disabled:opacity-60"
    >
      {busy ? (
        <span className="font-semibold text-white">Zpracovává se…</span>
      ) : (
        <GPayMark />
      )}
    </button>
  );
}
