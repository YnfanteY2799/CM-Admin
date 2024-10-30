import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing.ts";

export const config = { matcher: ["/", "/(es|en)/:path*"] };

export default createMiddleware(routing);
