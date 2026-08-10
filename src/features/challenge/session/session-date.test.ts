import { describe, expect, it } from "vitest";

import { previousDate } from "./session-date";

describe("session-date", () => {
  it("returns the previous calendar date", () => {
    expect(previousDate("2026-08-10")).toBe("2026-08-09");
  });

  it("handles month boundaries", () => {
    expect(previousDate("2026-03-01")).toBe("2026-02-28");
  });
});
