import { PanelMetric, PanelTitle } from "../../../../../shared";

type ResponseHeaderProps = { active: boolean; label: string; words: string };

export function ResponseHeader({ active, label, words }: ResponseHeaderProps) {
  return (
    <label className="panel-label" htmlFor="answer">
      <PanelTitle label={label} />
      <PanelMetric active={active} value={words} />
    </label>
  );
}
