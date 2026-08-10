import type { AppLocale } from "@/i18n";

import { LanguageSwitcher, StreakCounter } from "./components";

type HeaderActionsProps = { language: AppLocale; languageLabel: string; streakLabel: string };

export function HeaderActions({ language, languageLabel, streakLabel }: HeaderActionsProps) {
  return (
    <div className="masthead__actions">
      <LanguageSwitcher language={language} label={languageLabel} />
      <StreakCounter label={streakLabel} />
    </div>
  );
}
