type AnswerBlockHeaderProps = { label: string; meta: string };

export function AnswerBlockHeader({ label, meta }: AnswerBlockHeaderProps) {
  return (
    <div className="answer-label">
      <span>{label}</span>
      <small>{meta}</small>
    </div>
  );
}
