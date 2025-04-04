import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import CloudflareImage from '@/components/CloudflareImage';
import CtaFinal from '@/components/ui/shared/CtaFinal';
import { 
  ArrowRight, 
  CheckCircle,
  Shield
} from 'lucide-react';
import { industries } from '@/app/data/industries';
import { servicios } from '@/app/data/servicios';
import { industriesMetadata } from '../industryMetadata';
import OurServices from '@/app/components/OurServices';
import LinkParamsAware from '@/app/components/LinkParamsAware';

// Componente cliente cargado dinámicamente
const IndustriaClientComponents = dynamic(() => import('./IndustriaClientComponents'), {
  ssr: false,
});

// Función para generar rutas estáticas
export async function generateStaticParams() {
  return industries.map(industry => ({
    slug: industry.name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
  }));
}

// Función para obtener datos de industria por slug
const getIndustryBySlug = (slug: string) => {
  // Intentar encontrar primero por coincidencia exacta de slug normalizado
  const normalizedSlug = slug.toLowerCase();
  
  return industries.find(industry => {
    const industrySlug = industry.name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
      
    return industrySlug === normalizedSlug;
  });
};

// Generación dinámica de metadatos
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const industria = industriesMetadata.find(i => i.slug === params.slug);

  if (!industria) {
    return {
      title: 'Industria no encontrada | Gard Security',
      description: 'La industria solicitada no existe o fue eliminada.',
      robots: 'noindex',
    };
  }

  return {
    title: industria.title,
    description: industria.description,
    keywords: industria.keywords,
    authors: [{ name: 'Gard Security', url: 'https://gard.cl' }],
    robots: 'index, follow',
    openGraph: {
      title: industria.title,
      description: industria.description,
      url: `https://gard.cl/industrias/${params.slug}`,
      siteName: 'Gard Security',
      locale: 'es_CL',
      type: 'article',
    },
  };
}

export default function IndustriaPage({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug);
  
  // Página de error si no se encuentra la industria
  if (!industry) {
    return (
      <div className="gard-container py-24 text-center">
        <h1 className="text-heading-2 mb-6">Industria no encontrada</h1>
        <p className="text-body-lg mb-8">La industria que busca no está disponible actualmente.</p>
        <Link href="/industrias" className="gard-btn gard-btn-primary">
          Ver todas las industrias
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    );
  }

  // Obtener el slug normalizado para pasarlo al componente OurServices
  const industrySlug = industry.name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');

  return (
    <>
      {/* Componente cliente para funcionalidades SEO */}
      <IndustriaClientComponents />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <CloudflareImage
            imageId={industry.imageId}
            alt={`Seguridad para ${industry.name}`}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>
        
        {/* Contenido */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-4xl mb-6">
            Seguridad privada para {industry.name}
          </h1>
          <p className="text-white text-xl max-w-2xl mb-8">
            Protegemos el sector {industry.name} con soluciones adaptadas, profesionales y confiables.
          </p>
          <LinkParamsAware 
            href="/cotizar" 
            className="gard-btn gard-btn-primary gard-btn-lg"
            industryName={industry.name}
            industrySlug={industrySlug}
          >
            Cotiza tu seguridad
            <ArrowRight className="ml-2 h-5 w-5" />
          </LinkParamsAware>
        </div>
      </section>

      {/* Sección: Desafíos de seguridad en esta industria */}
      <section className="gard-section">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-6 text-center">Desafíos de seguridad en {industry.name}</h2>
          <p className="text-body-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            El sector de {industry.name} enfrenta riesgos y amenazas específicas que requieren un enfoque 
            especializado en materia de seguridad. Conocemos estos desafíos y desarrollamos estrategias 
            efectivas para abordarlos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading-5 mb-3">Protección de activos valiosos</h3>
              <p className="text-muted-foreground">
                El sector {industry.name} maneja activos de alto valor que requieren protección 
                especializada y constante vigilancia para prevenir robos o sabotajes.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading-5 mb-3">Control de acceso crítico</h3>
              <p className="text-muted-foreground">
                Gestionar quién puede acceder a determinadas áreas es fundamental en {industry.name}, 
                donde la seguridad perimetral y los protocolos de entrada requieren especial atención.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-heading-5 mb-3">Cumplimiento normativo</h3>
              <p className="text-muted-foreground">
                Las empresas de {industry.name} deben cumplir con regulaciones estrictas de seguridad, 
                lo que requiere conocimiento especializado y actualizaciones constantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2 - ¿Por qué elegirnos? */}
      <section className="gard-section bg-muted/5">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-8 text-center">¿Por qué elegir Gard en {industry.name}?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col p-6 bg-card rounded-xl shadow-sm">
              <CheckCircle className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-heading-4 mb-3">Experiencia en el rubro</h3>
              <p className="text-body-base text-muted-foreground">
                Contamos con amplia experiencia en seguridad para el sector {industry.name}, 
                conociendo a fondo los riesgos y necesidades específicas de esta industria.
              </p>
            </div>
            
            <div className="flex flex-col p-6 bg-card rounded-xl shadow-sm">
              <CheckCircle className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-heading-4 mb-3">Adaptabilidad operativa</h3>
              <p className="text-body-base text-muted-foreground">
                Nuestros equipos y soluciones se adaptan a las particularidades de cada operación 
                en {industry.name}, ajustándose a los protocolos y normativas del sector.
              </p>
            </div>
            
            <div className="flex flex-col p-6 bg-card rounded-xl shadow-sm">
              <CheckCircle className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-heading-4 mb-3">Tecnología y confiabilidad</h3>
              <p className="text-body-base text-muted-foreground">
                Implementamos tecnología de punta combinada con personal altamente capacitado, 
                asegurando la máxima confiabilidad en la protección de su operación de {industry.name}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Soluciones especializadas */}
      <section className="gard-section">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-6 text-center">Soluciones específicas para {industry.name}</h2>
          <p className="text-body-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Hemos desarrollado un conjunto de soluciones de seguridad especialmente diseñadas para 
            abordar los desafíos únicos que enfrenta el sector de {industry.name}.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex border-b border-muted pb-6 mb-6">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-heading-5 mb-2">Guardias especializados en {industry.name}</h3>
                <p className="text-muted-foreground">
                  Nuestro personal recibe capacitación específica sobre los protocolos y procedimientos 
                  de seguridad relevantes para el sector {industry.name}, garantizando un servicio 
                  alineado con las mejores prácticas de la industria.
                </p>
              </div>
            </div>
            
            <div className="flex border-b border-muted pb-6 mb-6">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-heading-5 mb-2">Sistemas de vigilancia avanzados</h3>
                <p className="text-muted-foreground">
                  Implementamos tecnología de videovigilancia y monitoreo adaptada a las necesidades 
                  específicas de {industry.name}, con capacidad de detección temprana de incidentes 
                  y respuesta rápida.
                </p>
              </div>
            </div>
            
            <div className="flex border-b border-muted pb-6 mb-6 md:mb-0">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-heading-5 mb-2">Control de acceso personalizado</h3>
                <p className="text-muted-foreground">
                  Diseñamos e implementamos sistemas de control de acceso que cumplen con los 
                  requisitos específicos de seguridad del sector {industry.name}, protegiendo 
                  áreas sensibles y regulando el flujo de personal.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-heading-5 mb-2">Auditorías de seguridad especializadas</h3>
                <p className="text-muted-foreground">
                  Realizamos evaluaciones exhaustivas de la seguridad en instalaciones de {industry.name}, 
                  identificando vulnerabilidades y recomendando mejoras para fortalecer la protección 
                  general.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen contextual */}
      <section className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <CloudflareImage
          imageId={industry.imageId}
          alt={`Protección profesional para ${industry.name}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </section>

      {/* Usamos el componente OurServices reutilizable */}
      <OurServices 
        title={`Servicios de seguridad para ${industry.name}`}
        subtitle="Soluciones diseñadas para los desafíos específicos de esta industria"
        industria={industrySlug}
        nombreIndustria={industry.name}
      />

      {/* Sección: Preguntas frecuentes */}
      <section className="gard-section bg-muted/5">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-8 text-center">Preguntas frecuentes sobre seguridad en {industry.name}</h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-heading-5 mb-3">¿Qué formación específica tienen sus guardias para el sector {industry.name}?</h3>
              <p className="text-muted-foreground">
                Todos nuestros guardias asignados al sector {industry.name} reciben capacitación especializada 
                que incluye protocolos específicos de la industria, normativas de seguridad aplicables, 
                y procedimientos de respuesta ante emergencias propias del sector. Además, realizamos 
                actualizaciones periódicas para mantener al personal al día con las mejores prácticas.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-heading-5 mb-3">¿Cómo se adaptan sus servicios a los requisitos regulatorios de {industry.name}?</h3>
              <p className="text-muted-foreground">
                Nuestro equipo de expertos se mantiene constantemente actualizado sobre la normativa 
                y regulaciones que afectan al sector {industry.name}. Diseñamos nuestras soluciones 
                de seguridad asegurando el cumplimiento de todos los requisitos legales y estándares 
                de la industria, ayudando a nuestros clientes a mantener su operación conforme y segura.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-heading-5 mb-3">¿Qué tecnologías específicas recomiendan para la seguridad en {industry.name}?</h3>
              <p className="text-muted-foreground">
                Para el sector {industry.name} recomendamos una combinación de sistemas de videovigilancia 
                avanzados con análisis inteligente, controles de acceso biométricos, y sistemas de alarma 
                integrados con nuestra central de monitoreo. La combinación exacta dependerá de la evaluación 
                de riesgos específica de cada instalación, que realizamos como parte de nuestro servicio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <CtaFinal 
        title={`Protege tu operación en el rubro ${industry.name}`}
        description={`Cotiza servicios de seguridad personalizados para el sector ${industry.name}. Nuestros expertos diseñarán una solución adaptada a tus necesidades específicas.`}
        ctaLabel="Cotiza según tu industria"
        ctaHref="/cotizar"
        variant="soft"
      />
    </>
  );
} 