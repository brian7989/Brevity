import { createPwaIcon } from "@/features/pwa";

export const dynamic = "force-static";

export function GET() {
  return createPwaIcon(192);
}
