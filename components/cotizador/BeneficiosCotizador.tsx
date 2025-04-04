'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award, Users, Check } from 'lucide-react';

const beneficios = [
  {
    icon: <Shield className="h-12 w-12 text-orange-500" />,
    title: 'Protección garantizada',
    description: 'Guardias certificados y capacitados para brindar la seguridad que tu empresa necesita.'
  },
  {
    icon: <Clock className="h-12 w-12 text-orange-500" />,
    title: 'Servicio 24/7',
    description: 'Cobertura completa sin interrupciones, todos los días del año.'
  },
  {
    icon: <Award className="h-12 w-12 text-orange-500" />,
    title: 'Certificación OS-10',
    description: 'Cumplimos con todas las normativas y certificaciones exigidas por la ley.'
  },
  {
    icon: <Users className="h-12 w-12 text-orange-500" />,
    title: 'Personal calificado',
    description: 'Guardias con experiencia y entrenamiento continuo en protección de activos.'
  }
];

const BeneficiosCotizador = () => {
  return (
    <section className="py-16 md:py-24 w-full bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Beneficios de nuestro <span className="text-orange-500">servicio premium</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            En Gard Security ofrecemos soluciones de seguridad integral para empresas con los más altos estándares de calidad.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficios.map((beneficio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-700 transition-colors shadow-lg"
            >
              <div className="flex justify-center mb-5">
                {beneficio.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{beneficio.title}</h3>
              <p className="text-gray-300">{beneficio.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 md:p-10"
        >
          <h3 className="text-2xl font-bold mb-6 text-white text-center">
            Por qué elegirnos
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Más de 10 años de experiencia',
              'Personal capacitado constantemente',
              'Supervisión permanente',
              'Tecnología de punta en seguridad',
              'Respuesta inmediata ante emergencias',
              'Flexibilidad de servicios',
              'Cumplimiento normativo estricto',
              'Reportes detallados de incidentes'
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeneficiosCotizador; 