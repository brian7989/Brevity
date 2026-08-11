import {
  calculateCompression,
  countWords,
  localContentRepository,
  richTextToPlainText,
  sanitizeRichText,
} from "@/features/challenge";
import { evaluateWithAi } from "@/lib/ai";
import { scoreRequestSchema, scoreResponseSchema, type ScoreResponse } from "@/features/scoring/schemas";

import { createCanonicalReferenceScore } from "./canonical-reference-score";

export class ScoringConfigurationError extends Error {}
export class ChallengeNotFoundError extends Error {}

export async function scoreSubmission(input: unknown): Promise<ScoreResponse> {
  const request = scoreRequestSchema.parse(input);
  const challenge = localContentRepository.find(request.language, request.challengeId);
  if (!challenge) throw new ChallengeNotFoundError();
  if (!process.env.AI_GATEWAY_API_KEY) throw new ScoringConfigurationError();
  const plainAnswer = richTextToPlainText(request.answer);
  const structuredAnswer = sanitizeRichText(request.answer);

  const semantic =
    createCanonicalReferenceScore(challenge, plainAnswer) ??
    (await evaluateWithAi(challenge, plainAnswer, structuredAnswer));
  const playerWords = countWords(plainAnswer);
  const originalWords = countWords(challenge.passage);

  return scoreResponseSchema.parse({
    ...semantic,
    challengeId: challenge.id,
    language: challenge.language,
    answer: request.answer,
    playerWords,
    originalWords,
    compression: calculateCompression(originalWords, playerWords),
    completedAt: new Date().toISOString(),
  });
}
