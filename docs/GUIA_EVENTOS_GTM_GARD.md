# Estrategia de Eventos para Google Tag Manager - Gard Security

## 📊 Introducción

Este documento detalla la estrategia de implementación de eventos a través de Google Tag Manager (GTM) para el sitio web de Gard Security. La estrategia está diseñada para capturar interacciones críticas de usuarios B2B, optimizar la medición de conversiones y proporcionar insights valiosos sobre el comportamiento de los usuarios.

## 🏗️ Estructura de Eventos

### Convención de Nomenclatura

Para mantener consistencia, todos los eventos deben seguir la siguiente estructura:

```
[acción]_[elemento]_[detalles opcionales]
```

Ejemplos:
- `click_cta_cotizar`
- `submit_form_contacto`
- `view_servicio_guardias`

## 🎯 Categorías de Eventos

### 1. Navegación y Vistas de Página

| Evento | Descripción | Parámetros |
|--------|-------------|------------|
| `page_view` | Vista de página (automático con GTM) | `page_title`, `page_location`, `page_path` |
| `view_categoria_servicio` | Usuario visita categoría de servicio | `service_category` |
| `view_categoria_industria` | Usuario visita categoría de industria | `industry_category` |

### 2. Eventos de Engagement

| Evento | Descripción | Parámetros |
|--------|-------------|------------|
| `scroll_depth` | Profundidad de desplazamiento | `percent` (25, 50, 75, 90) |
| `time_on_page` | Tiempo en la página | `duration_seconds` |
| `click_testimonial` | Clic en testimonial | `testimonial_id`, `testimonial_source` |
| `video_start` | Inicio de reproducción de video | `video_title`, `video_duration` |
| `video_complete` | Finalización de video | `video_title`, `video_duration` |
| `file_download` | Descarga de archivo | `file_name`, `file_extension`, `file_size` |

### 3. Eventos de Conversión

| Evento | Descripción | Parámetros |
|--------|-------------|------------|
| `click_cta_primary` | Clic en CTA principal | `cta_text`, `cta_location` |
| `click_cta_secondary` | Clic en CTA secundario | `cta_text`, `cta_location` |
| `click_whatsapp` | Clic en botón de WhatsApp | `button_location` |
| `click_phone` | Clic en número de teléfono | `phone_number`, `button_location` |
| `click_email` | Clic en dirección de email | `email_address`, `button_location` |
| `begin_form` | Inicio de llenado de formulario | `form_name`, `form_location` |
| `submit_form_contact` | Envío de formulario de contacto | `form_fields_filled` |
| `submit_form_quotation` | Envío de formulario de cotización | `service_requested`, `form_fields_filled` |

### 4. Eventos Específicos del Sector B2B

| Evento | Descripción | Parámetros |
|--------|-------------|------------|
| `search_internal` | Búsqueda interna en el sitio | `search_term`, `search_results_count` |
| `filter_services` | Filtrado de servicios | `filter_criteria`, `results_count` |
| `calculate_requirements` | Uso de calculadora de necesidades | `input_parameters`, `estimated_service` |
| `view_case_study` | Visualización de caso de éxito | `case_study_id`, `industry` |

## 🛠️ Implementación Técnica

### DataLayer para GTM

En lugares específicos de la aplicación, implementar el siguiente patrón:

```javascript
// Ejemplo para un clic en CTA primario
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'click_cta_primary',
  cta_text: 'Solicitar Cotización',
  cta_location: 'hero_home'
});
```

### Ejemplo de Implementación en Componentes React

```jsx
function PrimaryCta({ text, location }) {
  const handleClick = () => {
    // Registrar evento en dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'click_cta_primary',
      cta_text: text,
      cta_location: location
    });
    
    // Resto de la lógica del botón
  };

  return <button onClick={handleClick}>{text}</button>;
}
```

## 📌 Eventos Prioritarios para Implementación Inicial

Para la primera fase, enfocarse en los siguientes eventos clave:

1. **Conversiones Críticas**:
   - `click_cta_primary` (en todo el sitio)
   - `submit_form_contact`
   - `submit_form_quotation`
   - `click_whatsapp`
   - `click_phone`

2. **Comportamiento de Usuario**:
   - `scroll_depth`
   - `view_categoria_servicio`
   - `view_categoria_industria`

3. **Engagement de Contenido**:
   - `view_case_study`
   - `file_download`

## 🔄 Verificación y Pruebas

Antes de implementar en producción:

1. Activar el **modo de vista previa** en GTM
2. Verificar que todos los eventos se disparen correctamente utilizando el panel de vista previa
3. Validar que los datos se registren correctamente en Google Analytics 4
4. Comprobar que no haya impacto negativo en el rendimiento del sitio (Core Web Vitals)

## 🔒 Consideraciones de Privacidad

- Implementar banner de consentimiento de cookies que respete GDPR/LGPD
- No capturar información personalmente identificable (PII) en los eventos
- Respetar las preferencias de opt-out del usuario
- Asegurar que el GA4 esté configurado para anonimizar IPs

## 📈 Seguimiento y Reportes

### Informes Recomendados en Google Analytics 4

1. **Embudos de Conversión**:
   - Página de inicio → Vista de servicios → Formulario → Envío
   - Página de industria → Caso de éxito → CTA → Formulario

2. **Análisis de Engagement**:
   - Promedio de tiempo en página por sección
   - Profundidad de desplazamiento por tipo de página
   - Tasa de visualización de testimoniales

3. **Análisis de Contenido**:
   - Páginas más visitadas por industria
   - Casos de éxito más efectivos (tasa de conversión)
   - Blogs con mayor engagement

## 🚀 Plan de Implementación Incremental

### Fase 1: Básico (Semana 1-2)
- Instalar GTM
- Implementar eventos de conversión críticos
- Configurar vistas de página básicas

### Fase 2: Engagement (Semana 3-4)
- Implementar eventos de scroll
- Añadir tracking de testimoniales y casos de éxito
- Configurar eventos de tiempo en página

### Fase 3: Avanzado (Semana 5-6)
- Implementar cálculo de ROI en embudos
- Configurar seguimiento de interacciones específicas B2B
- Integrar eventos personalizados para industrias específicas 