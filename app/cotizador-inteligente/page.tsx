'use client';

import React, { useEffect } from 'react';
import CotizadorFormulario from '@/app/components/cotizador/CotizadorFormulario';
import BeneficiosCotizador from '@/components/cotizador/BeneficiosCotizador';
import FAQsCotizador from '@/components/cotizador/FAQsCotizador';
import CloudflareImage from '@/components/CloudflareImage';
import { metadata } from './metadata'; // Importación explícita

// Componente lado cliente para forzar metadatos
const MetadataEnforcer = () => {
  useEffect(() => {
    // Función para forzar la aplicación de metadatos
    const forceMetadata = () => {
      if (typeof document !== 'undefined') {
        // Aplicar título explícitamente
        document.title = metadata.title as string;
        
        // Aplicar metadescripción
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
          descMeta = document.createElement('meta');
          descMeta.setAttribute('name', 'description');
          document.head.appendChild(descMeta);
        }
        descMeta.setAttribute('content', metadata.description as string);
        
        // Aplicar Open Graph
        if (metadata.openGraph) {
          const og = metadata.openGraph;
          
          // OG Title
          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
          }
          ogTitle.setAttribute('content', og.title as string);
          
          // OG Description
          let ogDesc = document.querySelector('meta[property="og:description"]');
          if (!ogDesc) {
            ogDesc = document.createElement('meta');
            ogDesc.setAttribute('property', 'og:description');
            document.head.appendChild(ogDesc);
          }
          ogDesc.setAttribute('content', og.description as string);
        }
      }
    };
    
    // Ejecutar inmediatamente y luego cada segundo durante 5 segundos para asegurar que se apliquen
    forceMetadata();
    const interval = setInterval(forceMetadata, 1000);
    const timeout = setTimeout(() => clearInterval(interval), 5000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  
  return null;
};

export default function CotizadorInteligentePage() {
  return (
    <>      
      {/* Componente para forzar metadatos */}
      <MetadataEnforcer />
      
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