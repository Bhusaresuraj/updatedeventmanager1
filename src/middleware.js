import { NextResponse } from 'next/server';

// Update matcher to be more specific
export const config = {
  matcher: [
    '/admin',
    '/admin/((?!login).)*' // Match all admin routes except login
  ]
}; 