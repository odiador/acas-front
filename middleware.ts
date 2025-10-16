import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

// Create next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'es',
  localePrefix: 'always',
});

export async function middleware(request: NextRequest) {
  // Solo aplicar el middleware de internacionalización
  // La autenticación se maneja en el lado del cliente
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/(en|es)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
