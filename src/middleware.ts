import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { defaultLanguage, availableLanguages } from "@/app/i18n/settings";
import { auth } from "./app/auth";

const getNegotiatedLanguage = (
  headers: Negotiator.Headers
): string | undefined => {
  return new Negotiator({ headers }).language([...availableLanguages]);
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.webp$|.*\\.ico$|sitemap.xml).*)",
  ],
};
const PUBLIC_PAGES = ["", "/", "/login", "/help", "/privacy", "/terms"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathName = request.nextUrl.pathname.replace(/\/ja|\/en/, "");
  if (!session?.user) {
    if (
      // /(lang)/PublicPages のときは除外
      !PUBLIC_PAGES.includes(pathName)
    ) {
      return NextResponse.redirect(
        new URL(
          `/login?redirectTo=${request.nextUrl.pathname}${
            request.nextUrl.searchParams.size
              ? "?" + request.nextUrl.searchParams.toString()
              : ""
          }`,
          request.url
        )
      );
    }
  }

  const headers = {
    "accept-language": request.headers.get("accept-language") ?? "",
  };
  const preferredLanguage = getNegotiatedLanguage(headers) || defaultLanguage;

  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  const pathnameIsMissingLocale = availableLanguages.every(
    lang => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`
  );

  if (pathnameIsMissingLocale) {
    if (preferredLanguage !== defaultLanguage) {
      return NextResponse.redirect(
        new URL(
          `/${preferredLanguage}${pathname}?${searchParams.toString()}`,
          request.url
        )
      );
    } else {
      const newPathname = `/${defaultLanguage}${pathname}?${searchParams.toString()}`;
      return NextResponse.rewrite(new URL(newPathname, request.url));
    }
  }

  return NextResponse.next();
}
