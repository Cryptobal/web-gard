# 🔍 Guía SEO para Gard Security

## Objetivos
Este documento establece las reglas y mejores prácticas para mantener un SEO óptimo en el sitio web de Gard Security.

## 📋 Reglas fundamentales

### 1. Estructura de metadatos
- ✅ **Cada página debe tener su propio archivo `metadata.ts`**
- ❌ **Nunca definir metadata en archivos `layout.tsx`** (especialmente en rutas agrupadas como `(landing-*)`)
- ✅ La URL canónica solo debe definirse en `metadata.ts` con `alternates: { canonical: 'https://gard.cl/ruta' }`

### 2. Contenido mínimo de cada metadata.ts
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Título de la página | Gard Security',
  description: 'Descripción clara de la página en 150-160 caracteres.',
  keywords: ['palabra clave 1', 'palabra clave 2', 'palabra clave 3'],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://gard.cl/ruta-actual'
  },
  openGraph: {
    title: 'Título para redes sociales | Gard Security',
    description: 'Descripción para compartir en redes sociales.',
    url: 'https://gard.cl/ruta-actual',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  }
};
```

### 3. Jerarquía de metadatos
- Next.js aplica los metadatos en este orden (de mayor a menor prioridad):
  1. `metadata.ts` o `page.tsx` (con export const metadata)
  2. `layout.tsx` de la ruta actual
  3. `layout.tsx` de rutas padres (yendo hacia la raíz)

### 4. SEO DevPanel
- El SEO DevPanel muestra lo que Google realmente ve en el DOM
- Sirve para validar que los metadatos definidos en `metadata.ts` se aplican correctamente
- Si el panel muestra errores (botón rojo), debe corregirse creando o actualizando el `metadata.ts` correspondiente
- El debugger usará CanonicalUrl como fallback solo si no existe una URL canónica definida en metadata.ts

### 5. Fallbacks
- Si una página no tiene `metadata.ts`, heredará los valores de sus layouts padres
- Sin embargo, esto no es recomendado, ya que cada página debe tener sus propios metadatos optimizados

## 📏 Reglas específicas para metadatos

### Títulos
- Deben tener entre 50-60 caracteres
- Incluir la palabra clave principal al inicio
- Formato recomendado: `[Keyword Principal] | Gard Security`

### Descripciones
- Deben tener entre 150-160 caracteres
- Incluir la palabra clave principal en los primeros 120 caracteres
- Incluir un call-to-action claro

### URLs canónicas
- Siempre usar el dominio principal: `https://gard.cl/`
- No incluir parámetros de tracking o UTMs en la URL canónica
- Evitar duplicidad de contenido con URLs canónicas correctas

## 🧪 Validación y auditoría

Periódicamente, ejecutar auditorías para verificar:
1. Que todas las páginas tengan su archivo `metadata.ts`
2. Que no haya metadatos definidos en archivos `layout.tsx`
3. Que todos los metadatos críticos estén presentes en cada página
4. Que las URLs canónicas estén correctamente definidas
5. Que no haya errores en SEODevPanel

## 📚 Recursos
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org para SEO](https://schema.org/docs/schemas.html) 