import { ResultTitle, ScoreList } from "./components";

type ResultSummaryProps = {
  clarityLabel: string;
  clarityValue: string;
  meaningLabel: string;
  meaningValue: string;
  scanabilityLabel: string;
  scanabilityValue: string;
  targetLabel: string;
  targetValue: string;
  title: string;
};

export function ResultSummary({
  clarityLabel,
  clarityValue,
  meaningLabel,
  meaningValue,
  scanabilityLabel,
  scanabilityValue,
  targetLabel,
  targetValue,
  title,
}: ResultSummaryProps) {
  return (
    <div className="result-summary">
      <ResultTitle title={title} />
      <ScoreList
        clarityLabel={clarityLabel}
        clarityValue={clarityValue}
        meaningLabel={meaningLabel}
        meaningValue={meaningValue}
        scanabilityLabel={scanabilityLabel}
        scanabilityValue={scanabilityValue}
        targetLabel={targetLabel}
        targetValue={targetValue}
      />
    </div>
  );
}
