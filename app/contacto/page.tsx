import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contáctenos',
  description: 'Póngase en contacto con nuestro equipo de expertos en seguridad. Estamos aquí para responder a sus consultas.',
};

export default function Contacto() {
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Contacto</h1>
      <p className="text-body-lg mb-4">Aquí irá el formulario de contacto o la información de contacto.</p>
    </div>
  );
} 