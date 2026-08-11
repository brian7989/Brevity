import type { Challenge } from "../schemas";

export type ChallengeGoal = { essentialPoints: number; targetWords: number };
type ScoringEvidence = { preservedKeyPoints: string[] };

export function getChallengeGoal(challenge: Challenge): ChallengeGoal {
  return {
    essentialPoints: challenge.keyPoints.filter(({ importance }) => importance === "essential").length,
    targetWords: challenge.targetWords,
  };
}

export function countPreservedEssentialPoints(challenge: Challenge, evidence: ScoringEvidence): number {
  return challenge.keyPoints.filter(
    ({ importance, text }) => importance === "essential" && evidence.preservedKeyPoints.includes(text),
  ).length;
}
