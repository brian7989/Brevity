import { sanitizeRichText } from "@/features/challenge";

type AnswerTextProps = { rich: boolean; text: string };

export function AnswerText({ rich, text }: AnswerTextProps) {
  return rich ? (
    <div className="rich-answer" dangerouslySetInnerHTML={{ __html: sanitizeRichText(text) }} />
  ) : (
    <p>{text}</p>
  );
}
