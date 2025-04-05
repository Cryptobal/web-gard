"""
API principal de Gard Security.

Este módulo configura la aplicación FastAPI principal, carga variables de entorno
y registra todos los routers disponibles.
"""
import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cargar variables de entorno
load_dotenv("backend/.env")

# Verificar que las variables críticas están cargadas
api_key = os.environ.get("NOTION_API_KEY")
database_id = os.environ.get("NOTION_DATABASE_ID")
logger.info(f"NOTION_API_KEY cargada: {bool(api_key)}")
logger.info(f"NOTION_DATABASE_ID cargada: {bool(database_id)}")

# Importar routers
from backend.api.leads import router as leads_router

# Crear la aplicación FastAPI
app = FastAPI(
    title="Gard Security API",
    description="API para formularios y servicios de Gard Security",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, restringe a dominios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar routers
app.include_router(leads_router)

# Endpoint de salud
@app.get("/health")
async def health():
    """
    Endpoint para verificar que el servidor está funcionando correctamente.
    
    Returns:
        dict: Estado del servidor
    """
    return {"status": "ok"}

# Para ejecutar en desarrollo
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=int(os.environ.get("PORT", 8080)), 
        reload=True
    ) 