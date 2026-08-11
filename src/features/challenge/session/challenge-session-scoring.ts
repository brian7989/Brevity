import type { ChallengeLanguage } from "@/features/challenge/domain";
import type { Challenge } from "@/features/challenge/schemas";
import { scoreAnswer, type ScoreResponse } from "@/features/scoring";

export async function scoreChallengeSessionAnswer(
  challenge: Challenge,
  language: ChallengeLanguage,
  answer: string,
): Promise<ScoreResponse> {
  return scoreAnswer(challenge, language, answer);
}
