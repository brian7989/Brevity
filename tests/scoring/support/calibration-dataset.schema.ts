import { z } from "zod";

export const calibrationKinds = [
  "excellent-concise",
  "excellent-verbose",
  "short-missed-point",
  "mostly-correct-unclear",
  "missing-causal-relationship",
  "material-contradiction",
  "overcompressed-fragment",
  "irrelevant",
] as const;

const gradeSchema = z.enum(["A", "B", "C", "D"]);
const calibrationKindSchema = z.enum(calibrationKinds);

const calibrationAnswerSchema = z.object({
  kind: calibrationKindSchema,
  answer: z.string().min(1),
  signal: gradeSchema,
  clarity: gradeSchema,
});

const calibrationChallengeSchema = z.object({
  challengeId: z.string().min(1),
  answers: z.array(calibrationAnswerSchema).length(calibrationKinds.length),
});

export const calibrationDatasetSchema = z.object({
  version: z.literal(1),
  language: z.enum(["en", "ko"]),
  challenges: z.array(calibrationChallengeSchema).min(1),
});

export type CalibrationDataset = z.infer<typeof calibrationDatasetSchema>;
