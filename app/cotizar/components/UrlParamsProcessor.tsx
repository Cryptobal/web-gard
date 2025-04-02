'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Zap, 
  Shield, 
  Users, 
  Cpu, 
  MonitorSmartphone, 
  HeartHandshake 
} from 'lucide-react';

export default function UrlParamsProcessor() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Procesar y guardar parámetros relevantes en sessionStorage
    const industry = searchParams.get('industry');
    const service = searchParams.get('service');
    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');
    
    // Guardar en sessionStorage
    if (industry) sessionStorage.setItem('user_industry', industry);
    if (service) sessionStorage.setItem('user_service', service);
    
    // Registrar vista de página con parámetros
    if (window.dataLayer && (industry || service)) {
      window.dataLayer.push({
        event: 'view_quotation_page',
        page_referrer: document.referrer,
        industry_param: industry || 'not_specified',
        service_param: service || 'not_specified',
        utm_source: utm_source || 'not_specified',
        utm_medium: utm_medium || 'not_specified',
        utm_campaign: utm_campaign || 'not_specified'
      });
      
      console.log('✅ Params procesados en URL:', { industry, service, utm_source, utm_medium, utm_campaign });
    }
  }, [searchParams]);
  
  return null; // Componente invisible
} 