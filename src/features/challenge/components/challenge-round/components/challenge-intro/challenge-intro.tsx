import { useTranslations } from "next-intl";

import { ChallengeConfigurationError, ChallengeHeadline, ChallengeMeta } from "./components";

type ChallengeIntroProps = { aiConfigured: boolean; challengeId: string };

export function ChallengeIntro({ aiConfigured, challengeId }: ChallengeIntroProps) {
  const t = useTranslations("Game");

  return (
    <div className="challenge__intro">
      <ChallengeMeta challengeId={challengeId} />
      <ChallengeHeadline primary={t("titlePrimary")} accent={t("titleAccent")} />
      {!aiConfigured ? <ChallengeConfigurationError message={t("configurationError")} /> : null}
    </div>
  );
}
