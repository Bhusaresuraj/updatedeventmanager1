import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Only protect admin routes that are not the login page
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Simplify the matcher
export const config = {
  matcher: ['/admin/:path*']
}; 