'use client';

import { useEffect, useState } from 'react';
import PostCard from './PostCard';

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

interface PostSugeridosProps {
  currentSlug: string;
  currentTags?: string[];
}

export default function PostSugeridos({ currentSlug, currentTags = [] }: PostSugeridosProps) {
  const [sugeridos, setSugeridos] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSugeridos() {
      // Si no hay tags para comparar, no mostramos sugeridos
      if (!currentTags || currentTags.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // Obtener todos los posts usando la API
        const response = await fetch('/api/blog/posts');
        if (!response.ok) throw new Error('Error al cargar los posts');
        
        const { posts } = await response.json();
        
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
  }, [currentSlug, currentTags]);

  // Si no hay posts sugeridos o aún está cargando, no mostramos nada
  if (loading || sugeridos.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-posts-heading" className="mt-16 mb-8 border-t border-gray-200 dark:border-gray-800 pt-10">
      <h2 id="related-posts-heading" className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Artículos relacionados
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sugeridos.map((post) => (
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
    </section>
  );
} 