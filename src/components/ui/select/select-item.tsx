"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib";

import { SelectItemIndicator } from "./select-item-indicator";

export const SelectItem = forwardRef<HTMLElement, ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ children, className, ...props }, ref) => (
    <SelectPrimitive.Item ref={ref} className={cn("select-item", className)} {...props}>
      <SelectItemIndicator />
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  ),
);
SelectItem.displayName = "SelectItem";
