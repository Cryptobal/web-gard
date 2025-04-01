import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gard.cl';
  
  // Páginas estáticas
  const staticPages = [
    '',
    '/servicios',
    '/sobre-nosotros',
    '/tecnologias',
    '/contacto',
    '/privacidad',
    '/terminos',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Páginas de servicios
  const servicePages = [
    '/servicios/seguridad-perimetral',
    '/servicios/monitoreo',
    '/servicios/proteccion-datos',
    '/servicios/prevencion-intrusiones',
    '/servicios/auditoria-seguridad',
    '/servicios/consultoria',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
} 