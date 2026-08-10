import { ScoreLabel, ScoreValue } from "./components";

type ScoreProps = { label: string; value: string };

export function Score({ label, value }: ScoreProps) {
  return (
    <div>
      <ScoreLabel label={label} />
      <ScoreValue value={value} />
    </div>
  );
}
