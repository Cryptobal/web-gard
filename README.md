# Gard Security - Sitio Web Corporativo

Sitio web estático de clase mundial para Gard Security, desarrollado con Next.js 14, TailwindCSS y herramientas modernas de desarrollo web.

## 🚀 Tecnologías

- **Next.js 14** - Framework React con App Router
- **TailwindCSS** - Framework CSS utility-first con modo oscuro
- **Shadcn/ui** - Componentes UI personalizados
- **Framer Motion** - Animaciones fluidas
- **Cloudflare Images** - Sistema de gestión de imágenes
- **TypeScript** - Tipado estático
- **Poppins e Inter** - Fuentes web optimizadas

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de vista previa de producción
npm run start
```

## 🧰 Estructura del proyecto

```
gard-security/
├── app/                   # Aplicación Next.js
│   ├── servicios/         # Sección de servicios
│   ├── fonts.ts           # Configuración de fuentes
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── providers.tsx      # Proveedores de React
│   ├── sitemap.ts         # Generador de sitemap
│   └── theme.ts           # Configuración de temas
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades y funciones
│   └── images.ts          # Configuración de Cloudflare Images
├── public/                # Archivos estáticos
│   └── robots.txt         # Reglas para motores de búsqueda
└── ...                    # Archivos de configuración
```

## 🎨 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Tema Claro/Oscuro**: Cambio de tema con persistencia
- **SEO Optimizado**: Metadatos, OpenGraph, Twitter Cards
- **Rendimiento AAA**: Optimización de imágenes y componentes
- **Accesibilidad**: Cumple con WCAG AA
- **Animaciones Suaves**: Transiciones y efectos sutiles
- **100% Estático**: Generación estática completa (SSG)

## 📝 Guía de desarrollo

1. Mantener la estructura existente de clases `gard-*`
2. No usar componentes innecesarios de shadcn/ui
3. Seguir convenciones de TypeScript
4. Todas las imágenes deben pasar por Cloudflare Images
5. Mantener el diseño consistente (paleta, espaciado)
6. Validar accesibilidad (contraste, `alt`, roles ARIA)

## 📚 Documentación

Para más información sobre las tecnologías utilizadas:

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)

## 📄 Licencia

Todos los derechos reservados © Gard Security 