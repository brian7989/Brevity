import { ResultTitle, ScoreList } from "./components";

type ResultSummaryProps = {
  clarityLabel: string;
  clarityValue: string;
  signalLabel: string;
  signalValue: string;
  title: string;
  wordsLabel: string;
  wordsValue: string;
};

export function ResultSummary({
  clarityLabel,
  clarityValue,
  signalLabel,
  signalValue,
  title,
  wordsLabel,
  wordsValue,
}: ResultSummaryProps) {
  return (
    <div className="result-summary">
      <ResultTitle title={title} />
      <ScoreList
        clarityLabel={clarityLabel}
        clarityValue={clarityValue}
        signalLabel={signalLabel}
        signalValue={signalValue}
        wordsLabel={wordsLabel}
        wordsValue={wordsValue}
      />
    </div>
  );
}
