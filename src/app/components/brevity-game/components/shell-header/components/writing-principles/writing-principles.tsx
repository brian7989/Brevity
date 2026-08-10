import { Fragment } from "react";

import { WritingPrinciple } from "./components";

type WritingPrinciplesProps = { label: string; items: string[] };

export function WritingPrinciples({ label, items }: WritingPrinciplesProps) {
  return (
    <div className="principle" aria-label={label}>
      {items.map((item, index) => (
        <Fragment key={item}>
          {index > 0 ? <i /> : null}
          <WritingPrinciple label={item} />
        </Fragment>
      ))}
    </div>
  );
}
