"use client";

import React from 'react';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { industries } from '@/app/data/industries';
import { 
  Mountain, 
  ShoppingCart, 
  Mic, 
  Boxes, 
  Stethoscope, 
  GraduationCap,
  Building2,
  Hammer,
  Truck,
  Factory,
  Landmark,
  Hotel
} from 'lucide-react';

// Mapeo de nombres de íconos a componentes de Lucide
const iconComponents: Record<string, React.ComponentType<any>> = {
  Mountain,
  ShoppingCart,
  Mic,
  Boxes,
  Stethoscope,
  GraduationCap,
  Building2,
  Hammer,
  Truck,
  Factory,
  Landmark,
  Hotel
};

// Interface para las props del componente
interface IndustriasGridPageProps {
  servicioSlug?: string; // Slug del servicio (opcional)
}

export default function IndustriasGridPage({ servicioSlug }: IndustriasGridPageProps) {
  // Función para renderizar el ícono correcto según el nombre
  const renderIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6 mb-2 text-white" /> : null;
  };

  // Función para generar el slug de la industria
  const generateIndustrySlug = (name: string) => {
    return name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {industries.map((industria) => {
        const slug = generateIndustrySlug(industria.name);
        
        // Determinar el enlace según el contexto
        const href = servicioSlug 
          ? `/servicios/${servicioSlug}/${slug}` // Para página de servicios
          : `/industrias/${slug}`; // Para página de industrias normal
        
        return (
          <Link 
            key={industria.name} 
            href={href}
            className="relative group overflow-hidden rounded-xl shadow-md aspect-[4/3] block hover:scale-[1.02] transition-transform duration-300"
          >
            <CloudflareImage
              imageId={industria.imageId}
              alt={`Industria de ${industria.name}`}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition z-10"></div>
            
            {/* Texto superpuesto */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
              {renderIcon(industria.icon)}
              <h3 className="text-white text-lg font-semibold drop-shadow-md">
                {industria.name}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
} 