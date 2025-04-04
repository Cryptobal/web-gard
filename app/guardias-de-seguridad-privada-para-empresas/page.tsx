"use client";

import React from 'react';
import CotizadorGuardias from '@/app/components/CotizadorGuardias';
import { motion } from 'framer-motion';

export default function GuardiasPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-background dark:to-primary/10">
        <div className="container px-4 mx-auto text-center">
          <motion.h1 
            className="text-heading-1 font-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Guardias de Seguridad Privada
          </motion.h1>
          
          <motion.p 
            className="text-body-lg text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Brindamos soluciones de seguridad física para empresas con guardias altamente capacitados. Cotiza en línea y personaliza el servicio según tus necesidades específicas.
          </motion.p>
        </div>
      </section>

      {/* Cotizador de Guardias */}
      <CotizadorGuardias />

      {/* Servicios Adicionales */}
      <section className="gard-section w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <h2 className="text-heading-2 font-title text-3xl md:text-4xl font-bold mb-12 text-center">
            Servicios Complementarios
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div 
              className="gard-card bg-card dark:bg-gray-900 rounded-2xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Guardias Especializados</h3>
              <p className="text-muted-foreground">
                Guardias con certificaciones específicas para distintos sectores como retail, industrial o corporativo.
              </p>
            </motion.div>
            
            <motion.div 
              className="gard-card bg-card dark:bg-gray-900 rounded-2xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4">Supervisión Activa</h3>
              <p className="text-muted-foreground">
                Supervisores capacitados que realizan rondas periódicas para garantizar el cumplimiento de los protocolos.
              </p>
            </motion.div>
            
            <motion.div 
              className="gard-card bg-card dark:bg-gray-900 rounded-2xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-4">Monitoreo CCTV</h3>
              <p className="text-muted-foreground">
                Integración con sistemas de monitoreo CCTV para aumentar la efectividad de la seguridad física.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
} 