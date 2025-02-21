import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('adminToken');
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  // If trying to access login page with a valid token, redirect to admin dashboard
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If trying to access admin routes (except login) without a token, redirect to login
  if (isAdminRoute && !isLoginPage && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

// Update matcher to be more specific
export const config = {
  matcher: [
    '/admin',
    '/admin/login',
    '/admin/:path*'
  ]
}; 