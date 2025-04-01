'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import CloudflareImage from '@/components/CloudflareImage';

// Definición local de la interfaz BlogPost
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

interface PostCardCompactProps {
  post: BlogPost;
  showImage?: boolean;
  ultraCompact?: boolean;
}

export default function PostCardCompact({ post, showImage = true, ultraCompact = false }: PostCardCompactProps) {
  const { slug, title, date, tags, imageId } = post;
  const formattedDate = format(new Date(date), 'dd MMM, yyyy', { locale: es });

  return (
    <div 
      className={`group transition-all duration-300 ${
        ultraCompact 
          ? 'flex flex-col space-y-1 mb-4' 
          : 'flex flex-col md:flex-row gap-4 items-start mb-6'
      }`}
    >
      {showImage && imageId && (
        <div className={`
          overflow-hidden rounded-lg flex-shrink-0 relative 
          ${ultraCompact ? 'w-full h-20' : 'w-full md:w-24 h-20'}
        `}>
          <Link href={`/blog/${slug}`} className="block">
            <CloudflareImage
              imageId={imageId}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </Link>
        </div>
      )}
      
      <div className="flex-1">
        <Link 
          href={`/blog/${slug}`}
          className={`block font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors ${
            ultraCompact ? 'text-sm mb-1' : 'text-base md:text-lg mb-2'
          }`}
        >
          {title}
        </Link>
        
        <div className={`flex ${ultraCompact ? 'flex-col space-y-1' : 'flex-wrap items-center'} text-xs text-gray-500 dark:text-gray-400`}>
          <time className={ultraCompact ? '' : 'mr-3'}>
            {formattedDate}
          </time>
          
          {!ultraCompact && tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 2).map(tag => (
                <span 
                  key={tag} 
                  className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 