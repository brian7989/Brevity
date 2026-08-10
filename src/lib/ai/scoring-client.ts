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
- Signal A requires all essential and supporting rubric points to be preserved.
- Signal B allows minor partial loss but no missed essential point, no reversal, and no contradiction.
- Signal C is the ceiling when an essential point is missed but the answer preserves some relevant meaning.
- Signal D is required when no essential point is preserved, the answer is irrelevant, or the answer reverses the passage's decision, cause, timing, scope, or numeric meaning.
- A fluent false statement can receive Clarity A while receiving Signal D.
- A one-word or irrelevant answer must receive Signal D and Clarity D.
- A fragment can receive Signal B if it preserves the meaning, but its Clarity should be C when readers must infer the relationships.
- Do not reward shortness and do not consider word count.
- Clear formatting can improve Clarity when it makes hierarchy, contrast, or action easier to scan.
- Bullets and short paragraphs are welcome when they preserve meaning; emojis are not a default positive signal and should only help in a casual context.
- Formatting must never rescue a submission that loses or distorts essential meaning.
- Partition every supplied rubric point into exactly one of preservedKeyPoints, partialKeyPoints, or missedKeyPoints.
- Copy rubric point text exactly into those arrays. Never invent or paraphrase a rubric point.
- Feedback must be one specific, useful sentence about the most important writing improvement.
- Rationale must explain the grade in one concrete sentence, naming what was preserved and what was missing or unclear.
${
  challenge.language === "ko"
    ? "- Evaluate natural Korean expression, omitted relationships, spacing-unit compression, and appropriate professional register. Write feedback and rationale in Korean."
    : "- Write feedback and rationale in English."
}`,
  });
  const score = applySignalEvidenceCeiling(challenge, semanticScoreSchema.parse(object));
  assertEvidencePartition(challenge, score);
  return score;
}

export function applySignalEvidenceCeiling(challenge: Challenge, score: SemanticScore): SemanticScore {
  const essentialPoints = challenge.keyPoints
    .filter(({ importance }) => importance === "essential")
    .map(({ text }) => text);
  const missedEssentialCount = essentialPoints.filter((point) => score.missedKeyPoints.includes(point)).length;
  const partialEssentialCount = essentialPoints.filter((point) => score.partialKeyPoints.includes(point)).length;
  const preservedEssentialCount = essentialPoints.filter((point) => score.preservedKeyPoints.includes(point)).length;
  const hasPartialOrMissedSupporting = challenge.keyPoints
    .filter(({ importance }) => importance === "supporting")
    .some(({ text }) => score.partialKeyPoints.includes(text) || score.missedKeyPoints.includes(text));

  if (preservedEssentialCount === 0 && partialEssentialCount === 0) {
    return capSignal(score, "D");
  }

  if (missedEssentialCount > 0) {
    return capSignal(score, "C");
  }

  if (partialEssentialCount > 0 || hasPartialOrMissedSupporting) {
    return capSignal(score, "B");
  }

  return score;
}

function capSignal(score: SemanticScore, ceiling: SemanticScore["signal"]): SemanticScore {
  return { ...score, signal: lowerGrade(score.signal, ceiling) };
}

function lowerGrade(current: SemanticScore["signal"], ceiling: SemanticScore["signal"]): SemanticScore["signal"] {
  const order = ["A", "B", "C", "D"] as const;
  return order[Math.max(order.indexOf(current), order.indexOf(ceiling))];
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
