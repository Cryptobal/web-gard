'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

// Tipo para las propiedades del componente
interface GoogleTagManagerProps {
  gtmId: string;
}

// Componente para cargar Google Tag Manager
export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const pathname = usePathname();

  // Actualizar la página vista en cambios de ruta
  useEffect(() => {
    if (pathname && window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      {/* Script GTM principal - ubicado en head para carga anticipada */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      
      {/* iframe de noscript - colocado inmediatamente después del inicio del body */}
      <noscript>
        <iframe 
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }} 
        />
      </noscript>
    </>
  );
}

// Declaración global para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
} 