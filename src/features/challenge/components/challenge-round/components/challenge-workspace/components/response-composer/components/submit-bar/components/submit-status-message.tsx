type SubmitStatusMessageProps = { text: string };

export function SubmitStatusMessage({ text }: SubmitStatusMessageProps) {
  return <p aria-live="polite">{text}</p>;
}
