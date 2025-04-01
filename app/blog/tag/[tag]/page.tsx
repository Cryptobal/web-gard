import { getAllPosts, getAllTags, getPostsByTag } from '@/lib/blog';
import BlogLayout from '@/app/components/blog/BlogLayout';
import PostCard from '@/app/components/blog/PostCard';
import Pagination from '@/app/components/blog/Pagination';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  return uniqueTags.map((tag) => ({ tag }));
}

/**
 * Genera metadatos SEO para cada página de etiqueta
 */
export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tagName = decodeURIComponent(params.tag);
  const capitalizedTag = capitalize(tagName);
  const canonicalPath = `/blog/tag/${encodeURIComponent(tagName)}`;
  
  const { totalPages } = await getPostsByTag(tagName, 1);
  
  // Preparar enlaces para SEO
  const links: { [key: string]: string }[] = [];
  
  // Agregar enlace a la página siguiente si hay más de una página
  if (totalPages > 1) {
    links.push({
      rel: 'next',
      href: `/blog/tag/${encodeURIComponent(tagName)}/page/2`,
    });
  }
  
  return {
    title: `Artículos sobre ${capitalizedTag} | Blog de Seguridad Gard`,
    description: `Explora artículos del blog relacionados con ${capitalizedTag}. Conoce tendencias, consejos y novedades sobre seguridad privada en Chile.`,
    openGraph: {
      title: `Artículos sobre ${capitalizedTag} | Blog de Seguridad Gard`,
      description: `Explora artículos del blog relacionados con ${capitalizedTag}. Información clave sobre seguridad privada para empresas.`,
      images: [
        {
          url: 'https://gard.cl/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Artículos sobre ${capitalizedTag}`,
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: canonicalPath,
    },
    // Incluir el enlace next para SEO si hay más de una página
    ...(links.length > 0 ? { links } : {}),
  };
}

/**
 * Página de etiquetas del blog que muestra los artículos con una etiqueta específica (primera página)
 */
export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const capitalizedTag = capitalize(tag);
  
  // Obtener posts paginados para la primera página
  const { posts, totalPages, totalPosts } = await getPostsByTag(tag, 1);

  if (totalPosts === 0) {
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
          <li className="text-gray-700 dark:text-gray-300">
            {capitalizedTag}
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
        {totalPosts > 0 && (
          <div className="mt-4 text-sm text-gray-500">
            {totalPosts} {totalPosts === 1 ? 'artículo encontrado' : 'artículos encontrados'}
          </div>
        )}
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
      {totalPages > 1 && (
        <Pagination
          currentPage={1}
          totalPages={totalPages}
          basePath={`/blog/tag/${encodeURIComponent(tag)}`}
        />
      )}
      
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