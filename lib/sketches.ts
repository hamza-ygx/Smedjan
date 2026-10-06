export type SketchCategory = "Ekonomi" | "Vardag" | "Spel";

export interface Sketch {
  id: string;
  title: string;
  category: SketchCategory;
}

export const SKETCHES: Sketch[] = [
  { id: "faktura", title: "Fakturagenerator", category: "Ekonomi" },
  { id: "kpi", title: "KPI-dashboard", category: "Ekonomi" },
  { id: "utlagg", title: "Utläggsrapport", category: "Ekonomi" },
  { id: "moms", title: "Momskalkylator", category: "Ekonomi" },
  { id: "kafe", title: "Kafé Bönan", category: "Vardag" },
  { id: "bokning", title: "Boka möte", category: "Vardag" },
  { id: "todo", title: "Att göra", category: "Vardag" },
  { id: "luffarschack", title: "Luffarschack", category: "Spel" },
  { id: "memory", title: "Memory", category: "Spel" },
  { id: "quiz", title: "Ekonomiquiz", category: "Spel" },
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
