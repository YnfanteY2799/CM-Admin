// "use client";
// import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
// import { type ReactNode, useState } from "react";
// import FlagIcons from "./parts/FlagIcons";
// import { locales } from "@/i18n/routing";

// export default function LangSelectSwitcher(): ReactNode {
//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         <Button variant={"light"} className="capitalize">
//           {"variant"}
//         </Button>
//       </DropdownTrigger>
//       <DropdownMenu aria-label="Dropdown Variants" color={"primary"} variant={"light"}>
//         {locales.map((x) => (
//           <DropdownItem key={x}>{x}</DropdownItem>
//         ))}
//       </DropdownMenu>
//     </Dropdown>
//   );
// }

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "es" : "en";

  console.log({ pathname });

  return (
    <Link href={pathname} locale={otherLocale}>
      {otherLocale}
    </Link>
  );
}
