import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import PostCard from '@/app/components/blog/PostCard';
import BlogLayout from '@/app/components/blog/BlogLayout';
import Pagination from '@/app/components/blog/Pagination';
import Link from 'next/link';

/**
 * Función para capitalizar la primera letra de cada palabra en un string
 */
function capitalize(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Genera rutas estáticas para todas las páginas de etiquetas
 */
export async function generateStaticParams() {
  const uniqueTags = await getAllTags();
  const params = [];

  for (const tag of uniqueTags) {
    const { totalPages } = await getPostsByTag(tag);
    
    // Solo generar páginas 2 en adelante (la primera página está en /blog/tag/[tag])
    for (let page = 2; page <= totalPages; page++) {
      params.push({
        tag,
        page: String(page)
      });
    }
  }

  return params;
}

/**
 * Genera metadatos SEO para cada página paginada de etiqueta
 */
export async function generateMetadata({
  params,
}: {
  params: { tag: string; page: string };
}): Promise<Metadata> {
  const { tag, page } = params;
  const pageNumber = parseInt(page, 10);
  const tagName = decodeURIComponent(tag);
  const capitalizedTag = capitalize(tagName);
  
  const { totalPages } = await getPostsByTag(tagName, pageNumber);
  
  // Si la página es inválida, usar metadatos de página no encontrada
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    return {
      title: 'Página no encontrada | Blog de Gard Security',
      description: 'La página de blog solicitada no existe.',
    };
  }

  const canonicalPath = `/blog/tag/${encodeURIComponent(tagName)}/page/${pageNumber}`;
  
  // Preparar links para SEO (prev/next)
  const links: { [key: string]: string }[] = [];
  
  // Agregar enlace a la página anterior
  if (pageNumber > 1) {
    const prevPath = pageNumber === 2 
      ? `/blog/tag/${encodeURIComponent(tagName)}` 
      : `/blog/tag/${encodeURIComponent(tagName)}/page/${pageNumber - 1}`;
      
    links.push({
      rel: 'prev',
      href: prevPath,
    });
  }
  
  // Agregar enlace a la página siguiente si no estamos en la última página
  if (pageNumber < totalPages) {
    links.push({
      rel: 'next',
      href: `/blog/tag/${encodeURIComponent(tagName)}/page/${pageNumber + 1}`,
    });
  }

  return {
    title: `${capitalizedTag} (Página ${pageNumber}) | Blog de Seguridad Gard`,
    description: `Explora artículos sobre ${capitalizedTag}. Página ${pageNumber} de ${totalPages}. Consejos, tendencias y novedades sobre seguridad privada.`,
    openGraph: {
      title: `${capitalizedTag} (Página ${pageNumber}) | Blog de Seguridad Gard`,
      description: `Explora artículos sobre ${capitalizedTag}. Página ${pageNumber} de ${totalPages}. Información clave sobre seguridad privada para empresas.`,
      images: [
        {
          url: 'https://gard.cl/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Artículos sobre ${capitalizedTag} - Página ${pageNumber}`,
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: canonicalPath,
    },
    // Incluir los enlaces prev/next para SEO
    ...(links.length > 0 ? { links } : {}),
  };
}

/**
 * Página paginada de etiquetas del blog
 */
export default async function TagPaginatedPage({
  params,
}: {
  params: { tag: string; page: string };
}) {
  const { tag, page } = params;
  const pageNumber = parseInt(page, 10);
  const tagName = decodeURIComponent(tag);
  const capitalizedTag = capitalize(tagName);
  
  // Obtener posts paginados para la página actual
  const { posts, totalPages, totalPosts } = await getPostsByTag(tagName, pageNumber);
  
  // Redirigir a la página 404 si el número de página no es válido
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages || totalPosts === 0) {
    notFound();
  }

  return (
    <BlogLayout showSidebar={true}>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 px-4 md:px-0 text-sm text-muted-foreground overflow-x-auto"
      >
        <ol className="list-none p-0 inline-flex space-x-2">
          <li>
            <Link href="/" className="hover:underline text-primary dark:text-accent font-medium">Inicio</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:underline text-primary dark:text-accent font-medium">Blog</Link>
          </li>
          <li>/</li>
          <li>
            <Link 
              href={`/blog/tag/${encodeURIComponent(tagName)}`} 
              className="hover:underline text-primary dark:text-accent font-medium"
            >
              {capitalizedTag}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-700 dark:text-gray-300">
            Página {pageNumber}
          </li>
        </ol>
      </nav>
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Artículos sobre "{capitalizedTag}"
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Conoce todas nuestras publicaciones que analizan el tema de "{capitalizedTag}" en profundidad. 
          Información especializada para profesionales del sector seguridad.
        </p>
        <div className="mt-4 text-sm text-gray-500">
          Página {pageNumber} de {totalPages} • {totalPosts} {totalPosts === 1 ? 'artículo encontrado' : 'artículos encontrados'}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            date={post.date}
            excerpt={post.description}
            imageId={post.imageId}
            tags={post.tags}
          />
        ))}
      </div>
      
      {/* Paginación */}
      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        basePath={`/blog/tag/${encodeURIComponent(tagName)}`}
      />
      
      {/* Botón para volver al blog */}
      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-xl inline-flex items-center font-medium transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al Blog
        </Link>
      </div>
    </BlogLayout>
  );
} 