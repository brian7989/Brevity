type ResultRationaleProps = { rationale: string; title: string };

export function ResultRationale({ rationale, title }: ResultRationaleProps) {
  return (
    <div className="result-rationale">
      <h3>{title}</h3>
      <p>{rationale}</p>
    </div>
  );
}
