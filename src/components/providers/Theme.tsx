"use client";
import { type ThemeProviderProps, ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export default function ThemeProvider({ children, ...props }: ThemeProviderProps): ReactNode {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
