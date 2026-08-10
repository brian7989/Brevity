import { track } from "@vercel/analytics";

import type { ChallengeLanguage } from "@/features/challenge/domain";
import type { Challenge } from "@/features/challenge/schemas";
import type { ScoreResponse } from "@/features/scoring";
import { countWords } from "@/features/challenge/utils";
import { readPlayerState } from "@/lib";

import { previousDate } from "./session-date";

export function trackChallengeOpened(challenge: Challenge, language: ChallengeLanguage, localDate: string): void {
  track("challenge_opened", { challengeId: challenge.id, difficulty: challenge.difficulty, language });

  if (readPlayerState().lastCompletedDate === previousDate(localDate)) {
    track("next_day_return", { challengeId: challenge.id, language });
  }
}

export function trackChallengeSubmitted(challenge: Challenge, language: ChallengeLanguage, plainAnswer: string): void {
  track("challenge_submitted", { challengeId: challenge.id, language, words: countWords(plainAnswer) });
}

export function trackChallengeCompleted(
  challenge: Challenge,
  language: ChallengeLanguage,
  result: ScoreResponse,
): void {
  track("challenge_completed", { challengeId: challenge.id, language, signal: result.signal });
}
