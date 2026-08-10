import type { Challenge } from "@/features/challenge";
import { richTextToPlainText } from "@/features/challenge/utils";

import type { ChallengeGameStatus } from "./challenge-game-status";
import { ChallengeIntro, ChallengeWorkspace } from "./components";

type ChallengeRoundProps = {
  aiConfigured: boolean;
  answer: string;
  challenge: Challenge;
  disabled: boolean;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  status: ChallengeGameStatus;
};

export function ChallengeRound({
  aiConfigured,
  answer,
  challenge,
  disabled,
  onAnswerChange,
  onSubmit,
  status,
}: ChallengeRoundProps) {
  const plainAnswer = richTextToPlainText(answer);

  return (
    <section className="challenge" aria-labelledby="challenge-title">
      <ChallengeIntro aiConfigured={aiConfigured} challengeId={challenge.id} />
      <ChallengeWorkspace
        answer={answer}
        challenge={challenge}
        disabled={disabled}
        onAnswerChange={onAnswerChange}
        onSubmit={onSubmit}
        plainAnswer={plainAnswer}
        status={status}
        submitDisabled={!aiConfigured}
      />
    </section>
  );
}
