import type { ChallengeLanguage } from "@/features/challenge/domain";
import type { Challenge } from "@/features/challenge/schemas";

export interface ChallengeRepository {
  find(language: ChallengeLanguage, challengeId: string): Challenge | undefined;
  list(language: ChallengeLanguage): readonly Challenge[];
}
