import { describe, expect, it } from "vitest";

import { localContentRepository } from "@/features/challenge";
import { evaluateWithAi } from "@/lib/ai";

import { scoringFixtures } from "./support/load-calibration-fixtures";

describe.runIf(process.env.RUN_LIVE_AI_EVALS === "1")("live AI scoring calibration", () => {
  for (const fixture of scoringFixtures) {
    const challenge = localContentRepository.find(fixture.language, fixture.challengeId);
    if (!challenge) throw new Error(`Missing calibration challenge ${fixture.challengeId}.`);

    for (const example of fixture.answers) {
      it(`${fixture.challengeId}: ${example.kind}`, async () => {
        const score = await evaluateWithAi(challenge, example.answer);
        expect({ signal: score.signal, clarity: score.clarity }).toEqual({
          signal: example.signal,
          clarity: example.clarity,
        });
      });
    }
  }
});
