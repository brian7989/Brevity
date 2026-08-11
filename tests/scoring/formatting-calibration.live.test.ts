import { describe, expect, it } from "vitest";

import { localContentRepository } from "@/features/challenge";
import { evaluateWithAi } from "@/lib/ai";

import { formattingFixtures } from "./support/load-formatting-fixtures";

describe.runIf(process.env.RUN_LIVE_AI_EVALS === "1")("live formatting calibration", () => {
  for (const dataset of formattingFixtures) {
    for (const example of dataset.examples) {
      it(`${example.challengeId}: ${example.kind}`, async () => {
        const challenge = localContentRepository.find(dataset.language, example.challengeId);
        if (!challenge) throw new Error(`Missing formatting challenge ${example.challengeId}.`);

        const score = await evaluateWithAi(challenge, example.answer, example.structuredAnswer);
        expect(score.scanability).toBe(example.scanability);
      });
    }
  }
});
