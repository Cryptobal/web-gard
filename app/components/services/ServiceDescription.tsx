import React from 'react';
import { CheckCircle } from 'lucide-react';
import LinkParamsAware from '@/app/components/LinkParamsAware';

interface ServiceDescriptionProps {
  title: string;
  description: string;
  benefits: string[];
  serviceName: string;
  serviceSlug: string;
}

export default function ServiceDescription({
  title,
  description,
  benefits,
  serviceName,
  serviceSlug
}: ServiceDescriptionProps) {
  return (
    <section className="gard-section py-16 md:py-24">
      <div className="gard-container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <h2 className="text-heading-2 mb-6">{title}</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              {description}
            </p>
            
            <h3 className="text-heading-3 mb-5">Beneficios principales</h3>
            <ul className="space-y-4 mb-8">
              {benefits.map((beneficio, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-8 w-8 text-primary dark:text-accent mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-body-base">{beneficio}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl self-start">
            <h3 className="text-heading-4 mb-4">¿Por qué elegir Gard Security?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-7 w-7 text-primary dark:text-accent mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Más de 10 años de experiencia</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-7 w-7 text-primary dark:text-accent mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Personal certificado y verificado</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-7 w-7 text-primary dark:text-accent mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Servicio 24/7 garantizado</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-7 w-7 text-primary dark:text-accent mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Tecnología de vanguardia</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-7 w-7 text-primary dark:text-accent mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Soluciones personalizadas</span>
              </li>
            </ul>
            
            <div className="mt-6 flex justify-center">
              <LinkParamsAware 
                href="/cotizar" 
                className="gard-btn gard-btn-primary py-3 px-6 text-center font-medium"
                serviceName={serviceName}
                serviceSlug={serviceSlug}
              >
                Solicitar cotización
              </LinkParamsAware>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 