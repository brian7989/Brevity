import type { Grade } from "@/features/scoring/schemas";

export type ResultHeadlineKey = "perfect" | "meaningAndTarget" | "overTarget" | "meaningMissed";

type ResultHeadlineInput = {
  clarity: Grade;
  meaningComplete: boolean;
  scanability: Grade;
  targetMet: boolean;
};

export function getResultHeadlineKey({
  clarity,
  meaningComplete,
  scanability,
  targetMet,
}: ResultHeadlineInput): ResultHeadlineKey {
  if (meaningComplete && targetMet && clarity === "A" && scanability === "A") return "perfect";
  if (meaningComplete && targetMet) return "meaningAndTarget";
  if (meaningComplete) return "overTarget";
  return "meaningMissed";
}
