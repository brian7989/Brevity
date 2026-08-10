import { describe, expect, it } from "vitest";

import { calculateCompression, countWords } from "@/features/challenge";

describe("countWords", () => {
  it("counts whitespace-delimited words deterministically", () => {
    expect(countWords("  Short,\nnot shallow. ")).toBe(3);
    expect(countWords("   ")).toBe(0);
  });
});

describe("calculateCompression", () => {
  it("rounds the reduction and never reports negative compression", () => {
    expect(calculateCompression(84, 14)).toBe(83);
    expect(calculateCompression(10, 12)).toBe(0);
  });
});
