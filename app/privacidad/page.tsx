import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Gard Security. Cómo recopilamos, usamos y protegemos su información.',
};

export default function Privacidad() {
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Política de Privacidad</h1>
      <p className="text-body-lg mb-4">Aquí se explicará cómo manejamos la información personal de los usuarios.</p>
    </div>
  );
} 