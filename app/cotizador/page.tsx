import dynamic from 'next/dynamic';

const CotizadorLandingClient = dynamic(() => import('@/components/cotizador/CotizadorLandingClient'), {
  ssr: false,
});

export default function CotizadorPage() {
  return (
    <main className="min-h-screen bg-[#0b132b] text-white overflow-x-hidden">
      <CotizadorLandingClient />
    </main>
  );
} 