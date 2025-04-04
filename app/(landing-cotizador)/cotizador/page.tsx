import React from 'react';
import dynamic from 'next/dynamic';

const CotizadorLandingClient = dynamic(
  () => import('@/components/cotizador/CotizadorLandingClient'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full min-h-screen">
        <p className="text-white">Cargando cotizador...</p>
      </div>
    ),
  }
);

export default function CotizadorPage() {
  return <CotizadorLandingClient />;
} 