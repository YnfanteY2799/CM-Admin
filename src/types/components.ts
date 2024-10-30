import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

/* Here May be located almost all of the main types of the app that belong to components  */

export interface RSC {
  children: ReactNode;
}

export interface ICollidingBeamsProps {
  children: React.ReactNode;
  className?: string;
}
