import { SelectItem } from "@/components";
import type { AppLocale } from "@/i18n";

import { AccessibleLanguageName, LanguageFlag } from "./components";

type LanguageOptionProps = { value: AppLocale; flag: string; label: string };

export function LanguageOption({ value, flag, label }: LanguageOptionProps) {
  return (
    <SelectItem className="language-option" value={value}>
      <LanguageFlag flag={flag} />
      <AccessibleLanguageName label={label} />
    </SelectItem>
  );
}
