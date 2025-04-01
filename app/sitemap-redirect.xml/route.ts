// Redireccionar al sitemap.xml generado por la API
export async function GET() {
  return Response.redirect(new URL('/api/sitemap', 'https://gard.cl'), 307);
} 