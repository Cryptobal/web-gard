import dynamic from 'next/dynamic';

// Cargar el componente cliente de forma dinámica
const SobreNosotrosClient = dynamic(() => import('@/components/sobre-nosotros/SobreNosotrosClient'), {
  ssr: false,
});

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <SobreNosotrosClient />
    </main>
  );
} 