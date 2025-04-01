"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Plane, 
  Cpu, 
  MonitorSmartphone, 
  Scan, 
  ArrowRight 
} from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { services } from '@/app/data/services';

// Mapeo de nombres de íconos a componentes de Lucide
const iconComponents = {
  ShieldCheck,
  Drone: Plane, // Usamos Plane como alternativa a Drone
  Cpu,
  MonitorSmartphone,
  Scan
};

export default function OurServices() {
  // Función para renderizar el ícono correcto según el nombre
  const renderIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName as keyof typeof iconComponents];
    return IconComponent ? <IconComponent className="h-10 w-10 text-primary dark:text-accent" /> : null;
  };

  return (
    <section className="gard-section py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-heading-2 mb-4">Nuestros Servicios</h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            Soluciones integrales de seguridad diseñadas para proteger lo que más importa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <Link 
              key={index} 
              href={service.href}
              className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex flex-col h-full"
            >
              <div className="relative aspect-[3/2] w-full mb-4">
                <CloudflareImage
                  imageId={service.imageId}
                  alt={service.name}
                  fill
                  className="rounded-xl object-cover w-full grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out"
                />
              </div>
              
              <div className="flex items-center justify-center my-4">
                {renderIcon(service.icon)}
              </div>
              
              <h3 className="text-heading-4 mb-2 text-center">{service.name}</h3>
              
              <p className="text-body-base text-muted-foreground mb-4 text-center flex-grow">
                {service.description}
              </p>
              
              <div className="flex justify-center mt-auto">
                <span className="inline-flex items-center text-primary dark:text-accent font-medium">
                  Saber más <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 