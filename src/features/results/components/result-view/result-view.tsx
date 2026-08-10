import { useTranslations } from "next-intl";

import { calculateCompression, countWords, type Challenge } from "@/features/challenge";
import type { StoredResult } from "@/features/results/schemas";

import {
  AnswerComparison,
  OriginalPassageDisclosure,
  ResultEyebrow,
  ResultExplanation,
  ResultSummary,
  TomorrowNote,
} from "./components";
import { AnswerBlock } from "./components/answer-comparison/components";

type ResultViewProps = { challenge: Challenge; result: StoredResult; streak: number };

export function ResultView({ challenge, result, streak }: ResultViewProps) {
  const t = useTranslations("Result");
  const game = useTranslations("Game");
  const referenceWords = countWords(challenge.referenceAnswer);
  const referenceCompression = calculateCompression(result.originalWords, referenceWords);
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
      <OriginalPassageDisclosure
        closeLabel={t("hideOriginal")}
        meta={t("wordMeta", { count: result.originalWords })}
        openLabel={t("viewOriginal")}
        passage={challenge.passage}
      />
      <AnswerComparison
        playerAnswer={
          <AnswerBlock
            label={t("youWrote")}
            text={result.answer}
            meta={t("answerMeta", { count: result.playerWords, percent: result.compression })}
            rich
          />
        }
        referenceAnswer={
          <AnswerBlock
            label={t("reference")}
            text={challenge.referenceAnswer}
            meta={t("answerMeta", { count: referenceWords, percent: referenceCompression })}
          />
        }
      />
      <TomorrowNote text={t("tomorrow")} />
    </section>
  );
}
