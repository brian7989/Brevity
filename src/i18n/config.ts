export const locales = ["ko", "en"] as const;
export const defaultLocale = "ko" as const;
export const localeCookie = "BREVITY_LOCALE";

export type AppLocale = (typeof locales)[number];

export function isAppLocale(value: string | undefined): value is AppLocale {
  return locales.includes(value as AppLocale);
}
