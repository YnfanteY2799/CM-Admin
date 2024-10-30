import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing.ts";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string | undefined = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) locale = routing.defaultLocale;
  const messages = (await import(`../../Intl/${locale}.json`)).default;
  return { locale, messages };
});
