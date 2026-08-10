import { describe, expect, it } from "vitest";

import { challenges } from "@/features/challenge";
import { evaluateWithAi } from "@/lib/ai";

import { scoringFixtures } from "./scoring-calibration-fixtures";

describe.runIf(process.env.RUN_LIVE_AI_EVALS === "1")("live AI scoring calibration", () => {
  for (const fixture of scoringFixtures) {
    const challenge = challenges.find(({ id }) => id === fixture.challengeId);
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
