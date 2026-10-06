import { gateEnabled } from "@/lib/auth";
import { Studio } from "./studio";

export const dynamic = "force-dynamic";

export default function Page() {
  return <Studio gate={gateEnabled()} />;
}
