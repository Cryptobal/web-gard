import { industries } from '../data/industries';
import { getAllPosts, POSTS_PER_PAGE, getAllTags, getPostsByTag } from '@/lib/blog';

// Función para generar las URLs del sitemap
async function generateSitemap() {
  const baseUrl = 'https://gard.cl';
  
  // Páginas estáticas
  const staticPages = [
    '',
    '/servicios',
    '/industrias',
    '/sobre-nosotros',
    '/tecnologia-seguridad',
    '/contacto',
    '/privacidad',
    '/terminos',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // URLs antiguas que ahora son redirecciones (no se incluyen en el sitemap)
  // '/automatizacion-y-domotica',
  // '/drones-de-seguridad-para-empresas-e-industrias',
  // '/guardias-de-seguridad-privada-para-empresas',
  // '/noticias-de-seguridad-privada',
  // '/servicios-de-seguridad-privada',
  // '/tecnologias',

  // Páginas de servicios
  const servicePages = [
    '/servicios/guardias-de-seguridad',
    '/servicios/drones-seguridad',
    '/servicios/seguridad-electronica',
    '/servicios/monitoreo',
    '/servicios/seguridad-perimetral',
    '/servicios/auditoria-seguridad',
    '/servicios/consultoria',
    '/servicios/prevencion-intrusiones'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
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
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  // Combinaciones prioritarias de servicio-industria
  const servicioIndustriaPrioritarias = [
    {servicio: 'guardias-de-seguridad', industria: 'retail'},
    {servicio: 'guardias-de-seguridad', industria: 'mineria'},
    {servicio: 'drones-seguridad', industria: 'mineria'},
    {servicio: 'seguridad-electronica', industria: 'retail'},
    {servicio: 'central-monitoreo', industria: 'edificios-corporativos'},
    {servicio: 'auditoria-seguridad', industria: 'instituciones-publicas'},
    {servicio: 'consultoria', industria: 'edificios-corporativos'},
    {servicio: 'prevencion-intrusiones', industria: 'parques-industriales'}
  ];

  const combinacionesPages = servicioIndustriaPrioritarias.map(({ servicio, industria }) => ({
    url: `${baseUrl}/servicios/${servicio}/${industria}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.65,
  }));
  
  // Páginas de blog dinámicas (posts individuales)
  const blogPosts = await getAllPosts();
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
  
  // Páginas de paginación del blog
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const blogPaginationPages = Array.from({ length: totalPages - 1 }, (_, i) => ({
    url: `${baseUrl}/blog/page/${i + 2}`, // Páginas 2 en adelante
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));
  
  // Páginas de etiquetas del blog
  const allTags = await getAllTags();
  const blogTagPages = allTags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Páginas de paginación por etiqueta
  const blogTagPaginationPages = [];
  for (const tag of allTags) {
    const { totalPages } = await getPostsByTag(tag);
    
    if (totalPages > 1) {
      const pages = Array.from({ length: totalPages - 1 }, (_, i) => ({
        url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}/page/${i + 2}`, // Páginas 2 en adelante
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.5,
      }));
      
      blogTagPaginationPages.push(...pages);
    }
  }

  return [
    ...staticPages, 
    ...servicePages, 
    ...industryPages,
    ...combinacionesPages, 
    ...blogPostPages, 
    ...blogPaginationPages,
    ...blogTagPages,
    ...blogTagPaginationPages
  ];
}

// Generar el XML del sitemap
function generateSitemapXML(urls: {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastModified, changeFrequency, priority }) => `<url>
  <loc>${url}</loc>
  <lastmod>${lastModified}</lastmod>
  <changefreq>${changeFrequency}</changefreq>
  <priority>${priority}</priority>
</url>`).join('\n')}
</urlset>`;
}

// Handler para la ruta sitemap.xml
export async function GET() {
  const urls = await generateSitemap();
  const xml = generateSitemapXML(urls);
  
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
} 