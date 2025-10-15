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

// Public routes that don't require authentication
const publicRoutes = ['/auth/login', '/auth/register'];

// Route permissions by role
const routePermissions: Record<string, string[]> = {
  '/dashboard': ['STUDENT', 'TEACHER', 'ADMIN'],
  '/dashboard/students': ['TEACHER', 'ADMIN'],
  '/dashboard/courses': ['STUDENT', 'TEACHER', 'ADMIN'],
  '/dashboard/users': ['ADMIN'],
  '/dashboard/profile': ['STUDENT', 'TEACHER', 'ADMIN'],
  '/dashboard/reports': ['TEACHER', 'ADMIN'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract locale from URL
  const pathnameLocale = pathname.split('/')[1];
  const isValidLocale = locales.includes(pathnameLocale as any);
  const locale = isValidLocale ? pathnameLocale : 'es';

  // Check if it's a public route
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.includes(`/${locale}${route}`)
  );

  if (isPublicRoute) {
    return intlMiddleware(request);
  }

  // Get token from cookies
  const token = request.cookies.get('token')?.value;

  if (!token) {
    const url = new URL(`/${locale}/auth/login`, request.url);
    return NextResponse.redirect(url);
  }

  try {
    // Verify and decode JWT
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    );
    const { payload } = await jwtVerify(token, secret);

    const userRole = payload.role as string;

    // Check permissions for the route
    const routeKey = pathname.replace(`/${locale}`, '');
    const allowedRoles = routePermissions[routeKey];

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      const url = new URL(`/${locale}/unauthorized`, request.url);
      return NextResponse.redirect(url);
    }

    // Add user information to headers
    const response = intlMiddleware(request);
    response.headers.set('x-user-role', userRole);
    response.headers.set('x-user-id', payload.userId as string);

    return response;
  } catch (error) {
    console.error('Token verification failed:', error);
    const url = new URL(`/${locale}/auth/login`, request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    '/(en|es)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
