import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestros Servicios de Seguridad',
  description: 'Descubra nuestra gama completa de servicios de seguridad empresarial. Soluciones personalizadas para proteger su negocio.',
};

export default function Servicios() {
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Nuestros Servicios</h1>
      <p className="text-body-lg mb-4">Aquí se mostrará la lista de servicios que ofrece Gard Security.</p>
    </div>
  );
} 