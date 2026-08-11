import type { KeyPoint } from "@/features/challenge";
import type { StoredResult } from "@/features/results/schemas";

import { MeaningPoint } from "./components";
import type { MeaningPointStatus } from "./meaning-point-status";

type MeaningBreakdownProps = {
  keyPoints: KeyPoint[];
  labels: Record<MeaningPointStatus, string>;
  result: StoredResult;
  title: string;
};

export function MeaningBreakdown({ keyPoints, labels, result, title }: MeaningBreakdownProps) {
  return (
    <section className="meaning-breakdown" aria-labelledby="meaning-breakdown-title">
      <h3 id="meaning-breakdown-title">{title}</h3>
      <ul>
        {keyPoints.map(({ text }) => {
          const status = getPointStatus(text, result);
          return <MeaningPoint key={text} label={labels[status]} status={status} text={text} />;
        })}
      </ul>
    </section>
  );
}

function getPointStatus(point: string, result: StoredResult): MeaningPointStatus {
  if (result.preservedKeyPoints.includes(point)) return "kept";
  if (result.partialKeyPoints.includes(point)) return "partial";
  return "missed";
}
