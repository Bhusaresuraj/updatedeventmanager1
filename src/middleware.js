import { NextResponse } from 'next/server';

export function middleware(request) {
  // Don't run middleware on login page
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check auth for other admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('adminToken') || localStorage.getItem('adminToken');
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*'
  ]
}; 