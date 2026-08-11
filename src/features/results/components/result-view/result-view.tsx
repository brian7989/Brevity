import { useTranslations } from "next-intl";

import {
  calculateCompression,
  countPreservedEssentialPoints,
  countWords,
  getChallengeGoal,
  type Challenge,
} from "@/features/challenge";
import type { StoredResult } from "@/features/results/schemas";
import { getResultHeadlineKey } from "@/features/results/domain";

import {
  AnswerComparison,
  MeaningBreakdown,
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
  const goal = getChallengeGoal(challenge);
  const essentialPoints = challenge.keyPoints.filter(({ importance }) => importance === "essential");
  const preservedEssentialPoints = countPreservedEssentialPoints(challenge, result);
  const targetMet = result.playerWords <= goal.targetWords;
  const meaningComplete = preservedEssentialPoints === goal.essentialPoints;
  const headline = getResultHeadlineKey({
    clarity: result.clarity,
    meaningComplete,
    scanability: result.scanability,
    targetMet,
  });
  return (
    <section className="result" aria-labelledby="result-title">
      <ResultEyebrow completeLabel={t("complete")} streakLabel={game("streak", { count: streak })} />
      <ResultSummary
        clarityLabel={t("clarity")}
        clarityValue={result.clarity}
        meaningLabel={t("meaning")}
        meaningValue={`${preservedEssentialPoints}/${goal.essentialPoints}`}
        scanabilityLabel={t("scanability")}
        scanabilityValue={result.scanability}
        targetLabel={t("target")}
        targetValue={targetMet ? t("met") : t("missedTarget")}
        title={t(`outcomeTitle.${headline}`)}
      />
      <MeaningBreakdown
        keyPoints={essentialPoints}
        labels={{ kept: t("kept"), partial: t("blurred"), missed: t("missed") }}
        result={result}
        title={t("meaningBreakdown")}
      />
      <ResultExplanation
        actionLabel={t("nextStep")}
        feedback={result.feedback}
        formattingFeedback={result.formattingFeedback}
        formattingLabel={t("formattingFeedback")}
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
