import { useTranslations } from "next-intl";

import { ChallengeHelp, ChallengeKicker } from "./components";

type ChallengeMetaProps = { challengeId: string };

export function ChallengeMeta({ challengeId }: ChallengeMetaProps) {
  const t = useTranslations("Game");

  return (
    <div className="challenge__meta">
      <ChallengeKicker challengeNumber={`№ ${challengeId.slice(-2)}`} label={t("today")} />
      <ChallengeHelp />
    </div>
  );
}
