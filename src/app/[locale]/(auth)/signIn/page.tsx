import { type AbstractIntlMessages, NextIntlClientProvider, useMessages } from "next-intl";
import { NoiseWaves } from "@/components";
import LoginForm from "./component";

import type { ReactNode } from "react";

export default function signInPage(): ReactNode {
  const { Common } = useMessages();

  const messages = { Common } as AbstractIntlMessages;

  return (
    <NoiseWaves blur={20}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <NextIntlClientProvider messages={messages}>
          <LoginForm />
        </NextIntlClientProvider>
      </div>
    </NoiseWaves>
  );
}
