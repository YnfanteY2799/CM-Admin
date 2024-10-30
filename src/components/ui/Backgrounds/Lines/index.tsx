"use client";
import LineSVG from "./Parts/LineSVG";
import { cn } from "@/utils";

import type { IBackgroundLinesProps } from "@/types";
import type { ReactNode } from "react";

export default function BackgroundLines({ children, className, svgOptions }: IBackgroundLinesProps): ReactNode {
  return (
    <div className={cn("h-[20rem] md:h-screen w-full bg-white dark:bg-black", className)}>
      <LineSVG svgOptions={svgOptions} />
      {children}
    </div>
  );
}
