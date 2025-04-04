import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog de Seguridad Empresarial | Gard Security',
  description: 'Artículos, consejos y tendencias sobre seguridad empresarial, ciberseguridad y protección de activos para empresas.',
  keywords: ['blog seguridad', 'artículos seguridad empresarial', 'consejos ciberseguridad', 'tendencias seguridad'],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://gard.cl/blog'
  },
  openGraph: {
    title: 'Blog de Seguridad Empresarial | Gard Security',
    description: 'Artículos, consejos y tendencias sobre seguridad empresarial, ciberseguridad y protección de activos para empresas.',
    url: 'https://gard.cl/blog',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  }
}; 