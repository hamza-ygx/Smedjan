export const SESSION_COOKIE = "smedjan_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 14;

export const passcode = () => process.env.APP_PASSCODE?.trim() || "";
export const gateEnabled = () => passcode().length > 0;

const enc = new TextEncoder();

async function hmac(message: string): Promise<string> {
  const secret = process.env.SESSION_SECRET || passcode();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Buffer.from(sig).toString("base64url");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Token = expiry.signature, so rotating APP_PASSCODE/SESSION_SECRET invalidates all sessions.
export async function createSessionToken(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  return `${exp}.${await hmac(`smedjan:${exp}`)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!gateEnabled()) return true;
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!sig || !Number.isFinite(exp) || exp < Date.now() / 1000) return false;
  return safeEqual(sig, await hmac(`smedjan:${exp}`));
}

export async function checkPasscode(input: string): Promise<boolean> {
  if (!gateEnabled()) return true;
  // Compare HMACs so the comparison is constant-time regardless of input length.
  return safeEqual(await hmac(`pin:${input.trim()}`), await hmac(`pin:${passcode()}`));
}
