import { ResultEyebrowItem } from "./components";

type ResultEyebrowProps = { completeLabel: string; streakLabel: string };

export function ResultEyebrow({ completeLabel, streakLabel }: ResultEyebrowProps) {
  return (
    <div className="result__eyebrow">
      <ResultEyebrowItem label={completeLabel} />
      <ResultEyebrowItem label={streakLabel} />
    </div>
  );
}
