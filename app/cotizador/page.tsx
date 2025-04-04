'use client';

import dynamic from 'next/dynamic';

const CotizadorFormulario = dynamic(() => import('@/components/cotizador/CotizadorFormulario'), { ssr: false });
const BeneficiosCotizador = dynamic(() => import('@/components/cotizador/BeneficiosCotizador'), { ssr: false });
const FAQsCotizador = dynamic(() => import('@/components/cotizador/FAQsCotizador'), { ssr: false });

export default function CotizadorLandingPage() {
  return (
    <main className="min-h-screen bg-[#0b132b] text-white overflow-x-hidden">
      
      {/* Badge o claim visual */}
      <div className="w-full flex justify-center mt-8">
        <div className="bg-orange-500 text-white px-4 py-1 text-sm rounded-full font-medium">
          Calculadora interactiva exclusiva
        </div>
      </div>

      {/* Componentes de la landing */}
      <CotizadorFormulario />
      <BeneficiosCotizador />
      <FAQsCotizador />

      {/* Frase de confianza */}
      <div className="w-full text-center pb-16">
        <p className="text-gray-300 text-lg font-medium">
          Gard Security: más de 100 empresas ya han confiado en nosotros para su protección.
        </p>
      </div>
    </main>
  );
} 