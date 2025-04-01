import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPaginatedPosts, getAllPosts, POSTS_PER_PAGE } from '@/lib/blog';
import PostCard from '@/app/components/blog/PostCard';
import BlogLayout from '@/app/components/blog/BlogLayout';
import Pagination from '@/app/components/blog/Pagination';
import Link from 'next/link';

// Generar rutas estáticas para todas las páginas
export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  
  // Generar parámetros para todas las páginas excepto la primera (que es /blog)
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1), // Todas las páginas, incluyendo la primera
  }));
}

// Generar metadata dinámica para cada página
export async function generateMetadata({
  params,
}: {
  params: { page: string };
}): Promise<Metadata> {
  const pageNumber = parseInt(params.page, 10);
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  
  // Si la página es inválida, usar metadatos de página no encontrada
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    return {
      title: 'Página no encontrada | Blog de Gard Security',
      description: 'La página de blog solicitada no existe.',
    };
  }

  // Preparar links para SEO (prev/next)
  const links: { [key: string]: string }[] = [];
  
  // Agregar enlace a la página anterior si no estamos en la primera página
  if (pageNumber > 1) {
    const prevPath = pageNumber === 2 ? '/blog' : `/blog/page/${pageNumber - 1}`;
    links.push({
      rel: 'prev',
      href: prevPath,
    });
  }
  
  // Agregar enlace a la página siguiente si no estamos en la última página
  if (pageNumber < totalPages) {
    links.push({
      rel: 'next',
      href: `/blog/page/${pageNumber + 1}`,
    });
  }

  return {
    title: pageNumber === 1 
      ? 'Blog de Seguridad Privada | Gard Security' 
      : `Página ${pageNumber} | Blog de Seguridad Privada | Gard Security`,
    description: `Explora artículos sobre seguridad privada y guardias de seguridad en Chile. ${pageNumber > 1 ? `Página ${pageNumber} de ${totalPages}.` : ''}`,
    openGraph: {
      title: pageNumber === 1 
        ? 'Blog de Seguridad Privada | Gard Security' 
        : `Página ${pageNumber} | Blog de Seguridad Privada | Gard Security`,
      description: `Explora artículos sobre seguridad privada y guardias de seguridad en Chile. ${pageNumber > 1 ? `Página ${pageNumber} de ${totalPages}.` : ''}`,
      images: [
        {
          url: 'https://gard.cl/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Blog de Gard Security - Página ${pageNumber}`,
        },
      ],
    },
    alternates: {
      canonical: pageNumber === 1 ? '/blog' : `/blog/page/${pageNumber}`,
    },
    // Incluir los enlaces prev/next para SEO
    ...(links.length > 0 ? { alternates: { canonical: pageNumber === 1 ? '/blog' : `/blog/page/${pageNumber}` }, links } : {}),
  };
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: { page: string };
}) {
  const pageNumber = parseInt(params.page, 10);
  
  // Obtener el total de posts para calcular el número total de páginas
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  
  // Redirigir a la página 404 si el número de página no es válido
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    notFound();
  }
  
  // Obtener posts para la página actual
  const { posts } = await getPaginatedPosts(pageNumber);
  
  return (
    <BlogLayout showSidebar={true}>
      <>
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
              Página {pageNumber}
            </li>
          </ol>
        </nav>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog de Seguridad
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Conoce las últimas tendencias, consejos y noticias sobre seguridad privada, 
            guardias de seguridad y protección empresarial en Chile.
          </p>
          {pageNumber > 1 && (
            <div className="mt-4 text-sm text-gray-500">
              Página {pageNumber} de {totalPages}
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
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No hay artículos disponibles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Pronto publicaremos nuevos artículos. ¡Vuelve a visitarnos!
            </p>
          </div>
        )}

        {/* Paginación */}
        <Pagination 
          currentPage={pageNumber} 
          totalPages={totalPages} 
          basePath="/blog"
        />
      </>
    </BlogLayout>
  );
} 