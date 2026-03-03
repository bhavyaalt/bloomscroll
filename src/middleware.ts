import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@/lib/supabase-server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient(request, response);

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // Protected routes — redirect to auth if no session
  if (!user) {
    if (pathname === '/subscribe') {
      const redirectUrl = new URL('/auth', request.url);
      redirectUrl.searchParams.set('redirect', '/subscribe');
      return NextResponse.redirect(redirectUrl);
    }

    if (pathname === '/oauth/consent') {
      // Preserve OAuth query params through the auth redirect
      const fullPath = `${pathname}${request.nextUrl.search}`;
      const redirectUrl = new URL('/auth', request.url);
      redirectUrl.searchParams.set('redirect', fullPath);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/subscribe', '/oauth/consent'],
};
