import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guardias de Seguridad Privada para Empresas | Gard Security',
  description: 'Servicio profesional de guardias de seguridad para empresas. Cotiza en línea y obtén una estimación inmediata del costo mensual según tus necesidades específicas.',
  keywords: [
    'guardias de seguridad',
    'cotizador de guardias',
    'seguridad privada',
    'guardias para empresas',
    'cotización online',
    'servicio de guardias',
    'costo guardias seguridad'
  ],
  openGraph: {
    title: 'Guardias de Seguridad Privada para Empresas | Gard Security',
    description: 'Cotiza en línea y obtén una estimación inmediata del costo mensual de contratar guardias de seguridad según tus necesidades específicas.',
    images: [
      {
        url: 'https://gard.cl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Guardias de seguridad Gard Security',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: '/guardias-de-seguridad-privada-para-empresas',
  },
};

export default function GuardiasLayout({
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