"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";

import type { RSC } from "@/types/client";
import type { ReactNode } from "react";

export default function ThemeProvider({ children }: RSC): ReactNode {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
