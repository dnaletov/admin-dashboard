import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { STATIC_PAGES } from '@/constants/static-pages';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token && !req.nextUrl.pathname.startsWith(STATIC_PAGES.login)) {
    return NextResponse.redirect(new URL(STATIC_PAGES.login, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
