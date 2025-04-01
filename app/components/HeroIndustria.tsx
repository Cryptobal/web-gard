'use client';

import React from 'react';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { ArrowRight } from 'lucide-react';

interface HeroIndustriaProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageId: string;
}

export default function HeroIndustria({
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageId = "4a46b63d-0e1b-4640-b95c-7f040a288c00"
}: HeroIndustriaProps) {
  return (
    <section className="relative h-[50vh] md:h-[65vh] overflow-hidden">
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
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-4xl mb-6">
          {title}
        </h1>
        <p className="text-white text-xl max-w-2xl mb-8">
          {subtitle}
        </p>
        <Link 
          href={ctaLink} 
          className="gard-btn gard-btn-primary gard-btn-lg"
        >
          {ctaText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
} 