import { Metadata } from 'next';
import { getPaginatedPosts, getAllPosts, POSTS_PER_PAGE } from '@/lib/blog';
import PostCard from '@/app/components/blog/PostCard';
import BlogLayout from '@/app/components/blog/BlogLayout';
import Pagination from '@/app/components/blog/Pagination';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  
  // Preparar links para SEO (solo next para la primera página)
  const links: { [key: string]: string }[] = [];
  
  // Agregar enlace a la página siguiente si hay más de una página
  if (totalPages > 1) {
    links.push({
      rel: 'next',
      href: '/blog/page/2',
    });
  }

  return {
    title: 'Blog de Seguridad Privada | Gard Security',
    description: 'Descubre las últimas noticias, tendencias y consejos sobre seguridad privada, guardias de seguridad y protección empresarial en Chile.',
    openGraph: {
      title: 'Blog de Seguridad Privada | Gard Security',
      description: 'Descubre las últimas noticias, tendencias y consejos sobre seguridad privada, guardias de seguridad y protección empresarial en Chile.',
      images: [
        {
          url: 'https://gard.cl/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Blog de Gard Security',
        },
      ],
    },
    alternates: {
      canonical: '/blog',
    },
    // Incluir el enlace next para SEO si hay más de una página
    ...(links.length > 0 ? { links } : {}),
  };
}

export default async function BlogPage() {
  // Obtener posts para la primera página
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const { posts } = await getPaginatedPosts(1);

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
            <li className="text-gray-700 dark:text-gray-300">
              Blog
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
          currentPage={1} 
          totalPages={totalPages} 
          basePath="/blog"
        />
      </>
    </BlogLayout>
  );
} 