import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Términos y condiciones de servicio de Gard Security. Normas que rigen el uso de nuestros servicios.',
};

export default function Terminos() {
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Términos y Condiciones</h1>
      <p className="text-body-lg mb-4">Aquí se describirán los términos legales del sitio.</p>
    </div>
  );
} 