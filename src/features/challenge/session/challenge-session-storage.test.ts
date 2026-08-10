import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Challenge } from "@/features/challenge/schemas";
import type { PlayerState, StoredResult } from "@/features/results";

const readPlayerState = vi.fn<() => PlayerState>();
const writePlayerState = vi.fn<(state: PlayerState) => void>();
const recordResult = vi.fn<(state: PlayerState, result: StoredResult) => PlayerState>();
const resetChallengeAttempt = vi.fn<(state: PlayerState, challengeId: string) => PlayerState>();

vi.mock("@/lib", () => ({ readPlayerState, recordResult, resetChallengeAttempt, writePlayerState }));

const challenge = {
  date: "2026-08-10",
  difficulty: "medium",
  id: "challenge-01",
  keyPoints: [{ importance: "essential", text: "Revenue rose because renewals offset weak new sales." }],
  language: "en",
  passage: "Quarterly revenue grew 12 percent because renewals offset weak new sales.",
  referenceAnswer: "Revenue rose because renewals offset weak new sales.",
} satisfies Challenge;

const storedResult = {
  answer: "Revenue rose despite weak new sales.",
  challengeId: "challenge-01",
  clarity: "B",
  completedAt: "2026-08-10T12:00:00.000Z",
  compression: 70,
  feedback: "Good compression with the main point preserved.",
  language: "en",
  localDate: "2026-08-10",
  missedKeyPoints: [],
  originalWords: 10,
  partialKeyPoints: [],
  playerWords: 7,
  preservedKeyPoints: ["Revenue rose because renewals offset weak new sales."],
  rationale: "The answer preserves the main revenue result and weak new sales context.",
  signal: "A",
} satisfies StoredResult;

describe("challenge session storage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("hydrates a completed challenge snapshot", async () => {
    const { readChallengeSessionSnapshot } = await import("./challenge-session-storage");
    readPlayerState.mockReturnValue({
      completedChallengeIds: [challenge.id],
      currentStreak: 3,
      longestStreak: 3,
      results: [storedResult],
    });

    expect(readChallengeSessionSnapshot(challenge)).toEqual({ result: storedResult, status: "complete", streak: 3 });
  });

  it("hydrates a fresh writing snapshot", async () => {
    const { readChallengeSessionSnapshot } = await import("./challenge-session-storage");
    readPlayerState.mockReturnValue({ completedChallengeIds: [], currentStreak: 0, longestStreak: 0, results: [] });

    expect(readChallengeSessionSnapshot(challenge)).toEqual({ result: null, status: "writing", streak: 0 });
  });

  it("saves scored results through player storage", async () => {
    const { saveChallengeSessionResult } = await import("./challenge-session-storage");
    const nextState = {
      completedChallengeIds: [challenge.id],
      currentStreak: 1,
      longestStreak: 1,
      results: [storedResult],
    };

    readPlayerState.mockReturnValue({ completedChallengeIds: [], currentStreak: 0, longestStreak: 0, results: [] });
    recordResult.mockReturnValue(nextState);

    expect(saveChallengeSessionResult(storedResult)).toEqual({ result: storedResult, streak: 1 });
    expect(writePlayerState).toHaveBeenCalledWith(nextState);
  });

  it("clears one challenge attempt through player storage", async () => {
    const { clearChallengeSessionAttempt } = await import("./challenge-session-storage");
    const resetState = { completedChallengeIds: [], currentStreak: 0, longestStreak: 1, results: [] };

    readPlayerState.mockReturnValue({
      completedChallengeIds: [challenge.id],
      currentStreak: 1,
      longestStreak: 1,
      results: [storedResult],
    });
    resetChallengeAttempt.mockReturnValue(resetState);

    expect(clearChallengeSessionAttempt(challenge.id)).toEqual({ streak: 0 });
    expect(writePlayerState).toHaveBeenCalledWith(resetState);
  });
});
