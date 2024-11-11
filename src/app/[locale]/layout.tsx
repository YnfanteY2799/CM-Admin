import { ThemeProvider } from "@/components";
import "@/css/globals.css";

import type { ReactNode } from "react";
import type { Metadata } from "next";
import type { RSC } from "@/types";

export const metadata: Metadata = {
  title: "Multi E-Commerce Admin Page",
  description: "Pending Description",
};

export default function RootLayout({ children }: Readonly<RSC>): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}