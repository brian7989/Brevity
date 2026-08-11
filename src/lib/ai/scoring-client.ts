import { generateObject } from "ai";

import type { Challenge } from "@/features/challenge";
import { DEFAULT_AI_MODEL } from "@/config";
import { semanticScoreSchema, type SemanticScore } from "@/features/scoring";

export async function evaluateWithAi(
  challenge: Challenge,
  answer: string,
  structuredAnswer: string = answer,
): Promise<SemanticScore> {
  const { object } = await generateObject({
    model: process.env.AI_MODEL ?? DEFAULT_AI_MODEL,
    reasoning: "low",
    schema: semanticScoreSchema,
    prompt: `You are a strict editor scoring a daily writing game. Judge meaning and clarity only; application code handles brevity.

Passage: ${challenge.passage}
Scoring rubric: ${JSON.stringify(challenge.keyPoints)}
Canonical reference answer: ${challenge.referenceAnswer}
Player answer: ${answer}
Player answer structure: ${structuredAnswer}
Formatting opportunity: ${challenge.formattingOpportunity}

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

SCANABILITY
A: The answer is immediately scannable and uses the most appropriate structure for this content.
B: Easy to scan, with only a minor structural or emphasis improvement available.
C: Understandable, but poor hierarchy, dense presentation, or unnecessary formatting slows the reader.
D: Formatting or structure materially obstructs comprehension.

Rules:
- Essential points dominate Signal. Supporting points can separate A from B but cannot rescue a missing essential point.
- The scoring rubric is exhaustive. Never penalize omission of a passage detail that is not represented in the rubric.
- The canonical reference answer is an A-level answer. An answer with the same meaning must not receive improvement feedback for omitting non-rubric details.
- Signal A requires all essential and supporting rubric points to be preserved.
- Signal B allows minor partial loss but no missed essential point, no reversal, and no contradiction.
- Signal C is the ceiling when an essential point is missed but the answer preserves some relevant meaning.
- Signal D is required when no essential point is preserved, the answer is irrelevant, or the answer reverses the passage's decision, cause, timing, scope, or numeric meaning.
- A fluent false statement can receive Clarity A while receiving Signal D.
- A one-word or irrelevant answer must receive Signal D and Clarity D.
- A fragment can receive Signal B if it preserves the meaning, but its Clarity should be C when readers must infer the relationships.
- Do not reward shortness and do not consider word count.
- Clear formatting can improve Clarity when it makes hierarchy, contrast, or action easier to scan.
- Score Scanability based on the reading outcome, never the number of formatting elements used.
- Use Player answer for meaning and wording. Use Player answer structure only to judge headings, emphasis, lists, paragraphs, and hierarchy.
- When formattingOpportunity is "none", plain text can earn A and unnecessary headings or bullets should lower Scanability.
- When formattingOpportunity is "optional", reward formatting only if it materially improves hierarchy or contrast.
- When formattingOpportunity is "useful", consider whether a heading, emphasis, bullets, or short sections would make distinct actions, conditions, or contrasts faster to scan.
- Bold, italics, headings, bullets, and emojis receive no credit by themselves. Penalize indiscriminate bolding, decorative headings, forced bullets, or ornamental emoji.
- Bullets and short paragraphs are welcome when they preserve meaning; emojis are not a default positive signal and should only help in a casual context.
- Formatting must never rescue a submission that loses or distorts essential meaning.
- Partition every supplied rubric point into exactly one of preservedKeyPoints, partialKeyPoints, or missedKeyPoints.
- Copy rubric point text exactly into those arrays. Never invent or paraphrase a rubric point.
- Feedback must be one specific, useful sentence about the most important writing improvement.
- FormattingFeedback must be one specific sentence explaining why the chosen structure helped or naming the single most useful formatting improvement. If plain text is already best, say so explicitly.
- Rationale must explain the grade in one concrete sentence, naming what was preserved and what was missing or unclear.
${
  challenge.language === "ko"
    ? "- Evaluate natural Korean expression, omitted relationships, spacing-unit compression, and appropriate professional register. Write feedback and rationale in Korean."
    : "- Write feedback and rationale in English."
}`,
  });
  const score = normalizeEvidencePartition(challenge, semanticScoreSchema.parse(object));
  return applySignalEvidenceCeiling(challenge, score);
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

export function normalizeEvidencePartition(challenge: Challenge, score: SemanticScore): SemanticScore {
  const preserved = new Set(score.preservedKeyPoints);
  const partial = new Set(score.partialKeyPoints);
  const missed = new Set(score.missedKeyPoints);
  const normalized = {
    preservedKeyPoints: [] as string[],
    partialKeyPoints: [] as string[],
    missedKeyPoints: [] as string[],
  };

  for (const { text } of challenge.keyPoints) {
    if (missed.has(text) || (!preserved.has(text) && !partial.has(text))) {
      normalized.missedKeyPoints.push(text);
    } else if (partial.has(text)) {
      normalized.partialKeyPoints.push(text);
    } else {
      normalized.preservedKeyPoints.push(text);
    }
  }

  return { ...score, ...normalized };
}
