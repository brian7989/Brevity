import { ResultAction, ResultFormattingFeedback, ResultRationale } from "./components";

type ResultExplanationProps = {
  actionLabel: string;
  feedback: string;
  formattingFeedback: string;
  formattingLabel: string;
  rationale: string;
  title: string;
};

export function ResultExplanation({
  actionLabel,
  feedback,
  formattingFeedback,
  formattingLabel,
  rationale,
  title,
}: ResultExplanationProps) {
  return (
    <section className="result-explanation" aria-label={title}>
      <ResultRationale rationale={rationale} title={title} />
      <ResultAction label={actionLabel} text={feedback} />
      <ResultFormattingFeedback label={formattingLabel} text={formattingFeedback} />
    </section>
  );
}
