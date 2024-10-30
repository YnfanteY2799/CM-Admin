import type { ReactNode } from "react";
import type { RSC } from "@/types";

export default function RootLayout({ children }: Readonly<RSC>): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
