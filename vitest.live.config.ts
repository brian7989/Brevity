import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const directory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@content": path.resolve(directory, "content"),
      "@": path.resolve(directory, "src"),
    },
  },
  test: { environment: "node", include: ["src/**/*.live.test.ts"], testTimeout: 30_000 },
});
