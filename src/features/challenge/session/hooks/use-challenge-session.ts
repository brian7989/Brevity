"use client";

import { useCallback, useState } from "react";

import type { ChallengeLanguage } from "@/features/challenge/domain";
import { richTextToPlainText } from "@/features/challenge/utils";
import type { StoredResult } from "@/features/results";

import type { ChallengeSessionStatus } from "../challenge-session-status";
import { trackChallengeCompleted, trackChallengeSubmitted } from "../challenge-session-analytics";
import { scoreChallengeSessionAnswer } from "../challenge-session-scoring";
import { clearChallengeSessionAttempt, saveChallengeSessionResult } from "../challenge-session-storage";
import { useChallengeCatalog } from "./use-challenge-catalog";
import { useSessionHydration } from "./use-session-hydration";

export function useChallengeSession(language: ChallengeLanguage) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<ChallengeSessionStatus>("loading");
  const [result, setResult] = useState<StoredResult | null>(null);
  const [streak, setStreak] = useState(0);
  const catalog = useChallengeCatalog(language);

  useSessionHydration({
    challenge: catalog.challenge,
    language,
    localDate: catalog.localDate,
    setAnswer,
    setResult,
    setStatus,
    setStreak,
  });

  const submit = useCallback(async () => {
    const plainAnswer = richTextToPlainText(answer);
    if (!plainAnswer || status === "scoring" || status === "complete") return;

    trackChallengeSubmitted(catalog.challenge, language, plainAnswer);
    setStatus("scoring");

    try {
      const scored = await scoreChallengeSessionAnswer(catalog.challenge, language, answer);
      const storedResult = { ...scored, localDate: catalog.localDate };
      const saved = saveChallengeSessionResult(storedResult);

      trackChallengeCompleted(catalog.challenge, language, scored);
      setResult(saved.result);
      setStreak(saved.streak);
      setStatus("complete");
    } catch {
      setStatus("error");
    }
  }, [answer, catalog.challenge, catalog.localDate, language, status]);

  const resetAttempt = useCallback(() => {
    const nextSession = clearChallengeSessionAttempt(catalog.challenge.id);
    setAnswer("");
    setResult(null);
    setStreak(nextSession.streak);
    setStatus("writing");
  }, [catalog.challenge.id]);

  const selectChallenge = useCallback(
    (challengeId: string) => {
      if (!catalog.selectChallenge(challengeId)) return;
      setAnswer("");
      setResult(null);
      setStatus("loading");
    },
    [catalog],
  );

  const previousChallenge = useCallback(() => {
    setAnswer("");
    setResult(null);
    setStatus("loading");
    catalog.previousChallenge();
  }, [catalog]);

  const nextChallenge = useCallback(() => {
    setAnswer("");
    setResult(null);
    setStatus("loading");
    catalog.nextChallenge();
  }, [catalog]);

  return {
    answer,
    challenge: catalog.challenge,
    challenges: catalog.challenges,
    nextChallenge,
    previousChallenge,
    resetAttempt,
    result,
    selectChallenge,
    setAnswer,
    status,
    streak,
    submit,
  };
}
