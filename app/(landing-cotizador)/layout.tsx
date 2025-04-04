import React from 'react';
import type { Metadata } from 'next';
import ClientDarkMode from './client-dark-mode';
import './landing-styles.css';

export const metadata: Metadata = {
  title: 'Cotizador de Seguridad | Gard Security',
  description: 'Calcula el costo mensual estimado de tu servicio de guardias de seguridad según tus necesidades. 100% online.',
};

export default function LayoutLandingCotizador({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <ClientDarkMode />
      {children}
    </main>
  );
} 