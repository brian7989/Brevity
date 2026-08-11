import { z } from "zod";

export const keyPointSchema = z.object({ text: z.string().min(3), importance: z.enum(["essential", "supporting"]) });
export const referenceAnswerVariantSchema = z.object({
  label: z.string().min(2).max(60),
  text: z.string().min(10).max(300),
});
export const challengeSchema = z
  .object({
    id: z.string().regex(/^(?:ko-)?challenge-\d{2}$/),
    language: z.enum(["en", "ko"]).default("en"),
    date: z.iso.date(),
    passage: z.string().min(150).max(900),
    keyPoints: z.array(keyPointSchema).min(2).max(6),
    referenceAnswer: z.string().min(20).max(300),
    referenceAnswers: z.array(referenceAnswerVariantSchema).min(1).max(4).optional(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    targetWords: z.number().int().min(5).max(40),
    formattingOpportunity: z.enum(["none", "optional", "useful"]),
  })
  .superRefine((challenge, context) => {
    const passageUnits = wordCount(challenge.passage);
    const referenceUnits = wordCount(challenge.referenceAnswer);
    const passageRange = challenge.language === "ko" ? [30, 100] : [45, 120];
    const referenceRange = challenge.language === "ko" ? [5, 25] : [8, 30];
    if (passageUnits < passageRange[0] || passageUnits > passageRange[1])
      context.addIssue({
        code: "custom",
        path: ["passage"],
        message: `Passage must contain ${passageRange[0]}–${passageRange[1]} writing units.`,
      });
    if (referenceUnits < referenceRange[0] || referenceUnits > referenceRange[1])
      context.addIssue({
        code: "custom",
        path: ["referenceAnswer"],
        message: `Reference answer must contain ${referenceRange[0]}–${referenceRange[1]} writing units.`,
      });
    if (!challenge.keyPoints.some(({ importance }) => importance === "essential"))
      context.addIssue({
        code: "custom",
        path: ["keyPoints"],
        message: "At least one essential key point is required.",
      });
  });
export const challengesSchema = z.array(challengeSchema).min(1);

export type Challenge = z.infer<typeof challengeSchema>;
export type KeyPoint = z.infer<typeof keyPointSchema>;
export type ReferenceAnswerVariant = z.infer<typeof referenceAnswerVariantSchema>;

function wordCount(value: string): number {
  return value.trim().split(/\s+/u).filter(Boolean).length;
}
