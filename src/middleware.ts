import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing.ts";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === "GET") {
    const token = request.cookies.get("session")?.value ?? null;
    const response = NextResponse.next();

    if (token !== null) {
      response.cookies.set("session", token, {
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        httpOnly: true,
        path: "/",
      });
    } else {
      response.cookies.set("session", "XDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", {
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        httpOnly: true,
        path: "/",
      });
    }

    return intlMiddleware(request);
  }

  const originHeader = request.headers.get("Origin");
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get("Host");
  if (originHeader === null || hostHeader === null) return new NextResponse(null, { status: 403 });

  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, { status: 403 });
  }

  if (origin.host !== hostHeader) return new NextResponse(null, { status: 403 });

  return NextResponse.next();
}

export const config = { matcher: ["/", "/(es|en)/:path*"] };
