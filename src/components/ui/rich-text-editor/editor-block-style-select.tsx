import { useTranslations } from "next-intl";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";

type EditorBlockStyleSelectProps = { blockStyle: string; disabled: boolean; onChange: (value: string) => void };

export function EditorBlockStyleSelect({ blockStyle, disabled, onChange }: EditorBlockStyleSelectProps) {
  const t = useTranslations("Editor");
  const blockStyles = [
    { label: t("text"), value: "p" },
    { label: t("heading"), value: "h2" },
    { label: t("subheading"), value: "h3" },
    { label: t("quote"), value: "quote" },
  ];

  return (
    <Select
      items={blockStyles}
      value={blockStyle}
      disabled={disabled}
      onValueChange={(value) => {
        if (value !== null) onChange(value);
      }}
    >
      <SelectTrigger className="editor-style-select" aria-label={t("textStyle")}>
        <SelectValue>{getBlockStyleLabel(blockStyle, t)}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="p">{t("text")}</SelectItem>
        <SelectItem value="h2">{t("heading")}</SelectItem>
        <SelectItem value="h3">{t("subheading")}</SelectItem>
        <SelectItem value="quote">{t("quote")}</SelectItem>
      </SelectContent>
    </Select>
  );
}

function getBlockStyleLabel(blockStyle: string, t: ReturnType<typeof useTranslations<"Editor">>) {
  if (blockStyle === "h2") return t("heading");
  if (blockStyle === "h3") return t("subheading");
  if (blockStyle === "quote") return t("quote");
  return t("text");
}
