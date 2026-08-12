export const locales = ["en", "ko"] as const;
export const defaultLocale = "en" as const;
export const localeCookie = "BREVITY_LOCALE";

export type AppLocale = (typeof locales)[number];

export function isAppLocale(value: string | undefined): value is AppLocale {
  return locales.includes(value as AppLocale);
}

export function resolveRequestLocale(savedLocale?: string, acceptLanguage?: string | null): AppLocale {
  if (isAppLocale(savedLocale)) return savedLocale;

  const preferredLanguages = (acceptLanguage ?? "")
    .split(",")
    .map((entry, index) => {
      const [language, ...parameters] = entry.trim().toLowerCase().split(";");
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1;
      return { index, language: language.split("-")[0], quality: Number.isNaN(quality) ? 0 : quality };
    })
    .sort((left, right) => right.quality - left.quality || left.index - right.index);

  const matchedLanguage = preferredLanguages.find(({ language }) => isAppLocale(language))?.language;
  return isAppLocale(matchedLanguage) ? matchedLanguage : defaultLocale;
}
