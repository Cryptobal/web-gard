import { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { CLOUDFLARE_ACCOUNT_HASH } from '@/lib/images';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import BlogLayout from '@/app/components/blog/BlogLayout';
import dynamic from 'next/dynamic';

// Cargar el PostSugeridosLoader de forma dinámica (solo en el cliente)
const PostSugeridosLoader = dynamic(() => import('@/app/components/PostSugeridosLoader'), {
  ssr: false, // No SSR para este componente
});

// Generar rutas estáticas para todos los posts
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

// Generar metadata dinámica para cada post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Limpiar el slug para asegurar compatibilidad
  const slug = params.slug.replace(/\/$/, '');
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
      description: 'El artículo que buscas no existe o ha sido eliminado.',
    };
  }

  const ogImageUrl = post.imageId 
    ? `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${post.imageId}/public`
    : `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/5eea1064-8a2d-4e8b-5606-d28775467a00/public`;

  return {
    title: `${post.title} | Blog de Gard Security`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

// Función auxiliar para limpiar HTML potencialmente peligroso
function cleanHtml(html: string) {
  // Limpiar scripts y atributos on* potencialmente peligrosos
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '');
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Verificar que tengamos un slug válido
  if (!params.slug) {
    return notFound();
  }
  
  // Limpiar el slug para asegurar compatibilidad
  const slug = params.slug.replace(/\/$/, '');
  
  // Obtener datos del post del lado del servidor
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return notFound();
  }
  
  const formattedDate = format(new Date(post.date), 'dd MMMM, yyyy', { locale: es });
  
  // Schema.org para artículos
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.imageId 
      ? `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${post.imageId}/public`
      : `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/5eea1064-8a2d-4e8b-5606-d28775467a00/public`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Gard Security',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gard Security',
      logo: {
        '@type': 'ImageObject',
        url: `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/7661cf51-c66b-4419-9229-e6e50f76ff00/public`,
      },
    },
  };

  // Schema.org para breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://gard.cl/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://gard.cl/blog/',
      },
      ...(post.tags?.[0] ? [
        {
          '@type': 'ListItem',
          position: 3,
          name: post.tags[0],
          item: `https://gard.cl/blog/tag/${encodeURIComponent(post.tags[0])}/`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: post.title,
          item: `https://gard.cl/blog/${slug}/`,
        }
      ] : [
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `https://gard.cl/blog/${slug}/`,
        }
      ]),
    ],
  };
  
  return (
    <BlogLayout showSidebar={true}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Breadcrumbs - inmediatamente después del header */}
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
            <Link href="/blog/" className="hover:underline text-primary dark:text-accent font-medium">Blog</Link>
          </li>
          {post.tags?.[0] && (
            <>
              <li>/</li>
              <li>
                <Link href={`/blog/tag/${encodeURIComponent(post.tags[0])}/`} className="hover:underline text-primary dark:text-accent font-medium">
                  {post.tags[0]}
                </Link>
              </li>
            </>
          )}
          <li>/</li>
          <li className="text-gray-700 dark:text-gray-300 truncate max-w-xs">
            {post.title}
          </li>
        </ol>
      </nav>
      
      {/* Hero del artículo */}
      <div className="mb-8">
        {post.imageId && (
          <div className="aspect-video md:aspect-[21/9] relative rounded-2xl overflow-hidden mb-8">
            <CloudflareImage
              imageId={post.imageId}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        )}
        
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex justify-center items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <time dateTime={post.date}>{formattedDate}</time>
            
            {post.category && (
              <>
                <span>•</span>
                <span>{post.category}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Contenido del artículo - usar dangerouslySetInnerHTML para renderizar HTML */}
      <article className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: cleanHtml(post.content) }} 
        />
      </article>
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}/`}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
      
      {/* Contenedor para posts sugeridos */}
      <div id="posts-sugeridos-container" className="mt-16 mb-8 border-t border-gray-200 dark:border-gray-800 pt-10">
        {/* Datos de post para el cliente */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.currentPostData = {
                slug: ${JSON.stringify(slug)},
                tags: ${JSON.stringify(post.tags || [])}
              };
            `
          }}
        />
        
        {/* Cargar componente cliente para posts sugeridos */}
        <PostSugeridosLoader />
      </div>
    </BlogLayout>
  );
} 