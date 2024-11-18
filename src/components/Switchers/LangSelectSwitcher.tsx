"use client";
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { locales, usePathname, useRouter } from "@/i18n/routing";
import { type Key, type ReactNode, useTransition } from "react";
import FlagIcons from "./parts/FlagIcons";
import { useLocale } from "next-intl";

export default function LangSelectSwitcher(): ReactNode {
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function onActionChange(key: Key) {
    const locale = key.toString();
    // @ts-expect-error
    startTransition(() => replace({ pathname, params: {} }, { locale }));
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" size="sm" className="capitalize" isIconOnly isDisabled={isPending}>
          <FlagIcons name={locale} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown Variants" color="primary" variant="bordered" onAction={onActionChange}>
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
