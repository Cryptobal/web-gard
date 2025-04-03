#!/usr/bin/env node

/**
 * Script para actualizar enlaces antiguos en archivos Markdown del blog
 * 
 * Reemplaza URLs antiguas por las nuevas rutas canónicas de la aplicación
 * También añade el atributo rel="noopener noreferrer" a enlaces externos
 */

const fs = require('fs');
const path = require('path');

// Directorio donde se encuentran los posts del blog
const BLOG_DIR = path.join(process.cwd(), 'docs/blog_posts');

// Mapeo de URLs antiguas a nuevas rutas canónicas
const URL_MAPPINGS = [
  // Guardias de seguridad - URLs absolutas y relativas
  {
    old: [
      'https://gard.cl/guardias-de-seguridad-privada-para-empresas/', 
      'https://gard.cl/guardias-de-seguridad-privada-para-empresas', 
      'https://gard.cl/guardias', 
      'https://gard.cl/guardia',
      '/guardias-de-seguridad-privada-para-empresas/'
    ],
    new: '/servicios/guardias-de-seguridad'
  },
  // Seguridad electrónica - URLs absolutas y relativas
  {
    old: [
      'https://gard.cl/seguridad-electronica/', 
      'https://gard.cl/seguridad-electronica', 
      'https://gard.cl/seguridad-electronica/#',
      '/seguridad-electronica/',
      '/seguridad-electronica#'
    ],
    new: '/servicios/seguridad-electronica'
  },
  // Drones de seguridad - URLs absolutas y relativas
  {
    old: [
      'https://gard.cl/drones-de-seguridad-para-empresas-e-industrias/', 
      'https://gard.cl/drones-de-seguridad-para-empresas-e-industrias', 
      'https://gard.cl/drones',
      'https://gard.cl/drones-de-seguridad',
      '/drones-de-seguridad-para-empresas-e-industrias/'
    ],
    new: '/servicios/drones-seguridad'
  },
  // Central de monitoreo - URLs absolutas y relativas
  {
    old: [
      'https://gard.cl/central-de-monitoreo/', 
      'https://gard.cl/central-de-monitoreo', 
      'https://gard.cl/monitoreo',
      '/central-de-monitoreo/'
    ],
    new: '/servicios/monitoreo'
  }
];

// Procesar todos los archivos Markdown
function processMarkdownFiles() {
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
  let totalUpdates = 0;
  
  console.log(`Procesando ${files.length} archivos de blog...`);
  
  files.forEach(file => {
    const filePath = path.join(BLOG_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let updates = 0;
    
    // Recorrer cada mapeo de URL para reemplazar
    URL_MAPPINGS.forEach(mapping => {
      mapping.old.forEach(oldUrl => {
        // Escapar caracteres especiales en la URL para su uso en regex
        const escapedUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Buscar la URL en diferentes contextos (href, texto plano, etc.)
        const regexPatterns = [
          // En atributos href HTML
          new RegExp(`href=["']${escapedUrl}["']`, 'gi'),
          // En enlaces markdown
          new RegExp(`\\]\\(${escapedUrl}\\)`, 'gi')
        ];
        
        regexPatterns.forEach(regex => {
          const matches = content.match(regex);
          if (matches) {
            updates += matches.length;
            if (regex.toString().includes('href=')) {
              // Reemplazar en atributos href HTML
              content = content.replace(regex, `href="${mapping.new}"`);
            } else if (regex.toString().includes('\\]\\(')) {
              // Reemplazar en enlaces markdown
              content = content.replace(regex, `](${mapping.new})`);
            }
          }
        });
      });
    });
    
    // Correcciones especiales para URLs que ya tienen formato /servicios/ pero con problemas
    
    // 1. Corregir href="/servicios/seguridad-electronica#" y variantes
    const electronicaFixes = [
      { pattern: /href="\/servicios\/seguridad-electronica#"/gi, replacement: 'href="/servicios/seguridad-electronica"' },
      { pattern: /href='\/servicios\/seguridad-electronica#'/gi, replacement: 'href=\'/servicios/seguridad-electronica\'' }
    ];
    
    electronicaFixes.forEach(fix => {
      const matches = content.match(fix.pattern);
      if (matches) {
        updates += matches.length;
        content = content.replace(fix.pattern, fix.replacement);
      }
    });
    
    // 2. Corregir otras URLs con fragmentos innecesarios o problemas similares
    const otherUrlFixes = [
      { pattern: /href="\/servicios\/monitoreo#"/gi, replacement: 'href="/servicios/monitoreo"' },
      { pattern: /href="\/servicios\/guardias-de-seguridad#"/gi, replacement: 'href="/servicios/guardias-de-seguridad"' },
      { pattern: /href="\/servicios\/drones-seguridad#"/gi, replacement: 'href="/servicios/drones-seguridad"' }
    ];
    
    otherUrlFixes.forEach(fix => {
      const matches = content.match(fix.pattern);
      if (matches) {
        updates += matches.length;
        content = content.replace(fix.pattern, fix.replacement);
      }
    });
    
    // Añadir rel="noopener noreferrer" a enlaces externos (excepto gard.cl)
    content = content.replace(
      /<a([^>]*?)href=["'](https?:\/\/(?!gard\.cl)[^"']+)["']([^>]*?)>/g,
      (match, beforeHref, url, afterHref) => {
        // Verificar si ya tiene atributo rel
        if (match.includes('rel=')) return match;
        return `<a${beforeHref}href="${url}"${afterHref} rel="noopener noreferrer">`;
      }
    );
    
    // Guardar el archivo si hubo cambios
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${file}: ${updates} enlaces actualizados`);
      totalUpdates += updates;
    }
  });
  
  console.log(`\nActualización completada: ${totalUpdates} enlaces actualizados en total.`);
}

// Ejecutar el script
processMarkdownFiles(); 