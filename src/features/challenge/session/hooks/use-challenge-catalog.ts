"use client";

import { useCallback, useMemo, useState } from "react";

import type { ChallengeLanguage } from "@/features/challenge/domain";
import { localContentRepository } from "@/features/challenge/repository";
import { getDailyChallenge, getLocalDate } from "@/features/challenge/utils";

export function useChallengeCatalog(language: ChallengeLanguage) {
  const localDate = useMemo(() => getLocalDate(), []);
  const challenges = useMemo(() => localContentRepository.list(language), [language]);
  const dailyChallenge = useMemo(() => getDailyChallenge(localDate, language), [language, localDate]);
  const [challengeId, setChallengeId] = useState(dailyChallenge.id);
  const challengeIndex = challenges.findIndex((candidate) => candidate.id === challengeId);
  const challenge = challenges[challengeIndex] ?? dailyChallenge;

  const selectChallenge = useCallback(
    (nextChallengeId: string) => {
      if (!localContentRepository.find(language, nextChallengeId)) return false;
      setChallengeId(nextChallengeId);
      return true;
    },
    [language],
  );

  const previousChallenge = useCallback(() => {
    const previousIndex = (challengeIndex - 1 + challenges.length) % challenges.length;
    return selectChallenge(challenges[previousIndex].id);
  }, [challengeIndex, challenges, selectChallenge]);

  const nextChallenge = useCallback(() => {
    const nextIndex = (challengeIndex + 1) % challenges.length;
    return selectChallenge(challenges[nextIndex].id);
  }, [challengeIndex, challenges, selectChallenge]);

  return { challenge, challengeIndex, challenges, localDate, nextChallenge, previousChallenge, selectChallenge };
}
