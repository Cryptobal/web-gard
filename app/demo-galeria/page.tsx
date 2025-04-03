import React from 'react';
import type { Metadata } from 'next';
import GaleriaGuardias from '@/components/GaleriaGuardias';

export const metadata: Metadata = {
  title: 'Demo Galería de Guardias | Gard Security',
  description: 'Demostración de la galería de guardias de seguridad con carrusel responsivo.',
};

export default function DemoGaleriaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full py-12 md:py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
            Demostración Galería
          </h1>
        </div>
      </div>
      
      <GaleriaGuardias />
    </main>
  );
} 