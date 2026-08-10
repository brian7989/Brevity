import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";

type OriginalPassageDisclosureProps = {
  closeLabel: string;
  meta: string;
  openLabel: string;
  passage: string;
};

export function OriginalPassageDisclosure({ closeLabel, meta, openLabel, passage }: OriginalPassageDisclosureProps) {
  return (
    <Collapsible.Root className="original-disclosure">
      <Collapsible.Trigger className="original-disclosure__trigger">
        <span className="original-disclosure__open-label">{openLabel}</span>
        <span className="original-disclosure__close-label">{closeLabel}</span>
        <small>{meta}</small>
        <ChevronDown aria-hidden="true" size={15} strokeWidth={1.5} />
      </Collapsible.Trigger>
      <Collapsible.Panel className="original-disclosure__panel">
        <p>{passage}</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
