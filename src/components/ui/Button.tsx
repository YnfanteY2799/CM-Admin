import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { cn } from "@/utils";

import type { ButtonProps } from "@/types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(ButtonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
