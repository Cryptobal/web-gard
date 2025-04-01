import React from 'react';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import IndustriasGridPage from '@/app/components/IndustriasGridPage';
import HeroIndustria from '@/app/components/HeroIndustria';
import CtaFinal from '@/components/ui/shared/CtaFinal';
import { 
  ArrowRight, 
  CheckCircle, 
  Settings, 
  Award, 
  Shield
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Soluciones de Seguridad por Industria | Gard Security",
  description: "Descubre cómo Gard Security protege industrias como minería, retail, educación y más. Seguridad privada adaptada a cada sector empresarial.",
  keywords: [
    "seguridad para industrias",
    "seguridad por sector",
    "guardias para minería",
    "vigilancia en retail",
    "empresa de seguridad privada",
    "servicios de seguridad por industria"
  ]
};

export default function IndustriasPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroIndustria 
        title="Soluciones de Seguridad por Industria"
        subtitle="Adaptamos nuestros servicios para cada entorno operativo, desde minería a educación."
        ctaText="Solicita Cotización"
        ctaLink="/cotizar"
        imageId="4a46b63d-0e1b-4640-b95c-7f040a288c00"
      />

      {/* Grid de Industrias */}
      <section className="gard-section">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-8 text-center">Industrias que protegemos</h2>
          <p className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
            Nuestras soluciones de seguridad están personalizadas para los retos específicos de cada sector.
          </p>
          
          <IndustriasGridPage />
        </div>
      </section>

      {/* ¿Por qué Gard para tu industria? */}
      <section className="gard-section bg-muted/5">
        <div className="gard-container">
          <h2 className="text-heading-2 mb-12 text-center">¿Por qué Gard para tu industria?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <Settings className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-heading-4 mb-3">Soluciones adaptadas</h3>
              <p className="text-body-base text-muted-foreground">
                Personalizamos cada servicio según las necesidades específicas de tu sector, ofreciendo protección integral.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <Award className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-heading-4 mb-3">Experiencia especializada</h3>
              <p className="text-body-base text-muted-foreground">
                Contamos con equipos especializados en la seguridad de cada industria, con conocimiento de sus riesgos únicos.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <Shield className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-heading-4 mb-3">Tecnología avanzada</h3>
              <p className="text-body-base text-muted-foreground">
                Implementamos las últimas innovaciones en seguridad, con personal altamente capacitado para cada sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes por Industria */}
      <section className="gard-section">
        <div className="gard-container text-center">
          <h2 className="text-heading-3 mb-12">Empresas líderes ya confían en Gard Security</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {/* Aquí irían los logos de clientes */}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <CtaFinal 
        title="Seguridad adaptada a tu sector industrial"
        description="Descubre cómo nuestras soluciones de seguridad se adaptan perfectamente a las necesidades específicas de tu industria."
        ctaLabel="Cotiza según tu industria"
        ctaHref="/cotizar"
        variant="soft"
      />
    </>
  );
} 