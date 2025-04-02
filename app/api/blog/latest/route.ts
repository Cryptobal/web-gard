import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

// Función para obtener los posts más recientes
// Modificada para trabajar con generación estática
export async function GET() {
  try {
    // Establecer un límite fijo para evitar usar URL params dinámicos
    // que provocan problemas con la generación estática
    const limit = 3;
    
    // Obtener los posts y limitar el resultado
    const allPosts = await getAllPosts();
    const limitedPosts = allPosts.slice(0, limit);
    
    // Devolver los posts como respuesta JSON
    return NextResponse.json({ posts: limitedPosts });
  } catch (error) {
    console.error('Error en la API de blog:', error);
    return NextResponse.json(
      { error: 'Error al obtener los posts del blog' },
      { status: 500 }
    );
  }
} 