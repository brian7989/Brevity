type TomorrowNoteProps = { text: string };

export function TomorrowNote({ text }: TomorrowNoteProps) {
  return <p className="tomorrow">{text}</p>;
}
