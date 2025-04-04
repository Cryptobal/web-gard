import React from 'react';
import ClientDarkMode from './client-dark-mode';
import './landing-styles.css';
import '@/app/globals.css';

export const metadata = {
  title: 'Landing Cotizador Inteligente',
  description: 'Layout especial para el cotizador inteligente sin navegación ni footer'
};

export default function LayoutLandingCotizadorInteligente({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main className="min-h-screen bg-gray-900 text-white flex flex-col w-full">
          <ClientDarkMode />
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
} 