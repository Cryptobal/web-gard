import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import OurServices from '@/app/components/OurServices';

export const metadata: Metadata = {
  title: "Servicios de Seguridad Privada | Gard Security",
  description: "Explora todos los servicios de seguridad privada de Gard Security: guardias, drones, monitoreo, tecnología y protección perimetral. Soluciones para empresas e industrias.",
  keywords: [
    "servicios de seguridad privada",
    "guardias de seguridad",
    "monitoreo de seguridad",
    "seguridad con drones",
    "empresa de seguridad",
    "seguridad perimetral",
    "tecnología en seguridad"
  ]
};

export default function Servicios() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[45vh] md:h-[60vh]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Nuestros Servicios de Seguridad
          </h1>
          <p className="text-white text-lg md:text-xl opacity-90 max-w-3xl mb-8">
            Protección integral para industrias, empresas, instituciones y comunidades.
          </p>
          <Link href="/cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
            Cotiza ahora <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <CloudflareImage
          imageId="5eea1064-8a2d-4e8b-5606-d28775467a00"
          alt="Servicios de seguridad Gard"
          fill
          priority
          className="object-cover"
        />
      </section>

      {/* Servicios destacados - usando el mismo componente que la página de inicio */}
      <OurServices />

      {/* Sección "¿Por qué elegir Gard?" */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-heading-2 mb-4 text-center">¿Por qué elegir Gard?</h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto text-center mb-12">
            Una empresa comprometida con la excelencia y la confianza en seguridad privada.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-4 mb-2">Personal profesional y confiable</h3>
              <p className="text-muted-foreground">
                Nuestro equipo está formado por profesionales certificados y verificados exhaustivamente.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-4 mb-2">Tecnología de vanguardia</h3>
              <p className="text-muted-foreground">
                Implementamos soluciones tecnológicas avanzadas para garantizar la máxima seguridad.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-4 mb-2">Cobertura nacional 24/7</h3>
              <p className="text-muted-foreground">
                Servicio ininterrumpido en todo el país con tiempos de respuesta garantizados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Mejorado */}
      <section className="gard-section py-16 bg-primary/10 dark:bg-primary/20 mx-4 md:mx-8 my-8 rounded-2xl">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-heading-2 mb-6">¿Necesitas un servicio de seguridad personalizado?</h2>
          <p className="text-body-lg mb-10 max-w-3xl mx-auto">
            Cada negocio tiene necesidades únicas. Contacta con nuestro equipo para un análisis personalizado.
          </p>
          <Link href="/cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
            Solicita tu cotización <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
} 