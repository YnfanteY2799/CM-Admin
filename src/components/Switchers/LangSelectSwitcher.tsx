"use client";
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { type ReactNode, useState, useTransition } from "react";
import { Link, usePathname } from "@/i18n/routing";
import FlagIcons from "./parts/FlagIcons";
import { locales } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LangSelectSwitcher(): ReactNode {
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "es" : "en";

  const [isPending, startTransition] = useTransition();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {pathname}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown Variants" color="primary" variant="light">
        {locales.map((x) => (
          <DropdownItem key={x}>{x}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

// import { Link, usePathname } from "@/i18n/routing";
// import { useLocale } from "next-intl";

// export default function LocaleSwitcher() {
//   const locale = useLocale();
//   const pathname = usePathname();
//   const otherLocale = locale === "en" ? "es" : "en";

//   return (
//     <Link href={pathname} locale={otherLocale}>
//       {otherLocale}
//     </Link>
//   );
// }
