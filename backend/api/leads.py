from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
import logging
from backend.services.notion import enviar_a_notion

# Configurar logging
logger = logging.getLogger(__name__)

# Modelos Pydantic para validación de datos
class FormularioCotizacion(BaseModel):
    nombre: str
    apellido: str
    email: EmailStr
    telefono: str
    empresa: str
    direccion: str
    comuna: str
    ciudad: str
    rubro: str
    comentarios: str
    costoTotal: int

class RolCotizacion(BaseModel):
    tipoTurno: str
    horario: str
    puestos: int
    diasSemana: int
    horasDia: int
    sueldoLiquido: int
    costoEstimado: int

class FormularioCotizacionInteligente(BaseModel):
    nombre: str
    apellido: str
    email: EmailStr
    telefono: str
    empresa: str
    direccion: str
    comuna: str
    ciudad: str
    rubro: str
    comentarios: str
    costoTotal: int
    roles: List[RolCotizacion]

class FormularioContacto(BaseModel):
    nombre: str
    email: EmailStr
    telefono: str
    mensaje: str
    origen: Optional[str] = None

# Crear router
router = APIRouter(prefix="/api/formulario", tags=["formularios"])

# Función para generar resumen de roles
def generar_resumen_roles(roles: List[RolCotizacion]) -> str:
    resumen = []
    for rol in roles:
        resumen.append(
            f"👉 *Turno:* {rol.tipoTurno} | *Horario:* {rol.horario} | "
            f"*Puestos:* {rol.puestos} | *Días/Semana:* {rol.diasSemana} | "
            f"*Horas/Día:* {rol.horasDia} | *Sueldo:* ${rol.sueldoLiquido} | "
            f"*Costo:* ${rol.costoEstimado}"
        )
    return "\n".join(resumen)

# Endpoint para formulario de cotización estándar
@router.post("/cotizacion")
async def recibir_cotizacion(formulario: FormularioCotizacion):
    """
    Recibe datos del formulario de cotización estándar y los envía a Notion.
    """
    logger.info(f"Recibido formulario de cotización: {formulario.email}")
    
    # Enviar datos a Notion
    resultado_notion = await enviar_a_notion(formulario.dict(), tipo="cotizacion")
    
    # Verificar resultado
    if resultado_notion.get("error"):
        logger.error(f"Error al enviar a Notion: {resultado_notion.get('mensaje')}")
    else:
        logger.info(f"Datos enviados correctamente a Notion - ID: {resultado_notion.get('notion_id')}")

    return {
        "status": "ok",
        "formulario": "cotizacion",
        "data": formulario.dict(),
        "notion": resultado_notion
    }

# Endpoint para formulario de cotización inteligente
@router.post("/cotizacion-inteligente")
async def recibir_cotizacion_inteligente(formulario: FormularioCotizacionInteligente):
    """
    Recibe datos del formulario de cotización inteligente y los envía a Notion.
    """
    logger.info(f"Recibido formulario de cotización inteligente: {formulario.email}")
    
    # Generar el resumen de roles para la respuesta
    resumen_roles = generar_resumen_roles(formulario.roles)
    logger.info(f"Resumen de roles generado: {resumen_roles}")
    
    # Convertir formulario a diccionario para enviar a Notion
    formulario_dict = formulario.dict()
    
    # Convertir manualmente los objetos de rol a diccionarios para evitar problemas
    formulario_dict["roles"] = [rol.dict() for rol in formulario.roles]
    
    # Añadir explícitamente el resumen de roles al diccionario
    formulario_dict["resumen_roles_texto"] = resumen_roles
    
    logger.info(f"Enviando a Notion con roles procesados manualmente: {len(formulario_dict['roles'])} roles")

    # Enviar datos a Notion
    resultado_notion = await enviar_a_notion(formulario_dict, tipo="cotizacion-inteligente")
    
    # Verificar resultado
    if resultado_notion.get("error"):
        logger.error(f"Error al enviar a Notion: {resultado_notion.get('mensaje')}")
    else:
        logger.info(f"Datos enviados correctamente a Notion - ID: {resultado_notion.get('notion_id')}")

    return {
        "status": "ok",
        "formulario": "cotizacion-inteligente",
        "data": formulario.dict(),
        "resumen_roles": resumen_roles,
        "notion": resultado_notion
    }

# Endpoint para formulario de contacto
@router.post("/contacto")
async def recibir_contacto(formulario: FormularioContacto):
    """
    Recibe datos del formulario de contacto general y los envía a Notion.
    """
    logger.info(f"Recibido formulario de contacto: {formulario.email}")
    
    # Enviar datos a Notion
    resultado_notion = await enviar_a_notion(formulario.dict(), tipo="contacto")
    
    # Verificar resultado
    if resultado_notion.get("error"):
        logger.error(f"Error al enviar a Notion: {resultado_notion.get('mensaje')}")
    else:
        logger.info(f"Datos enviados correctamente a Notion - ID: {resultado_notion.get('notion_id')}")

    return {
        "status": "ok",
        "formulario": "contacto",
        "data": formulario.dict(),
        "notion": resultado_notion
    }