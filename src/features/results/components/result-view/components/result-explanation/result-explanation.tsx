import { ResultAction, ResultRationale } from "./components";

type ResultExplanationProps = {
  actionLabel: string;
  feedback: string;
  rationale: string;
  title: string;
};

export function ResultExplanation({ actionLabel, feedback, rationale, title }: ResultExplanationProps) {
  return (
    <section className="result-explanation" aria-label={title}>
      <ResultRationale rationale={rationale} title={title} />
      <ResultAction label={actionLabel} text={feedback} />
    </section>
  );
}
