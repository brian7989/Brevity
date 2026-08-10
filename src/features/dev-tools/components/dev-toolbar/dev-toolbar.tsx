import { useTranslations } from "next-intl";

import type { Challenge } from "@/features/challenge";

import { DevToolbarLabel } from "./dev-toolbar-label";
import { DevChallengeSelector, DevToolbarButton } from "./components";

type DevToolbarProps = {
  challengeId: string;
  challenges: readonly Challenge[];
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onSelect: (challengeId: string) => void;
};

export function DevToolbar({ challengeId, challenges, onNext, onPrevious, onReset, onSelect }: DevToolbarProps) {
  const t = useTranslations("DevTools");
  return (
    <aside className="dev-toolbar" aria-label={t("toolbar")}>
      <DevToolbarLabel label={t("label")} />
      <DevToolbarButton ariaLabel={t("previous")} label="←" onPress={onPrevious} />
      <DevChallengeSelector
        challengeId={challengeId}
        challengeLabel={t("challenge")}
        challenges={challenges}
        onSelect={onSelect}
      />
      <DevToolbarButton ariaLabel={t("next")} label="→" onPress={onNext} />
      <DevToolbarButton label={t("reset")} onPress={onReset} />
    </aside>
  );
}
