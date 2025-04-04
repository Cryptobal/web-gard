'use client';

import CotizadorFormulario from './CotizadorFormulario';
import BeneficiosCotizador from './BeneficiosCotizador';
import FAQsCotizador from './FAQsCotizador';
import SEODevPanel from '@/components/seo/SEODevPanel';
import CanonicalUrl from '@/components/seo/CanonicalUrl';

export default function CotizadorLandingClient() {
  return (
    <>
      <SEODevPanel />
      <CanonicalUrl />
      
      {/* Badge o claim visual */}
      <div className="w-full flex justify-center mt-8">
        <div className="bg-orange-500 text-white px-4 py-1 text-sm rounded-full font-medium">
          Calculadora interactiva exclusiva
        </div>
      </div>

      {/* Componentes visuales del cotizador */}
      <CotizadorFormulario />
      <BeneficiosCotizador />
      <FAQsCotizador />

      {/* Frase de confianza */}
      <div className="w-full text-center pb-16 mt-10">
        <p className="text-gray-300 text-lg font-medium">
          Gard Security: más de 100 empresas ya han confiado en nosotros para su protección.
        </p>
      </div>
    </>
  );
} 