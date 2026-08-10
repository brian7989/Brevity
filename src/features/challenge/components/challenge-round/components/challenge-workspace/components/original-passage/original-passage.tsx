import { useTranslations } from "next-intl";

import type { Challenge } from "@/features/challenge";
import { countWords } from "@/features/challenge/utils";

import { PassageHeader, PassageText } from "./components";

type OriginalPassageProps = { challenge: Challenge };

export function OriginalPassage({ challenge }: OriginalPassageProps) {
  const t = useTranslations("Game");

  return (
    <article className="passage" aria-labelledby="source-label">
      <PassageHeader label={t("original")} words={`${countWords(challenge.passage)} ${t("words")}`} />
      <PassageText text={challenge.passage} />
    </article>
  );
}
