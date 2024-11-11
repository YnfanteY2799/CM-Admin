"use client";
import LineSVG from "./Parts/LineSVG";
import { cn } from "@/utils/client";

import type { IBackgroundLinesProps } from "@/types/client";
import type { ReactNode } from "react";

export default function BackgroundLines({ children, className, svgOptions }: IBackgroundLinesProps): ReactNode {
  return (
    <div className={cn("h-screen w-full", className)}>
      <LineSVG svgOptions={svgOptions} />
      {children}
    </div>
  );
}
