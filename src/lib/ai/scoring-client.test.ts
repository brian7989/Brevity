import { describe, expect, it } from "vitest";

import { localContentRepository } from "@/features/challenge";

import { applySignalEvidenceCeiling } from "./scoring-client";

const challenge = localContentRepository.find("ko", "ko-challenge-06");
if (!challenge) throw new Error("Missing test challenge.");

const [accuracyPoint, costPoint, timePoint] = challenge.keyPoints.map(({ text }) => text);

describe("applySignalEvidenceCeiling", () => {
  it("caps signal at B when a supporting point is partial or missed", () => {
    const score = applySignalEvidenceCeiling(challenge, {
      signal: "A",
      clarity: "A",
      feedback: "충분히 구체적인 테스트 피드백입니다.",
      rationale: "핵심 근거가 유지되어 채점 결과를 설명할 수 있습니다.",
      preservedKeyPoints: [accuracyPoint, costPoint],
      partialKeyPoints: [timePoint],
      missedKeyPoints: [],
    });

    expect(score.signal).toBe("B");
  });

  it("caps signal at C when an essential point is missed", () => {
    const score = applySignalEvidenceCeiling(challenge, {
      signal: "A",
      clarity: "A",
      feedback: "충분히 구체적인 테스트 피드백입니다.",
      rationale: "핵심 근거가 일부 누락되어 채점 결과를 설명할 수 있습니다.",
      preservedKeyPoints: [accuracyPoint, timePoint],
      partialKeyPoints: [],
      missedKeyPoints: [costPoint],
    });

    expect(score.signal).toBe("C");
  });

  it("caps signal at D when no essential point is preserved or partial", () => {
    const score = applySignalEvidenceCeiling(challenge, {
      signal: "B",
      clarity: "A",
      feedback: "충분히 구체적인 테스트 피드백입니다.",
      rationale: "핵심 근거가 보존되지 않아 채점 결과를 설명할 수 있습니다.",
      preservedKeyPoints: [timePoint],
      partialKeyPoints: [],
      missedKeyPoints: [accuracyPoint, costPoint],
    });

    expect(score.signal).toBe("D");
  });
});
