"use client";
import { CollisionMechanism } from "./Parts/Mechanism";
import { useRef, type ReactNode } from "react";
import { cn, collidingBeams } from "@/utils";

import type { ICollidingBeamsProps } from "@/types";

export default function BackgroundBeamsWithCollision({ children, className }: ICollidingBeamsProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={parentRef}
      className={cn(
        "h-screen md:h-[40rem] bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden",
        className
      )}
    >
      {collidingBeams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam-idx"}
          containerRef={containerRef}
          parentRef={parentRef}
          beamOptions={beam}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
}
