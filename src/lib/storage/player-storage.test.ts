import { describe, expect, it } from "vitest";

import { recordResult, resetChallengeAttempt } from "@/lib/storage";

const result = {
  challengeId: "challenge-01",
  language: "en" as const,
  answer: "A useful answer.",
  signal: "A" as const,
  clarity: "A" as const,
  scanability: "A" as const,
  feedback: "Clear and complete while staying concise.",
  formattingFeedback: "Plain text is the clearest structure for this answer.",
  rationale: "The answer preserves the essential meaning without adding distortion.",
  preservedKeyPoints: [],
  partialKeyPoints: [],
  missedKeyPoints: [],
  playerWords: 3,
  originalWords: 80,
  compression: 96,
  completedAt: "2026-08-01T12:00:00.000Z",
  localDate: "2026-08-01",
};

describe("recordResult", () => {
  it("records once and advances consecutive streaks", () => {
    const first = recordResult({ completedChallengeIds: [], currentStreak: 0, longestStreak: 0, results: [] }, result);
    const second = recordResult(first, { ...result, challengeId: "challenge-02", localDate: "2026-08-02" });
    expect(second.currentStreak).toBe(2);
    expect(recordResult(second, { ...result, challengeId: "challenge-02", localDate: "2026-08-02" })).toEqual(second);
  });

  it("removes one attempt and recalculates streaks", () => {
    const first = recordResult({ completedChallengeIds: [], currentStreak: 0, longestStreak: 0, results: [] }, result);
    const second = recordResult(first, { ...result, challengeId: "challenge-02", localDate: "2026-08-02" });
    const reset = resetChallengeAttempt(second, "challenge-02");

    expect(reset.completedChallengeIds).toEqual(["challenge-01"]);
    expect(reset.currentStreak).toBe(1);
    expect(reset.longestStreak).toBe(1);
    expect(reset.lastCompletedDate).toBe("2026-08-01");
  });
});
