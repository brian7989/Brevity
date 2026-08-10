import { useTranslations } from "next-intl";

import { Button } from "@/components";

import type { ChallengeGameStatus } from "../../../../../../challenge-game-status";
import { SubmitButtonLabel, SubmitStatusMessage } from "./components";

type SubmitBarProps = { disabled: boolean; hasAnswer: boolean; status: ChallengeGameStatus };

export function SubmitBar({ disabled, hasAnswer, status }: SubmitBarProps) {
  const t = useTranslations("Game");

  return (
    <div className="response__footer">
      <SubmitStatusMessage text={status === "error" ? t("scoringError") : t("answerRule")} />
      <Button type="submit" disabled={!hasAnswer || disabled}>
        <SubmitButtonLabel
          label={status === "error" ? t("retry") : status === "scoring" ? t("scoring") : t("submit")}
          loading={status === "scoring"}
        />
      </Button>
    </div>
  );
}
