import type { ReactNode } from "react";

type AnswerComparisonProps = { playerAnswer: ReactNode; referenceAnswer: ReactNode };

export function AnswerComparison({ playerAnswer, referenceAnswer }: AnswerComparisonProps) {
  return (
    <div className="comparison">
      {playerAnswer}
      {referenceAnswer}
    </div>
  );
}
