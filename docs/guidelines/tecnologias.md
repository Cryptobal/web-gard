# Tecnologías Permitidas - Gard Security

## Stack Principal

| Tecnología      | Versión | Uso                                     | Alternativas prohibidas |
|-----------------|---------|----------------------------------------|-------------------------|
| Next.js         | 14.0.4+ | Framework base React                    | CRA, Remix, Gatsby      |
| React           | 18.2.0+ | Biblioteca UI                           | Vue, Angular, Svelte    |
| TypeScript      | 5.3.3+  | Lenguaje tipado                         | JavaScript puro         |
| TailwindCSS     | 3.4.0+  | Framework CSS                           | Bootstrap, MUI, SCSS    |
| Framer Motion   | 10.18.0+| Animaciones                             | GSAP, CSS animations    |
| next/font       | -       | Optimización de fuentes                 | Google Fonts directo    |
| next-themes     | 0.2.1+  | Tema claro/oscuro                       | Implementación manual   |
| next-seo        | 6.4.0+  | SEO optimizado                          | React Helmet           |
| shadcn/ui       | -       | Componentes UI (solo lo necesario)      | MUI, Chakra UI          |
| lucide-react    | 0.309.0+| Iconografía                             | Font Awesome, Heroicons |

## Reglas de Importación

1. Importar componentes específicos, no paquetes completos:
   ```tsx
   // ✅ CORRECTO
   import { Button } from "@/components/ui/button";
   
   // ❌ INCORRECTO
   import * as UI from "@/components/ui";
   ```

2. Importación de iconos:
   ```tsx
   // ✅ CORRECTO
   import { Shield, ArrowRight } from "lucide-react";
   
   // ❌ INCORRECTO - Importar librería completa
   import * as Icons from "lucide-react";
   ```

## Optimización

1. **Imágenes**:
   - Toda imagen debe usar `<CloudflareImage>` con alt descriptivo
   - No usar imágenes externas directas
   - Priorizar imágenes WebP/AVIF mediante Cloudflare

2. **JavaScript**:
   - Código tree-shakeable
   - Lazy loading cuando sea apropiado
   - No polyfills innecesarios

3. **CSS**:
   - No importación de CSS externo
   - Seguir clases predefinidas (`gard-*`)
   - No usar !important

## Dependencias No Permitidas

- jQuery o librerías basadas en jQuery
- Moment.js (usar Date-fns si es necesario)
- Librerías de íconos distintas a lucide-react
- Bootstrap, Material UI, Chakra UI
- Librerías de gráficos pesadas
- State managers complejos (Redux, MobX)

## Consideraciones especiales

- **Renderizado SSG**: Toda la web debe ser estática
- **No API Routes**: No crear rutas de API
- **No Client Fetch**: Evitar fetching de datos en cliente
- **Accesibilidad**: Cumplir WCAG AA mínimo
- **Rendimiento**: Lighthouse score >90 en todos los aspectos 