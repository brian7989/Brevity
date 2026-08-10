import { Check } from "lucide-react";
import { Menu } from "@base-ui/react/menu";

import type { AppLocale } from "@/i18n";

type LanguageMenuItemProps = { flag: string; label: string; value: AppLocale };

export function LanguageMenuItem({ flag, label, value }: LanguageMenuItemProps) {
  return (
    <Menu.RadioItem className="settings-menu__item" closeOnClick label={label} value={value}>
      <span className="settings-menu__flag" aria-hidden="true">
        {flag}
      </span>
      <span>{label}</span>
      <Menu.RadioItemIndicator className="settings-menu__check">
        <Check aria-hidden="true" size={13} strokeWidth={2} />
      </Menu.RadioItemIndicator>
    </Menu.RadioItem>
  );
}
