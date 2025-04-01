'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PostCard from './PostCard';
import PostCardCompact from './PostCardCompact';

// Tipo BlogPost sin importar de lib/blog
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

interface LatestPostsProps {
  limit?: number;
  showImage?: boolean;
  compact?: boolean;
  title?: string;
  showViewAll?: boolean;
}

export default function LatestPosts({
  limit = 3,
  showImage = true,
  compact = false,
  title = "Últimos artículos",
  showViewAll = true,
}: LatestPostsProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Usar fetch para obtener los posts desde la API
        const response = await fetch(`/api/blog/latest?limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar los posts');
        }
        
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [limit]);

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Item variants for fade-in animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <div className="w-full py-8">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="bg-gray-200 dark:bg-gray-800 h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No hay artículos disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full ${!compact ? 'py-8' : 'py-4'}`}>
      {title && (
        <div className="flex justify-between items-center mb-6">
          <h2 className={`${compact ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-gray-900 dark:text-white`}>
            {title}
          </h2>
          
          {showViewAll && (
            <Link 
              href="/blog"
              className="text-primary dark:text-primary hover:underline text-sm font-medium transition-colors"
            >
              Ver todos
            </Link>
          )}
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={compact ? 'space-y-4' : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'}
      >
        {posts.map((post) => (
          <motion.div key={post.slug} variants={itemVariants}>
            {compact ? (
              <PostCardCompact 
                post={post} 
                showImage={showImage} 
                ultraCompact={compact && !showImage}
              />
            ) : (
              <PostCard
                slug={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.description}
                imageId={showImage ? post.imageId : undefined}
                tags={post.tags}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
      
      {showViewAll && compact && (
        <div className="text-center mt-6">
          <Link 
            href="/blog"
            className="inline-flex items-center text-primary dark:text-primary hover:underline font-medium transition-colors"
          >
            <span>Ver todos los artículos</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
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
          </Link>
        </div>
      )}
    </div>
  );
} 