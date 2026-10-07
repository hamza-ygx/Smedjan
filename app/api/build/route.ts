import Anthropic from "@anthropic-ai/sdk";
import { gateEnabled } from "@/lib/auth";
import { SYSTEM_PROMPT, buildMessages, type BuildRequest } from "@/lib/prompt";

export const runtime = "nodejs";
export const maxDuration = 300;

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_IMAGE_B64 = 5_000_000;
const MAX_HTML = 300_000;
const MAX_PROMPT = 2_000;
const MAX_NOTE = 5_000;
const EFFORTS = new Set(["low", "medium", "high", "xhigh", "max"]);

// One NDJSON event per line: {t:"start"}, {t:"think"|"html", d} … then {t:"done", stop} or {t:"error", msg}.
type Event = { t: "start" } | { t: "think" | "html"; d: string } | { t: "done"; stop: string | null } | { t: "error"; msg: string };

function parse(body: unknown): BuildRequest | string {
  if (!body || typeof body !== "object") return "Ogiltig förfrågan";
  const b = body as Record<string, unknown>;
  const str = (v: unknown, max: number) => (typeof v === "string" && v.trim() && v.length <= max ? v.trim() : null);
  switch (b.kind) {
    case "image": {
      const img = b.image as { data?: unknown; mediaType?: unknown } | undefined;
      if (!img || typeof img.data !== "string" || img.data.length > MAX_IMAGE_B64) return "Bilden saknas eller är för stor";
      if (typeof img.mediaType !== "string" || !IMAGE_TYPES.has(img.mediaType)) return "Bildformatet stöds inte";
      return {
        kind: "image",
        image: { data: img.data, mediaType: img.mediaType as "image/jpeg" },
        title: str(b.title, 100) ?? undefined,
        note: str(b.note, MAX_NOTE) ?? undefined,
      };
    }
    case "text": {
      const prompt = str(b.prompt, MAX_PROMPT);
      return prompt ? { kind: "text", prompt } : "Beskrivningen saknas";
    }
    case "edit": {
      const prompt = str(b.prompt, MAX_PROMPT);
      const html = str(b.html, MAX_HTML);
      return prompt && html ? { kind: "edit", prompt, html } : "Ändringen saknas";
    }
    default:
      return "Okänd typ";
  }
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return Response.json({ error: "ANTHROPIC_API_KEY saknas på servern" }, { status: 503 });
  if (process.env.NODE_ENV === "production" && !gateEnabled()) {
    return Response.json({ error: "APP_PASSCODE måste vara satt i produktion" }, { status: 503 });
  }

  const parsed = parse(await req.json().catch(() => null));
  if (typeof parsed === "string") return Response.json({ error: parsed }, { status: 400 });

  const effort = EFFORTS.has(process.env.SMEDJAN_EFFORT ?? "") ? (process.env.SMEDJAN_EFFORT as "low") : "low";
  const fast = process.env.SMEDJAN_FAST === "1";
  const client = new Anthropic({ maxRetries: 1 });

  const stream = client.beta.messages.stream(
    {
      model: process.env.SMEDJAN_MODEL || "claude-opus-5-5",
      max_tokens: 32000,
      system: SYSTEM_PROMPT,
      messages: buildMessages(parsed),
      thinking: { type: "adaptive", display: "summarized" },
      output_config: { effort },
      fallbacks: "default",
      betas: ["server-side-fallback-2026-07-01", ...(fast ? (["fast-mode-2026-02-01"] as const) : [])],
      ...(fast ? { speed: "fast" as const } : {}),
    },
    { signal: req.signal },
  );

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (e: Event) => {
        try {
          controller.enqueue(encoder.encode(JSON.stringify(e) + "\n"));
        } catch {
          // client went away
        }
      };
      try {
        for await (const event of stream) {
          if (event.type === "message_start") send({ t: "start" });
          if (event.type !== "content_block_delta") continue;
          if (event.delta.type === "text_delta") send({ t: "html", d: event.delta.text });
          else if (event.delta.type === "thinking_delta") send({ t: "think", d: event.delta.thinking });
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") send({ t: "error", msg: "Modellen avböjde förfrågan" });
        else send({ t: "done", stop: final.stop_reason });
      } catch (err) {
        if (!req.signal.aborted) {
          console.error("[build]", err);
          const msg =
            err instanceof Anthropic.RateLimitError
              ? "För många förfrågningar just nu"
              : err instanceof Anthropic.AuthenticationError
                ? "Ogiltig API-nyckel"
                : err instanceof Anthropic.APIError
                  ? `AI-tjänsten svarade med fel (${err.status ?? "nätverk"})`
                  : "Anslutningen bröts";
          send({ t: "error", msg });
        }
      } finally {
        try {
          controller.close();
        } catch {}
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
