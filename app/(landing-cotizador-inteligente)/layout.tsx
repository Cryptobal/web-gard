import React from 'react';
import './landing-styles.css';
import '@/app/globals.css';
import ClientWrapper from './client-wrapper';

export const metadata = {
  title: 'Landing Cotizador Inteligente',
  description: 'Layout especial para el cotizador inteligente sin navegación ni footer'
};

export default function LayoutLandingCotizadorInteligente({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col w-full">
      <ClientWrapper>
        <div className="flex-1">{children}</div>
      </ClientWrapper>
    </main>
  );
} 