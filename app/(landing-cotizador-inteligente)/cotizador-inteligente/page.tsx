'use client';

import React, { useEffect } from 'react';
import CotizadorFormulario from '@/app/components/cotizador/CotizadorFormulario';
import BeneficiosCotizador from '@/components/cotizador/BeneficiosCotizador';
import FAQsCotizador from '@/components/cotizador/FAQsCotizador';
import CloudflareImage from '@/components/CloudflareImage';
import Link from 'next/link';
import { ArrowRight, Calculator, Clock, Shield, HeadphonesIcon } from 'lucide-react';

// IDs de imágenes para logos
const LOGO_GARD_BLANCO = '49b89002-6bb9-41b9-50ad-e6b91e5f6d00';
const ESCUDO_GARD_BLANCO = 'f1cad221-0c11-43c4-3142-a53a6febbd00';

// Definir el metadata directamente en este archivo para evitar problemas de importación
const metadataInfo = {
  title: 'Cotizador Inteligente de Guardias de Seguridad | Gard Security',
  description: 'Calcula el costo de tu servicio de guardias de seguridad con nuestro cotizador inteligente. Configura turnos, horarios y recibe una cotización personalizada.',
  openGraph: {
    title: 'Cotizador Inteligente de Guardias de Seguridad | Gard Security',
    description: 'Calcula el costo de tu servicio de guardias de seguridad con nuestro cotizador inteligente. Configura turnos, horarios y recibe una cotización personalizada.'
  }
};

// Componente lado cliente para forzar metadatos
const MetadataEnforcer = () => {
  useEffect(() => {
    // Función para forzar la aplicación de metadatos
    const forceMetadata = () => {
      if (typeof document !== 'undefined') {
        // Aplicar título explícitamente
        document.title = metadataInfo.title;
        
        // Aplicar metadescripción
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
          descMeta = document.createElement('meta');
          descMeta.setAttribute('name', 'description');
          document.head.appendChild(descMeta);
        }
        descMeta.setAttribute('content', metadataInfo.description);
        
        // Aplicar Open Graph
        if (metadataInfo.openGraph) {
          const og = metadataInfo.openGraph;
          
          // OG Title
          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
          }
          ogTitle.setAttribute('content', og.title);
          
          // OG Description
          let ogDesc = document.querySelector('meta[property="og:description"]');
          if (!ogDesc) {
            ogDesc = document.createElement('meta');
            ogDesc.setAttribute('property', 'og:description');
            document.head.appendChild(ogDesc);
          }
          ogDesc.setAttribute('content', og.description);
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
const CotizadorExplicacion = () => {
  return (
    <section className="gard-section bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-heading-2 font-title font-bold text-gray-900 dark:text-white mb-4">
            Optimice su inversión en seguridad privada
          </h2>
          <p className="text-body-base text-gray-600 dark:text-gray-300">
            Nuestro cotizador inteligente le permite calcular con precisión el costo de sus servicios de seguridad, adaptados a las necesidades específicas de su empresa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          <div className="gard-card bg-white dark:bg-gray-800 p-6 rounded-2xl hover:shadow-sm transition-all">
            <Calculator className="text-primary dark:text-accent text-3xl mb-4" />
            <h3 className="font-title font-semibold text-gray-900 dark:text-white mb-2">Cotización instantánea</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Configure turnos, cantidad de guardias y obtenga un estimado inmediato del costo mensual.
            </p>
          </div>
          
          <div className="gard-card bg-white dark:bg-gray-800 p-6 rounded-2xl hover:shadow-sm transition-all">
            <Shield className="text-primary dark:text-accent text-3xl mb-4" />
            <h3 className="font-title font-semibold text-gray-900 dark:text-white mb-2">Personalización total</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Adapte el servicio a sus requerimientos específicos, optimizando recursos y cobertura.
            </p>
          </div>
          
          <div className="gard-card bg-white dark:bg-gray-800 p-6 rounded-2xl hover:shadow-sm transition-all">
            <Clock className="text-primary dark:text-accent text-3xl mb-4" />
            <h3 className="font-title font-semibold text-gray-900 dark:text-white mb-2">Proceso simplificado</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              En menos de 2 minutos complete su cotización y reciba propuesta formal en su correo.
            </p>
          </div>
          
          <div className="gard-card bg-white dark:bg-gray-800 p-6 rounded-2xl hover:shadow-sm transition-all">
            <HeadphonesIcon className="text-primary dark:text-accent text-3xl mb-4" />
            <h3 className="font-title font-semibold text-gray-900 dark:text-white mb-2">Asesoría especializada</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Tras su cotización, un ejecutivo especializado le contactará para afinar detalles y responder consultas.
            </p>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <a href="#cotizador" className="gard-btn inline-flex items-center gap-2 bg-primary dark:bg-accent text-white py-3 px-6 rounded-2xl font-medium hover:opacity-90 transition-all">
            Comenzar cotización <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
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
          <p className="text-white text-lg md:text-xl opacity-90 max-w-3xl mb-8">
            Configura los turnos, calcula costos y solicita tu cotización personalizada
          </p>
          
          {/* Logo bajo el texto del Hero */}
          <Link href="/" className="block mt-6 hover:opacity-90 transition-opacity">
            {/* Logo para desktop */}
            <div className="relative w-48 h-20 hidden md:block">
              <CloudflareImage 
                imageId={LOGO_GARD_BLANCO}
                alt="Gard Security Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
            
            {/* Escudo para móviles */}
            <div className="relative w-20 h-20 block md:hidden">
              <CloudflareImage 
                imageId={ESCUDO_GARD_BLANCO}
                alt="Gard Security Escudo"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </Link>
        </div>
        <CloudflareImage
          imageId="09f20a0c-b345-4db8-ff81-14aad098db00"
          alt="Cotizador inteligente de guardias de seguridad - Gard Security"
          fill
          priority
          className="object-cover"
        />
      </section>

      {/* Sección explicativa */}
      <CotizadorExplicacion />
      
      {/* Cotizador inteligente */}
      <section id="cotizador">
        <CotizadorFormulario />
      </section>
      
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