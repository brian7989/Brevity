import { describe, expect, it } from "vitest";

import { challenges, challengesSchema } from "@/features/challenge";

describe("challenge content", () => {
  it("ships thirty valid, uniquely identified challenges", () => {
    expect(challengesSchema.parse(challenges)).toHaveLength(30);
    expect(new Set(challenges.map(({ id }) => id)).size).toBe(30);
  });
});
