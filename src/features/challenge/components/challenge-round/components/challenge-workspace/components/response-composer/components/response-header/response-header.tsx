import { PanelMetric, PanelTitle } from "../../../../../shared";

type ResponseHeaderProps = { active: boolean; label: string; overTarget: boolean; words: string };

export function ResponseHeader({ active, label, overTarget, words }: ResponseHeaderProps) {
  return (
    <label className="panel-label" htmlFor="answer">
      <PanelTitle label={label} />
      <PanelMetric active={active} exceeded={overTarget} value={words} />
    </label>
  );
}
