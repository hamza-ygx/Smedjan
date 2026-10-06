type P = React.SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24" } as const;

export const Anvil = (p: P) => (
  <svg viewBox="0 0 64 64" {...p}>
    <defs>
      <linearGradient id="anvil-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffb054" />
        <stop offset="1" stopColor="#ff6a1f" />
      </linearGradient>
    </defs>
    <path d="M4 26H56V34H46C42 36 40 40 40 44L44 54H20L24 44C24 40 22 36 18 34C12 33 7 30 4 26Z" fill="url(#anvil-g)" />
    <circle cx="44" cy="16" r="3" fill="#ffb054" />
    <circle cx="36" cy="10" r="2" fill="#ffb054" />
    <circle cx="51" cy="9" r="1.6" fill="#ffb054" />
  </svg>
);
export const Hammer = (p: P) => (
  <svg {...base} {...p}><path d="m15 12-8.4 8.4a2.1 2.1 0 0 1-3-3L12 9" /><path d="M17.6 15 22 10.6" /><path d="m20.9 11.7-1.3-1.3c-.6-.6-.9-1.4-.9-2.2V7.1L16.2 4.6a5.6 5.6 0 0 0-4-1.6H9l.9.9a6.2 6.2 0 0 1 1.8 4.3V9l2 2h1.2c.8 0 1.5.3 2.1.9l1.3 1.3" /></svg>
);
export const Wand = (p: P) => (
  <svg {...base} {...p}><path d="m21.6 2.4-1.3 1.3" /><path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9h2" /><path d="M20 9h2" /><path d="M17.8 11.8 19 13" /><path d="M15 9h.01" /><path d="M17.8 6.2 19 5" /><path d="m3 21 9-9" /><path d="M12.2 6.2 11 5" /></svg>
);
export const Gear = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>
);
export const Expand = (p: P) => (
  <svg {...base} {...p}><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
);
export const Shrink = (p: P) => (
  <svg {...base} {...p}><path d="M4 14h6v6" /><path d="M20 10h-6V4" /><path d="M14 10l7-7" /><path d="M3 21l7-7" /></svg>
);
export const Code = (p: P) => (
  <svg {...base} {...p}><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></svg>
);
export const Download = (p: P) => (
  <svg {...base} {...p}><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></svg>
);
export const Stop = (p: P) => (
  <svg {...base} {...p}><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
);
export const Redo = (p: P) => (
  <svg {...base} {...p}><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /></svg>
);
export const Left = (p: P) => (
  <svg {...base} {...p}><path d="m15 18-6-6 6-6" /></svg>
);
export const Right = (p: P) => (
  <svg {...base} {...p}><path d="m9 18 6-6-6-6" /></svg>
);
export const Lock = (p: P) => (
  <svg {...base} {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
export const Logout = (p: P) => (
  <svg {...base} {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg>
);
