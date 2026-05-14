import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing, resolveLocaleFromCountry, type Locale } from "./i18n/routing";

/**
 * Nordic i18n middleware.
 *
 * Pipeline (per request):
 *
 *   1. Skip middleware entirely on internal/static paths
 *      (`/_next`, `/api`, public files, favicons, sitemaps…).
 *   2. Run next-intl's built-in middleware which:
 *        – detects the requested locale from URL prefix (`/no`, `/da`, …)
 *        – honours the persistent `NEXT_LOCALE` cookie if present
 *        – otherwise negotiates from `Accept-Language`
 *        – rewrites `/` to the default (sv) locale internally
 *   3. After the response is computed, attach two custom headers consumed
 *      downstream by Server Components:
 *        – `x-geo-country`: Vercel's `x-vercel-ip-country` (or "SE" locally)
 *        – `x-suggested-locale`: locale derived from geo — used by the
 *          GeoBanner component to suggest "Are you from Norway? → /no"
 *          without a hard redirect (CRITICAL: we never force-redirect on
 *          geo, that would tank SEO and annoy travellers).
 *   4. Refresh the `NEXT_LOCALE` cookie (1y) so the choice persists across
 *      sessions and survives accidental clears.
 *
 * The default-locale prefix policy (`as-needed`) means:
 *   /            → sv (root, no rewrite visible to user)
 *   /no, /da     → explicit prefix
 *   /sv          → redirected to / (canonical) to avoid duplicate content
 */

const intlMiddleware = createIntlMiddleware(routing);

const LOCALE_COOKIE = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export default function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // 1. Skip non-content routes early (perf + avoid breaking sitemap/robots).
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_vercel") ||
    /\.(?:ico|png|jpg|jpeg|svg|webp|gif|webmanifest|xml|txt|js|css|map|woff2?)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2. Delegate locale negotiation to next-intl.
  const response = intlMiddleware(request) as NextResponse;

  // 3. Annotate with geo headers (read by Server Components / RSC).
  const geoCountry =
    request.headers.get("x-vercel-ip-country") ??
    process.env.NEXT_PUBLIC_DEFAULT_COUNTRY ??
    "SE";

  const suggestedLocale: Locale = resolveLocaleFromCountry(geoCountry);

  response.headers.set("x-geo-country", geoCountry);
  response.headers.set("x-suggested-locale", suggestedLocale);

  // 4. Refresh persistent locale cookie if next-intl resolved a locale.
  const resolvedLocale = response.headers.get("x-next-intl-locale");
  if (resolvedLocale && routing.locales.includes(resolvedLocale as Locale)) {
    response.cookies.set(LOCALE_COOKIE, resolvedLocale, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false, // readable by client for the LocaleSwitcher UI
    });
  }

  return response;
}

export const config = {
  // Match all paths except Next internals and static files.
  // Locale-aware paths are: /, /no, /da, /fi, /en, and any sub-routes.
  matcher: [
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
