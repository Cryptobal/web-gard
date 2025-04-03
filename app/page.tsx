import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CloudflareImage } from '@/components/ui';
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

// Configuración de optimización para páginas estáticas
export const runtime = 'edge';
export const dynamicPage = 'force-static';
export const preferredRegion = 'chl1'; // Region de Chile para mejor performance

// Importación dinámica de componentes pesados
const FaqSection = dynamic(() => import('@/components/sections/FaqSection'), {
  loading: () => <div className="w-full h-48 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
});
const ClientesCarrusel = dynamic(() => import('@/components/sections/carousels/ClientesCarrusel'), {
  loading: () => <div className="w-full h-24 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
});
import OurServices from '@/app/components/OurServices';
import IndustriasGridPage from './components/IndustriasGridPage';
import CtaFinal from '@/components/ui/shared/CtaFinal';

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
      <ClientesCarrusel />

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
                imageId="2c554c0e-8f87-4f58-1ad5-29cbe6360600"
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
      <section className="gard-section bg-gradient-to-r from-[#1A2A90] to-[#2535C0] text-white relative overflow-hidden">
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
               backgroundRepeat: "repeat"
             }}>
        </div>
        
        <div className="gard-container text-center relative z-10">
          <h2 className="text-heading-2 mb-12 text-white">Nuestro impacto en números</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <BarChart4 className="h-14 w-14 mx-auto mb-4 text-white" />
              <div className="text-5xl font-bold mb-3 text-white">50+</div>
              <p className="text-body-base text-gray-100">Clientes satisfechos</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <BarChart4 className="h-14 w-14 mx-auto mb-4 text-white" />
              <div className="text-5xl font-bold mb-3 text-white">8+</div>
              <p className="text-body-base text-gray-100">Años de experiencia</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <BarChart4 className="h-14 w-14 mx-auto mb-4 text-white" />
              <div className="text-5xl font-bold mb-3 text-white">99.9%</div>
              <p className="text-body-base text-gray-100">Actividad operativa</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 shadow-md transform hover:scale-105 transition duration-300">
              <BarChart4 className="h-14 w-14 mx-auto mb-4 text-white" />
              <div className="text-5xl font-bold mb-3 text-white">24/7</div>
              <p className="text-body-base text-gray-100">Central operativa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industrias que protegemos */}
      <section className="gard-section">
        <div className="gard-container text-center">
          <h2 className="text-heading-2 mb-8">Industrias que protegemos</h2>
          <p className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Ofrecemos soluciones de seguridad personalizadas para diversos sectores económicos.
          </p>
          
          <IndustriasGridPage />
        </div>
      </section>

      {/* Preguntas Frecuentes - Comentado temporalmente */}
      {/* <FaqSection /> */}
      <FaqSection />

      {/* CTA final */}
      <CtaFinal 
        title="¿Listo para proteger tu empresa?"
        description="Contáctenos hoy para una evaluación gratuita de sus necesidades de seguridad y descubre por qué las empresas líderes confían en Gard Security."
        ctaLabel="Solicitar cotización"
        ctaHref="/cotizar"
        variant="soft"
      />
    </>
  );
} 