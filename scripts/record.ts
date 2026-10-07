// Records a real build of each sketch into public/replays/<id>.html — the offline fallback.
// Usage: ANTHROPIC_API_KEY=... npm run record [-- id ...] [-- --force]
import Anthropic from "@anthropic-ai/sdk";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { SYSTEM_PROMPT, buildMessages } from "../lib/prompt";
import { SKETCHES } from "../lib/sketches";

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "replays");
mkdirSync(outDir, { recursive: true });

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));
const client = new Anthropic();
const model = process.env.SMEDJAN_MODEL || "claude-opus-5-5";
// Recordings aren't time-critical, so spend more effort than the live default.
const effort = (process.env.RECORD_EFFORT || "medium") as "medium";

async function record(id: string, title: string, note?: string) {
  const file = path.join(outDir, `${id}.html`);
  if (existsSync(file) && !force) return console.log(`skip ${id} (exists, use --force)`);
  const data = readFileSync(path.join(root, "public", "sketches", `${id}.jpg`)).toString("base64");
  const started = Date.now();
  const stream = client.beta.messages.stream({
    model,
    max_tokens: 32000,
    system: SYSTEM_PROMPT,
    messages: buildMessages({ kind: "image", image: { data, mediaType: "image/jpeg" }, title, note }),
    thinking: { type: "adaptive" },
    output_config: { effort },
    fallbacks: "default",
    betas: ["server-side-fallback-2026-07-01"],
  });
  const msg = await stream.finalMessage();
  if (msg.stop_reason !== "end_turn") throw new Error(`${id}: stopped with ${msg.stop_reason}`);
  let html = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
  html = html.slice(html.indexOf("<")).replace(/```\s*$/, "").trim() + "\n";
  if (!/<\/html>\s*$/i.test(html)) throw new Error(`${id}: output is not a complete HTML document`);
  writeFileSync(file, html);
  console.log(`ok   ${id}  ${(html.length / 1024).toFixed(1)} kB  ${((Date.now() - started) / 1000).toFixed(0)} s`);
}

(async () => {
  const todo = SKETCHES.filter((s) => !only.length || only.includes(s.id));
  const results = await Promise.allSettled(todo.map((s) => record(s.id, s.title, s.brief)));
  const failed = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  failed.forEach((f) => console.error("fail", f.reason instanceof Error ? f.reason.message : f.reason));
  process.exitCode = failed.length ? 1 : 0;
})();
