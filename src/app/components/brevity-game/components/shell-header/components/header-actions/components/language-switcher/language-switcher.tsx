"use client";

import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components";
import { localeCookie, type AppLocale } from "@/i18n";

import { LanguageOption } from "./components";

type LanguageSwitcherProps = { language: AppLocale; label: string };

export function LanguageSwitcher({ language, label }: LanguageSwitcherProps) {
  const router = useRouter();
  const languageName = language === "ko" ? "한국어" : "English";
  const languages = [
    { label: "한국어", value: "ko" },
    { label: "English", value: "en" },
  ];

  return (
    <Select
      items={languages}
      value={language}
      onValueChange={(value) => {
        if (value === null) return;
        document.cookie = `${localeCookie}=${value};path=/;max-age=31536000;samesite=lax`;
        router.refresh();
      }}
    >
      <SelectTrigger className="language-select" aria-label={`${label}: ${languageName}`}>
        <SelectValue>{language === "ko" ? "🇰🇷" : "🇺🇸"}</SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        <LanguageOption value="ko" flag="🇰🇷" label="한국어" />
        <LanguageOption value="en" flag="🇺🇸" label="English" />
      </SelectContent>
    </Select>
  );
}
