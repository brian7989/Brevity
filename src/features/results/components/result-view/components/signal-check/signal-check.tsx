import { useTranslations } from "next-intl";

import type { StoredResult } from "@/features/results/schemas";

import { SignalCheckItem } from "./components";

type SignalCheckProps = { result: StoredResult };

export function SignalCheck({ result }: SignalCheckProps) {
  const t = useTranslations("Result");

  return (
    <div className="signal-check">
      <SignalCheckItem label={t("kept")} text={result.preservedKeyPoints[0] ?? t("nothingKept")} />
      {result.partialKeyPoints[0] ? <SignalCheckItem label={t("blurred")} text={result.partialKeyPoints[0]} /> : null}
      {result.missedKeyPoints[0] ? <SignalCheckItem label={t("missed")} text={result.missedKeyPoints[0]} /> : null}
    </div>
  );
}
