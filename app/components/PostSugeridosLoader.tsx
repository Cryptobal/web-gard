'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Cargar el componente de forma dinámica, solo en el cliente
const PostSugeridosClient = dynamic(() => import('./blog/PostSugeridosClient'), {
  ssr: false,
  loading: () => null
});

export default function PostSugeridosLoader() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Retrasar la carga del componente para asegurar que la hidratación esté completa
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return null;
  }

  
  return <PostSugeridosClient />;
} 