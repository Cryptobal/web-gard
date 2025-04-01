import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import CtaFinal from '@/components/ui/shared/CtaFinal';
import { 
  ArrowRight, 
  ShieldCheck, 
  Shield, 
  Radio, 
  Eye, 
  MapPin,
  Mountain,
  CheckCircle
} from 'lucide-react';
import { industries } from '@/app/data/industries';
import { servicios } from '@/app/data/servicios';

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
  const industry = getIndustryBySlug(params.slug);
  
  if (!industry) {
    return {
      title: 'Industria no encontrada | Gard Security',
      description: 'La industria que busca no ha sido encontrada en nuestro sistema.',
    };
  }
  
  return {
    title: `Seguridad para ${industry.name} | Gard Security`,
    description: `Ofrecemos servicios de seguridad privada especializados para el sector ${industry.name}: guardias, monitoreo, vigilancia y tecnología avanzada.`,
    keywords: [
      `seguridad privada para ${industry.name}`,
      `guardias de seguridad en ${industry.name}`,
      `empresa de seguridad para ${industry.name}`,
      `monitoreo en ${industry.name}`,
      `vigilancia en ${industry.name}`
    ]
  };
}

// Componente para mostrar servicios relacionados con una industria
function RelacionServiciosPorIndustria({ industriaSlug }: { industriaSlug: string }) {
  // Renderiza el ícono correcto según el nombre
  const renderIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      ShieldCheck: <ShieldCheck className="h-6 w-6 text-primary" />,
      Shield: <Shield className="h-6 w-6 text-primary" />,
      Eye: <Eye className="h-6 w-6 text-primary" />,
      Plane: <ArrowRight className="h-6 w-6 text-primary" />,
      ShieldAlert: <Shield className="h-6 w-6 text-primary" />
    };
    
    return icons[iconName] || <Shield className="h-6 w-6 text-primary" />;
  };

  return (
    <section className="gard-section py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="gard-container max-w-7xl mx-auto px-4">
        <h2 className="text-heading-2 mb-6 text-center">Servicios de seguridad para esta industria</h2>
        <p className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
          Conoce nuestras soluciones especializadas para tu sector
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((servicio) => (
            <Link 
              key={servicio.slug} 
              href={`/servicios/${servicio.slug}/${industriaSlug}`}
              className="bg-card hover:bg-card/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full group"
              prefetch={true}
            >
              <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-xl">
                <CloudflareImage
                  imageId={servicio.heroImageId}
                  alt={servicio.name}
                  fill
                  className="object-cover w-full group-hover:scale-105 transition duration-300 ease-in-out"
                />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                {renderIcon(servicio.icon)}
                <h3 className="text-heading-4">{servicio.name}</h3>
              </div>
              
              <p className="text-body-base text-muted-foreground mb-4 flex-grow">
                {servicio.description}
              </p>
              
              <div className="mt-auto">
                <span className="inline-flex items-center text-primary font-medium group-hover:underline">
                  Ver detalle <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
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

  return (
    <>
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
          <Link 
            href="/cotizar" 
            className="gard-btn gard-btn-primary gard-btn-lg"
          >
            Cotiza tu seguridad
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Sección 1 - Servicios para esta Industria */}
      <section className="gard-section">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-8 text-center">Servicios ofrecidos para {industry.name}</h2>
          <p className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
            Nuestros servicios están diseñados específicamente para las necesidades y desafíos del sector {industry.name}, garantizando la máxima protección.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm">
              <ShieldCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-5 mb-2">Guardias de Seguridad</h3>
              <p className="text-muted-foreground">Personal capacitado en los desafíos específicos del sector {industry.name}.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-5 mb-2">Seguridad Electrónica</h3>
              <p className="text-muted-foreground">Sistemas adaptados para la protección integral de instalaciones de {industry.name}.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm">
              <Radio className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-5 mb-2">Monitoreo 24/7</h3>
              <p className="text-muted-foreground">Centro de control especializado para respuesta inmediata en {industry.name}.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm">
              <Eye className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-5 mb-2">Supervisión móvil</h3>
              <p className="text-muted-foreground">Rondas y verificación constante en sus instalaciones del sector {industry.name}.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-sm">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-heading-5 mb-2">Seguridad Perimetral</h3>
              <p className="text-muted-foreground">Soluciones especializadas para proteger el perímetro en entornos de {industry.name}.</p>
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

      {/* Servicios relacionados con esta industria */}
      <RelacionServiciosPorIndustria industriaSlug={params.slug} />

      {/* CTA Final */}
      <CtaFinal 
        title={`Protege tu operación en el rubro ${industry.name}`}
        description={`Cotiza servicios de seguridad personalizados para el sector ${industry.name}.`}
        ctaLabel="Cotiza según tu industria"
        ctaHref="/cotizar"
        variant="soft"
      />
    </>
  );
} 