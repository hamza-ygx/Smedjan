# Smedjan

Live stage demo: pick a hand-drawn sketch (or type an idea) and a working app is forged in front of the audience. Claude reads the sketch and streams a self-contained HTML app, and the browser renders it progressively as the code arrives.

- **Bostäder (the whole show):** six hand-drawn floor plans: etta, tvåa, trea, a villa with a pool, a penthouse with a roof-terrace jacuzzi, and a lake cabin with a sauna and jetty. A scanner beam first sweeps the whole drawing down and back up (~3.4 s). Click one and it becomes an interactive 3D model, built wall by wall as the code streams, with rotate/zoom, click-a-room for its area, and a monthly cost calculator (loan + fee).
- **Input:** the three apartments, free-text ideas, or any image you drop/paste (the last two need an API key).
- **Output:** a polished, interactive Swedish web app, built live in a sandboxed preview.
- **Follow-ups:** "gör den mörk", "lägg till ett diagram". Each edit rebuilds from the current version, with version history (← →).
- **Safety net:** every sketch has a cached build. In *Auto* mode, if the API is slow, errors, or the network dies, the cached build replays silently at the same pace. A tiny dot in the status pill tells you which happened (green = live, amber = replay).

## Speed

Replays push the invisible `<head>`/CSS through 8× faster and stream the visible page at 3 200 chars/s (adjustable in settings), so an apartment builds in about 6–8 s. Live builds depend on the model; set `SMEDJAN_FAST=1` for fast mode (≈2.5× faster output, premium price).

## Without an API key

Smedjan runs fine with no `ANTHROPIC_API_KEY`: it locks to the cached replays, so all 6 homes still build in front of the audience. Free text, image drop and edits are hidden, and the settings panel says why. The API route refuses live calls, so nothing can spend credit. Add `ANTHROPIC_API_KEY` **and** `APP_PASSCODE` in Vercel and redeploy to switch live mode on. The passcode gate also turns on then.

## Run locally

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY and APP_PASSCODE
npm run dev                  # http://localhost:3000
```

Without `APP_PASSCODE` the app runs ungated in dev. In production, live builds are refused until it's set.

## Deploy to Vercel

1. Import the repo in Vercel (framework preset: Next.js, no build config needed).
2. Project → Settings → Environment Variables:
   | Variable | Required | Notes |
   |---|---|---|
   | `ANTHROPIC_API_KEY` | yes | Server-side only, never sent to the browser |
   | `APP_PASSCODE` | yes | Use a passphrase (8+ chars), not a 4-digit PIN; the URL is public |
   | `SESSION_SECRET` | no | Separate cookie-signing secret; changing it logs everyone out |
   | `SMEDJAN_MODEL` | no | Default `claude-opus-5-5` |
   | `SMEDJAN_EFFORT` | no | `low` (default, fastest start), `medium`, `high` |
   | `SMEDJAN_FAST` | no | `1` = fast mode (research preview, ~2.5× faster output, premium price) |
3. Deploy. Builds stream for up to 300 s per request (`maxDuration`).

## Record the real fallbacks (do this before the event)

`public/replays/*.html` ship with hand-authored builds so the fallback works out of the box. Replace them with genuine Claude builds so the fallback is indistinguishable from live:

```bash
ANTHROPIC_API_KEY=sk-ant-... npm run record -- --force      # all apartments
ANTHROPIC_API_KEY=sk-ant-... npm run record -- kpi --force  # just one
```

Open each one in the app with the mode set to *Repris*, keep the ones you like, and commit them. Re-record whenever you change `lib/prompt.ts`.

## Presenter controls

| Key | Action |
|---|---|
| `1`–`6` | Build home 1–6 |
| `F` | Fullscreen presentation (Esc to leave) |
| `P` | Presentation mode without fullscreen (hides the sidebar) |
| `C` | Show the code as it's written |
| `E` | Jump to the edit field |
| `←` `→` | Previous / next version |
| `Esc` | Stop the current build |
| ⌘/Ctrl + ↵ | Forge the typed idea |
| Drop / paste an image | Forge your own picture |

Settings (gear icon): build mode *Auto* / *Bara live* / *Repris*, replay speed, code panel.

## Demo-day checklist

- [ ] Real replays recorded and committed (`npm run record`).
- [ ] Log in on the presentation laptop the day before. The session lasts 14 days.
- [ ] Load the page once on venue Wi-Fi so sketches and replays are cached in memory. After that, Auto mode survives a dead network for all 6 homes. Free text and edits always need the network.
- [ ] Browser zoom so the stage fills the projector; press `P`.
- [ ] Rehearse all six homes. Replays take ~6–8 s; live builds 30–60 s depending on effort and app size.
- [ ] Backup: `npm run dev` on the laptop with a phone hotspot.

## How it works

```
sketch.jpg ─► /api/build ─► Claude (stream) ─► NDJSON {think|html|done}
                                                     │
 presenter UI ◄── thinking summary                   ▼
 sandboxed preview ◄── document.write(chunk) … the app paints as it streams
```

- `app/api/build/route.ts`: validates input, streams from the Messages API (adaptive thinking with summarized display, server-side refusal fallbacks), re-emits NDJSON.
- `public/preview.html`: runs in `sandbox="allow-scripts allow-forms"` (opaque origin, so the generated code can't touch the presenter UI or session cookie). Each build reloads it for a clean JS realm, then streams in with `document.write`.
- `app/studio.tsx`: build engine (live, watchdog, silent replay fallback), stage, shortcuts.
- `lib/prompt.ts`: the system prompt. CSS first, markup top-down, script last, so the page assembles visibly from the top.
- `scripts/render-sketches.mjs`: regenerates the sketches from `scripts/sketches/definitions.mjs` (rough.js + handwriting fonts, rendered with Playwright). Run `npm run sketches` after editing the definitions; needs a local Chromium (`npx playwright install chromium`).
- `proxy.ts` + `lib/auth.ts`: passcode gate with an HMAC-signed, httpOnly session cookie.
