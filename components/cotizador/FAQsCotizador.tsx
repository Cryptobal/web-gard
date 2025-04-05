'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Preguntas frecuentes actualizadas
const faqs = [
  {
    pregunta: '¿Cuál es el precio mínimo por contratar un guardia de seguridad?',
    respuesta: 'El precio mínimo varía según el tipo de servicio, horas requeridas y días a la semana. Para un servicio part-time (2 días por semana, 4 horas diarias), el costo aproximado es de $662.000 CLP mensual. Para un servicio completo 24/7, el precio es aproximadamente $5.480.000 CLP mensual. Utiliza nuestra calculadora para un presupuesto personalizado.'
  },
  {
    pregunta: '¿Qué incluye el servicio de guardias de seguridad?',
    respuesta: 'Nuestro servicio incluye guardias certificados OS-10, uniformados, supervisión periódica, reemplazos en caso de ausencia, seguro de responsabilidad civil, capacitaciones continuas, y reportes periódicos de actividades e incidentes. También proporcionamos el equipamiento necesario según el tipo de servicio contratado.'
  },
  {
    pregunta: '¿Cuánto tiempo toma implementar el servicio después de la contratación?',
    respuesta: 'El tiempo de implementación varía según la complejidad del servicio. Para servicios estándar, podemos iniciar en 3-5 días hábiles después de firmado el contrato. Para servicios más complejos o con equipamiento especial, el plazo puede ser de 7-10 días hábiles.'
  },
  {
    pregunta: '¿Los guardias tienen certificación OS-10?',
    respuesta: 'Sí, todos nuestros guardias cuentan con la certificación OS-10 vigente otorgada por Carabineros de Chile, cumpliendo con toda la normativa legal para ejercer como guardias de seguridad en Chile. Además, reciben capacitaciones periódicas para mantener sus habilidades actualizadas.'
  },
  {
    pregunta: '¿Ofrecen pruebas de detección de drogas y alcohol a los guardias?',
    respuesta: 'Sí, realizamos pruebas periódicas de detección de drogas y alcohol a todo nuestro personal operativo como parte de nuestros protocolos de seguridad y control de calidad. Esta medida garantiza que nuestros guardias se mantengan en óptimas condiciones para desempeñar sus funciones.'
  },
  {
    pregunta: '¿Se puede modificar el contrato según cambien nuestras necesidades?',
    respuesta: 'Absolutamente. Entendemos que las necesidades de seguridad pueden cambiar, por lo que ofrecemos contratos flexibles. Puedes aumentar o disminuir la cantidad de guardias, cambiar horarios o modificar los servicios con un preaviso de 15 días. Nuestro equipo trabajará contigo para adaptar el servicio según tus requerimientos.'
  },
  {
    pregunta: '¿Cuáles son las ventajas de utilizar el cotizador inteligente?',
    respuesta: 'Nuestro cotizador inteligente ofrece múltiples ventajas: obtener un precio estimado inmediato, personalizar el servicio según tus necesidades específicas, visualizar diferentes configuraciones de turnos, comparar opciones de cobertura, y recibir una propuesta formal detallada en tu correo. Todo esto con total transparencia y sin compromiso.'
  }
];

// Componente mejorado que evita re-renderizados innecesarios
const FAQItem = React.memo(({ faq, index, isExpanded, onToggle }: {
  faq: { pregunta: string; respuesta: string };
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-700 transition-colors"
      >
        <h3 className="text-lg md:text-xl font-semibold text-white pr-8">{faq.pregunta}</h3>
        <ChevronDown 
          className={`h-6 w-6 text-orange-500 transition-transform duration-300 ${
            isExpanded ? 'transform rotate-180' : ''
          }`} 
        />
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            <p className="text-gray-300">{faq.respuesta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

FAQItem.displayName = 'FAQItem';

const FAQsCotizador = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 w-full">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Preguntas <span className="text-orange-500">frecuentes</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Respuestas a las consultas más habituales sobre nuestros servicios de seguridad privada para empresas.
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={`faq-${index}`}
              faq={faq}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-400">
            ¿No encuentras respuesta a tu pregunta?
          </p>
          <a 
            href="/contacto" 
            className="mt-4 inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
          >
            Contáctanos directamente
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQsCotizador; 