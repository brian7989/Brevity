"use client";

import { useRouter } from "next/navigation";
import { Menu } from "@base-ui/react/menu";

import { isAppLocale, localeCookie, type AppLocale } from "@/i18n";

import { LanguageMenuGroup, SettingsMenuTrigger } from "./components";

type SettingsMenuProps = { language: AppLocale; languageLabel: string; settingsLabel: string };

export function SettingsMenu({ language, languageLabel, settingsLabel }: SettingsMenuProps) {
  const router = useRouter();

  return (
    <Menu.Root>
      <SettingsMenuTrigger label={settingsLabel} />
      <Menu.Portal>
        <Menu.Positioner align="end" sideOffset={8}>
          <Menu.Popup className="settings-menu">
            <LanguageMenuGroup
              language={language}
              label={languageLabel}
              onChange={(value) => {
                if (!isAppLocale(value)) return;
                document.cookie = `${localeCookie}=${value};path=/;max-age=31536000;samesite=lax`;
                router.refresh();
              }}
            />
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
