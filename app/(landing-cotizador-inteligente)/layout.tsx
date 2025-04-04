import React from 'react';
import ClientDarkMode from './client-dark-mode';
import './landing-styles.css';

export default function LayoutLandingCotizadorInteligente({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <ClientDarkMode />
      <div className="flex-1">{children}</div>
    </main>
  );
} 