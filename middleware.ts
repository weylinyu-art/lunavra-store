import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect root to /en
  if (pathname === "/" || pathname === "") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  // Redirect legacy routes (e.g. /shop) to /en/shop
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (!pathnameHasLocale && pathname.startsWith("/")) {
    const segment = pathname.split("/")[1];
    if (segment && !segment.startsWith("_") && !segment.startsWith("api")) {
      return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
