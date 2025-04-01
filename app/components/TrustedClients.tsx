"use client";

import React from 'react';
import CloudflareImage from '@/components/CloudflareImage';
import { clients } from '@/app/data/clients';

export default function TrustedClients() {
  return (
    <section className="bg-muted/30 dark:bg-gray-900/50 py-20">
      <div className="gard-container">
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-primary uppercase tracking-wide mb-12">
          Clientes que confían en nosotros
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          {clients.map((client) => (
            <div 
              key={client.imageId} 
              className="flex items-center justify-center p-4"
            >
              <div 
                className="w-full h-20 max-w-[150px] relative group"
                title={client.name}
              >
                <CloudflareImage
                  imageId={client.imageId}
                  alt={client.name}
                  fill
                  objectFit="contain"
                  className="grayscale opacity-60 transition-all duration-300 ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 