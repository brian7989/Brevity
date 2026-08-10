import { useTranslations } from "next-intl";

import type { AppLocale } from "@/i18n";

import { GameLogo, HeaderActions, WritingPrinciples } from "./components";

type ShellHeaderProps = { language: AppLocale; streak: number };

export function ShellHeader({ language, streak }: ShellHeaderProps) {
  const t = useTranslations("Game");

  return (
    <header className="masthead">
      <GameLogo homeLabel={t("home")} />
      <WritingPrinciples label={t("principle")} items={[t("identify"), t("prioritize"), t("compress")]} />
      <HeaderActions language={language} languageLabel={t("language")} streakLabel={t("streak", { count: streak })} />
    </header>
  );
}
