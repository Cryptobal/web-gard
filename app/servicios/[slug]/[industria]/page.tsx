import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { ArrowRight, CheckCircle, Shield, BarChart3, TrendingUp, LightbulbIcon } from 'lucide-react';
import CtaFinal from '@/components/ui/shared/CtaFinal';
import { servicios } from '@/app/data/servicios';
import { industries } from '@/app/data/industries';
import { getServicioIndustriaData } from '@/app/data/servicios-por-industria';
import LinkParamsAware from '@/app/components/LinkParamsAware';

type PageProps = {
  params: {
    slug: string;
    industria: string;
  };
};

// Función para normalizar nombres a slugs
function normalizeName(name: string): string {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const servicio = servicios.find(s => normalizeName(s.name) === params.slug);
  const industry = industries.find(i => normalizeName(i.name) === params.industria);
  
  if (!servicio || !industry) {
    return {
      title: 'Servicio no encontrado',
      description: 'La combinación de servicio e industria que busca no está disponible.',
    };
  }
  
  return {
    title: `${servicio.name} para ${industry.name} | Gard Security`,
    description: `Servicio de ${servicio.name.toLowerCase()} especializado para el sector ${industry.name}. Soluciones de seguridad adaptadas a las necesidades específicas de esta industria.`,
    keywords: [
      `${servicio.name.toLowerCase()} para ${industry.name}`,
      `seguridad en ${industry.name}`,
      `${servicio.name.toLowerCase()} ${params.industria}`,
      'seguridad especializada',
      'servicios de protección',
      `empresa de seguridad para ${industry.name}`
    ]
  };
}

export default function ServicioIndustriaPage({ params }: PageProps) {
  const servicio = servicios.find(s => normalizeName(s.name) === params.slug);
  const industry = industries.find(i => normalizeName(i.name) === params.industria);
  
  if (!servicio || !industry) {
    return (
      <div className="gard-container py-24 text-center">
        <h1 className="text-heading-2 mb-6">Servicio no encontrado</h1>
        <p className="text-body-lg mb-8">La combinación de servicio e industria que busca no está disponible.</p>
        <Link href="/servicios" className="gard-btn gard-btn-primary">
          Ver todos los servicios
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    );
  }
  
  // Obtener datos específicos para esta combinación de servicio e industria
  const servicioIndustriaData = getServicioIndustriaData(params.slug, params.industria);
  
  // Obtener slugs normalizados para pasar a los componentes
  const servicioSlug = normalizeName(servicio.name);
  const industriaSlug = normalizeName(industry.name);
  
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId={industry.imageId}
            alt={`${servicio.name} para ${industry.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>
        
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-4xl mb-6">
            {servicio.name} para {industry.name}
          </h1>
          <p className="text-white text-xl max-w-2xl mb-8">
            Soluciones de {servicio.name.toLowerCase()} especializadas para el sector {industry.name}
          </p>
          <LinkParamsAware 
            href="/cotizar" 
            className="gard-btn gard-btn-primary gard-btn-lg"
            serviceName={servicio.name}
            serviceSlug={servicioSlug}
            industryName={industry.name}
            industrySlug={industriaSlug}
          >
            Solicitar cotización
            <ArrowRight className="ml-2 h-5 w-5" />
          </LinkParamsAware>
        </div>
      </section>

      {/* Sección de descripción específica */}
      <section className="gard-section">
        <div className="gard-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-heading-2 mb-6">{servicio.name} especializado para {industry.name}</h2>
            <p className="text-body-lg text-muted-foreground">
              {servicioIndustriaData.description || `Nuestro servicio de ${servicio.name.toLowerCase()} para el sector ${industry.name} combina nuestra experiencia en seguridad con un profundo conocimiento de los desafíos específicos de esta industria.`}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="text-heading-5 mb-2">Especialización sectorial</h3>
                    <p className="text-muted-foreground">
                      Nuestro personal cuenta con capacitación específica sobre los protocolos y procesos 
                      de seguridad propios del sector {industry.name}, garantizando un servicio adaptado a 
                      sus necesidades particulares.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="text-heading-5 mb-2">Cumplimiento normativo</h3>
                    <p className="text-muted-foreground">
                      Aseguramos el cumplimiento de todas las regulaciones y estándares específicos del 
                      sector {industry.name}, manteniendo su operación conforme y segura en todo momento.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="text-heading-5 mb-2">Tecnología avanzada</h3>
                    <p className="text-muted-foreground">
                      Implementamos las últimas tecnologías en {servicio.name.toLowerCase()}, adaptadas para 
                      abordar de manera eficiente los riesgos específicos presentes en el sector {industry.name}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <CloudflareImage
                imageId={servicio.heroImageId || industry.imageId}
                alt={`${servicio.name} adaptado para ${industry.name}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Desafíos y soluciones específicas */}
      <section className="gard-section bg-muted/5">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-8 text-center">Desafíos y soluciones para {industry.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-12">
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-heading-4">Desafíos específicos</h3>
              </div>
              
              <div className="bg-card p-6 rounded-xl flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-red-500 text-sm font-bold">!</span>
                    </div>
                    <p className="text-muted-foreground">
                      {servicioIndustriaData.desafios?.[0] || `Protección de activos de alto valor específicos de ${industry.name}, que requieren medidas de seguridad especializadas.`}
                    </p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-red-500 text-sm font-bold">!</span>
                    </div>
                    <p className="text-muted-foreground">
                      {servicioIndustriaData.desafios?.[1] || `Cumplimiento de regulaciones específicas del sector ${industry.name} en materia de seguridad y protección.`}
                    </p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-red-500 text-sm font-bold">!</span>
                    </div>
                    <p className="text-muted-foreground">
                      {servicioIndustriaData.desafios?.[2] || `Gestión de riesgos específicos asociados con las operaciones diarias en el sector ${industry.name}.`}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <LightbulbIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-heading-4">Nuestras soluciones</h3>
              </div>
              
              <div className="bg-card p-6 rounded-xl flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-muted-foreground">
                      {servicioIndustriaData.soluciones?.[0] || `Personal especializado con capacitación específica en los procesos y riesgos del sector ${industry.name}.`}
                    </p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-muted-foreground">
                      {servicioIndustriaData.soluciones?.[1] || `Tecnologías y procedimientos diseñados específicamente para abordar los desafíos de seguridad en ${industry.name}.`}
                    </p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-muted-foreground">
                      {servicioIndustriaData.soluciones?.[2] || `Evaluaciones continuas y planes de mejora adaptados a la evolución de las amenazas en el sector ${industry.name}.`}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Beneficios para la industria */}
      <section className="gard-section">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-6 text-center">Beneficios para el sector {industry.name}</h2>
          <p className="text-body-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Nuestro servicio de {servicio.name.toLowerCase()} especializado para {industry.name} ofrece ventajas 
            competitivas significativas para su negocio.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-sm text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-heading-5 mb-3">Mayor tranquilidad</h3>
              <p className="text-muted-foreground">
                La implementación de medidas de seguridad específicas para el sector {industry.name} 
                permite que su equipo se concentre en su actividad principal mientras nosotros 
                gestionamos los riesgos.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-heading-5 mb-3">Reducción de incidentes</h3>
              <p className="text-muted-foreground">
                Nuestras soluciones personalizadas para {industry.name} han demostrado reducir 
                significativamente los incidentes de seguridad, minimizando pérdidas y 
                disrupciones operativas.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-heading-5 mb-3">Ventaja competitiva</h3>
              <p className="text-muted-foreground">
                Un entorno seguro y protegido mejora su imagen corporativa y genera mayor 
                confianza entre clientes, socios y empleados, creando una ventaja 
                diferencial en el sector {industry.name}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Casos de éxito y testimonios */}
      <section className="gard-section bg-muted/5">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-6 text-center">Experiencia comprobada en {industry.name}</h2>
          <p className="text-body-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Empresas líderes en el sector {industry.name} confían en nuestras soluciones de {servicio.name.toLowerCase()}.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">C</span>
                </div>
                <div>
                  <h3 className="text-heading-5">Caso de estudio: Protección integral</h3>
                  <p className="text-sm text-muted-foreground">Empresa líder en {industry.name}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                {servicioIndustriaData.casoExito || `Implementamos un sistema completo de ${servicio.name.toLowerCase()} para una empresa líder del sector ${industry.name}, logrando reducir los incidentes de seguridad en un 65% y optimizando los costos operativos relacionados con la seguridad.`}
              </p>
              <div className="flex justify-end">
                <Link href="/contacto" className="text-primary hover:underline text-sm flex items-center">
                  Solicitar información detallada
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="mb-4 text-gray-400">"</div>
              <p className="text-muted-foreground mb-6 italic">
                {servicioIndustriaData.testimonio || `La implementación del servicio de ${servicio.name.toLowerCase()} especializado para nuestra operación de ${industry.name} ha sido una decisión estratégica fundamental. El profundo conocimiento del sector por parte de Gard Security ha permitido una adaptación perfecta a nuestras necesidades específicas.`}
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Director de Operaciones</p>
                  <p className="text-sm text-muted-foreground">Empresa líder en {industry.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Preguntas frecuentes */}
      <section className="gard-section">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-8 text-center">Preguntas frecuentes</h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-heading-5 mb-3">¿Cómo se adapta este servicio específicamente al sector {industry.name}?</h3>
              <p className="text-muted-foreground">
                Nuestro enfoque comienza con una evaluación exhaustiva de las necesidades, riesgos y 
                requisitos específicos de su operación en el sector {industry.name}. A partir de este 
                análisis, diseñamos una solución de {servicio.name.toLowerCase()} que se integra 
                perfectamente con sus procesos existentes y aborda los desafíos particulares de su industria. 
                Esto incluye personal capacitado específicamente en el sector, tecnologías adaptadas y 
                procedimientos alineados con las mejores prácticas de {industry.name}.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-heading-5 mb-3">¿Qué formación específica tiene su personal para el sector {industry.name}?</h3>
              <p className="text-muted-foreground">
                Todo nuestro personal asignado a servicios de {servicio.name.toLowerCase()} en el sector 
                {industry.name} recibe capacitación especializada que incluye: conocimiento profundo de los 
                procesos operativos de la industria, familiarización con los requisitos regulatorios específicos, 
                entrenamiento en protocolos de seguridad propios del sector, y formación en gestión de 
                riesgos particulares de {industry.name}. Además, realizamos actualizaciones periódicas para 
                mantenerlos al día con la evolución del sector.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-heading-5 mb-3">¿Cuál es el tiempo de implementación para este servicio?</h3>
              <p className="text-muted-foreground">
                El tiempo de implementación de nuestro servicio de {servicio.name.toLowerCase()} para el sector 
                {industry.name} varía según la complejidad y escala de su operación. Típicamente, podemos 
                completar una implementación básica en 2-4 semanas, mientras que soluciones más complejas pueden 
                requerir 4-8 semanas. Nuestro enfoque incluye una fase de transición gradual para minimizar 
                cualquier interrupción en sus operaciones cotidianas, garantizando una integración fluida de 
                nuestros servicios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <CtaFinal 
        title={`Proteja su operación de ${industry.name} con nuestro servicio especializado`}
        description={`Solicite hoy mismo una evaluación personalizada de sus necesidades de ${servicio.name.toLowerCase()} para el sector ${industry.name}.`}
        ctaLabel="Solicitar cotización"
        ctaHref="/cotizar"
        variant="soft"
      />
    </main>
  );
} 