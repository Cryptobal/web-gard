"use client";

import React, { useState } from 'react';

interface SEODevPanelProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

export const SEODevPanel: React.FC<SEODevPanelProps> = ({
  title,
  description,
  canonical,
  ogImage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isProduction = process.env.NODE_ENV === 'production';
  
  // No mostrar en producción
  if (isProduction) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-lg text-xs"
      >
        {isOpen ? 'Cerrar SEO' : 'Ver SEO'}
      </button>
      
      {isOpen && (
        <div className="absolute bottom-10 right-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-80">
          <h5 className="text-sm font-bold mb-2 text-gray-900 dark:text-white">SEO Metadata</h5>
          <div className="space-y-2 text-xs">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Title:</span>
              <p className="text-gray-600 dark:text-gray-400 break-words">{title}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Description:</span>
              <p className="text-gray-600 dark:text-gray-400 break-words">{description}</p>
            </div>
            {canonical && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Canonical:</span>
                <p className="text-gray-600 dark:text-gray-400 break-words">{canonical}</p>
              </div>
            )}
            {ogImage && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">OG Image:</span>
                <p className="text-gray-600 dark:text-gray-400 break-words">{ogImage}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 