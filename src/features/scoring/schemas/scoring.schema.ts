import { z } from "zod";

export const gradeSchema = z.enum(["A", "B", "C", "D"]);
export const semanticScoreSchema = z.object({
  signal: gradeSchema,
  clarity: gradeSchema,
  scanability: gradeSchema,
  feedback: z.string().min(10).max(180),
  formattingFeedback: z.string().min(10).max(180),
  rationale: z.string().min(20).max(260),
  preservedKeyPoints: z.array(z.string()).max(6),
  partialKeyPoints: z.array(z.string()).max(6),
  missedKeyPoints: z.array(z.string()).max(6),
});
export const scoreRequestSchema = z.object({
  challengeId: z.string(),
  language: z.enum(["en", "ko"]).default("en"),
  answer: z.string().trim().min(2).max(8_000),
});
export const scoreResponseSchema = semanticScoreSchema.extend({
  challengeId: z.string(),
  language: z.enum(["en", "ko"]),
  answer: z.string(),
  playerWords: z.number().int().nonnegative(),
  originalWords: z.number().int().positive(),
  compression: z.number().int(),
  completedAt: z.iso.datetime(),
});

export type SemanticScore = z.infer<typeof semanticScoreSchema>;
export type Grade = z.infer<typeof gradeSchema>;
export type ScoreResponse = z.infer<typeof scoreResponseSchema>;
