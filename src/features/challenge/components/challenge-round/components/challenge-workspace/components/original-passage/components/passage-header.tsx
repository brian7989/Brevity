import { PanelMetric, PanelTitle } from "../../../../shared";

type PassageHeaderProps = { label: string; words: string };

export function PassageHeader({ label, words }: PassageHeaderProps) {
  return (
    <div className="panel-label">
      <PanelTitle id="source-label" label={label} />
      <PanelMetric value={words} />
    </div>
  );
}
