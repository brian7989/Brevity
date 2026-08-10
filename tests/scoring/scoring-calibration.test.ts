import { describe, expect, it } from "vitest";

import { localContentRepository } from "@/features/challenge";

import { calibrationKinds } from "./support/calibration-dataset.schema";
import { scoringFixtures } from "./support/load-calibration-fixtures";

describe("scoring calibration fixtures", () => {
  it("covers every required adversarial answer kind for English and Korean challenges", () => {
    expect(scoringFixtures).toHaveLength(6);
    expect(scoringFixtures.filter(({ language }) => language === "en")).toHaveLength(3);
    expect(scoringFixtures.filter(({ language }) => language === "ko")).toHaveLength(3);

    for (const fixture of scoringFixtures) {
      expect(localContentRepository.find(fixture.language, fixture.challengeId)).toBeDefined();
      expect(fixture.answers.map(({ kind }) => kind)).toEqual(calibrationKinds);
    }
  });

  it("requires irrelevant answers to fail both dimensions", () => {
    for (const fixture of scoringFixtures) {
      const irrelevant = fixture.answers.find(({ kind }) => kind === "irrelevant");
      expect(irrelevant).toMatchObject({ signal: "D", clarity: "D" });
    }
  });

  it("requires contradictions to fail signal even when they are readable", () => {
    for (const fixture of scoringFixtures) {
      const contradiction = fixture.answers.find(({ kind }) => kind === "material-contradiction");
      expect(contradiction?.signal).toMatch(/[CD]/);
      expect(contradiction?.clarity).toBe("A");
    }
  });
});
