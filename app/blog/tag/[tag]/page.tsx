import { getAllPosts } from '@/lib/blog';
import BlogLayout from '@/app/components/blog/BlogLayout';
import PostCard from '@/app/components/blog/PostCard';
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
  const posts = await getAllPosts();
  const uniqueTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));
  return uniqueTags.map((tag) => ({ tag }));
}

/**
 * Genera metadatos SEO para cada página de etiqueta
 */
export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tagName = decodeURIComponent(params.tag);
  const capitalizedTag = capitalize(tagName);
  const canonicalPath = `/blog/tag/${encodeURIComponent(tagName)}`;
  
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
  };
}

/**
 * Página de etiquetas del blog que muestra todos los artículos con una etiqueta específica
 */
export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const capitalizedTag = capitalize(tag);
  const allPosts = await getAllPosts();
  const filtered = allPosts.filter((post) =>
    post.tags?.includes(tag)
  );

  if (filtered.length === 0) {
    notFound();
  }

  return (
    <BlogLayout showSidebar={true}>
      <div className="text-center mb-12">
        <h1 className="text-heading-1 font-title font-bold text-gray-900 dark:text-white mb-4">
          Artículos sobre "{capitalizedTag}"
        </h1>
        <p className="text-body-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Conoce todas nuestras publicaciones que analizan el tema de "{capitalizedTag}" en profundidad. 
          Información especializada para profesionales del sector seguridad.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {filtered.map((post) => (
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
      
      {/* 
        Bonus SEO: Si hay muchos artículos por tag, permite paginación opcional
        Esto puede implementarse más adelante siguiendo un patrón similar al de
        /blog/page/[page]/page.tsx, donde se usan POSTS_PER_PAGE y se pagina el contenido.
      */}
    </BlogLayout>
  );
} 