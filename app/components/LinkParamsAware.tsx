'use client';

import Link from 'next/link';

interface LinkParamsAwareProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  serviceName?: string;
  serviceSlug?: string;
  industryName?: string;
  industrySlug?: string;
}

export default function LinkParamsAware({ 
  href, 
  children, 
  className, 
  serviceName, 
  serviceSlug,
  industryName,
  industrySlug
}: LinkParamsAwareProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      // Guardar en sessionStorage los parámetros del servicio/industria
      if (serviceName) sessionStorage.setItem('user_service', serviceName);
      if (serviceSlug) sessionStorage.setItem('user_service_slug', serviceSlug);
      if (industryName) sessionStorage.setItem('user_industry', industryName);
      if (industrySlug) sessionStorage.setItem('user_industry_slug', industrySlug);
      
      // Obtener parámetros de la URL (por si venía con parámetros industry, etc.)
      const searchParams = new URLSearchParams(window.location.search);
      const urlIndustry = searchParams.get('industry');
      
      if (urlIndustry && !industryName) {
        sessionStorage.setItem('user_industry', urlIndustry);
      }
      
      // Registro en dataLayer
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'click_cta_primary',
          cta_text: serviceName ? 'Cotizar servicio' : (industryName ? 'Cotizar industria' : 'Cotizar'),
          service_selected: serviceName || 'not_specified',
          industry_context: industryName || urlIndustry || 'not_specified'
        });
      }
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
} 