import React from 'react';
import CotizacionForm from './components/CotizacionForm';
import UrlParamsProcessor from './components/UrlParamsProcessor';
import CloudflareImage from '@/components/CloudflareImage';
import { ArrowRight } from 'lucide-react';
import CotizadorLandingClient from './components/CotizadorLandingClient';

export default function CotizarPage() {
  return (
    <>
      {/* Componente SEO cliente */}
      <CotizadorLandingClient />
      
      {/* Componente para procesar parámetros URL */}
      <UrlParamsProcessor />

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[50vh]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Cotiza tu Servicio de Seguridad
          </h1>
          <p className="text-white text-lg md:text-xl opacity-90 max-w-3xl">
            Completa el formulario y te enviaremos una propuesta personalizada
          </p>
        </div>
        <CloudflareImage
          imageId="09f20a0c-b345-4db8-ff81-14aad098db00"
          alt="Cotización de servicios de seguridad - Gard Security"
          fill
          priority
          className="object-cover"
        />
      </section>

      {/* Formulario de cotización */}
      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <h2 className="text-heading-2 mb-6">Solicita tu cotización personalizada</h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                En Gard Security te ofrecemos soluciones adaptadas específicamente a tus necesidades de seguridad. Completa el formulario y nuestro equipo te contactará en menos de 12 horas hábiles.
              </p>
              
              <div className="bg-muted/20 p-6 rounded-xl mb-8">
                <h3 className="text-heading-4 mb-4">¿Por qué solicitar una cotización?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Propuestas personalizadas según tus necesidades</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Presupuestos claros y sin sorpresas</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Rápida respuesta de nuestros especialistas</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Soluciones adaptadas a tu presupuesto</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:col-span-7">
              <CotizacionForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}