"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronDown } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib";

export const SelectTrigger = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>>(
  ({ children, className, ...props }, ref) => (
    <SelectPrimitive.Trigger ref={ref} className={cn("select-trigger", className)} {...props}>
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown aria-hidden="true" size={13} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  ),
);
SelectTrigger.displayName = "SelectTrigger";
