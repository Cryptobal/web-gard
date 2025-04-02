'use client';

import { useEffect } from 'react';

// Función utilitaria para capturar parámetros UTM desde la URL
function getQueryParam(param: string) {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Tipos para los eventos
type EventName = 
  | 'click_cta_primary'
  | 'click_cta_secondary'
  | 'click_whatsapp'
  | 'click_phone'
  | 'click_email'
  | 'submit_form_contact'
  | 'submit_form_quotation'
  | 'view_categoria_servicio'
  | 'view_categoria_industria'
  | 'view_case_study'
  | 'file_download'
  | 'scroll_depth'
  | 'time_on_page';

// Interfaz para el evento
interface EventProps {
  name: EventName;
  params?: Record<string, string | number | boolean>;
}

/**
 * Hook para enviar eventos al dataLayer de GTM
 */
export function useGtmEvent() {
  const pushEvent = ({ name, params = {} }: EventProps) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: name,
        ...params,
        utm_source: getQueryParam('utm_source'),
        utm_medium: getQueryParam('utm_medium'),
        utm_campaign: getQueryParam('utm_campaign'),
        referrer: document.referrer
      });
    }
  };

  return { pushEvent };
}

/**
 * Hook para rastrear la profundidad de desplazamiento
 */
export function useScrollDepthTracking() {
  const { pushEvent } = useGtmEvent();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const scrollDepths = [25, 50, 75, 90];
    const scrollDepthsTriggered = new Set<number>();
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
      
      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !scrollDepthsTriggered.has(depth)) {
          scrollDepthsTriggered.add(depth);
          
          pushEvent({
            name: 'scroll_depth',
            params: { percent: depth }
          });
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

/**
 * Componente wrapper para elementos CTA primarios
 */
interface CtaProps {
  children: React.ReactNode;
  text: string;
  location: string;
  primary?: boolean;
  onClick?: () => void;
}

export function TrackableCta({ children, text, location, primary = true, onClick }: CtaProps) {
  const { pushEvent } = useGtmEvent();
  
  const handleClick = () => {
    pushEvent({
      name: primary ? 'click_cta_primary' : 'click_cta_secondary',
      params: {
        cta_text: text,
        cta_location: location
      }
    });
    
    if (onClick) onClick();
  };
  
  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
}

/**
 * Componente para rastrear visitas a categorías (servicios/industrias)
 */
interface CategoryViewProps {
  categoryType: 'servicio' | 'industria';
  categoryName: string;
}

export function CategoryViewTracker({ categoryType, categoryName }: CategoryViewProps) {
  const { pushEvent } = useGtmEvent();
  
  useEffect(() => {
    pushEvent({
      name: categoryType === 'servicio' ? 'view_categoria_servicio' : 'view_categoria_industria',
      params: {
        [categoryType === 'servicio' ? 'service_category' : 'industry_category']: categoryName
      }
    });
  }, [categoryType, categoryName]);
  
  return null; // Componente invisible
}

// Hook para rastrear el tiempo en la página
export function useTimeOnPageTracking() {
  const { pushEvent } = useGtmEvent();
  
  useEffect(() => {
    const startTime = Date.now();
    const intervals = [30, 60, 120, 300]; // segundos
    const timeouts: NodeJS.Timeout[] = [];
    
    intervals.forEach(seconds => {
      const timeout = setTimeout(() => {
        pushEvent({
          name: 'time_on_page',
          params: {
            duration_seconds: seconds
          }
        });
      }, seconds * 1000);
      
      timeouts.push(timeout);
    });
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      
      // Registrar tiempo total al salir de la página
      const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
      pushEvent({
        name: 'time_on_page',
        params: {
          duration_seconds: totalSeconds,
          is_exit: true
        }
      });
    };
  }, []);
}