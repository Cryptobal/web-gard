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
  HelpCircle,
  Hammer,
  ShoppingBag,
  Building2,
  LandPlot,
  Landmark,
  Stethoscope,
  GraduationCap,
  Truck,
  Building,
  HardHat
} from 'lucide-react';
// Comentado temporalmente mientras solucionamos el error
// import FaqSection from '@/components/FaqSection/FaqSection';

// Definir las industrias con sus iconos correspondientes
const industrias = [
  { nombre: 'Minería', icono: <Hammer className="h-12 w-12 text-primary mb-4 mx-auto" /> },
  { nombre: 'Retail', icono: <ShoppingBag className="h-12 w-12 text-primary mb-4 mx-auto" /> },
  { nombre: 'Infraestructura crítica', icono: <LandPlot className="h-12 w-12 text-primary mb-4 mx-auto" /> },
  { nombre: 'Banca y finanzas', icono: <Landmark className="h-12 w-12 text-primary mb-4 mx-auto" /> },
  { nombre: 'Salud', icono: <Stethoscope className="h-12 w-12 text-primary mb-4 mx-auto" /> },
  { nombre: 'Educación', icono: <GraduationCap className="h-12 w-12 text-primary mb-4 mx-auto" /> },
  { nombre: 'Industria logística', icono: <Truck className="h-12 w-12 text-primary mb-4 mx-auto" /> },
  { nombre: 'Edificios corporativos', icono: <Building className="h-12 w-12 text-primary mb-4 mx-auto" /> },
  { nombre: 'Construcción', icono: <HardHat className="h-12 w-12 text-primary mb-4 mx-auto" /> }
];

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
            <Link href="/servicios" className="w-full sm:w-auto gard-btn gard-btn-primary gard-btn-lg">
              Explorar Servicios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/contacto" className="w-full sm:w-auto gard-btn gard-btn-outline gard-btn-lg">
              Contactar
              <HelpCircle className="ml-2 h-5 w-5" />
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

      {/* Servicios destacados */}
      <section className="gard-section">
        <div className="gard-container">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 mb-4">Nuestros Servicios</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Ofrecemos soluciones personalizadas para cubrir todas sus necesidades de seguridad.
            </p>
          </div>

          <div className="gard-grid gap-8">
            {/* Servicio 1 */}
            <div className="gard-card p-8">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-4 mb-3">Seguridad Perimetral</h3>
              <p className="text-body-base text-muted-foreground mb-6">
                Protección avanzada para el perímetro físico y digital de su empresa.
              </p>
              <Link 
                href="/servicios/seguridad-perimetral" 
                className="gard-btn gard-btn-link inline-flex items-center"
              >
                Saber más <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Servicio 2 */}
            <div className="gard-card p-8">
              <Eye className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-4 mb-3">Monitoreo 24/7</h3>
              <p className="text-body-base text-muted-foreground mb-6">
                Vigilancia constante de sus sistemas y activos con respuesta inmediata.
              </p>
              <Link 
                href="/servicios/monitoreo" 
                className="gard-btn gard-btn-link inline-flex items-center"
              >
                Saber más <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Servicio 3 actualizado */}
            <div className="gard-card p-8">
              <ShieldCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-4 mb-3">Guardias de Seguridad</h3>
              <p className="text-body-base text-muted-foreground mb-6">
                Personal altamente capacitado para la protección física de instalaciones, personas y activos.
              </p>
              <Link 
                href="/servicios/guardias-de-seguridad" 
                className="gard-btn gard-btn-link inline-flex items-center"
              >
                Saber más <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/servicios" 
              className="gard-btn gard-btn-secondary gard-btn-lg"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

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
                imageId={cloudflareImages.sections.about}
                alt="El equipo de Gard Security"
                fill
                objectFit="cover"
              />
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

      {/* Clientes que confían en nosotros */}
      <section className="gard-section gard-section-alt">
        <div className="gard-container text-center">
          <h2 className="text-heading-2 mb-8">Clientes que confían en nosotros</h2>
          <p className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Empresas líderes en sus industrias han confiado en Gard Security para proteger lo que más importa.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center opacity-80">
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center justify-center h-16">
              <span className="text-muted-foreground font-medium">Cliente 1</span>
            </div>
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center justify-center h-16">
              <span className="text-muted-foreground font-medium">Cliente 2</span>
            </div>
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center justify-center h-16">
              <span className="text-muted-foreground font-medium">Cliente 3</span>
            </div>
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center justify-center h-16">
              <span className="text-muted-foreground font-medium">Cliente 4</span>
            </div>
            <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center justify-center h-16">
              <span className="text-muted-foreground font-medium">Cliente 5</span>
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

          <div className="gard-grid gap-8">
            {industrias.map((industria) => (
              <div key={industria.nombre} className="gard-card p-6 text-center hover:shadow-md transition-shadow duration-300">
                {industria.icono}
                <h3 className="text-heading-5 mb-2">{industria.nombre}</h3>
                <p className="text-body-sm text-muted-foreground">
                  Soluciones adaptadas a los desafíos específicos del sector.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes - Comentado temporalmente */}
      {/* <FaqSection /> */}

      {/* CTA final */}
      <section className="gard-section">
        <div className="gard-container text-center">
          <h2 className="text-heading-2 mb-4">¿Listo para proteger su empresa?</h2>
          <p className="text-body-lg mb-8 max-w-3xl mx-auto">
            Contáctenos hoy para una evaluación gratuita de sus necesidades de seguridad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contacto" 
              className="gard-btn gard-btn-primary gard-btn-lg"
            >
              Solicitar evaluación gratuita
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