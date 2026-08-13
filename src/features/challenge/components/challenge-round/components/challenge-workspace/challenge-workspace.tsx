"use client";

import { useTranslations } from "next-intl";

import type { Challenge } from "@/features/challenge";

import type { ChallengeGameStatus } from "../../challenge-game-status";
import { MobileWorkspaceNavigation, OriginalPassage, ResponseComposer } from "./components";
import { useWorkspacePhase } from "./hooks";

type ChallengeWorkspaceProps = {
  answer: string;
  challenge: Challenge;
  disabled: boolean;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  plainAnswer: string;
  status: ChallengeGameStatus;
  submitDisabled: boolean;
  targetWords: number;
};

export function ChallengeWorkspace({
  answer,
  challenge,
  disabled,
  onAnswerChange,
  onSubmit,
  plainAnswer,
  status,
  submitDisabled,
  targetWords,
}: ChallengeWorkspaceProps) {
  const t = useTranslations("Game");
  const { phase, showReading, showWriting } = useWorkspacePhase(answer);

  return (
    <div className="workspace" data-phase={phase}>
      <OriginalPassage challenge={challenge} />
      <MobileWorkspaceNavigation
        backLabel={t("viewOriginal")}
        onShowReading={showReading}
        onShowWriting={showWriting}
        phase={phase}
        writeLabel={t("writeAnswer")}
      />
      <ResponseComposer
        answer={answer}
        disabled={disabled}
        onAnswerChange={(nextAnswer) => {
          showWriting();
          onAnswerChange(nextAnswer);
        }}
        onSubmit={onSubmit}
        plainAnswer={plainAnswer}
        status={status}
        submitDisabled={submitDisabled}
        targetWords={targetWords}
      />
    </div>
  );
}
