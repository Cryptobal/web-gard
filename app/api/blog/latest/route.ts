import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET(request: Request) {
  try {
    // Obtener la URL y extraer el parámetro limit
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '3', 10);
    
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