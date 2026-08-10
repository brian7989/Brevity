import { describe, expect, it } from "vitest";

import { challenges } from "@/features/challenge";

import { calibrationKinds, scoringFixtures } from "./scoring-calibration-fixtures";

describe("scoring calibration fixtures", () => {
  it("covers every required adversarial answer kind for three valid challenges", () => {
    expect(scoringFixtures).toHaveLength(3);
    for (const fixture of scoringFixtures) {
      expect(challenges.some(({ id }) => id === fixture.challengeId)).toBe(true);
      expect(fixture.answers.map(({ kind }) => kind)).toEqual(calibrationKinds);
    }
  });

  it("requires irrelevant answers to fail both dimensions", () => {
    for (const fixture of scoringFixtures) {
      const irrelevant = fixture.answers.find(({ kind }) => kind === "irrelevant");
      expect(irrelevant).toMatchObject({ signal: "D", clarity: "D" });
    }
  });
});
