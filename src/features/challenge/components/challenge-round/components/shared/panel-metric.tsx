import { clsx } from "clsx";

type PanelMetricProps = { active?: boolean; exceeded?: boolean; value: string };

export function PanelMetric({ active = false, exceeded = false, value }: PanelMetricProps) {
  return <span className={clsx(active && "count-active", exceeded && "count-exceeded")}>{value}</span>;
}
