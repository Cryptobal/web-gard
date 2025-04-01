import React from 'react';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import { 
  ArrowRight, 
  Shield, 
  Eye, 
  ShieldCheck, 
  BarChart4, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
// Comentado temporalmente mientras solucionamos el error
// import FaqSection from '@/components/FaqSection/FaqSection';
// Restore component import
import FaqSection from '@/components/FaqSection/FaqSection';
import TrustedClients from '@/app/components/TrustedClients';
import OurServices from '@/app/components/OurServices';
import IndustriasGrid from './components/IndustriasGrid';

export default function Home() {
  return (
    <>
      {/* Hero principal */}
      <section className="gard-hero min-h-screen flex flex-col justify-center items-center py-12 sm:py-20">
        {/* Overlay para contraste */}
        <div className="gard-hero-overlay bg-black/40"></div>
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="bg-gradient-to-t from-black/50 to-transparent absolute inset-0 z-10"></div>
        <div className="gard-hero-content text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            Seguridad de Clase Mundial para Empresas Exigentes
          </h1>
          <p className="text-base text-muted-foreground max-w-md text-center mx-auto text-gray-200 mb-8">
            Protegemos lo que más importa con soluciones integrales diseñadas para los desafíos de seguridad más complejos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
            <Link href="/servicios" className="w-full sm:flex-1 gard-btn gard-btn-outline gard-btn-lg bg-transparent border-white text-white hover:bg-white/20">
              Explorar Servicios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/cotizar" className="w-full sm:flex-1 gard-btn gard-btn-primary gard-btn-lg">
              Cotizar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 -z-10">
          <CloudflareImage
            imageId={cloudflareImages.hero.home}
            alt="Gard Security - Seguridad Empresarial"
            fill
            priority
            objectFit="cover"
            objectPosition="center center"
          />
        </div>
      </section>

      {/* Clientes que confían en nosotros */}
      <TrustedClients />

      {/* Servicios destacados */}
      <OurServices />

      {/* Información corporativa */}
      <section className="gard-section gard-section-alt">
        <div className="gard-container">
          <div className="gard-grid-2 items-center gap-12">
            <div>
              <h2 className="text-heading-2 mb-6">Por qué elegir Gard Security</h2>
              <p className="text-body-lg mb-8">
                Con más de 15 años de experiencia protegiendo empresas líderes, ofrecemos soluciones de seguridad probadas y personalizadas según sus necesidades específicas.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-heading-5 mb-1">Equipo de expertos</h3>
                    <p className="text-body-base text-muted-foreground">
                      Profesionales certificados con amplia experiencia en seguridad empresarial.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-heading-5 mb-1">Tecnología avanzada</h3>
                    <p className="text-body-base text-muted-foreground">
                      Utilizamos las últimas innovaciones en seguridad física y digital.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-heading-5 mb-1">Soporte 24/7</h3>
                    <p className="text-body-base text-muted-foreground">
                      Asistencia continua y tiempo de respuesta garantizado ante incidentes.
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8">
                <Link 
                  href="/sobre-nosotros" 
                  className="gard-btn gard-btn-primary gard-btn-lg"
                >
                  Conocer más sobre nosotros
                </Link>
              </div>
            </div>
            
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <CloudflareImage
                imageId="09f20a0c-b345-4db8-ff81-14aad098db00"
                alt="El equipo de Gard Security"
                fill
                objectFit="cover"
                className="shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]"
              />
              <div className="absolute inset-0 bg-black/15 z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="gard-section bg-primary text-primary-foreground">
        <div className="gard-container text-center">
          <h2 className="text-heading-2 mb-12">Nuestro impacto en números</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6">
              <BarChart4 className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-body-base">Clientes satisfechos</p>
            </div>
            
            <div className="p-6">
              <BarChart4 className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="text-body-base">Años de experiencia</p>
            </div>
            
            <div className="p-6">
              <BarChart4 className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <p className="text-body-base">Tiempo de actividad</p>
            </div>
            
            <div className="p-6">
              <BarChart4 className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-body-base">Soporte técnico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industrias que protegemos */}
      <IndustriasGrid />

      {/* Preguntas Frecuentes - Comentado temporalmente */}
      {/* <FaqSection /> */}
      <FaqSection />

      {/* CTA final */}
      <section className="gard-section">
        <div className="gard-container text-center">
          <h2 className="text-heading-2 mb-4">¿Listo para proteger su empresa?</h2>
          <p className="text-body-lg mb-8 max-w-3xl mx-auto">
            Contáctenos hoy para una evaluación gratuita de sus necesidades de seguridad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/cotizar" 
              className="gard-btn gard-btn-primary gard-btn-lg"
            >
              Solicitar cotización
            </Link>
            <Link 
              href="/servicios" 
              className="gard-btn gard-btn-outline gard-btn-lg"
            >
              Explorar servicios
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 