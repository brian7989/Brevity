import { SignalCheckLabel } from "./components";

type SignalCheckItemProps = { label: string; text: string };

export function SignalCheckItem({ label, text }: SignalCheckItemProps) {
  return (
    <p>
      <SignalCheckLabel label={label} />
      {text}
    </p>
  );
}
