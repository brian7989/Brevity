import { useTranslations } from "next-intl";

import { ShellFooterLine } from "./components";

export function ShellFooter() {
  const t = useTranslations("Game");

  return (
    <footer>
      <ShellFooterLine text={t("footerGame")} />
      <ShellFooterLine text={t("footerMotto")} />
    </footer>
  );
}
