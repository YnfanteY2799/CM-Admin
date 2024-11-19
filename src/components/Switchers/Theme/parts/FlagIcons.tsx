import { NortAmericanFlag, SpainFlag } from "@/components";

import type { ReactNode } from "react";

export default function FlagIcons({ name }: { name: string }): ReactNode {
  switch (name) {
    case "en":
      return <NortAmericanFlag />;
    case "es":
      return <SpainFlag />;
    default:
      return <></>;
  }
}
