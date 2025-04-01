import React from 'react';
import type { Metadata } from 'next';
import CotizacionForm from './components/CotizacionForm';

export const metadata: Metadata = {
  title: 'Solicita tu Cotización | Gard Security',
  description: 'Solicita una cotización personalizada para servicios de seguridad adaptados a tus necesidades. Respuesta garantizada en menos de 12 horas.',
};

export default function Cotizar() {
  return (
    <div className="gard-container py-16 md:py-24 mt-20">
      <h1 className="text-heading-2 text-center mb-4">Solicita tu Cotización</h1>
      <p className="text-body-lg text-center mb-12 max-w-3xl mx-auto">
        Completa el formulario y te contactaremos en menos de 12 horas.
      </p>
      
      <div className="max-w-3xl mx-auto">
        <CotizacionForm />
      </div>
    </div>
  );
}