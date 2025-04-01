"use client";

import React from 'react';
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

export default function IndustriasGridPage() {
  // Función para renderizar el ícono correcto según el nombre
  const renderIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6 mb-2 text-white" /> : null;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {industries.map((industria) => (
        <div 
          key={industria.name} 
          className="relative group overflow-hidden rounded-xl shadow-md aspect-[4/3]"
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
        </div>
      ))}
    </div>
  );
} 