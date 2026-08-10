type StreakCounterProps = { label: string };

export function StreakCounter({ label }: StreakCounterProps) {
  return (
    <div className="streak" aria-label={label}>
      {label}
    </div>
  );
}
