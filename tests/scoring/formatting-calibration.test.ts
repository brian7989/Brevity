import { describe, expect, it } from "vitest";

import { localContentRepository } from "@/features/challenge";

import { formattingFixtures } from "./support/load-formatting-fixtures";

describe("formatting calibration fixtures", () => {
  it("covers helpful, unnecessary, and harmful formatting in both languages", () => {
    expect(formattingFixtures).toHaveLength(2);

    for (const dataset of formattingFixtures) {
      expect(dataset.examples.map(({ kind }) => kind)).toEqual([
        "useful-structure",
        "decorative-overformatting",
        "plain-text-is-best",
        "forced-fragmented-list",
      ]);

      for (const example of dataset.examples) {
        expect(localContentRepository.find(dataset.language, example.challengeId)).toBeDefined();
      }
    }
  });

  it("does not reward formatting merely for existing", () => {
    for (const dataset of formattingFixtures) {
      expect(dataset.examples.find(({ kind }) => kind === "useful-structure")?.scanability).toBe("A");
      expect(dataset.examples.find(({ kind }) => kind === "plain-text-is-best")?.scanability).toBe("A");
      expect(dataset.examples.find(({ kind }) => kind === "decorative-overformatting")?.scanability).toBe("C");
      expect(dataset.examples.find(({ kind }) => kind === "forced-fragmented-list")?.scanability).toBe("C");
    }
  });
});
