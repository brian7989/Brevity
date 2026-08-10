import { generateObject } from "ai";

import type { Challenge } from "@/features/challenge";
import { DEFAULT_AI_MODEL } from "@/config";
import { semanticScoreSchema, type SemanticScore } from "@/features/scoring";

export async function evaluateWithAi(challenge: Challenge, answer: string): Promise<SemanticScore> {
  const { object } = await generateObject({
    model: process.env.AI_MODEL ?? DEFAULT_AI_MODEL,
    schema: semanticScoreSchema,
    prompt: `You are a strict editor scoring a daily writing game. Judge meaning and clarity only; application code handles brevity.

Passage: ${challenge.passage}
Scoring rubric: ${JSON.stringify(challenge.keyPoints)}
Player answer: ${answer}

SIGNAL
A: Preserves every essential point and relationship without a material error or contradiction.
B: Preserves the central point but partially loses one essential relationship, consequence, or qualification.
C: Shows some relevant understanding but misses an essential point, breaks causality, or introduces a material distortion.
D: Misses or reverses the central point, is irrelevant, or makes a claim incompatible with the passage.

CLARITY
A: Immediately understandable, precise, and structurally sound.
B: Understandable on first read with minor awkwardness or vague wording.
C: Meaning can be recovered, but ambiguity, compression, or construction requires effort.
D: Incoherent, materially misleading, or too fragmentary to communicate a usable claim.

Rules:
- Essential points dominate Signal. Supporting points can separate A from B but cannot rescue a missing essential point.
- A fluent false statement can receive Clarity A while receiving Signal D.
- A one-word or irrelevant answer must receive Signal D and Clarity D.
- Do not reward shortness and do not consider word count.
- Partition every supplied rubric point into exactly one of preservedKeyPoints, partialKeyPoints, or missedKeyPoints.
- Copy rubric point text exactly into those arrays. Never invent or paraphrase a rubric point.
- Feedback must be one specific, useful sentence about the most important writing improvement.
${
  challenge.language === "ko"
    ? "- Evaluate natural Korean expression, omitted relationships, spacing-unit compression, and appropriate professional register. Write feedback in Korean."
    : "- Write feedback in English."
}`,
  });
  const score = semanticScoreSchema.parse(object);
  assertEvidencePartition(challenge, score);
  return score;
}

function assertEvidencePartition(challenge: Challenge, score: SemanticScore): void {
  const expected = challenge.keyPoints.map(({ text }) => text);
  const actual = [...score.preservedKeyPoints, ...score.partialKeyPoints, ...score.missedKeyPoints];
  if (
    actual.length !== expected.length ||
    new Set(actual).size !== expected.length ||
    expected.some((point) => !actual.includes(point))
  ) {
    throw new Error("INVALID_SCORING_EVIDENCE");
  }
}
