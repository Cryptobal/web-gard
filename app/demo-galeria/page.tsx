import React from 'react';
import type { Metadata } from 'next';
import GaleriaGuardiasCarrusel from '@/components/sections/carousels/GaleriaGuardiasCarrusel';

export const metadata: Metadata = {
  title: 'Demo Galería de Guardias | Gard Security',
  description: 'Demostración de la galería de guardias de seguridad con carrusel responsivo.',
};

export default function DemoGaleriaPage() {
  // Lista de IDs de imágenes para la galería
  const imageIds = [
    "bc045c39-36bc-4abb-348d-c589687cb400",
    "eed0de62-d623-47bd-0a3f-d2ca692c6300",
    "1106aceb-986e-4176-a9a9-f0ec1f80f700",
    "5b95423f-4c59-4205-7b90-52e0667ca200",
    "04e7aafd-831d-4b6f-666c-116605cc4400",
    "fb852267-cb0c-4e3e-fa90-136c201e7000"
  ];

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full py-12 md:py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
            Demostración Galería
          </h1>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <GaleriaGuardiasCarrusel 
          imageIds={imageIds} 
          title="Personal de Seguridad Certificado" 
        />
      </div>
    </main>
  );
} 