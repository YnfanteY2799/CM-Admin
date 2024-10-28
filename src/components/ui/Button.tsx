import { ButtonVariants, cn } from "@/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import type { ButtonProps } from "@/types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(ButtonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";