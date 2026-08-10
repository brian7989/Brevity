import type { Challenge } from "@/features/challenge";

import type { ChallengeGameStatus } from "../../challenge-game-status";
import { OriginalPassage, ResponseComposer } from "./components";

type ChallengeWorkspaceProps = {
  answer: string;
  challenge: Challenge;
  disabled: boolean;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  plainAnswer: string;
  status: ChallengeGameStatus;
  submitDisabled: boolean;
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
}: ChallengeWorkspaceProps) {
  return (
    <div className="workspace">
      <OriginalPassage challenge={challenge} />
      <ResponseComposer
        answer={answer}
        disabled={disabled}
        onAnswerChange={onAnswerChange}
        onSubmit={onSubmit}
        plainAnswer={plainAnswer}
        status={status}
        submitDisabled={submitDisabled}
      />
    </div>
  );
}
