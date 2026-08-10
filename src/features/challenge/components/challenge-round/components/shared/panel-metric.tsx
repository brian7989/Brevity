type PanelMetricProps = { active?: boolean; value: string };

export function PanelMetric({ active = false, value }: PanelMetricProps) {
  return <span className={active ? "count-active" : ""}>{value}</span>;
}
