"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Scan, Cpu, Monitor, SquareDashedBottom, Shield, Eye, Plane, ShieldAlert } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { servicios } from '@/app/data/servicios';
import { serviciosPorIndustria } from '@/app/data/servicios-por-industria';

// Interfaz para el tipo de servicio
interface Servicio {
  name: string;
  slug: string;
  icon: string;
  description: string;
  heroImageId: string;
  imageId?: string;
  gallery?: string[];
  keywords?: string[];
}

interface ServiciosGridProps {
  servicios?: Servicio[];
  industria?: string;
  title?: string;
  subtitle?: string;
}

export default function ServiciosGrid({ servicios: serviciosProp, industria, title, subtitle }: ServiciosGridProps) {
  // Determinar qué servicios mostrar: los pasados como prop, los filtrados por industria, o todos
  const serviciosAMostrar = React.useMemo(() => {
    // Si se pasaron servicios explícitamente, usarlos
    if (serviciosProp) {
      return serviciosProp;
    }
    
    // Si se especificó una industria, filtrar por ella
    if (industria) {
      // Buscar la relación industria-servicios
      const relacion = serviciosPorIndustria.find(
        item => item.industria === industria
      );
      
      // Si existe la relación, filtrar los servicios
      if (relacion) {
        return servicios.filter(servicio => 
          relacion.servicios.includes(servicio.slug)
        );
      }
    }
    
    // Por defecto, mostrar todos los servicios
    return servicios;
  }, [serviciosProp, industria]);

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
      case "Shield":
        return <Shield className="h-6 w-6 text-primary" />;
      case "Eye":
        return <Eye className="h-6 w-6 text-primary" />;
      case "Plane":
        return <Plane className="h-6 w-6 text-primary" />;
      case "ShieldAlert":
        return <ShieldAlert className="h-6 w-6 text-primary" />;
      default:
        return <ShieldCheck className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <>
      {/* Mostrar título y subtítulo si se proporcionan */}
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && <h2 className="text-heading-2 mb-4">{title}</h2>}
          {subtitle && <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviciosAMostrar.map((servicio, index) => {
          // Determinar la ruta del enlace según si hay una industria especificada
          const href = industria 
            ? `/servicios/${servicio.slug}/${industria}` 
            : `/servicios/${servicio.slug}`;
            
          return (
            <Link 
              key={index} 
              href={href}
              className="bg-card hover:bg-card/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full group"
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
          );
        })}
      </div>
    </>
  );
} 