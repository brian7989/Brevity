type ResultFeedbackProps = { feedback: string };

export function ResultFeedback({ feedback }: ResultFeedbackProps) {
  return <p className="feedback">{feedback}</p>;
}
