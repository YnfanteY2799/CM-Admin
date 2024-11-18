import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { locales, usePathname, useRouter } from "@/i18n/routing";
import FlagIcons from "./parts/FlagIcons";
import { useLocale } from "next-intl";

import type { Key, ReactNode } from "react";

export default function LangSelectSwitcher(): ReactNode {
  const { replace } = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function onSelectionChange(k: Key): void {
    const locale = k.toString();
    alert(locale);
    replace({ pathname, query: { locale } });
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" size="sm" className="capitalize" isIconOnly>
          <FlagIcons name={locale} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown Variants" color="primary" variant="light" onAction={onSelectionChange}>
        {locales.map((x) => (
          <DropdownItem key={x} startContent={<FlagIcons name={x} />}>
            {x}
          </DropdownItem>
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
