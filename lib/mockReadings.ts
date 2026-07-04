// MOCK: replace with production (vlastní AI model na AWS)
// Ukázkové výklady z kapitoly 9.2 doslovně + generátor variací ve stejném tónu.
// Zákaz predikcí („vrátí se ti") platí i pro mock texty. Žádné dlouhé pomlčky.
import { CARD_BY_ID } from "./cards";
import { SpreadKey } from "./spreads";

type PickedCard = { cardId: string; name: string; reversed: boolean; position: string };

const SAMPLE_BETWEEN_US =
  "Ty cítíš hluboké emoční propojení, jsi v poháru až po okraj. On je ale Rytíř pentaklů: stabilní, ale pomalý, řeší praktické věci místo pocitů. Vaše My je přesto Slunce, mezi vámi je opravdové světlo. Problém není láska, ale jazyk, kterým ji vyjadřujete. Zkus mu příště říct, co potřebuješ, ne co cítíš.";

const SAMPLE_MY_EX =
  "Nevyřčená zůstala tvoje vlastní síla. Cítila ses vedle něj malá. Věž říká, že rozchod byl nevyhnutelný, zhroutilo se to, co stálo na nejistých základech. Drží tě Trojka mečů, bolest, kterou se bojíš nechat odejít. Pustit musíš Osmičku pohárů, představu, že kdybys vydržela déle, bylo by to jiné. Lekce je Poustevník: vrátit se k sobě, ne k němu. A co tě čeká? Hvězda. Naděje, která přichází, když uvolníš místo. Dnes večer zkus napsat na papír jednu větu, kterou jsi mu nikdy neřekla. Nemusíš ji posílat.";

const SAMPLE_YESNO =
  "Karty teď ukazují spíš ne. Cítíš, že oddaluješ nevyhnutelné. Chceš kontakt, protože se bojíš ticha, ne protože ho potřebuješ. Zkus vydržet 7 dní. Pokud budeš chtít napsat i potom, piš s klidem, ne z úzkosti.";

const SAMPLE_DAILY_SLUNCE =
  "Dnes se ti otevírá prostor pro radost. Po několika těžkých dnech přichází jasnost. Neutíkej před světlem, dovol si ho prožít. Malý úkol: zavolej dnes někomu, s kým se směješ.";

// Krátké významové fragmenty pro generování variací (tón: klid, reflexe, žádné predikce)
const FRAGMENTS: Record<string, { up: string; rev: string }> = {
  default: {
    up: "nese energii, která ti teď chce něco ukázat",
    rev: "obrácená naznačuje, že se něco uvnitř tebe zadrhlo a chce pozornost",
  },
};

function fragmentFor(card: PickedCard): string {
  const c = CARD_BY_ID[card.cardId];
  const base = FRAGMENTS[card.cardId] ?? FRAGMENTS.default;
  const frag = card.reversed ? base.rev : base.up;
  return `${c?.name ?? card.name}${card.reversed ? " (obráceně)" : ""} v pozici ${card.position}: ${frag}.`;
}

function matches(cards: PickedCard[], ids: string[]): boolean {
  return (
    cards.length === ids.length &&
    cards.every((c, i) => c.cardId === ids[i])
  );
}

export function mockReading(
  spread: SpreadKey,
  question: string,
  cards: PickedCard[]
): string {
  // Přesné ukázky pro referenční kombinace
  if (spread === "between_us" && matches(cards, ["dvojka-pohary", "rytir-pentakly", "slunce"])) {
    return SAMPLE_BETWEEN_US;
  }
  if (
    spread === "my_ex" &&
    matches(cards, ["mag", "vez", "trojka-mece", "osmicka-pohary", "poustevnik", "hvezda"])
  ) {
    return SAMPLE_MY_EX;
  }
  if (spread === "yesno" && cards[0]?.cardId === "vez" && cards[0]?.reversed) {
    return SAMPLE_YESNO;
  }
  if (spread === "daily" && cards[0]?.cardId === "slunce") {
    return SAMPLE_DAILY_SLUNCE;
  }

  // Variace ve stejném tónu pro ostatní kombinace
  if (spread === "yesno") {
    const c = cards[0];
    const lean = c.reversed ? "spíš ne" : "spíš ano";
    return `Karty teď ukazují ${lean}. ${c.name}${c.reversed ? " obráceně" : ""} mluví hlavně o tom, co se děje v tobě, ne o tom, co udělá on. Než se rozhodneš, dej si chvíli ticha a zeptej se sama sebe, co od odpovědi vlastně čekáš. Rozhodnutí, které uděláš v klidu, bývá to pravé.`;
  }

  if (spread === "daily") {
    const c = cards[0];
    return `Dnešní karta je ${c.name}${c.reversed ? ", obráceně" : ""}. ${fragmentFor(cards[0])} Vezmi si z dneška jednu malou věc: všimni si, kdy se cítíš nejvíc sama sebou, a u toho chvíli zůstaň.`;
  }

  if (spread === "my_ex") {
    const lines = cards.map(fragmentFor).join(" ");
    return `Tenhle rozklad mluví o tom, co mezi vámi zůstalo, a hlavně o tom, co z toho ještě nosíš v sobě. ${lines} Nejde o to vrátit se zpátky, ale pochopit, co sis odnesla. Dnes večer si zkus napsat jednu větu o tom, co už nechceš nést dál. Jen pro sebe.`;
  }

  // between_us
  const lines = cards.map(fragmentFor).join(" ");
  return `Podívejme se, jak to mezi vámi teď vypadá. ${lines} Karty nemluví o tom, co se stane, ale o tom, co se děje teď. A teď je mezi vámi prostor, se kterým se dá pracovat. Zkus dnes udělat jednu malou věc jinak než obvykle a sleduj, co se změní.`;
}
