// Canvas is 1400 x 1000. Element types are drawn by render-sketches.mjs.
// t: title | text | box | btn | input | line | note | bars | linechart
//    check | scribble | grid | x | o | img | pie | tabs | progress

export const sketches = [
  {
    id: "faktura",
    els: [
      { t: "title", x: 70, y: 105, text: "FAKTURA", size: 78 },
      { t: "text", x: 70, y: 160, text: "Från: Ditt Företag AB", size: 34 },
      { t: "input", x: 70, y: 185, w: 420, h: 60, placeholder: "Kund ▾" },
      { t: "text", x: 880, y: 55, text: "Fakturanr  2026-041", size: 32 },
      { t: "input", x: 880, y: 130, w: 220, h: 54, label: "Fakturadatum", placeholder: "6/10" },
      { t: "input", x: 1120, y: 130, w: 220, h: 54, label: "Förfaller", placeholder: "+30 dgr" },
      { t: "box", x: 70, y: 290, w: 1270, h: 66, fill: "#1f2a44", fillStyle: "hachure", gap: 12 },
      { t: "text", x: 100, y: 334, text: "Beskrivning", size: 36, bold: true },
      { t: "text", x: 720, y: 334, text: "Antal", size: 36, bold: true },
      { t: "text", x: 880, y: 334, text: "À-pris", size: 36, bold: true },
      { t: "text", x: 1120, y: 334, text: "Summa", size: 36, bold: true },
      { t: "line", x1: 70, y1: 430, x2: 1340, y2: 430 },
      { t: "line", x1: 70, y1: 505, x2: 1340, y2: 505 },
      { t: "line", x1: 70, y1: 580, x2: 1340, y2: 580 },
      { t: "text", x: 100, y: 405, text: "Bokslut 2025", size: 32 },
      { t: "text", x: 740, y: 405, text: "1", size: 32 },
      { t: "text", x: 880, y: 405, text: "18 500", size: 32 },
      { t: "text", x: 1120, y: 405, text: "18 500", size: 32 },
      { t: "text", x: 100, y: 480, text: "Löneadministration", size: 32 },
      { t: "text", x: 740, y: 480, text: "3", size: 32 },
      { t: "text", x: 880, y: 480, text: "1 200", size: 32 },
      { t: "text", x: 1120, y: 480, text: "3 600", size: 32 },
      { t: "scribble", x: 100, y: 548, w: 360 },
      { t: "scribble", x: 740, y: 548, w: 40 },
      { t: "scribble", x: 880, y: 548, w: 110 },
      { t: "btn", x: 70, y: 610, w: 260, h: 60, text: "+ Lägg till rad" },
      { t: "text", x: 880, y: 650, text: "Netto", size: 34 },
      { t: "text", x: 1150, y: 650, text: "22 100", size: 34 },
      { t: "text", x: 880, y: 705, text: "Moms 25%", size: 34 },
      { t: "text", x: 1150, y: 705, text: "5 525", size: 34 },
      { t: "line", x1: 870, y1: 730, x2: 1340, y2: 730 },
      { t: "text", x: 880, y: 790, text: "ATT BETALA", size: 46, bold: true },
      { t: "text", x: 1130, y: 790, text: "27 625 kr", size: 46, bold: true },
      { t: "box", x: 70, y: 860, w: 700, h: 90, dashed: true },
      { t: "text", x: 95, y: 915, text: "Bankgiro 123-4567   OCR 2026041", size: 32 },
      { t: "btn", x: 1040, y: 870, w: 300, h: 70, text: "Skriv ut / PDF", fill: "#e8590c" },
      { t: "note", x: 400, y: 790, text: "räknas ut automatiskt!", to: [870, 772] },
      { t: "note", x: 400, y: 655, text: "man kan ändra raderna", to: [560, 485] },
    ],
  },
  {
    id: "kpi",
    els: [
      { t: "title", x: 60, y: 95, text: "Månadsrapport", size: 70 },
      { t: "input", x: 1090, y: 45, w: 250, h: 60, placeholder: "September ▾" },
      ...[
        ["Omsättning", "1,24 MSEK", "↑ 8%"],
        ["Resultat", "312 tkr", "↑ 3%"],
        ["Likviditet", "1,8", "↓"],
        ["Kundfordr.", "486 tkr", "↑"],
      ].flatMap(([label, value, delta], i) => {
        const x = 60 + i * 325;
        return [
          { t: "box", x, y: 140, w: 295, h: 160 },
          { t: "text", x: x + 22, y: 188, text: label, size: 32 },
          { t: "text", x: x + 22, y: 255, text: value, size: 50, bold: true },
          { t: "text", x: x + 210, y: 255, text: delta, size: 32, color: i === 2 ? "#c8352b" : "#2b8a3e" },
        ];
      }),
      { t: "box", x: 60, y: 340, w: 780, h: 380 },
      { t: "text", x: 85, y: 385, text: "Omsättning per månad", size: 34 },
      { t: "linechart", x: 100, y: 410, w: 700, h: 280, values: [40, 52, 47, 60, 58, 72, 69, 80, 92] },
      { t: "box", x: 870, y: 340, w: 470, h: 380 },
      { t: "text", x: 895, y: 385, text: "Kostnader", size: 34 },
      { t: "bars", x: 910, y: 410, w: 400, h: 280, values: [80, 55, 40, 25, 15], horizontal: true },
      { t: "box", x: 60, y: 750, w: 1280, h: 200 },
      { t: "text", x: 85, y: 795, text: "Största kunder", size: 34 },
      { t: "scribble", x: 85, y: 840, w: 300 },
      { t: "scribble", x: 85, y: 880, w: 260 },
      { t: "scribble", x: 85, y: 920, w: 320 },
      { t: "scribble", x: 600, y: 840, w: 120 },
      { t: "scribble", x: 600, y: 880, w: 100 },
      { t: "scribble", x: 600, y: 920, w: 110 },
      { t: "note", x: 1010, y: 830, text: "grönt = över budget\nrött = under budget", noArrow: true },
      { t: "note", x: 760, y: 85, text: "byt månad", to: [1080, 75] },
    ],
  },
  {
    id: "utlagg",
    els: [
      { t: "title", x: 60, y: 100, text: "Mina utlägg", size: 74 },
      { t: "box", x: 60, y: 140, w: 1280, h: 230 },
      { t: "input", x: 90, y: 200, w: 220, h: 60, label: "Datum", placeholder: "2026-10-06" },
      { t: "input", x: 340, y: 200, w: 260, h: 60, label: "Kategori", placeholder: "Resa ▾" },
      { t: "input", x: 630, y: 200, w: 260, h: 60, label: "Belopp inkl. moms", placeholder: "kr" },
      { t: "box", x: 920, y: 175, w: 190, h: 120, dashed: true },
      { t: "text", x: 945, y: 245, text: "📎 Kvitto", size: 34 },
      { t: "input", x: 90, y: 300, w: 800, h: 50, placeholder: "Beskrivning…" },
      { t: "btn", x: 1140, y: 290, w: 180, h: 64, text: "Lägg till", fill: "#e8590c" },
      { t: "text", x: 60, y: 440, text: "Datum", size: 32, bold: true },
      { t: "text", x: 250, y: 440, text: "Kategori", size: 32, bold: true },
      { t: "text", x: 470, y: 440, text: "Beskrivning", size: 32, bold: true },
      { t: "text", x: 760, y: 440, text: "Belopp", size: 32, bold: true },
      ...[
        ["2/10", "Resa", "Tåg Sthlm–Gbg", "1 245"],
        ["3/10", "Mat", "Kundlunch", "860"],
        ["4/10", "Material", "Pärmar", "329"],
        ["5/10", "Resa", "Taxi", "412"],
      ].flatMap(([d, k, b, s], i) => {
        const y = 500 + i * 70;
        return [
          { t: "line", x1: 60, y1: y + 18, x2: 900, y2: y + 18, light: true },
          { t: "text", x: 60, y, text: d, size: 30 },
          { t: "text", x: 250, y, text: k, size: 30 },
          { t: "text", x: 470, y, text: b, size: 30 },
          { t: "text", x: 760, y, text: s, size: 30 },
        ];
      }),
      { t: "text", x: 470, y: 820, text: "Totalt:", size: 40, bold: true },
      { t: "text", x: 740, y: 820, text: "2 846 kr", size: 40, bold: true },
      { t: "text", x: 470, y: 870, text: "varav moms:", size: 32 },
      { t: "text", x: 760, y: 870, text: "≈ 470", size: 32 },
      { t: "pie", x: 1150, y: 600, d: 260, parts: [0.58, 0.3, 0.12] },
      { t: "text", x: 1050, y: 780, text: "per kategori", size: 32 },
      { t: "btn", x: 980, y: 860, w: 340, h: 70, text: "Skicka för attest" },
      { t: "note", x: 150, y: 960, text: "momsen räknas ut själv (25% / 12% / 6%)", to: [700, 870] },
    ],
  },
  {
    id: "moms",
    els: [
      { t: "title", x: 380, y: 110, text: "Momskalkylator", size: 84 },
      { t: "box", x: 300, y: 170, w: 800, h: 130 },
      { t: "text", x: 330, y: 260, text: "Belopp", size: 40 },
      { t: "text", x: 640, y: 268, text: "10 000", size: 72, bold: true },
      { t: "text", x: 1020, y: 260, text: "kr", size: 40 },
      { t: "tabs", x: 400, y: 340, w: 600, h: 70, items: ["exkl. moms", "inkl. moms"], active: 0 },
      { t: "btn", x: 380, y: 450, w: 190, h: 90, text: "25%", fill: "#e8590c", size: 48 },
      { t: "btn", x: 605, y: 450, w: 190, h: 90, text: "12%", size: 48 },
      { t: "btn", x: 830, y: 450, w: 190, h: 90, text: "6%", size: 48 },
      { t: "box", x: 300, y: 590, w: 800, h: 250 },
      { t: "text", x: 340, y: 660, text: "Netto", size: 40 },
      { t: "text", x: 830, y: 660, text: "10 000 kr", size: 40 },
      { t: "text", x: 340, y: 730, text: "Moms", size: 40 },
      { t: "text", x: 830, y: 730, text: "2 500 kr", size: 40 },
      { t: "line", x1: 330, y1: 755, x2: 1070, y2: 755 },
      { t: "text", x: 340, y: 815, text: "Totalt", size: 50, bold: true },
      { t: "text", x: 780, y: 815, text: "12 500 kr", size: 50, bold: true },
      { t: "note", x: 1130, y: 150, text: "STORA siffror!", to: [960, 230] },
      { t: "note", x: 40, y: 380, text: "uppdateras direkt\nnär man skriver", to: [330, 285] },
      { t: "note", x: 1110, y: 520, text: "matmoms 12%,\nböcker 6%", to: [1020, 495] },
      { t: "note", x: 380, y: 930, text: "knapp: kopiera resultat", to: [700, 845] },
    ],
  },
  {
    id: "kafe",
    els: [
      { t: "title", x: 70, y: 85, text: "☕ Kafé Bönan", size: 60 },
      { t: "text", x: 850, y: 80, text: "Meny     Om oss     Hitta hit", size: 36 },
      { t: "line", x1: 50, y1: 115, x2: 1350, y2: 115 },
      { t: "img", x: 70, y: 145, w: 1260, h: 360 },
      { t: "box", x: 130, y: 210, w: 640, h: 230, fill: "#f8f5ee", fillStyle: "solid" },
      { t: "text", x: 160, y: 300, text: "Nyrostat varje morgon", size: 62, bold: true },
      { t: "scribble", x: 160, y: 345, w: 480 },
      { t: "btn", x: 160, y: 370, w: 220, h: 56, text: "Se menyn", fill: "#e8590c" },
      { t: "text", x: 70, y: 575, text: "Populärt just nu", size: 44, bold: true },
      ...[
        ["Cappuccino", "42 kr"],
        ["Kanelbulle", "35 kr"],
        ["Dagens lunch", "129 kr"],
      ].flatMap(([n, p], i) => {
        const x = 70 + i * 430;
        return [
          { t: "box", x, y: 600, w: 400, h: 250 },
          { t: "img", x: x + 20, y: 620, w: 360, h: 120 },
          { t: "text", x: x + 25, y: 790, text: n, size: 38 },
          { t: "text", x: x + 270, y: 790, text: p, size: 38, bold: true },
          { t: "scribble", x: x + 25, y: 828, w: 220 },
        ];
      }),
      { t: "line", x1: 50, y1: 885, x2: 1350, y2: 885 },
      { t: "text", x: 70, y: 935, text: "Mån–fre 7–18 · Lör–sön 9–16 · Storgatan 12", size: 32 },
      { t: "note", x: 900, y: 270, text: "varma färger,\nmysig känsla", to: [770, 300] },
    ],
  },
  {
    id: "bokning",
    els: [
      { t: "title", x: 60, y: 100, text: "Boka ett möte", size: 74 },
      { t: "text", x: 60, y: 155, text: "Bokslutsgenomgång · 45 min", size: 34 },
      { t: "box", x: 60, y: 190, w: 620, h: 620 },
      { t: "text", x: 230, y: 245, text: "‹   Oktober   ›", size: 40 },
      { t: "grid", x: 100, y: 300, cols: 7, rows: 5, cw: 80, ch: 95, days: { offset: 3, count: 31, selected: 14, busy: [6, 7, 21] } },
      { t: "text", x: 740, y: 245, text: "Lediga tider", size: 40, bold: true },
      ...["09:00", "10:00", "11:00", "13:00", "14:00", "15:30"].map((tm, i) => ({
        t: "btn",
        x: 740 + (i % 3) * 200,
        y: 275 + Math.floor(i / 3) * 90,
        w: 180,
        h: 68,
        text: tm,
        fill: i === 3 ? "#e8590c" : undefined,
        disabled: i === 1,
      })),
      { t: "input", x: 740, y: 500, w: 580, h: 60, label: "Namn", placeholder: "" },
      { t: "input", x: 740, y: 610, w: 580, h: 60, label: "E-post", placeholder: "" },
      { t: "btn", x: 740, y: 720, w: 580, h: 80, text: "Bekräfta bokning", fill: "#e8590c", size: 42 },
      { t: "note", x: 1000, y: 120, text: "upptagna tider grå", to: [950, 330] },
      { t: "note", x: 700, y: 900, text: "visa en bekräftelse efteråt ✓", to: [1000, 805] },
      { t: "note", x: 60, y: 900, text: "helger går inte att välja", to: [500, 770] },
    ],
  },
  {
    id: "todo",
    els: [
      { t: "title", x: 360, y: 110, text: "Att göra idag", size: 84 },
      { t: "input", x: 360, y: 160, w: 560, h: 70, placeholder: "Ny uppgift…" },
      { t: "btn", x: 940, y: 160, w: 100, h: 70, text: "+", fill: "#e8590c", size: 56 },
      { t: "tabs", x: 360, y: 265, w: 680, h: 60, items: ["Alla", "Aktiva", "Klara"], active: 0 },
      ...[
        ["Bokslut Andersson AB", true],
        ["Ring Skatteverket", false],
        ["Momsdeklaration Q3", false],
        ["Skicka fakturor", true],
        ["Fika 15:00 ☕", false],
      ].map(([text, checked], i) => ({ t: "check", x: 380, y: 380 + i * 95, text, checked, size: 42 })),
      { t: "line", x1: 360, y1: 860, x2: 1040, y2: 860 },
      { t: "text", x: 380, y: 910, text: "3 kvar", size: 36 },
      { t: "text", x: 800, y: 910, text: "Rensa klara", size: 36 },
      { t: "note", x: 1080, y: 420, text: "överstruket\nnär klar", to: [800, 390] },
      { t: "note", x: 60, y: 600, text: "ta bort med ✕\nnär man hovrar", to: [370, 570] },
    ],
  },
  {
    id: "luffarschack",
    els: [
      { t: "title", x: 450, y: 110, text: "Luffarschack", size: 84 },
      { t: "text", x: 560, y: 175, text: "Tur:  X", size: 50 },
      { t: "grid", x: 450, y: 210, cols: 3, rows: 3, cw: 170, ch: 170, open: true },
      { t: "x", x: 535, y: 295, s: 100 },
      { t: "o", x: 705, y: 465, s: 110 },
      { t: "x", x: 875, y: 295, s: 100 },
      { t: "o", x: 535, y: 635, s: 110 },
      { t: "x", x: 705, y: 295, s: 100 },
      { t: "line", x1: 470, y1: 295, x2: 940, y2: 295, color: "#c8352b", strokeWidth: 6 },
      { t: "text", x: 450, y: 800, text: "X: 2    O: 1    Oavgjort: 0", size: 42 },
      { t: "btn", x: 530, y: 840, w: 350, h: 80, text: "Ny omgång", fill: "#e8590c", size: 44 },
      { t: "note", x: 1020, y: 230, text: "visa vinnarlinjen!", to: [920, 285] },
      { t: "note", x: 60, y: 420, text: "spela mot\ndatorn?", to: [430, 470] },
    ],
  },
  {
    id: "memory",
    els: [
      { t: "title", x: 450, y: 100, text: "Memory", size: 84 },
      { t: "text", x: 380, y: 165, text: "Drag: 12        Tid: 0:45", size: 42 },
      ...Array.from({ length: 16 }, (_, i) => {
        const x = 380 + (i % 4) * 165;
        const y = 200 + Math.floor(i / 4) * 165;
        const face = { 1: "💰", 6: "📊", 9: "💰", 14: "🧾" }[i];
        return face
          ? [{ t: "box", x, y, w: 145, h: 145 }, { t: "text", x: x + 32, y: y + 100, text: face, size: 72, emoji: true }]
          : [{ t: "box", x, y, w: 145, h: 145, fill: "#e8590c", fillStyle: "hachure", gap: 10 }];
      }).flat(),
      { t: "btn", x: 530, y: 880, w: 320, h: 75, text: "Starta om", size: 44 },
      { t: "note", x: 1090, y: 260, text: "korten vänds\nmed 3D-animation", to: [1010, 300] },
      { t: "note", x: 60, y: 520, text: "par = stannar\nuppe + glöd", to: [370, 300] },
      { t: "note", x: 1060, y: 760, text: "vinst → konfetti 🎉", to: [1000, 700] },
    ],
  },
  {
    id: "quiz",
    els: [
      { t: "title", x: 460, y: 100, text: "Ekonomiquiz", size: 84 },
      { t: "text", x: 220, y: 175, text: "Fråga 3 / 10", size: 38 },
      { t: "progress", x: 220, y: 195, w: 960, h: 36, value: 0.3 },
      { t: "text", x: 1060, y: 175, text: "Poäng: 2", size: 38 },
      { t: "box", x: 220, y: 270, w: 960, h: 170 },
      { t: "text", x: 260, y: 370, text: "Vad är normal momssats i Sverige?", size: 54, bold: true },
      { t: "btn", x: 220, y: 480, w: 465, h: 110, text: "A   6 %", size: 46 },
      { t: "btn", x: 715, y: 480, w: 465, h: 110, text: "B   12 %", size: 46 },
      { t: "btn", x: 220, y: 620, w: 465, h: 110, text: "C   25 %", size: 46, fill: "#2b8a3e" },
      { t: "btn", x: 715, y: 620, w: 465, h: 110, text: "D   30 %", size: 46 },
      { t: "btn", x: 930, y: 790, w: 250, h: 75, text: "Nästa →", fill: "#e8590c", size: 42 },
      { t: "note", x: 220, y: 830, text: "grönt om rätt, rött om fel", to: [440, 735] },
      { t: "note", x: 260, y: 950, text: "slutskärm med poäng + 🏆", to: [920, 830] },
      { t: "note", x: 1200, y: 560, text: "10 frågor\nom moms,\nskatt &\nbokföring", to: [1185, 420] },
    ],
  },
];

// ---------- Apartment floor plans (coordinates in metres) ----------
function apartment(a) {
  const { S, ox, oy } = a;
  const X = (m) => ox + m * S;
  const Y = (m) => oy + m * S;
  const els = [];
  for (const [x1, y1, x2, y2, thin] of a.walls) els.push({ t: "wall", x1: X(x1), y1: Y(y1), x2: X(x2), y2: Y(y2), thin });
  for (const [x1, y1, x2, y2] of a.windows) els.push({ t: "win", x1: X(x1), y1: Y(y1), x2: X(x2), y2: Y(y2) });
  for (const [x1, y1, x2, y2] of a.openings || []) els.push({ t: "gap", x1: X(x1), y1: Y(y1), x2: X(x2), y2: Y(y2) });
  for (const d of a.doors) els.push({ t: "door", x: X(d.x), y: Y(d.y), r: d.r * S, a: d.a, s: d.s });
  for (const f of a.furniture) {
    if (f.c) els.push({ t: "circle", x: X(f.x), y: Y(f.y), d: f.d * S, fill: f.fill, gap: 9, sw: 1.8 });
    else if (f.e) els.push({ t: "ellipse", x: X(f.x), y: Y(f.y), w: f.w * S, h: f.h * S });
    else els.push({ t: "box", x: X(f.x), y: Y(f.y), w: f.w * S, h: f.h * S, fill: f.fill, gap: f.gap || 10, dashed: f.dashed });
  }
  for (const r of a.rooms) els.push({ t: "room", x: X(r.x), y: Y(r.y), name: r.name, area: r.area, size: r.size || 32 });
  els.push({ t: "scale", x: ox, y: a.scaleY, px: S, n: 3 });
  els.push({ t: "title", x: 70, y: 95, text: a.title, size: 64 });
  els.push({ t: "text", x: 72, y: 150, text: a.subtitle, size: 34 });
  a.info.forEach((line, i) => els.push({ t: "text", x: 1010, y: 300 + i * 54, text: line, size: i ? 34 : 38, bold: i === 0 }));
  els.push({ t: "line", x1: 1000, y1: 250, x2: 1360, y2: 250, light: true });
  els.push({ t: "compass", x: 1290, y: 130, rot: a.compassRot || 0 });
  return [...els, ...a.notes];
}

const ink = "#1f2a44";
const wood = "#a0522d";

sketches.push(
  {
    id: "lgh-etta",
    els: apartment({
      S: 110, ox: 110, oy: 250, scaleY: 900,
      title: "Etta · Vasastan",
      subtitle: "1 rok · 34 m² · 3 tr · hiss",
      walls: [[0, 0, 7, 0], [7, 0, 7, 5], [7, 5, 0, 5], [0, 5, 0, 0], [0, 3.2, 7, 3.2, 1], [2.4, 3.2, 2.4, 5, 1], [5.2, 3.2, 5.2, 5, 1]],
      windows: [[0.9, 0, 2.3, 0], [4.3, 0, 5.7, 0], [7, 0.8, 7, 2.2]],
      openings: [[3.0, 3.2, 4.1, 3.2]],
      doors: [{ x: 3.5, y: 5, r: 0.9, a: 0, s: -1 }, { x: 2.4, y: 3.55, r: 0.8, a: 90, s: 1 }, { x: 5.2, y: 3.55, r: 0.8, a: 90, s: -1 }],
      furniture: [
        { x: 0.05, y: 0.35, w: 0.6, h: 2.5, fill: ink, gap: 7 },
        { c: 1, x: 1.75, y: 1.9, d: 0.9 },
        { x: 2.9, y: 2.15, w: 2.0, h: 0.8, fill: wood },
        { x: 5.25, y: 0.15, w: 1.6, h: 2.05 },
        { x: 5.35, y: 0.25, w: 0.6, h: 0.35 },
        { x: 6.15, y: 0.25, w: 0.6, h: 0.35 },
        { x: 0.1, y: 3.35, w: 0.75, h: 1.5 },
        { e: 1, x: 1.95, y: 4.55, w: 0.45, h: 0.6 },
      ],
      rooms: [
        { x: 3.6, y: 1.15, name: "Rum & kök", area: "22 m²" },
        { x: 1.65, y: 3.95, name: "Bad", area: "4 m²", size: 28 },
        { x: 3.8, y: 4.05, name: "Hall", area: "5 m²", size: 28 },
        { x: 6.1, y: 4.05, name: "Klk", area: "3 m²", size: 28 },
      ],
      info: ["Pris 2 950 000 kr", "Avgift 2 140 kr/mån", "Byggår 1912", "Fransk balkong"],
      notes: [
        { t: "note", x: 1000, y: 580, text: "visa lägenheten\ni 3D – rotera!", to: [880, 450] },
        { t: "note", x: 1000, y: 800, text: "räkna ut vad den\nkostar per månad", noArrow: true },
      ],
    }),
  },
  {
    id: "lgh-tvaa",
    els: apartment({
      S: 82, ox: 120, oy: 300, scaleY: 945, compassRot: 180,
      title: "Tvåa · Södermalm",
      subtitle: "2 rok · 56 m² · balkong i söderläge",
      walls: [[0, 0, 8, 0], [8, 0, 8, 7], [8, 7, 0, 7], [0, 7, 0, 0], [4.8, 0, 4.8, 4.2, 1], [0, 4.2, 8, 4.2, 1], [3.4, 4.2, 3.4, 7, 1], [5.8, 4.2, 5.8, 7, 1]],
      windows: [[0.5, 0, 1.9, 0], [5.6, 0, 7.2, 0], [0, 5.0, 0, 6.4], [8, 1.2, 8, 2.8]],
      openings: [[3.4, 4.9, 3.4, 6.1]],
      doors: [
        { x: 2.5, y: 0, r: 0.85, a: 0, s: -1 },
        { x: 4.2, y: 7, r: 0.9, a: 0, s: -1 },
        { x: 3.6, y: 4.2, r: 0.8, a: 0, s: -1 },
        { x: 5.0, y: 4.2, r: 0.75, a: 0, s: -1 },
        { x: 5.8, y: 5.0, r: 0.75, a: 90, s: -1 },
      ],
      furniture: [
        { x: 0.6, y: -1.35, w: 3.0, h: 1.35, dashed: true },
        { x: 0.35, y: 3.2, w: 2.4, h: 0.85, fill: wood },
        { x: 1.0, y: 2.0, w: 1.1, h: 0.6 },
        { x: 5.5, y: 0.35, w: 1.8, h: 2.05 },
        { x: 5.65, y: 0.45, w: 0.65, h: 0.35 },
        { x: 6.5, y: 0.45, w: 0.65, h: 0.35 },
        { x: 0.05, y: 4.35, w: 0.6, h: 2.5, fill: ink, gap: 7 },
        { c: 1, x: 2.1, y: 5.7, d: 1.0 },
        { x: 7.0, y: 4.4, w: 0.9, h: 0.9 },
        { e: 1, x: 6.3, y: 6.5, w: 0.45, h: 0.6 },
      ],
      rooms: [
        { x: 2.4, y: 1.0, name: "Vardagsrum", area: "20 m²" },
        { x: 6.4, y: 3.1, name: "Sovrum", area: "13 m²" },
        { x: 1.9, y: 5.0, name: "Kök", area: "9,5 m²", size: 30 },
        { x: 4.6, y: 6.0, name: "Hall", area: "6,5 m²", size: 28 },
        { x: 6.9, y: 5.9, name: "Bad", area: "6 m²", size: 28 },
        { x: 2.1, y: -0.75, name: "Balkong", area: "4 m²", size: 26 },
      ],
      info: ["Pris 4 450 000 kr", "Avgift 3 120 kr/mån", "Byggår 1938", "Balkong · Hiss"],
      notes: [
        { t: "note", x: 1000, y: 580, text: "klicka på ett rum\n→ visa yta", to: [720, 500] },
        { t: "note", x: 560, y: 175, text: "sol hela eftermiddagen ☀", to: [440, 230] },
        { t: "note", x: 1000, y: 800, text: "månadskostnad:\nlån + avgift", noArrow: true },
      ],
    }),
  },
  {
    id: "lgh-trea",
    els: apartment({
      S: 76, ox: 100, oy: 330, scaleY: 945,
      title: "Trea · Kungsholmen",
      subtitle: "3 rok · 78 m² · barnvänligt",
      walls: [
        [0, 0, 10, 0], [10, 0, 10, 7.8], [10, 7.8, 0, 7.8], [0, 7.8, 0, 0],
        [5.0, 0, 5.0, 4.4, 1], [7.4, 0, 7.4, 4.4, 1], [0, 4.4, 10, 4.4, 1],
        [4.0, 4.4, 4.0, 7.8, 1], [8.2, 4.4, 8.2, 7.8, 1], [6.4, 6.4, 6.4, 7.8, 1], [6.4, 6.4, 8.2, 6.4, 1],
      ],
      windows: [[0.6, 0, 2.6, 0], [5.6, 0, 6.8, 0], [8.0, 0, 9.4, 0], [0, 5.2, 0, 6.8], [10, 5.4, 10, 6.6]],
      openings: [[4.0, 5.0, 4.0, 6.4], [6.8, 6.4, 7.6, 6.4]],
      doors: [
        { x: 3.2, y: 0, r: 0.85, a: 0, s: -1 },
        { x: 5.0, y: 7.8, r: 0.9, a: 0, s: -1 },
        { x: 4.2, y: 4.4, r: 0.75, a: 0, s: -1 },
        { x: 5.4, y: 4.4, r: 0.75, a: 0, s: -1 },
        { x: 7.5, y: 4.4, r: 0.7, a: 0, s: -1 },
        { x: 8.2, y: 5.1, r: 0.75, a: 90, s: -1 },
      ],
      furniture: [
        { x: 0.6, y: -1.4, w: 3.6, h: 1.4, dashed: true },
        { x: 0.4, y: 3.4, w: 2.6, h: 0.85, fill: wood },
        { c: 1, x: 3.9, y: 2.2, d: 0.8 },
        { x: 5.5, y: 0.35, w: 1.7, h: 2.05 },
        { x: 5.62, y: 0.45, w: 0.62, h: 0.35 },
        { x: 6.45, y: 0.45, w: 0.62, h: 0.35 },
        { x: 9.0, y: 0.35, w: 0.9, h: 2.0 },
        { x: 7.6, y: 0.1, w: 1.1, h: 0.6, fill: wood, gap: 12 },
        { x: 0.3, y: 7.2, w: 3.5, h: 0.6, fill: ink, gap: 7 },
        { x: 1.2, y: 5.4, w: 1.7, h: 1.0, fill: wood, gap: 14 },
        { x: 8.35, y: 6.7, w: 0.75, h: 1.0 },
        { e: 1, x: 9.5, y: 4.95, w: 0.45, h: 0.6 },
      ],
      rooms: [
        { x: 2.3, y: 1.3, name: "Vardagsrum", area: "22 m²" },
        { x: 6.2, y: 3.3, name: "Sovrum", area: "10,5 m²", size: 28 },
        { x: 8.7, y: 3.3, name: "Sovrum", area: "11,5 m²", size: 28 },
        { x: 2.0, y: 4.95, name: "Kök", area: "13,5 m²", size: 30 },
        { x: 5.2, y: 5.6, name: "Hall", area: "12 m²", size: 28 },
        { x: 7.3, y: 7.25, name: "Klk", area: "", size: 24 },
        { x: 9.1, y: 6.05, name: "Bad", area: "6 m²", size: 28 },
        { x: 2.4, y: -0.75, name: "Balkong", area: "5 m²", size: 26 },
      ],
      info: ["Pris 6 250 000 kr", "Avgift 4 380 kr/mån", "Byggår 1931", "Balkong · Hiss · Förråd"],
      notes: [
        { t: "note", x: 1000, y: 590, text: "3D med möbler,\nska gå att snurra!", to: [870, 500] },
        { t: "note", x: 620, y: 200, text: "två sovrum – barnfamilj", to: [700, 330] },
        { t: "note", x: 1000, y: 800, text: "kalkyl: lån + avgift\n= kostnad per månad", noArrow: true },
      ],
    }),
  },
);
