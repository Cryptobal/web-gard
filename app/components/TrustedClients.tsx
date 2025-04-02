"use client";

import React from 'react';
import CloudflareImage from '@/components/CloudflareImage';
import { clients } from '@/app/data/clients';
import { motion } from 'framer-motion';

export default function TrustedClients() {
  return (
    <section className="bg-[#0F172A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-4"
        >
          Empresas que confían en nosotros
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-slate-400 mb-10"
        >
          Nos eligen líderes de industrias exigentes en todo Chile
        </motion.p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 place-items-center">
          {clients.map((client, index) => (
            <motion.div 
              key={client.imageId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * index,
                ease: "easeOut" 
              }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div 
                className="max-h-12 h-auto relative w-full"
                title={client.name}
              >
                <CloudflareImage
                  imageId={client.imageId}
                  alt={client.name}
                  width={100}
                  height={48}
                  className="object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 