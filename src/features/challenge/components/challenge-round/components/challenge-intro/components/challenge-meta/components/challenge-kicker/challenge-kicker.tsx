import { ChallengeKickerLabel, ChallengeKickerNumber } from "./components";

type ChallengeKickerProps = { challengeNumber: string; label: string };

export function ChallengeKicker({ challengeNumber, label }: ChallengeKickerProps) {
  return (
    <p className="kicker">
      <ChallengeKickerLabel label={label} />
      <ChallengeKickerNumber value={challengeNumber} />
    </p>
  );
}
