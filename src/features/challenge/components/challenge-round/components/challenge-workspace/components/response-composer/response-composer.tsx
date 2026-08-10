import { useTranslations } from "next-intl";

import { RichTextEditor } from "@/components";
import { countWords } from "@/features/challenge/utils";

import type { ChallengeGameStatus } from "../../../../challenge-game-status";
import { ResponseHeader, SubmitBar } from "./components";

type ResponseComposerProps = {
  answer: string;
  disabled: boolean;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  plainAnswer: string;
  status: ChallengeGameStatus;
  submitDisabled: boolean;
};

export function ResponseComposer({
  answer,
  disabled,
  onAnswerChange,
  onSubmit,
  plainAnswer,
  status,
  submitDisabled,
}: ResponseComposerProps) {
  const t = useTranslations("Game");

  return (
    <form
      className="response"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <ResponseHeader
        active={Boolean(plainAnswer)}
        label={t("yourVersion")}
        words={`${countWords(plainAnswer)} ${t("words")}`}
      />
      <RichTextEditor id="answer" value={answer} onChange={onAnswerChange} disabled={disabled} />
      <SubmitBar disabled={disabled || submitDisabled} hasAnswer={Boolean(plainAnswer)} status={status} />
    </form>
  );
}
