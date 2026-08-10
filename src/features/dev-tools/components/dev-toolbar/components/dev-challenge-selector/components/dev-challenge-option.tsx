import { SelectItem } from "@/components";
import type { Challenge } from "@/features/challenge";

type DevChallengeOptionProps = { challenge: Challenge; index: number };

export function DevChallengeOption({ challenge, index }: DevChallengeOptionProps) {
  return (
    <SelectItem value={challenge.id}>
      {String(index + 1).padStart(2, "0")} · {challenge.difficulty}
    </SelectItem>
  );
}
