type ResultActionProps = { label: string; text: string };

export function ResultAction({ label, text }: ResultActionProps) {
  return (
    <p className="result-action">
      <span>{label}</span>
      {text}
    </p>
  );
}
