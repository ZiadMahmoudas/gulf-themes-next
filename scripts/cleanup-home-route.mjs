import { existsSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

const staleHome = resolve(process.cwd(), "app", "(site)", "page.tsx");
if (existsSync(staleHome)) {
  unlinkSync(staleHome);
  console.log("[ArabDEV V14] Removed stale duplicate home route: app/(site)/page.tsx");
}
