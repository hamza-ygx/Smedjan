export type SketchCategory = "Ekonomi" | "Vardag" | "Spel" | "Lägenheter";
export type SketchTab = "skisser" | "lagenheter";

export interface Sketch {
  id: string;
  title: string;
  category: SketchCategory;
  tab: SketchTab;
  /** Extra instruction sent along with the image. */
  brief?: string;
  /** Short facts shown on the card. */
  subtitle?: string;
}

const APARTMENT_BRIEF = `Det här är en handritad planritning av en lägenhet till salu. Bygg lägenheten som en interaktiv 3D-modell i ren HTML och CSS (CSS 3D-transforms, inga bibliotek, ingen canvas):
- Golvet som en platta och varje vägg som ett eget element, extruderat i rätt proportioner enligt planens skala i meter, med dörröppningar och fönster. Rumsnamn och yta ligger på golvet, och enkla möbler (säng, soffa, bord, kök, badkar) är låga block.
- Skriv golv, väggar och möbler som HTML-element direkt i markupen med inline-positioner, i ordningen golv → ytterväggar → innerväggar → möbler, så att lägenheten byggs upp vägg för vägg medan koden strömmar in. JavaScript lägger bara till interaktion.
- Dra för att rotera, scrolla eller använd knappar för att zooma, växla mellan 3D och 2D ovanifrån, och återställ vyn. Ett klick på ett rum markerar golvet och visar rummets namn och yta.
- Bredvid modellen: objektinformationen från skissen (område, rum, yta, pris, avgift, byggår och övrigt) och en månadskostnadskalkyl med reglage för kontantinsats (minst 15 %), ränta och amortering. Visa lån, räntekostnad, amortering, avgift och total kostnad per månad.`;

export const SKETCHES: Sketch[] = [
  { id: "faktura", title: "Fakturagenerator", category: "Ekonomi", tab: "skisser" },
  { id: "kpi", title: "KPI-dashboard", category: "Ekonomi", tab: "skisser" },
  { id: "utlagg", title: "Utläggsrapport", category: "Ekonomi", tab: "skisser" },
  { id: "moms", title: "Momskalkylator", category: "Ekonomi", tab: "skisser" },
  { id: "kafe", title: "Kafé Bönan", category: "Vardag", tab: "skisser" },
  { id: "bokning", title: "Boka möte", category: "Vardag", tab: "skisser" },
  { id: "todo", title: "Att göra", category: "Vardag", tab: "skisser" },
  { id: "luffarschack", title: "Luffarschack", category: "Spel", tab: "skisser" },
  { id: "memory", title: "Memory", category: "Spel", tab: "skisser" },
  { id: "quiz", title: "Ekonomiquiz", category: "Spel", tab: "skisser" },
  { id: "lgh-etta", title: "Etta · Vasastan", category: "Lägenheter", tab: "lagenheter", subtitle: "1 rok · 34 m² · 2 950 000 kr", brief: APARTMENT_BRIEF },
  { id: "lgh-tvaa", title: "Tvåa · Södermalm", category: "Lägenheter", tab: "lagenheter", subtitle: "2 rok · 56 m² · 4 450 000 kr", brief: APARTMENT_BRIEF },
  { id: "lgh-trea", title: "Trea · Kungsholmen", category: "Lägenheter", tab: "lagenheter", subtitle: "3 rok · 78 m² · 6 250 000 kr", brief: APARTMENT_BRIEF },
];

export const sketchImage = (id: string) => `/sketches/${id}.jpg`;
export const sketchReplay = (id: string) => `/replays/${id}.html`;

export const PROMPT_IDEAS = [
  "En lönekalkylator: bruttolön in, nettolön ut med skatt och arbetsgivaravgift",
  "En pomodoro-timer med stora siffror och en lugn animation",
  "Snake-spelet i retrostil, styrs med piltangenterna",
  "En valutaomvandlare SEK/EUR/USD med fejkade kurser",
  "En landningssida för en revisionsbyrå med kontaktformulär",
];
