"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib";

type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Positioner> & {
  className?: string;
};

export function SelectContent({ children, className, sideOffset = 4, ...props }: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner sideOffset={sideOffset} {...props}>
        <SelectPrimitive.Popup className={cn("select-content", className)}>
          <SelectPrimitive.ScrollUpArrow className="select-scroll-button">
            <ChevronUp aria-hidden="true" size={13} />
          </SelectPrimitive.ScrollUpArrow>
          <SelectPrimitive.List className="select-viewport">{children}</SelectPrimitive.List>
          <SelectPrimitive.ScrollDownArrow className="select-scroll-button">
            <ChevronDown aria-hidden="true" size={13} />
          </SelectPrimitive.ScrollDownArrow>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}
