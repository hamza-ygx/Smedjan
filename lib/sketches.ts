export type SketchCategory = "Lägenheter";

export interface Sketch {
  id: string;
  title: string;
  category: SketchCategory;
  /** Extra instruction sent along with the image. */
  brief?: string;
  /** Short facts shown on the card. */
  subtitle?: string;
}

const APARTMENT_BRIEF = `Det här är en handritad planritning av en bostad till salu. Bygg bostaden som en imponerande, interaktiv 3D-modell i ren HTML och CSS (CSS 3D-transforms, inga bibliotek, ingen canvas eller WebGL).

Modellen
- Golv, väggar och möbler i rätt proportioner enligt planens skala i meter. Väggarna är ca 2,6 m höga med synlig tjocklek, och dörröppningar och fönster har glas.
- Riktig djupkänsla:
  - Ett tydligt perspektiv.
  - En ljuskälla, så att väggarnas och möblernas sidor får olika ljushet.
  - Mjuka skuggor på golvet.
  - Golvmaterial: trä i rummen, klinker i badrum, och däck, gräs eller sten ute.
- Möblerna är riktiga 3D-block med höjd: sängar med kuddar, soffor med ryggstöd, bord, köksbänkar med överskåp och växter.
- Allt utomhus som finns i planen byggs också:
  - Pool som en nedsänkt vattenyta med kakelkant och skimrande vatten (CSS-animation).
  - Bubbelpool eller badtunna som bubblar.
  - Trädäck, gräs, träd och buskar, solstolar, brygga, bastu och räcken.
- Rumsnamn och yta ligger på golvet.
- Skriv golv, väggar och möbler som HTML-element direkt i markupen med inline-positioner, i ordningen mark och golv → ytterväggar → innerväggar → möbler och utemiljö. Då byggs bostaden upp bit för bit medan koden strömmar in. JavaScript lägger bara till interaktion.

Layout och interaktion
- 3D-modellen är huvudsaken och tar upp minst 70 % av bredden och hela höjden. Objektinformation och kalkyl ligger i en smal panel (ca 340 px) vid sidan.
- Startvyn är snett ovanifrån och visar hela bostaden. Modellen roterar långsamt av sig själv tills användaren rör den.
- Dra för att rotera. Zooma med scroll eller knappar. Växla mellan 3D och 2D ovanifrån, och återställ vyn.
- Väggar som skymmer sänks automatiskt mot kameran.
- Ett klick på ett rum markerar det och visar namn och yta.
- Panelen visar objektinformationen från skissen och en månadskostnadskalkyl med reglage för kontantinsats (minst 15 %), ränta och amortering. Kalkylen visar lån, räntekostnad, amortering, avgift eller driftkostnad och total kostnad per månad.`;

export const SKETCHES: Sketch[] = [
  { id: "lgh-etta", title: "Etta · Vasastan", category: "Lägenheter", subtitle: "1 rok · 34 m²\n2 950 000 kr", brief: APARTMENT_BRIEF },
  { id: "lgh-tvaa", title: "Tvåa · Södermalm", category: "Lägenheter", subtitle: "2 rok · 56 m²\n4 450 000 kr", brief: APARTMENT_BRIEF },
  { id: "lgh-trea", title: "Trea · Kungsholmen", category: "Lägenheter", subtitle: "3 rok · 78 m²\n6 250 000 kr", brief: APARTMENT_BRIEF },
  { id: "lgh-villa", title: "Villa · Djursholm", category: "Lägenheter", subtitle: "Pool & altan\n14 750 000 kr", brief: APARTMENT_BRIEF },
  { id: "lgh-takvaning", title: "Takvåning · Östermalm", category: "Lägenheter", subtitle: "Jacuzzi på taket\n18 900 000 kr", brief: APARTMENT_BRIEF },
  { id: "lgh-sjostuga", title: "Sjöstuga · Värmdö", category: "Lägenheter", subtitle: "Bastu & brygga\n6 900 000 kr", brief: APARTMENT_BRIEF },
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
