"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check } from "lucide-react";

export function SelectItemIndicator() {
  return (
    <SelectPrimitive.ItemIndicator className="select-item__indicator">
      <Check aria-hidden="true" size={13} />
    </SelectPrimitive.ItemIndicator>
  );
}
