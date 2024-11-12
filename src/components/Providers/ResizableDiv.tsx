"use client";
import { motion } from "framer-motion";
import { useMeasure } from "@/utils/client";

import type { IBaseComponent } from "@/types/client";
import type { ReactNode } from "react";

export default function ResiableDiv({ children, className }: IBaseComponent): ReactNode {
  // Hooks
  const [ref, { height }] = useMeasure<HTMLDivElement>();

  return (
    <motion.div animate={{ height }} className={className}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}
