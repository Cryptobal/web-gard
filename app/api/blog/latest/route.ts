import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

// Marcar la ruta como dinámica para evitar redirecciones infinitas
export const dynamic = 'force-dynamic';

// Función para obtener los posts más recientes
export async function GET(request: Request) {
  try {
    // Obtener el límite de la URL si existe, o usar un valor predeterminado
    let limit = 3;
    
    // Extraer parámetros de la URL solo si es una URL válida
    try {
      if (request.url) {
        const url = new URL(request.url);
        const limitParam = url.searchParams.get('limit');
        if (limitParam && !isNaN(parseInt(limitParam))) {
          limit = parseInt(limitParam);
        }
      }
    } catch (e) {
      console.warn('No se pudo analizar la URL para obtener parámetros:', e);
      // Continuar con el límite predeterminado
    }
    
    // Obtener los posts y limitar el resultado
    const allPosts = await getAllPosts();
    const limitedPosts = allPosts.slice(0, limit);
    
    // Agregar CORS y cabeceras de caché para evitar problemas de navegador
    return NextResponse.json({ posts: limitedPosts }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error('Error en la API de blog:', error);
    return NextResponse.json(
      { error: 'Error al obtener los posts del blog' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, max-age=0',
        }
      }
    );
  }
} 