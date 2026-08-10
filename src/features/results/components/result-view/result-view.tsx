import { useTranslations } from "next-intl";

import type { Challenge } from "@/features/challenge";
import type { StoredResult } from "@/features/results/schemas";

import { AnswerComparison, ResultEyebrow, ResultExplanation, ResultSummary, TomorrowNote } from "./components";
import { AnswerBlock } from "./components/answer-comparison/components";

type ResultViewProps = { challenge: Challenge; result: StoredResult; streak: number };

export function ResultView({ challenge, result, streak }: ResultViewProps) {
  const t = useTranslations("Result");
  const game = useTranslations("Game");
  return (
    <section className="result" aria-labelledby="result-title">
      <ResultEyebrow completeLabel={t("complete")} streakLabel={game("streak", { count: streak })} />
      <ResultSummary
        clarityLabel={t("clarity")}
        clarityValue={result.clarity}
        signalLabel={t("signal")}
        signalValue={result.signal}
        title={t(`title.${result.signal}`)}
        wordsLabel={t("words")}
        wordsValue={String(result.playerWords)}
      />
      <ResultExplanation
        actionLabel={t("nextStep")}
        feedback={result.feedback}
        rationale={result.rationale ?? t("fallbackRationale")}
        title={t("whyGrade")}
      />
      <AnswerComparison
        playerAnswer={
          <AnswerBlock
            label={t("youWrote")}
            text={result.answer}
            meta={t("playerMeta", { count: result.playerWords })}
            rich
          />
        }
        referenceAnswer={
          <AnswerBlock
            label={t("reference")}
            text={challenge.referenceAnswer}
            meta={t("referenceMeta", { count: result.originalWords, percent: result.compression })}
          />
        }
      />
      <TomorrowNote text={t("tomorrow")} />
    </section>
  );
}
