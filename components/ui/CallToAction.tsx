'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';

interface CallToActionProps {
  title: string;
  buttonText: string;
  href: string;
  variant?: "primary" | "secondary"; // default: primary
  bg?: string; // Para compatibilidad con implementaciones previas
  contrast?: "default" | "soft"; // default: default
}

export const CallToAction: React.FC<CallToActionProps> = ({
  title,
  buttonText,
  href,
  variant = "primary",
  bg, // Mantenemos este parámetro para compatibilidad
  contrast = "default"
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Determinamos las clases según el nivel de contraste
  const bgClasses = contrast === "soft" 
    ? "bg-slate-100 dark:bg-white/5 text-foreground dark:text-slate-200" 
    : bg || "bg-slate-900/80 dark:bg-slate-900/80 text-white dark:text-white";

  return (
    <div className="py-12 md:py-16 px-4 md:px-10 w-full">
      <div 
        ref={ref}
        className={cn(
          "max-w-4xl mx-auto rounded-xl py-12 md:py-16 px-6 md:px-8 border border-border/20 shadow-sm",
          bgClasses,
          "transform transition-all duration-700 ease-out",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6">
            {title}
          </h2>
          <Link href={href} passHref>
            <Button 
              variant={variant === "primary" ? "gard-primary" : "gard-secondary"} 
              className="px-6 py-3 text-base rounded-full hover:scale-105 transition-all mx-auto"
              aria-label={buttonText}
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction; 