import { MetadataRoute } from 'next';
import { industries } from './data/industries';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gard.cl';
  
  // Páginas estáticas
  const staticPages = [
    '',
    '/servicios',
    '/industrias',
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
    '/servicios/prevencion-intrusiones',
    '/servicios/auditoria-seguridad',
    '/servicios/consultoria',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Páginas de industrias dinámicas
  const industryPages = industries.map((industry) => {
    const slug = industry.name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    
    return {
      url: `${baseUrl}/industrias/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...servicePages, ...industryPages];
} 