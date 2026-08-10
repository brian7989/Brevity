import { Score } from "./components";

type ScoreGridProps = {
  clarityLabel: string;
  clarityValue: string;
  signalLabel: string;
  signalValue: string;
  wordsLabel: string;
  wordsValue: string;
};

export function ScoreGrid({
  clarityLabel,
  clarityValue,
  signalLabel,
  signalValue,
  wordsLabel,
  wordsValue,
}: ScoreGridProps) {
  return (
    <div className="score-grid" aria-labelledby="result-title">
      <Score label={signalLabel} value={signalValue} />
      <Score label={clarityLabel} value={clarityValue} />
      <Score label={wordsLabel} value={wordsValue} />
    </div>
  );
}
