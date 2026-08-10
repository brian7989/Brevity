import { useTranslations } from "next-intl";

import type { Challenge } from "@/features/challenge";
import type { StoredResult } from "@/features/results/schemas";

import {
  AnswerComparison,
  ResultEyebrow,
  ResultFeedback,
  ResultTitle,
  ScoreGrid,
  SignalCheck,
  TomorrowNote,
} from "./components";
import { AnswerBlock } from "./components/answer-comparison/components";

type ResultViewProps = { challenge: Challenge; result: StoredResult; streak: number };

export function ResultView({ challenge, result, streak }: ResultViewProps) {
  const t = useTranslations("Result");
  const game = useTranslations("Game");
  return (
    <section className="result" aria-labelledby="result-title">
      <ResultEyebrow completeLabel={t("complete")} streakLabel={game("streak", { count: streak })} />
      <ResultTitle title={t(`title.${result.signal}`)} />
      <ScoreGrid
        clarityLabel={t("clarity")}
        clarityValue={result.clarity}
        signalLabel={t("signal")}
        signalValue={result.signal}
        wordsLabel={t("words")}
        wordsValue={String(result.playerWords)}
      />
      <ResultFeedback feedback={result.feedback} />
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
      <SignalCheck result={result} />
      <TomorrowNote text={t("tomorrow")} />
    </section>
  );
}
