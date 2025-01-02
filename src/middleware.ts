import createMiddleware from "next-intl/middleware";
import { getCountryFromIP } from './utils/getCountryFromIP';
import { routing } from "./i18n/routing";

// Define country to locale mapping
const COUNTRY_LOCALE_MAP: Record<string, string> = {
  tr: 'tr',  // Turkey
  gb: 'en',  // United Kingdom
  us: 'en',  // United States
  // Add more country-locale mappings as needed
};

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localeDetection: false,
  localePrefix: 'always'
});

// Create a custom middleware handler
export const middleware = async (request: Request) => {
  const country = getCountryFromIP(request);
  const localeFromIP = COUNTRY_LOCALE_MAP[country] || routing.defaultLocale;
  
  const pathname = new URL(request.url).pathname;
  if (pathname === '/') {
    return Response.redirect(new URL(`/${localeFromIP}`, request.url));
  }
  
  return createMiddleware({
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
    localeDetection: false,
    localePrefix: 'always'
  })(request as any);
};

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(tr|en)/:path*"],
};
