import { z } from "zod";

import { scoreResponseSchema } from "@/features/scoring";

export const storedResultSchema = scoreResponseSchema.extend({
  localDate: z.iso.date(),
  scanability: scoreResponseSchema.shape.scanability.default("B"),
  formattingFeedback: scoreResponseSchema.shape.formattingFeedback.default(
    "Use formatting only when it makes the answer easier to scan.",
  ),
  rationale: scoreResponseSchema.shape.rationale.default(
    "The grade reflects which essential meaning survived the rewrite.",
  ),
});
export const playerStateSchema = z.object({
  completedChallengeIds: z.array(z.string()),
  currentStreak: z.number().int().nonnegative(),
  longestStreak: z.number().int().nonnegative(),
  lastCompletedDate: z.iso.date().optional(),
  results: z.array(storedResultSchema),
});

export type PlayerState = z.infer<typeof playerStateSchema>;
export type StoredResult = z.infer<typeof storedResultSchema>;
