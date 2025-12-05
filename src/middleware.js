import { NextResponse } from 'next/server';

export function middleware(req) {
  const session = req.cookies.get('session')?.value;

  const isAuthPage = req.nextUrl.pathname.startsWith('/login')
    || req.nextUrl.pathname.startsWith('/register');

  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register'
  ]
};
