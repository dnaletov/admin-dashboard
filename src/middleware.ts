import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { STATIC_PAGES } from '@/constants/static-pages';

export async function middleware(req: NextRequest) {
  console.log('🚨 Middleware running:', req.nextUrl.pathname);
  const token = await getToken({ req });
  console.log('Token:', token);

  if (!token && !req.nextUrl.pathname.startsWith(STATIC_PAGES.login)) {
    console.log('🔒 Redirecting to login');
    return NextResponse.redirect(new URL(STATIC_PAGES.login, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
