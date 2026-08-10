import { englishChallengeContent } from "@content/en";
import { koreanChallengeContent } from "@content/ko";

import type { ChallengeLanguage } from "@/features/challenge/domain";
import { challengesSchema, type Challenge } from "@/features/challenge/schemas";

import type { ChallengeRepository } from "./challenge-repository";

const content: Record<ChallengeLanguage, readonly Challenge[]> = {
  en: challengesSchema.parse(englishChallengeContent),
  ko: challengesSchema.parse(koreanChallengeContent),
};

export const localContentRepository: ChallengeRepository = {
  find(language, challengeId) {
    return content[language].find(({ id }) => id === challengeId);
  },
  list(language) {
    return content[language];
  },
};

export const challenges = localContentRepository.list("en");
