type ChallengeMissionProps = { formattingLabel: string; label: string };

export function ChallengeMission({ formattingLabel, label }: ChallengeMissionProps) {
  return (
    <p className="challenge-mission">
      <span>{label}</span>
      <span>{formattingLabel}</span>
    </p>
  );
}
