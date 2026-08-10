import type { Challenge } from "@/features/challenge/schemas";
import type { StoredResult } from "@/features/results";
import { readPlayerState, recordResult, resetChallengeAttempt, writePlayerState } from "@/lib";

export type ChallengeSessionSnapshot =
  { result: StoredResult; status: "complete"; streak: number } | { result: null; status: "writing"; streak: number };

export function readChallengeSessionSnapshot(challenge: Challenge): ChallengeSessionSnapshot {
  const playerState = readPlayerState();
  const result = playerState.results.find(({ challengeId }) => challengeId === challenge.id) ?? null;

  if (result) return { result, status: "complete", streak: playerState.currentStreak };
  return { result: null, status: "writing", streak: playerState.currentStreak };
}

export function saveChallengeSessionResult(result: StoredResult): { result: StoredResult; streak: number } {
  const nextState = recordResult(readPlayerState(), result);
  writePlayerState(nextState);
  return { result, streak: nextState.currentStreak };
}

export function clearChallengeSessionAttempt(challengeId: string): { streak: number } {
  const nextState = resetChallengeAttempt(readPlayerState(), challengeId);
  writePlayerState(nextState);
  return { streak: nextState.currentStreak };
}
