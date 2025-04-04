import React from 'react';
import CotizadorFormulario from '@/app/components/cotizador/CotizadorFormulario';
import BeneficiosCotizador from '@/components/cotizador/BeneficiosCotizador';
import FAQsCotizador from '@/components/cotizador/FAQsCotizador';
import CloudflareImage from '@/components/CloudflareImage';

export default function CotizadorInteligentePage() {
  return (
    <>      
      {/* Hero Section - Sin espacios superiores */}
      <section className="relative w-full h-[50vh] md:h-[60vh]">
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
      
      {/* Beneficios del servicio */}
      <BeneficiosCotizador />
      
      {/* Preguntas frecuentes */}
      <FAQsCotizador />
      
      {/* Frase de confianza */}
      <div className="w-full text-center pb-16 mt-10">
        <p className="text-gray-300 text-lg font-medium">
          Gard Security: más de 100 empresas ya han confiado en nosotros para su protección.
        </p>
      </div>
    </>
  );
} 