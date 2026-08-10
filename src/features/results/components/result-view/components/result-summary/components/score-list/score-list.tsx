import { Score } from "./components";

type ScoreListProps = {
  clarityLabel: string;
  clarityValue: string;
  signalLabel: string;
  signalValue: string;
  wordsLabel: string;
  wordsValue: string;
};

export function ScoreList({
  clarityLabel,
  clarityValue,
  signalLabel,
  signalValue,
  wordsLabel,
  wordsValue,
}: ScoreListProps) {
  return (
    <dl className="score-list" aria-labelledby="result-title">
      <Score label={signalLabel} value={signalValue} />
      <Score label={clarityLabel} value={clarityValue} />
      <Score label={wordsLabel} value={wordsValue} />
    </dl>
  );
}
