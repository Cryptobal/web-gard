'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  imageId: string;
  className?: string;
  children?: ReactNode;
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageId,
  className = "",
  children
}: HeroProps) {
  return (
    <section className={`relative w-full h-[70vh] md:h-[80vh] overflow-hidden pt-[100px] md:pt-[120px] ${className}`}>
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <CloudflareImage
          imageId={imageId}
          alt={title}
          fill
          className="object-cover"
          objectPosition="center"
          priority
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="bg-gradient-to-t from-black/60 to-transparent absolute inset-0 z-10"></div>
      </div>
      
      {/* Contenido */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-7xl mx-auto">
        <h1 className="text-heading-1 text-white md:text-5xl font-bold leading-tight max-w-4xl mb-6">
          {title}
        </h1>
        <p className="text-body-lg text-white max-w-2xl mb-8">
          {subtitle}
        </p>
        
        {ctaText && ctaLink && (
          <Button 
            variant="gard-primary"
            size="lg"
            className="shadow-md shadow-blue-500/20 rounded-2xl"
            asChild
          >
            <Link href={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        )}
        
        {children}
      </div>
    </section>
  );
} 