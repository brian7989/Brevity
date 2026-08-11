import { useTranslations } from "next-intl";

import type { Challenge } from "@/features/challenge/schemas";

import { ChallengeConfigurationError, ChallengeHeadline, ChallengeMeta, ChallengeMission } from "./components";

type ChallengeIntroProps = {
  aiConfigured: boolean;
  challengeId: string;
  essentialPoints: number;
  formattingOpportunity: Challenge["formattingOpportunity"];
  targetWords: number;
};

export function ChallengeIntro({
  aiConfigured,
  challengeId,
  essentialPoints,
  formattingOpportunity,
  targetWords,
}: ChallengeIntroProps) {
  const t = useTranslations("Game");

  return (
    <div className="challenge__intro">
      <ChallengeMeta challengeId={challengeId} />
      <ChallengeHeadline primary={t("titlePrimary")} accent={t("titleAccent")} />
      <ChallengeMission
        formattingLabel={t(`formatting.${formattingOpportunity}`)}
        label={t("mission", { points: essentialPoints, target: targetWords })}
      />
      {!aiConfigured ? <ChallengeConfigurationError message={t("configurationError")} /> : null}
    </div>
  );
}
