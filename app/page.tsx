import { gateEnabled } from "@/lib/auth";
import { Studio } from "./studio";

export const dynamic = "force-dynamic";

export default function Page() {
  // Live builds need a key, and in production also a passcode (the API route refuses otherwise).
  const live = !!process.env.ANTHROPIC_API_KEY && (process.env.NODE_ENV !== "production" || gateEnabled());
  return <Studio gate={gateEnabled()} live={live} />;
}
