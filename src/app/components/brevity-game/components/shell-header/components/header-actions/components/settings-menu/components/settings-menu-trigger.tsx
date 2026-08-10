import { UserRound } from "lucide-react";
import { Menu } from "@base-ui/react/menu";

type SettingsMenuTriggerProps = { label: string };

export function SettingsMenuTrigger({ label }: SettingsMenuTriggerProps) {
  return (
    <Menu.Trigger className="settings-trigger" type="button" aria-label={label} openOnHover={false}>
      <UserRound aria-hidden="true" size={17} strokeWidth={1.8} />
    </Menu.Trigger>
  );
}
