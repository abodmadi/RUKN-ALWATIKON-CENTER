// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const isLoggedIn = !!token;

  const url = request.nextUrl;
  const path = url.pathname;

  const isPublicPath = path === '/sign-in';

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isLoggedIn && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      apply to all routes EXCEPT:
      - static files (/_next/, /favicon, etc.)
      - public routes like /sign-in
    */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};