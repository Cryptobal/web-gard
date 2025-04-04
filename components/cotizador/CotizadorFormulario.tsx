'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Importación correcta del componente CotizadorGuardias con ruta absoluta completa
const CotizadorGuardias = dynamic(() => import('../../app/components/CotizadorGuardias'), { ssr: false });

const CotizadorFormulario = () => {
  return (
    <section className="py-16 md:py-24 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Calcula el costo de tu <span className="text-orange-500">seguridad privada</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Utiliza nuestra calculadora interactiva para estimar el costo de servicios de guardias según tus necesidades específicas. Sin compromiso.
          </p>
        </motion.div>
        
        {/* Cotizador de Guardias de Seguridad */}
        <div className="bg-gray-900 rounded-3xl p-6 md:p-10 shadow-xl">
          <CotizadorGuardias />
        </div>
      </div>
    </section>
  );
};

export default CotizadorFormulario; 