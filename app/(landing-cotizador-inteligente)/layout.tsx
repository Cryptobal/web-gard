import React from 'react';
import './landing-styles.css';
import '@/app/globals.css';

export const metadata = {
  title: 'Landing Cotizador Inteligente',
  description: 'Layout especial para el cotizador inteligente sin navegación ni footer'
};

// Componente cliente para aplicar modo oscuro y ocultar header/footer
'use client';
const ClientDarkMode = () => {
  React.useEffect(() => {
    document.body.style.backgroundColor = '#111827';
    document.body.style.color = 'white';

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
  }, []);

  return null;
};

export default function LayoutLandingCotizadorInteligente({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col w-full">
      <ClientDarkMode />
      <div className="flex-1">{children}</div>
    </main>
  );
} 