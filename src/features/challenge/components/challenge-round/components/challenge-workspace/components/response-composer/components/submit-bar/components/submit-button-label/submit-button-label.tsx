import { Spinner } from "./components";

type SubmitButtonLabelProps = { label: string; loading: boolean };

export function SubmitButtonLabel({ label, loading }: SubmitButtonLabelProps) {
  return (
    <>
      {loading ? <Spinner /> : null}
      {label}
    </>
  );
}
