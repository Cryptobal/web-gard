'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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

interface BlogLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export default function BlogLayout({ children, showSidebar = false }: BlogLayoutProps) {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [topTags, setTopTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSidebarData() {
      if (!showSidebar) return;
      
      try {
        // Obtener los últimos posts usando la API - limitamos a 4 posts
        const response = await fetch('/api/blog/latest?limit=4');
        if (!response.ok) throw new Error('Error al cargar los posts recientes');
        const { posts } = await response.json();
        setLatestPosts(posts);
        
        // Obtener todos los posts para analizar las etiquetas
        const allPostsResponse = await fetch('/api/blog/posts');
        if (!allPostsResponse.ok) throw new Error('Error al cargar los posts para etiquetas');
        const { posts: allPosts } = await allPostsResponse.json();
        
        // Contar frecuencia de etiquetas
        const tagCounts: Record<string, number> = {};
        allPosts.forEach((post: BlogPost) => {
          if (post.tags && post.tags.length) {
            post.tags.forEach(tag => {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
          }
        });
        
        // Ordenar etiquetas por frecuencia
        const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
        setTopTags(sortedTags);
      } catch (error) {
        console.error('Error cargando datos del sidebar:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSidebarData();
  }, [showSidebar]);

  return (
    <div className="bg-white dark:bg-gray-950">
      <main className="pt-[100px] md:pt-[120px] pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showSidebar ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3">{children}</div>
              <aside className="w-full lg:w-1/3 lg:pl-8 mt-12 lg:mt-0 lg:border-l lg:border-gray-200 dark:lg:border-gray-800">
                <div className="lg:sticky lg:top-[120px] max-w-sm ml-auto bg-gray-50 dark:bg-gray-900 p-6 rounded-xl max-h-[calc(100vh-160px)] overflow-y-auto">
                  {/* Últimos artículos */}
                  <div className="mb-10">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                      Últimos artículos
                    </h3>
                    {isLoading ? (
                      <div className="animate-pulse space-y-4">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="space-y-2">
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-4">
                        {latestPosts.map(post => (
                          <li key={post.slug} className="mb-3">
                            <Link 
                              href={`/blog/${post.slug}`} 
                              className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary hover:underline font-medium block"
                            >
                              {post.title}
                            </Link>
                            <time className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(post.date).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </time>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Temas del blog */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                      Temas del blog
                    </h3>
                    {isLoading ? (
                      <div className="animate-pulse flex flex-wrap gap-2">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 overflow-x-auto">
                        {topTags.slice(0, 12).map(tag => (
                          <Link
                            key={tag}
                            href={`/blog/tag/${encodeURIComponent(tag)}`}
                            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  );
} 