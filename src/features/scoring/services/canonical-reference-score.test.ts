import { describe, expect, it } from "vitest";

import { localContentRepository } from "@/features/challenge";

import { createCanonicalReferenceScore } from "./canonical-reference-score";

const challenge = localContentRepository.find("ko", "ko-challenge-01");
if (!challenge) throw new Error("Missing test challenge.");

describe("createCanonicalReferenceScore", () => {
  it("awards a deterministic perfect score to the canonical answer", () => {
    const score = createCanonicalReferenceScore(challenge, `  ${challenge.referenceAnswer}  `);

    expect(score).toMatchObject({ signal: "A", clarity: "A", scanability: "A" });
    expect(score?.preservedKeyPoints).toEqual(challenge.keyPoints.map(({ text }) => text));
    expect(score?.partialKeyPoints).toEqual([]);
    expect(score?.missedKeyPoints).toEqual([]);
  });

  it("leaves other answers for AI evaluation", () => {
    expect(createCanonicalReferenceScore(challenge, "다른 답안입니다.")).toBeNull();
  });
});
