type ResultFormattingFeedbackProps = { label: string; text: string };

export function ResultFormattingFeedback({ label, text }: ResultFormattingFeedbackProps) {
  return (
    <div className="result-formatting-feedback">
      <span>{label}</span>
      <p>{text}</p>
    </div>
  );
}
