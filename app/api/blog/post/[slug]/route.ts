import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/blog';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    console.log('API request for post with slug:', slug);
    
    if (!slug) {
      console.error('Slug not provided in API request');
      return NextResponse.json(
        { error: 'Slug no proporcionado' },
        { status: 400 }
      );
    }
    
    // Obtener post por slug
    const post = await getPostBySlug(slug);
    
    if (!post) {
      console.error(`Post not found for slug: ${slug}`);
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }
    
    // Devolver el post como respuesta JSON
    console.log(`Successfully retrieved post for slug: ${slug}`);
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error en la API de post individual:', error);
    return NextResponse.json(
      { error: 'Error al obtener el post' },
      { status: 500 }
    );
  }
} 