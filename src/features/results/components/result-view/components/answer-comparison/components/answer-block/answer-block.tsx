import { AnswerBlockHeader, AnswerText } from "./components";

type AnswerBlockProps = { label: string; meta: string; rich?: boolean; text: string };

export function AnswerBlock({ label, meta, rich = false, text }: AnswerBlockProps) {
  return (
    <div>
      <AnswerBlockHeader label={label} meta={meta} />
      <AnswerText rich={rich} text={text} />
    </div>
  );
}
