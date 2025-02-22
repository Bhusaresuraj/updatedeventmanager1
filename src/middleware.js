import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Always allow access to login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Only check auth for admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      // Prevent redirect loop by checking if we're already on login page
      if (pathname !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

// Update matcher to be more specific
export const config = {
  matcher: [
    '/admin',
    '/admin/((?!login).)*' // Match all admin routes except login
  ]
}; 