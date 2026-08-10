import type { ChallengeLanguage } from "@/features/challenge/domain";
import type { Challenge } from "@/features/challenge/schemas";
import { scoreResponseSchema, type ScoreResponse } from "@/features/scoring";

export async function scoreChallengeSessionAnswer(
  challenge: Challenge,
  language: ChallengeLanguage,
  answer: string,
): Promise<ScoreResponse> {
  const response = await fetch("/api/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId: challenge.id, language, answer }),
  });

  if (!response.ok) throw new Error("SCORING_FAILED");
  return scoreResponseSchema.parse(await response.json());
}
