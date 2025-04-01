import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  try {
    // Obtener todos los posts
    const allPosts = await getAllPosts();
    
    // Devolver los posts como respuesta JSON
    return NextResponse.json({ posts: allPosts });
  } catch (error) {
    console.error('Error en la API de blog/posts:', error);
    return NextResponse.json(
      { error: 'Error al obtener todos los posts del blog' },
      { status: 500 }
    );
  }
} 