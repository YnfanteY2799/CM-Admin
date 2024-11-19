import { type AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import LangSelectSwitcher from "./LangSelectSwitcher.tsx";
import { ReactNode } from "react";

export default function LangSwitcher(): ReactNode {
  // Hooks
  const { Commons } = useMessages();
  const locale = useLocale();

  console.log({ Commons });

  return (
    <NextIntlClientProvider messages={Commons as AbstractIntlMessages} locale={locale}>
      <LangSelectSwitcher />
    </NextIntlClientProvider>
  );
}
