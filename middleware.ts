import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Redirects y correcciones de rutas comunes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect de rutas incorrectas de servicios
  if (pathname === '/servicios/drones-retail') {
    return NextResponse.redirect(new URL('/servicios/drones-seguridad', request.url));
  }

  // Redirect para otras rutas incorrectas pero conocidas
  if (pathname === '/guardias' || pathname === '/guardia' || pathname === '/seguridad-guardias') {
    return NextResponse.redirect(new URL('/servicios/guardias-de-seguridad', request.url));
  }

  if (pathname === '/drones' || pathname === '/seguridad-drones') {
    return NextResponse.redirect(new URL('/servicios/drones-seguridad', request.url));
  }

  return NextResponse.next();
}

// Configurar para que el middleware se ejecute en estas rutas
export const config = {
  matcher: [
    '/servicios/:path*',
    '/guardias',
    '/guardia',
    '/seguridad-guardias',
    '/drones',
    '/seguridad-drones'
  ],
}; 