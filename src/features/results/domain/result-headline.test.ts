import { describe, expect, it } from "vitest";

import { getResultHeadlineKey } from "./result-headline";

describe("getResultHeadlineKey", () => {
  it.each([
    [{ clarity: "A", meaningComplete: true, scanability: "A", targetMet: true }, "perfect"],
    [{ clarity: "B", meaningComplete: true, scanability: "A", targetMet: true }, "meaningAndTarget"],
    [{ clarity: "A", meaningComplete: true, scanability: "A", targetMet: false }, "overTarget"],
    [{ clarity: "A", meaningComplete: false, scanability: "A", targetMet: true }, "meaningMissed"],
  ] as const)("maps gameplay outcomes to a concrete headline", (input, expected) => {
    expect(getResultHeadlineKey(input)).toBe(expected);
  });
});
