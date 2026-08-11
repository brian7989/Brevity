import { z } from "zod";

const formattingExampleSchema = z.object({
  challengeId: z.string().min(1),
  kind: z.enum(["useful-structure", "decorative-overformatting", "plain-text-is-best", "forced-fragmented-list"]),
  answer: z.string().min(1),
  structuredAnswer: z.string().min(1),
  scanability: z.enum(["A", "B", "C", "D"]),
});

export const formattingDatasetSchema = z.object({
  version: z.literal(1),
  language: z.enum(["en", "ko"]),
  examples: z.array(formattingExampleSchema).min(1),
});
