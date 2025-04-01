"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Scan, Cpu, Monitor, SquareDashedBottom } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';

// Interfaz para el tipo de servicio
interface Servicio {
  name: string;
  slug: string;
  imageId: string;
  icon: string;
  description: string;
}

interface ServiciosGridProps {
  servicios: Servicio[];
}

export default function ServiciosGrid({ servicios }: ServiciosGridProps) {
  // Función para renderizar el ícono correcto según el nombre
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="h-6 w-6 text-primary" />;
      case "Scan":
        return <Scan className="h-6 w-6 text-primary" />;
      case "Cpu":
        return <Cpu className="h-6 w-6 text-primary" />;
      case "Monitor":
        return <Monitor className="h-6 w-6 text-primary" />;
      case "SquareDashedBottom":
        return <SquareDashedBottom className="h-6 w-6 text-primary" />;
      default:
        return <ShieldCheck className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {servicios.map((servicio, index) => (
        <Link 
          key={index} 
          href={`/servicios/${servicio.slug}`}
          className="bg-card hover:bg-card/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full group"
        >
          <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-xl">
            <CloudflareImage
              imageId={servicio.imageId}
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
  );
} 