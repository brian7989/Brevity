"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib";

type TooltipContentProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Positioner> & {
  className?: string;
};

export function TooltipContent({ children, className, sideOffset = 8, ...props }: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner sideOffset={sideOffset} {...props}>
        <TooltipPrimitive.Popup className={cn("tooltip-content", className)}>{children}</TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}
