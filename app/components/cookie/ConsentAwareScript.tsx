'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useConsent } from '@/app/hooks/useConsent';

type ScriptType = 'analytics' | 'marketing' | 'preferences';

interface ConsentAwareScriptProps {
  src: string;
  type: ScriptType;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  id?: string;
  onLoad?: () => void;
}

/**
 * Componente que renderiza un script solo si el usuario ha dado consentimiento
 * para la categoría correspondiente.
 */
export default function ConsentAwareScript({
  src,
  type,
  strategy = 'afterInteractive',
  id,
  onLoad,
}: ConsentAwareScriptProps) {
  const { consent, hasInteracted } = useConsent();
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    // Solo cargar si el usuario ha dado consentimiento explícito
    const hasConsent = consent[type] && hasInteracted;
    setCanLoad(hasConsent);
    
    // Si se activa el consentimiento, registrar en consola para fines de auditoría
    if (hasConsent) {
      console.log(`[Consent] Script ${id || src} cargado con consentimiento para ${type}`);
    }
  }, [consent, hasInteracted, id, src, type]);

  if (!canLoad) {
    return null;
  }

  return (
    <Script 
      src={src}
      strategy={strategy}
      id={id}
      onLoad={onLoad}
      data-consent-type={type}
    />
  );
}

/**
 * Componente específico para Google Analytics 4 (GA4)
 */
interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const { consent, hasInteracted } = useConsent();
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    const hasConsent = consent.analytics && hasInteracted;
    setCanLoad(hasConsent);
  }, [consent.analytics, hasInteracted]);

  return (
    <>
      {/* Script base de GA4 */}
      <ConsentAwareScript 
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        id="ga-script"
        type="analytics"
      />
      
      {/* Inicialización de GA4 */}
      {canLoad && (
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
          `}
        </Script>
      )}
    </>
  );
} 