import { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { CLOUDFLARE_ACCOUNT_HASH } from '@/lib/images';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Importar el componente cliente para evitar problemas de hidratación
const ClientBlogPost = dynamic(() => import('./client-page'), {
  ssr: false, // Deshabilitar SSR para este componente
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

export default function BlogPostPage({
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
  
  // Renderizar la versión cliente del blog post para evitar errores de hidratación
  return <ClientBlogPost slug={slug} />;
} 