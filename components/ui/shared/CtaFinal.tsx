'use client'


import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CtaFinalProps {
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

export default function CtaFinal({
  title = "¿Listo para proteger su empresa?",
  description = "Solicita una cotización personalizada y descubre cómo podemos ayudarte.",
  ctaLabel = "Solicitar cotización",
  ctaHref = "/cotizar"
}: CtaFinalProps) {
  return (
    <section className="bg-secondary/10 py-12 px-4 md:px-10 w-full border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {title}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-8">
          {description}
        </p>
        
        <Link 
          href={ctaHref}
          className={cn(
            buttonVariants({ variant: "gard-primary", size: "lg" }),
            "text-base md:text-lg px-8 py-3 rounded-full"
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
} 