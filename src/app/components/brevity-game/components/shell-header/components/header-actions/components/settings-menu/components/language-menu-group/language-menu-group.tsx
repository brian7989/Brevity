import { Menu } from "@base-ui/react/menu";

import type { AppLocale } from "@/i18n";

import { LanguageMenuItem } from "./components";

type LanguageMenuGroupProps = { language: AppLocale; label: string; onChange: (value: string) => void };

export function LanguageMenuGroup({ language, label, onChange }: LanguageMenuGroupProps) {
  return (
    <Menu.Group>
      <Menu.GroupLabel className="settings-menu__label">{label}</Menu.GroupLabel>
      <Menu.RadioGroup value={language} onValueChange={(value) => onChange(String(value))}>
        <LanguageMenuItem flag="🇰🇷" label="한국어" value="ko" />
        <LanguageMenuItem flag="🇺🇸" label="English" value="en" />
      </Menu.RadioGroup>
    </Menu.Group>
  );
}
