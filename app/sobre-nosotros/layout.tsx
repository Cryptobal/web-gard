import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Gard Security',
  description: 'Conoce quiénes somos en Gard Security. Más de 20 años protegiendo empresas con experiencia en terreno y tecnología avanzada.',
  keywords: 'empresa de seguridad privada, seguridad para empresas, expertos en protección operativa, guardias de seguridad para industria',
};

export default function SobreNosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 