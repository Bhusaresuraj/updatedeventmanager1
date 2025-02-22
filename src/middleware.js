import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if it's an admin route
  if (pathname.startsWith('/admin')) {
    // Always allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for auth token
    const token = request.cookies.get('adminToken')?.value || 
                 request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Update the config to match admin routes
export const config = {
  matcher: ['/admin/:path*']
}; 