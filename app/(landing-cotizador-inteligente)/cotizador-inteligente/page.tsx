import React from 'react';
import CotizadorFormulario from '@/app/components/cotizador/CotizadorFormulario';
import CloudflareImage from '@/components/CloudflareImage';

export const metadata = {
  title: 'Cotizador Inteligente de Guardias de Seguridad | Gard Security',
  description: 'Calcula el costo de tu servicio de guardias de seguridad con nuestro cotizador inteligente. Configura turnos, horarios y recibe una cotización personalizada.',
  canonical: 'https://gardsecurity.cl/cotizador-inteligente',
};

export default function CotizadorInteligentePage() {
  return (
    <>      
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[50vh]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Cotizador Inteligente de Guardias
          </h1>
          <p className="text-white text-lg md:text-xl opacity-90 max-w-3xl">
            Configura los turnos, calcula costos y solicita tu cotización personalizada
          </p>
        </div>
        <CloudflareImage
          imageId="09f20a0c-b345-4db8-ff81-14aad098db00"
          alt="Cotizador inteligente de guardias de seguridad - Gard Security"
          fill
          priority
          className="object-cover"
        />
      </section>

      {/* Cotizador inteligente */}
      <CotizadorFormulario />
    </>
  );
} 