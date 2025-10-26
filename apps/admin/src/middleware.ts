import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Простая авторизация (для production лучше использовать NextAuth.js)
const ADMIN_EMAIL = 'admin@designemotion.ru'
const ADMIN_PASSWORD = '13Vbkkbjyjd'

export function middleware(request: NextRequest) {
  // Разрешить доступ к /login и публичным ресурсам
  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon') ||
    request.nextUrl.pathname.startsWith('/icon')
  ) {
    return NextResponse.next()
  }

  // Проверить cookie с токеном
  const authToken = request.cookies.get('admin_auth')?.value

  if (!authToken || authToken !== btoa(`${ADMIN_EMAIL}:${ADMIN_PASSWORD}`)) {
    // Редирект на страницу логина
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/login (API для авторизации)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/login|_next/static|_next/image|favicon.ico).*)',
  ],
}
