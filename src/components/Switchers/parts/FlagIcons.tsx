import { type ReactNode } from "react";

export default function FlagIcons({ name }: { name: string }): ReactNode {
  switch (name) {
    case "en":
      return <></>;
    case "es":
      return <></>;
    default:
      return <></>;
  }
}
