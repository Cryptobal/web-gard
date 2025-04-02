'use client';

import React from 'react';
import Link from 'next/link';

interface LinkParamsAwareProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  industryName: string;
  industrySlug: string;
}

export default function LinkParamsAware({ href, children, className, industryName, industrySlug }: LinkParamsAwareProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      // Guardar en sessionStorage los parámetros de la industria
      sessionStorage.setItem('user_industry', industryName);
      sessionStorage.setItem('user_industry_slug', industrySlug);
      
      // Obtener parámetros de la URL (por si venía con parámetros service, etc.)
      const searchParams = new URLSearchParams(window.location.search);
      const service = searchParams.get('service');
      
      if (service) {
        sessionStorage.setItem('user_service', service);
      }
      
      // Registro en dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_cta_primary',
        cta_text: 'Cotizar seguridad',
        industry_selected: industryName,
        service_context: service || 'no_specified'
      });
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
} 