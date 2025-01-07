import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { getCountryFromIP } from './utils/getCountryFromIP'
import { getPathname } from './i18n/routing'
import { verifyAuth } from "~/server/auth"

const COUNTRY_LOCALE_MAP: Record<string, string> = {
  tr: 'tr',
  gb: 'en',
  us: 'en',
  // Add more country mappings as needed
};

// Helper function to check if a path is an admin route
function isAdminRoute(pathname: string): boolean {
  // Create a regex pattern that matches any locale prefix
  const localePattern = `^\\/(${routing.locales.join('|')})?`;
  const withoutLocale = pathname.replace(new RegExp(localePattern), '');
  return withoutLocale.startsWith('/admin');
}

// Helper function to get current locale from pathname
function getCurrentLocale(pathname: string): string {
  for (const locale of routing.locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return routing.defaultLocale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Handle root path redirect
  if (pathname === '/') {
    const country = getCountryFromIP(request)
    const localeFromIP = COUNTRY_LOCALE_MAP[country] || routing.defaultLocale
    const localizedPath = getPathname({
      locale: localeFromIP,
      href: '/'
    })
    return NextResponse.redirect(new URL(localizedPath, request.url))
  }

  // Check for admin routes (including any language prefix)
  if (isAdminRoute(pathname)) {
    const authToken = request.cookies.get('auth_token')?.value

    if (!authToken) {
      const currentLocale = getCurrentLocale(pathname);
      const loginPath = getPathname({
        locale: currentLocale,
        href: '/loginSecurely'
      })
      return NextResponse.redirect(new URL(loginPath, request.url))
    }

    try {
      const verified = await verifyAuth(authToken)
      if (!verified) {
        throw new Error('Invalid token')
      }
    } catch (error) {
      const currentLocale = getCurrentLocale(pathname);
      const loginPath = getPathname({
        locale: currentLocale,
        href: '/loginSecurely'
      })
      const response = NextResponse.redirect(new URL(loginPath, request.url))
      response.cookies.delete('auth_token')
      return response
    }
  }

  // Handle internationalization for all routes
  return createMiddleware({
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
    localeDetection: false,
    localePrefix: 'always'
  })(request as any)
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /static (inside /public)
    // - .*\\..* (files)
    '/((?!api|_next|static|.*\\..*|_vercel).*)',
    // Match root locale path
    '/'
  ]
}

