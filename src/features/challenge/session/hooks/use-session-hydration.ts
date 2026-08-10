"use client";

import { useEffect } from "react";

import type { ChallengeLanguage } from "@/features/challenge/domain";
import type { Challenge } from "@/features/challenge/schemas";
import type { StoredResult } from "@/features/results";

import type { ChallengeSessionStatus } from "../challenge-session-status";
import { readChallengeSessionSnapshot } from "../challenge-session-storage";
import { trackChallengeOpened } from "../challenge-session-analytics";

type UseSessionHydrationProps = {
  challenge: Challenge;
  language: ChallengeLanguage;
  localDate: string;
  setAnswer: (answer: string) => void;
  setResult: (result: StoredResult | null) => void;
  setStatus: (status: ChallengeSessionStatus) => void;
  setStreak: (streak: number) => void;
};

export function useSessionHydration({
  challenge,
  language,
  localDate,
  setAnswer,
  setResult,
  setStatus,
  setStreak,
}: UseSessionHydrationProps): void {
  useEffect(() => {
    const hydrate = window.setTimeout(() => {
      const snapshot = readChallengeSessionSnapshot(challenge);

      trackChallengeOpened(challenge, language, localDate);
      setStreak(snapshot.streak);
      setResult(snapshot.result);
      setAnswer(snapshot.result?.answer ?? "");
      setStatus(snapshot.status);
    }, 0);

    return () => window.clearTimeout(hydrate);
  }, [challenge, language, localDate, setAnswer, setResult, setStatus, setStreak]);
}
