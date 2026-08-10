import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { generateObject } from "ai";
import { z } from "zod";

import { challengeSchema } from "../src/features/challenge/schemas";
import { DEFAULT_AI_MODEL } from "../src/config";

const generatedChallengeSchema = challengeSchema.omit({ id: true, date: true });
const batchSchema = z.object({ challenges: z.array(generatedChallengeSchema) });

async function main() {
  const count = readCount(process.argv);
  if (!process.env.AI_GATEWAY_API_KEY) throw new Error("AI_GATEWAY_API_KEY is required to generate challenges.");

  const { object } = await generateObject({
    model: process.env.AI_MODEL ?? DEFAULT_AI_MODEL,
    schema: batchSchema,
    prompt: `Create ${count} varied daily concise-writing challenges. Each passage must be 60–120 words and feel realistic, useful, and specific. Vary business, civic, research, operational, and everyday professional scenarios. Key points must be atomic semantic claims, with the central decision or consequence essential and context supporting. Reference answers must retain the point in roughly 12–25 words. Avoid corporate filler and repeated structures.`,
  });

  const directory = path.join(process.cwd(), "generated-challenges");
  await mkdir(directory, { recursive: true });
  for (const [index, challenge] of batchSchema.parse(object).challenges.entries()) {
    const dated = challengeSchema.parse({
      ...challenge,
      id: `challenge-${String(index + 1).padStart(2, "0")}`,
      date: new Date(Date.UTC(2030, 0, index + 1)).toISOString().slice(0, 10),
    });
    const filename = `${dated.date}-${dated.id}.json`;
    await writeFile(path.join(directory, filename), `${JSON.stringify(dated, null, 2)}\n`, "utf8");
  }
  console.log(`Wrote ${count} validated challenges to generated-challenges/`);
}

function readCount(args: string[]): number {
  const inline = args.find((argument) => argument.startsWith("--count="))?.split("=")[1];
  const flagIndex = args.indexOf("--count");
  const value = inline ?? (flagIndex >= 0 ? args[flagIndex + 1] : "30");
  return z.coerce.number().int().min(1).max(100).parse(value);
}

void main();
