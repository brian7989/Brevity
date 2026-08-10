import { CircleHelp } from "lucide-react";
import { useTranslations } from "next-intl";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";

export function ChallengeHelp() {
  const t = useTranslations("Game");

  return (
    <Tooltip>
      <TooltipTrigger render={<button className="help-trigger" type="button" aria-label={t("help")} />}>
        <CircleHelp aria-hidden="true" size={16} strokeWidth={1.7} />
      </TooltipTrigger>
      <TooltipContent className="challenge-help" side="right">
        {t("help")}
      </TooltipContent>
    </Tooltip>
  );
}
