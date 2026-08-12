import { describe, expect, it } from "vitest";

import { resolveRequestLocale } from "./config";

describe("resolveRequestLocale", () => {
  it("uses a saved preference before the browser language", () => {
    expect(resolveRequestLocale("ko", "en-US,en;q=0.9")).toBe("ko");
  });

  it("uses the browser language on a first visit", () => {
    expect(resolveRequestLocale(undefined, "ko-KR,ko;q=0.9,en;q=0.8")).toBe("ko");
    expect(resolveRequestLocale(undefined, "en-US,en;q=0.9,ko;q=0.5")).toBe("en");
  });

  it("falls back to English for unsupported or missing languages", () => {
    expect(resolveRequestLocale(undefined, "fr-FR,fr;q=0.9")).toBe("en");
    expect(resolveRequestLocale()).toBe("en");
  });
});
