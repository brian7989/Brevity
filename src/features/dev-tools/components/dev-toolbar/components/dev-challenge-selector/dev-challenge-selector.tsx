import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components";
import type { Challenge } from "@/features/challenge";

import { DevChallengeOption } from "./components";

type DevChallengeSelectorProps = {
  challengeId: string;
  challengeLabel: string;
  challenges: readonly Challenge[];
  onSelect: (challengeId: string) => void;
};

export function DevChallengeSelector({ challengeId, challengeLabel, challenges, onSelect }: DevChallengeSelectorProps) {
  const challengeItems = challenges.map((challenge, index) => ({
    label: `${String(index + 1).padStart(2, "0")} · ${challenge.difficulty}`,
    value: challenge.id,
  }));

  return (
    <Select
      items={challengeItems}
      value={challengeId}
      onValueChange={(value) => {
        if (value !== null) onSelect(value);
      }}
    >
      <SelectTrigger className="dev-toolbar__select" aria-label={challengeLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent side="top">
        {challenges.map((challenge, index) => (
          <DevChallengeOption key={challenge.id} challenge={challenge} index={index} />
        ))}
      </SelectContent>
    </Select>
  );
}
