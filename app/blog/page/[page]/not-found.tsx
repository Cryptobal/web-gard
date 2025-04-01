import Link from 'next/link';
import BlogLayout from '@/app/components/blog/BlogLayout';

export default function BlogPageNotFound() {
  return (
    <BlogLayout>
      <div className="text-center py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Página no encontrada
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          La página del blog que estás buscando no existe o ha sido eliminada.
          Es posible que el número de página esté fuera del rango disponible.
        </p>
        <Link
          href="/blog"
          className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-xl inline-flex items-center font-medium transition-colors"
        >
          <span>Volver al inicio del blog</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
      </div>
    </BlogLayout>
  );
} 