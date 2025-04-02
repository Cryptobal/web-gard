import { MetadataRoute } from 'next';
import { industries } from '@/app/data/industries';
import { getAllPosts, POSTS_PER_PAGE, getAllTags, getPostsByTag } from '@/lib/blog';
import { isValidUrl } from '@/lib/utils';

// Función para verificar y filtrar URLs
async function filterValidUrls(urls: { url: string; lastModified: string; changeFrequency: string; priority: number; }[]) {
  console.log(`API Sitemap: Verificando ${urls.length} URLs...`);
  
  // Agrupar las URLs en lotes para procesarlas de forma más eficiente
  const batchSize = 10; // Procesar 10 URLs a la vez
  const validUrls: { url: string; lastModified: string; changeFrequency: string; priority: number; }[] = [];
  
  // Función para procesar un lote de URLs
  const processBatch = async (batch: typeof urls) => {
    // Verificar todas las URLs en el lote en paralelo
    const results = await Promise.allSettled(
      batch.map(async (urlItem) => {
        const isValid = await isValidUrl(urlItem.url);
        return { urlItem, isValid };
      })
    );
    
    // Filtrar las URLs válidas
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.isValid) {
        validUrls.push(result.value.urlItem);
      } else if (result.status === 'fulfilled') {
        console.log(`API Sitemap: URL no válida (redirección o error): ${result.value.urlItem.url}`);
      }
    });
  };
  
  // Procesar las URLs en lotes
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    await processBatch(batch);
    console.log(`API Sitemap: Progreso: ${Math.min(i + batchSize, urls.length)}/${urls.length} URLs procesadas`);
  }
  
  console.log(`API Sitemap: URLs válidas: ${validUrls.length} de ${urls.length}`);
  return validUrls;
}

// Generar las rutas del sitemap
async function generateSitemap() {
  const baseUrl = 'https://www.gard.cl';
  
  // Páginas estáticas
  const staticPages = [
    '',
    '/servicios',
    '/industrias',
    '/sobre-nosotros',
    '/tecnologia-seguridad',
    '/contacto',
    '/cotizar',
    '/privacidad',
    '/terminos',
    '/politica-ambiental',
    '/reclutamiento',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

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

  const allUrls = [
    ...staticPages, 
    ...servicePages, 
    ...industryPages, 
    ...blogPostPages, 
    ...blogPaginationPages,
    ...blogTagPages,
    ...blogTagPaginationPages
  ];
  
  // Filtrar URLs para incluir solo las que devuelven código 200
  return await filterValidUrls(allUrls);
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

// Handler API de Next.js para la ruta /api/sitemap
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