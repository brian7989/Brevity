import type { Challenge } from "@/features/challenge";
import type { SemanticScore } from "@/features/scoring/schemas";

export function createCanonicalReferenceScore(challenge: Challenge, answer: string): SemanticScore | null {
  if (normalize(answer) !== normalize(challenge.referenceAnswer)) return null;

  const korean = challenge.language === "ko";
  return {
    signal: "A",
    clarity: "A",
    scanability: "A",
    feedback: korean
      ? "핵심을 빠짐없이 정확하고 간결하게 전달했습니다."
      : "You preserved every key idea accurately and concisely.",
    formattingFeedback: korean
      ? "현재 구조가 내용을 빠르게 파악하는 데 적절합니다."
      : "The current structure makes the answer immediately scannable.",
    rationale: korean
      ? "참고 답안과 같은 핵심과 관계를 빠짐없이 전달했습니다."
      : "The answer preserves the same key ideas and relationships as the reference answer.",
    preservedKeyPoints: challenge.keyPoints.map(({ text }) => text),
    partialKeyPoints: [],
    missedKeyPoints: [],
  };
}

function normalize(value: string): string {
  return value.normalize("NFKC").trim().replace(/\s+/gu, " ");
}
