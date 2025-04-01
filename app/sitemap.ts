import { MetadataRoute } from 'next';
import { industries } from './data/industries';
import { getAllPosts, POSTS_PER_PAGE, getAllTags, getPostsByTag } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gard.cl';
  
  // Páginas estáticas
  const staticPages = [
    '',
    '/servicios',
    '/industrias',
    '/sobre-nosotros',
    '/tecnologias',
    '/contacto',
    '/politica-de-privacidad',
    '/terminos-de-servicio',
    '/blog', // Añadir página de blog principal
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
  
  // Páginas de blog dinámicas (posts individuales)
  const blogPosts = await getAllPosts();
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
  
  // Páginas de paginación del blog
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const blogPaginationPages = Array.from({ length: totalPages - 1 }, (_, i) => ({
    url: `${baseUrl}/blog/page/${i + 2}`, // Páginas 2 en adelante
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));
  
  // Páginas de etiquetas del blog
  const allTags = await getAllTags();
  const blogTagPages = allTags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Páginas de paginación por etiqueta
  const blogTagPaginationPages = [];
  for (const tag of allTags) {
    const { totalPages } = await getPostsByTag(tag);
    
    if (totalPages > 1) {
      const pages = Array.from({ length: totalPages - 1 }, (_, i) => ({
        url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}/page/${i + 2}`, // Páginas 2 en adelante
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }));
      
      blogTagPaginationPages.push(...pages);
    }
  }

  return [
    ...staticPages, 
    ...servicePages, 
    ...industryPages, 
    ...blogPostPages, 
    ...blogPaginationPages,
    ...blogTagPages,
    ...blogTagPaginationPages
  ];
} 