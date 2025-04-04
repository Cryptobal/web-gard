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

// Componente explicativo del Cotizador Inteligente
const CotizadorIntroduccion = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-8 px-4">
      <div className="gard-container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 className="text-heading-2 text-gray-800 dark:text-white font-medium mb-4">
              Optimice su inversión en seguridad privada
            </h2>
            <p className="text-body-base text-gray-600 dark:text-gray-300 mb-4">
              Nuestro cotizador inteligente permite a empresas de todos los tamaños calcular con precisión 
              sus necesidades de guardias de seguridad, ahorrando hasta un 25% en costos operativos mediante 
              una planificación eficiente de turnos y recursos.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start">
                <div className="mr-3 bg-primary/10 p-2 rounded-lg">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-primary dark:text-accent"
                  >
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Proceso simple en 3 pasos:</span> Configure, reciba su cotización y un asesor especializado le contactará para finalizar.
                </p>
              </div>
              <div className="flex items-start">
                <div className="mr-3 bg-primary/10 p-2 rounded-lg">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-primary dark:text-accent"
                  >
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Personalización B2B completa:</span> Adapte los servicios a sus horarios, instalaciones y requerimientos específicos.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-sm bg-gray-50 dark:bg-gray-800 p-5 flex flex-col items-center">
            <div className="w-full max-w-xs mx-auto">
              <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-4 mb-3">
                <h3 className="text-heading-4 text-center text-gray-800 dark:text-white">
                  +180
                </h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Empresas ya utilizan nuestro servicio
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Respuesta en 
                  <span className="font-bold text-primary dark:text-accent mx-1">
                    menos de 24h
                  </span> 
                  para todas las cotizaciones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CotizadorInteligentePage() {
  return (
    <>      
      {/* Componente para forzar metadatos */}
      <MetadataEnforcer />
      
      {/* Componente explicativo */}
      <CotizadorIntroduccion />
      
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