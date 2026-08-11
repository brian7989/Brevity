import type { Challenge } from "@/features/challenge/schemas";

import { scoreResponseSchema, type ScoreResponse } from "../schemas";

export async function scoreAnswer(
  challenge: Challenge,
  language: Challenge["language"],
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
