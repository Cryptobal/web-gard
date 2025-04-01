import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cloudflareImages } from './images';

// Tipos para el blog
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  category?: string;
  imageId?: string;
  content: string;
}

// Configuración de paginación
export const POSTS_PER_PAGE = 6;

const postsDirectory = path.join(process.cwd(), 'docs/blog_posts');

// Obtener todos los slugs de los posts
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// Obtener datos de un post específico por slug
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Usar gray-matter para parsear la sección de metadatos
  const { data, content } = matter(fileContents);
  
  // Por ahora utilizamos un ID de imagen genérico conocido
  // Esto evitará errores 404 hasta que se configuren correctamente las imágenes
  const imageId = cloudflareImages.sections.services;
  
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    tags: data.tags || [],
    category: data.category || 'General',
    imageId,
    content,
  };
}

// Obtener todos los posts ordenados por fecha
export async function getAllPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return await getPostBySlug(slug);
    })
  );
  
  // Ordenar posts por fecha, del más reciente al más antiguo
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Obtener posts paginados
export async function getPaginatedPosts(page: number = 1): Promise<{
  posts: BlogPost[];
  totalPages: number;
}> {
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  
  // Asegurar que la página está dentro de los límites válidos
  const validPage = Math.max(1, Math.min(page, totalPages));
  
  // Calcular el índice de inicio y fin para la paginación
  const startIndex = (validPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  
  // Obtener los posts para la página actual
  const posts = allPosts.slice(startIndex, endIndex);
  
  return {
    posts,
    totalPages,
  };
} 