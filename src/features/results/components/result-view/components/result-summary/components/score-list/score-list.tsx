import { Score } from "./components";

type ScoreListProps = {
  clarityLabel: string;
  clarityValue: string;
  meaningLabel: string;
  meaningValue: string;
  scanabilityLabel: string;
  scanabilityValue: string;
  targetLabel: string;
  targetValue: string;
};

export function ScoreList({
  clarityLabel,
  clarityValue,
  meaningLabel,
  meaningValue,
  scanabilityLabel,
  scanabilityValue,
  targetLabel,
  targetValue,
}: ScoreListProps) {
  return (
    <dl className="score-list" aria-labelledby="result-title">
      <Score label={meaningLabel} value={meaningValue} />
      <Score label={targetLabel} value={targetValue} />
      <Score label={clarityLabel} value={clarityValue} />
      <Score label={scanabilityLabel} value={scanabilityValue} />
    </dl>
  );
}
