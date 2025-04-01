'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useInView } from 'framer-motion'

interface CtaFinalProps {
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  variant?: "default" | "soft"
}

export default function CtaFinal({
  title = "¿Listo para proteger su empresa?",
  description = "Solicita una cotización personalizada y descubre cómo podemos ayudarte.",
  ctaLabel = "Solicitar cotización",
  ctaHref = "/cotizar",
  variant = "default"
}: CtaFinalProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Determinamos las clases según la variante
  const bgClasses = variant === "soft" 
    ? "bg-slate-100 dark:bg-white/5 text-foreground dark:text-slate-200" 
    : "bg-slate-900/80 dark:bg-slate-900/80 text-white dark:text-white";
  
  const descriptionClasses = variant === "soft"
    ? "text-muted-foreground dark:text-slate-300"
    : "text-slate-300 dark:text-slate-300";
    
  return (
    <section className="py-12 md:py-16 px-4 md:px-10 w-full">
      <div 
        ref={ref}
        className={cn(
          "max-w-4xl mx-auto text-center rounded-xl py-12 md:py-16 px-6 md:px-8 border border-border/20 shadow-sm",
          bgClasses,
          "transform transition-all duration-700 ease-out",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {title}
        </h2>
        <p className={cn("text-base md:text-lg mb-8", descriptionClasses)}>
          {description}
        </p>
        
        <Link 
          href={ctaHref}
          className={cn(
            buttonVariants({ variant: "gard-primary", size: "lg" }),
            "text-base md:text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform"
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
} 