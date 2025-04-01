import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BlogLayout from '@/app/components/blog/BlogLayout';

export default function TagPageNotFound() {
  return (
    <BlogLayout showSidebar={false}>
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Página no encontrada
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-2xl">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
          Por favor, verifica la URL o regresa al blog para encontrar el contenido que buscas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/blog">
              Volver al Blog
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              Ir al Inicio
            </Link>
          </Button>
        </div>
      </div>
    </BlogLayout>
  );
} 