'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CloudflareImage from '@/components/CloudflareImage';

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

interface WindowWithPostData extends Window {
  currentPostData?: {
    slug: string;
    tags: string[];
  };
}

export default function PostSugeridosClient() {
  const [sugeridos, setSugeridos] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [currentSlug, setCurrentSlug] = useState<string>('');
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  
  // Obtener los datos del post actual de la ventana global
  useEffect(() => {
    setMounted(true);
    
    // Obtener datos del objeto window
    const windowWithData = window as WindowWithPostData;
    if (windowWithData.currentPostData) {
      setCurrentSlug(windowWithData.currentPostData.slug);
      setCurrentTags(windowWithData.currentPostData.tags || []);
    }
  }, []);

  useEffect(() => {
    if (!mounted || !currentSlug || currentTags.length === 0) {
      setLoading(false);
      return;
    }
    
    async function fetchSugeridos() {
      try {
        // Obtener todos los posts usando la API
        const response = await fetch('/api/blog/posts', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) throw new Error('Error al cargar los posts');
        
        const { posts } = await response.json();
        
        // Asegurarnos de que posts sea un array
        if (!Array.isArray(posts)) {
          console.error('API response is not an array:', posts);
          setLoading(false);
          return;
        }
        
        // Filtrar el post actual y calcular la relevancia de otros posts basada en tags comunes
        const postsConRelevancia = posts
          .filter((post: BlogPost) => post.slug !== currentSlug) // Excluir post actual
          .map((post: BlogPost) => {
            // Contar cuántos tags coinciden
            const tagsComunes = post.tags?.filter(tag => currentTags.includes(tag)) || [];
            
            return {
              ...post,
              relevancia: tagsComunes.length
            };
          })
          .filter((post: any) => post.relevancia > 0) // Solo posts con al menos un tag en común
          .sort((a: any, b: any) => b.relevancia - a.relevancia); // Ordenar por relevancia descendente
        
        // Tomar los 3 primeros posts más relevantes
        setSugeridos(postsConRelevancia.slice(0, 3));
      } catch (error) {
        console.error('Error cargando posts sugeridos:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSugeridos();
  }, [currentSlug, currentTags, mounted]);

  // No renderizar nada hasta que el componente esté montado para evitar problemas de hidratación
  if (!mounted) {
    return null;
  }

  // Si no hay posts sugeridos y no está cargando, no mostramos nada
  if (!loading && sugeridos.length === 0) {
    return null;
  }

  const handlePostClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/blog/${slug}/`);
  };

  return (
    <>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Artículos relacionados
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          // Mostrar placeholders durante la carga
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm h-full">
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700" />
                <div className="p-4">
                  <div className="h-6 w-3/4 mb-2 bg-gray-200 dark:bg-gray-700 rounded-md" />
                  <div className="h-4 w-full mb-4 bg-gray-200 dark:bg-gray-700 rounded-md" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-md" />
                </div>
              </div>
            ))}
          </>
        ) : (
          // Mostrar posts sugeridos
          sugeridos.map((post) => (
            <div 
              key={post.slug} 
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-transform hover:scale-[1.02] h-full"
            >
              <a 
                href={`/blog/${post.slug}/`} 
                onClick={(e) => handlePostClick(post.slug, e)} 
                className="block h-full flex flex-col"
              >
                {/* Imagen */}
                <div className="aspect-video relative overflow-hidden">
                  {post.imageId ? (
                    <CloudflareImage
                      imageId={post.imageId}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
                  )}
                </div>
                
                {/* Contenido */}
                <div className="p-4 flex flex-col justify-between h-full">
                  {/* Título */}
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white hover:text-primary dark:hover:text-accent">
                      {post.title}
                    </h3>
                    
                    {/* Extracto */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                  
                  {/* Tags y botón leer - siempre alineados abajo */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags && post.tags.slice(0, 2).map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <span className="text-sm font-medium text-primary dark:text-accent flex items-center">
                      Leer artículo
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </>
  );
} 