import type { AppLocale } from "@/i18n";

import { SettingsMenu, StreakCounter } from "./components";

type HeaderActionsProps = { language: AppLocale; languageLabel: string; streakLabel: string };

export function HeaderActions({ language, languageLabel, streakLabel }: HeaderActionsProps) {
  return (
    <div className="masthead__actions">
      <StreakCounter label={streakLabel} />
      <SettingsMenu language={language} languageLabel={languageLabel} settingsLabel={languageLabel} />
    </div>
  );
}
