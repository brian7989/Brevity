type ScoreProps = { label: string; value: string };

export function Score({ label, value }: ScoreProps) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
