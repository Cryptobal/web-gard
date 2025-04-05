# Backend API de Gard Security

Backend desarrollado en FastAPI para manejar los formularios del sitio web de Gard Security.

## Instalación

1. Crear un entorno virtual:
```bash
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate
```

2. Instalar dependencias:
```bash
pip install -r requirements.txt
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la carpeta `backend` con el siguiente contenido:
```
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

## Ejecución

```bash
uvicorn backend.main:app --reload --port 8080
```

## Endpoints disponibles

### Formularios

- **POST** `/api/formulario/cotizacion`: Recibe formularios de cotización estándar
- **POST** `/api/formulario/cotizacion-inteligente`: Recibe formularios de cotización inteligente con roles
- **POST** `/api/formulario/contacto`: Recibe formularios de contacto general

### Utilidades

- **GET** `/health`: Endpoint de verificación de salud del servidor

## Integración con Notion

El backend envía automáticamente los datos de los formularios a una base de datos de Notion utilizando la API oficial. Los datos se guardan con los siguientes campos:

- Nombre completo
- Email
- Teléfono
- Tipo de formulario
- Mensaje o comentarios
- Costo total (si aplica)
- Resumen de roles (si aplica)
- Fecha de envío 