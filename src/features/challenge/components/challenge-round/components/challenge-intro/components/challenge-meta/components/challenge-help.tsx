import { CircleHelp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Popover } from "@base-ui/react/popover";

export function ChallengeHelp() {
  const t = useTranslations("Game");

  return (
    <Popover.Root>
      <Popover.Trigger className="help-trigger" type="button" aria-label={t("help")} openOnHover={false}>
        <CircleHelp aria-hidden="true" size={16} strokeWidth={1.7} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="right" sideOffset={8}>
          <Popover.Popup className="help-popover">{t("help")}</Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
