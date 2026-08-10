import type { ChallengeLanguage } from "@/features/challenge/domain";
import { localContentRepository } from "@/features/challenge/repository";
import type { Challenge } from "@/features/challenge/schemas";

export function getDailyChallenge(localDate: string, language: ChallengeLanguage = "en"): Challenge {
  const challenges = localContentRepository.list(language);
  if (!challenges.length) throw new Error("NO_CHALLENGES_FOR_LANGUAGE");
  const [year, month, day] = localDate.split("-").map(Number);
  const dayNumber = Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
  return challenges[((dayNumber % challenges.length) + challenges.length) % challenges.length];
}

export function getLocalDate(date = new Date()): string {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return offsetDate.toISOString().slice(0, 10);
}
