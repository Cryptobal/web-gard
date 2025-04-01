"use client";

import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import CloudflareImage from '@/components/CloudflareImage';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageId?: string;
  tags?: string[];
}

export default function PostCard({
  slug,
  title,
  date,
  excerpt,
  imageId,
  tags,
}: PostCardProps) {
  // Formatear la fecha al español
  const formattedDate = format(new Date(date), 'dd MMMM, yyyy', { locale: es });
  
  return (
    <div className="gard-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div>
        <Link href={`/blog/${slug}`} className="block group">
          {imageId ? (
            <div className="aspect-video relative overflow-hidden">
              <CloudflareImage
                imageId={imageId}
                alt={title}
                fill
                className="transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </div>
          ) : (
            <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
          )}
          
          <div className="p-6">
            <div className="flex items-center mb-3">
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {formattedDate}
              </time>
            </div>
            
            <h3 className="text-heading-4 font-title font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-accent">
              {title}
            </h3>
            
            <p className="text-body-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {excerpt}
            </p>
            
            <div className="mt-4 flex items-center text-primary dark:text-accent font-medium">
              <span>Leer artículo</span>
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
            </div>
          </div>
        </Link>
        
        {/* Tags fuera del enlace principal para evitar anidación de enlaces */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 px-6 pb-6 -mt-2">
            {tags.map((tag) => (
              <Link 
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                key={tag}
                className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-primary/10 hover:text-primary dark:hover:bg-accent/10 dark:hover:text-accent transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 