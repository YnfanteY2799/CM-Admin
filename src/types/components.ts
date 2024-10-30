import type { ReactNode, RefObject } from "react";

/* Here May be located almost all of the main types of the app that belong to components  */

export interface RSC {
  children: ReactNode;
}

export interface ICollidingBeamsProps {
  children: React.ReactNode;
  className?: string;
}

export interface ICollisionMechanismProps {
  containerRef: RefObject<HTMLDivElement>;
  parentRef: RefObject<HTMLDivElement>;
  beamOptions?: {
    initialX?: number;
    translateX?: number;
    initialY?: number;
    translateY?: number;
    rotate?: number;
    className?: string;
    duration?: number;
    delay?: number;
    repeatDelay?: number;
  };
}

export type TCollision = {
  detected: boolean;
  coordinates: { x: number; y: number } | null;
};
