import { ThemeProvider } from "@/components";
import { Satoshi } from "@/fonts";
import "@/css/globals.css";
import clsx from "clsx";

import type { Metadata, Viewport } from "next";
import type { RSC } from "@/types/client";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Multi E-Commerce Admin Page",
  description: "Pending Description",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: Readonly<RSC>): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(Satoshi.className, "antialiased")}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
