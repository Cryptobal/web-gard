# Componentes Compartidos - Gard Security

## Navegación y Layout

### `<Header />`
- Barra de navegación principal fija con efecto de scroll
- Incluye logo, enlaces de navegación y toggle de tema
- Versión móvil con menú hamburguesa
- Variante adaptativa según scroll (transparente/sólido)

### `<Footer />`
- Pie de página con logo, enlaces y contacto
- Grid responsive de 4 columnas en desktop
- Copyright y enlaces legales
- Iconos de contacto con acciones

## Utilidades

### `<CloudflareImage />`
- Componente wrapper para next/image
- Optimizado para Cloudflare Images
- Opciones para fill, priority y objectFit
- Manejo de calidad y tamaños responsivos

### `<ThemeToggle />`
- Botón de cambio entre modos claro/oscuro
- Animación suave
- Iconos Sol/Luna

## UI Común

### Botones
Usar clases predefinidas:
- `gard-btn` - Base para todos los botones
- `gard-btn-primary` - Botón principal azul
- `gard-btn-secondary` - Botón secundario azul oscuro
- `gard-btn-accent` - Botón destacado naranja
- `gard-btn-outline` - Botón con borde
- `gard-btn-ghost` - Botón fantasma
- `gard-btn-link` - Botón tipo enlace
- `gard-btn-lg` - Tamaño grande
- `gard-btn-md` - Tamaño medio
- `gard-btn-sm` - Tamaño pequeño

### Contenedores
- `gard-container` - Contenedor principal centrado (max-w-7xl)
- `gard-section` - Sección con padding vertical adecuado
- `gard-section-alt` - Sección con fondo alternativo
- `gard-hero` - Hero a ancho completo
- `gard-hero-content` - Contenido centrado dentro del hero
- `gard-hero-overlay` - Overlay para hero (oscurecer imágenes)

### Grids
- `gard-grid` - Grid responsive (1-2-3 columnas)
- `gard-grid-2` - Grid de 2 columnas
- `gard-card` - Tarjeta con bordes redondeados y sombra
- `gard-card-header` - Cabecera de tarjeta
- `gard-card-content` - Contenido de tarjeta
- `gard-card-footer` - Pie de tarjeta

## Tipografía

- `text-heading-1` a `text-heading-5` - Tamaños de títulos
- `text-body-lg`, `text-body-base`, `text-body-sm` - Tamaños de texto
- `text-muted` - Texto secundario

## Reglas de Uso

1. No duplicar estilos de componentes existentes
2. Mantener consistencia en espaciado y paleta de colores
3. Todos los iconos deben ser de lucide-react
4. Usar las clases predefinidas en globals.css
5. Cumplir con pautas de accesibilidad WCAG AA
6. Evitar !important y clases personalizadas fuera del estándar 