// Redireccionar al sitemap.xml generado por la API
export async function GET() {
  return Response.redirect(new URL('/sitemap.xml', 'https://www.gard.cl'), 308);
} 