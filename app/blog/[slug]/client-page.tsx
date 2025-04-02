'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import BlogLayout from '@/app/components/blog/BlogLayout';
import * as Sentry from "@sentry/nextjs";

// Definición de la interfaz BlogPost sin importarla del servidor
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  category?: string;
  imageId?: string;
  content: string;
}

export default function ClientBlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Asegurar que solo renderizamos en el cliente para evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
    
    async function fetchPost() {
      try {
        // Limpiar el slug para asegurar compatibilidad
        const cleanSlug = slug.replace(/\/$/, '');
        
        // Usar fetch para obtener el post desde la API
        const apiUrl = `/api/blog/post/${cleanSlug}`;
        console.log('Fetching post from:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          },
          // Asegurar que no se use caché para evitar problemas
          cache: 'no-store',
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          if (response.status === 404) {
            console.error('Post not found, redirecting to not-found page');
            // Utilizamos shallow:false para forzar una navegación completa
            router.push('/blog/not-found/', { scroll: true });
            return;
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Post data received:', data);
        
        if (!data.post) {
          console.error('No post data in response');
          setError('Datos del post no disponibles');
          return;
        }
        
        setPost(data.post);
        
        // Registrar en Sentry que el post se cargó correctamente
        Sentry.addBreadcrumb({
          category: 'blog',
          message: `Post cargado: ${cleanSlug}`,
          level: 'info'
        });
      } catch (error) {
        console.error('Error fetching post:', error);
        
        // Capturar el error en Sentry
        Sentry.captureException(error);
        
        setError('No se pudo cargar el artículo. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    }

    if (mounted) {
      fetchPost();
    }
    
    // Limpiar al desmontar
    return () => {
      // Cancelar cualquier solicitud pendiente si es necesario
    };
  }, [slug, router, mounted]);

  const handleBackToBlog = () => {
    router.push('/blog/', { scroll: true });
  };

  // No renderizar nada hasta que el componente esté montado
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <BlogLayout showSidebar={true}>
        <div className="animate-pulse space-y-8 max-w-3xl mx-auto">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2 mx-auto mb-4"></div>
          <div className="aspect-video rounded-xl bg-gray-200 dark:bg-gray-800"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-1/2 mx-auto"></div>
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
      </BlogLayout>
    );
  }

  if (error || !post) {
    return (
      <BlogLayout showSidebar={true}>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'No se pudo cargar el artículo'}
          </h2>
          <button
            onClick={handleBackToBlog}
            className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-xl inline-flex items-center font-medium transition-colors"
          >
            Volver al Blog
          </button>
        </div>
      </BlogLayout>
    );
  }

  // Una vez que tenemos el post, mostrar su contenido
  const formattedDate = format(new Date(post.date), 'dd MMMM, yyyy', { locale: es });

  // Función auxiliar para limpiar HTML potencialmente peligroso
  const cleanHtml = (html: string) => {
    // Limpiar scripts y atributos on* potencialmente peligrosos
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '');
  };

  return (
    <BlogLayout showSidebar={true}>
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
    </BlogLayout>
  );
} 