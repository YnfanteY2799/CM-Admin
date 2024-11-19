"use client";
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { locales, usePathname, useRouter } from "@/i18n/routing";
import { type Key, type ReactNode, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import FlagIcons from "../Theme/parts/FlagIcons";

export default function LangSelectSwitcher(): ReactNode {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Langs");
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
          <DropdownItem key={x} endContent={<FlagIcons name={x} />}>
            {t(x)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
