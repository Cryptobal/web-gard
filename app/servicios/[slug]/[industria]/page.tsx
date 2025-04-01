import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { servicios } from '@/app/data/servicios';
import { industries } from '@/app/data/industries';
import CloudflareImage from '@/components/CloudflareImage';
import CtaFinal from '@/components/ui/shared/CtaFinal';

// Generamos todas las combinaciones posibles entre servicios e industrias
export async function generateStaticParams() {
  const params = [];
  
  for (const servicio of servicios) {
    for (const industria of industries) {
      // Aquí podríamos agregar lógica para filtrar combinaciones no válidas si fuera necesario
      
      // Generamos el slug normalizado de la industria
      const industriaSlug = industria.name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
      
      params.push({
        slug: servicio.slug,
        industria: industriaSlug
      });
    }
  }
  
  return params;
}

// Función helper para normalizar y obtener el slug de la industria
const getIndustrySlug = (name: string) => {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
};

// Función para encontrar una industria por su slug
const getIndustryBySlug = (slug: string) => {
  return industries.find(industry => getIndustrySlug(industry.name) === slug);
};

// Generamos los metadatos para SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string; industria: string } 
}): Promise<Metadata> {
  const servicio = servicios.find(s => s.slug === params.slug);
  const industria = getIndustryBySlug(params.industria);
  
  if (!servicio || !industria) {
    return {
      title: 'Página no encontrada | Gard Security',
      description: 'La página que estás buscando no existe.'
    };
  }
  
  return {
    title: `${servicio.name} para ${industria.name} | Gard Security`,
    description: `Soluciones de ${servicio.name.toLowerCase()} aplicadas al sector ${industria.name.toLowerCase()}.`,
    keywords: [...servicio.keywords, industria.name.toLowerCase()]
  };
}

export default function ServicioIndustriaPage({ 
  params 
}: { 
  params: { slug: string; industria: string } 
}) {
  const servicio = servicios.find(s => s.slug === params.slug);
  const industria = getIndustryBySlug(params.industria);
  
  if (!servicio || !industria) {
    notFound();
  }
  
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full relative h-[45vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <CloudflareImage
          imageId={servicio.heroImageId}
          alt={`${servicio.name} para ${industria.name}`}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="gard-container max-w-7xl mx-auto px-4">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
              {servicio.name} para {industria.name}
            </h1>
            <p className="text-white text-lg md:text-xl max-w-2xl">
              Soluciones especializadas de seguridad adaptadas a las necesidades
              específicas del sector {industria.name.toLowerCase()}.
            </p>
            <Link href="/cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center mt-8">
              Cotizar este servicio <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Descripción de Servicio e Industria */}
      <section className="gard-section bg-white dark:bg-gray-900">
        <div className="gard-container max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-heading-2 font-title mb-6">
                {servicio.name}
              </h2>
              <p className="text-body-base mb-6">
                {servicio.description}
              </p>
            </div>
            
            <div>
              <h2 className="text-heading-2 font-title mb-6">
                Sector {industria.name}
              </h2>
              <p className="text-body-base mb-6">
                El sector {industria.name.toLowerCase()} presenta desafíos únicos de seguridad que requieren soluciones
                especializadas y adaptadas a sus necesidades específicas.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Aplicación Específica */}
      <section className="gard-section bg-gray-50 dark:bg-gray-800">
        <div className="gard-container max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h2 className="text-heading-2 font-title mb-8 text-center">
            Cómo aplicamos {servicio.name} al sector {industria.name}
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
            <p>
              El sector {industria.name.toLowerCase()} enfrenta desafíos únicos de seguridad
              que requieren soluciones especializadas. Nuestro servicio de {servicio.name.toLowerCase()}
              está diseñado específicamente para abordar estos retos.
            </p>
            
            <p>
              Combinando nuestra experiencia en {servicio.name.toLowerCase()} con un profundo
              conocimiento del sector {industria.name.toLowerCase()}, ofrecemos soluciones
              que no solo protegen sus activos, sino que también optimizan sus operaciones
              y cumplen con las regulaciones específicas de su industria.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Protección contra amenazas específicas del sector {industria.name.toLowerCase()}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Cumplimiento de regulaciones propias de la industria {industria.name.toLowerCase()}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Optimización de costos sin comprometer la seguridad en entornos de {industria.name.toLowerCase()}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Integración con sistemas existentes en instalaciones de {industria.name.toLowerCase()}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <CtaFinal
        title={`¿Necesita soluciones de ${servicio.name} para su empresa de ${industria.name}?`}
        description={`Contáctenos hoy para una consulta personalizada y descubra cómo podemos ayudarle a proteger su negocio en el sector ${industria.name.toLowerCase()}.`}
        ctaLabel="Solicitar cotización"
        ctaHref="/cotizar"
      />
    </main>
  );
} 