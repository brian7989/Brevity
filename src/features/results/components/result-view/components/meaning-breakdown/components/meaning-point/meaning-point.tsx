import { Check, Minus, X } from "lucide-react";

import type { MeaningPointStatus } from "../../meaning-point-status";

type MeaningPointProps = { label: string; status: MeaningPointStatus; text: string };

export function MeaningPoint({ label, status, text }: MeaningPointProps) {
  const Icon = status === "kept" ? Check : status === "partial" ? Minus : X;

  return (
    <li className={`meaning-point meaning-point--${status}`}>
      <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
      <div>
        <span>{label}</span>
        <p>{text}</p>
      </div>
    </li>
  );
}
