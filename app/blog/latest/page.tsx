import { Metadata } from 'next';
import BlogLayout from '@/app/components/blog/BlogLayout';
import LatestPosts from '@/app/components/blog/LatestPosts';

export const metadata: Metadata = {
  title: 'Últimos Artículos | Gard Security',
  description: 'Consulta los últimos artículos y noticias sobre seguridad privada publicados por Gard Security.',
};

export default function LatestPostsDemo() {
  return (
    <BlogLayout>
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Últimos Artículos del Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Diferentes ejemplos de visualización de los artículos más recientes.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Vista Completa (Por defecto)</h2>
        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <LatestPosts limit={3} showImage={true} />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Vista Compacta con Imágenes</h2>
        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl max-w-2xl">
          <LatestPosts 
            limit={4} 
            showImage={true} 
            compact={true} 
            title="Artículos destacados" 
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Vista Ultra Compacta (Para Sidebar/Footer)</h2>
        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl max-w-xs">
          <LatestPosts 
            limit={5} 
            showImage={false} 
            compact={true} 
            title="Lo más leído" 
          />
        </div>
      </div>

      <div className="text-center mt-12 mb-8">
        <p className="text-gray-500 dark:text-gray-400">
          Este componente es reutilizable y configurable mediante props.
        </p>
        <code className="mt-4 block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm max-w-lg mx-auto">
          {`<LatestPosts limit={3} showImage={true} />`}
          <br />
          {`<LatestPosts limit={4} showImage={true} compact={true} />`}
          <br />
          {`<LatestPosts limit={5} showImage={false} compact={true} />`}
        </code>
      </div>
    </BlogLayout>
  );
} 