import os
import httpx
import logging
from datetime import datetime
from typing import Dict, Any, Optional, List

# Configurar logging
logger = logging.getLogger(__name__)

# Función para generar resumen de roles para Notion
def generar_resumen_roles(roles: List[Dict[str, Any]]) -> str:
    """Genera un resumen de roles en formato markdown."""
    resumen = []
    for rol in roles:
        resumen.append(
            f"👉 *Turno:* {rol.get('tipoTurno', '')} | *Horario:* {rol.get('horario', '')} | "
            f"*Puestos:* {rol.get('puestos', 0)} | *Días/Semana:* {rol.get('diasSemana', 0)} | "
            f"*Horas/Día:* {rol.get('horasDia', 0)} | *Sueldo:* ${rol.get('sueldoLiquido', 0)} | "
            f"*Costo:* ${rol.get('costoEstimado', 0)}"
        )
    return "\n".join(resumen)

async def enviar_a_notion(formulario: Dict[str, Any], tipo: str) -> Dict[str, Any]:
    """
    Envía los datos del formulario a una base de datos de Notion.
    
    Args:
        formulario: Diccionario con los datos del formulario
        tipo: Tipo de formulario ("cotizacion", "cotizacion-inteligente" o "contacto")
        
    Returns:
        Diccionario con la respuesta de la API de Notion o información de error
    """
    # Obtener credenciales de variables de entorno
    api_key = os.environ.get("NOTION_API_KEY")
    database_id = os.environ.get("NOTION_DATABASE_ID")
    
    logger.info(f"Iniciando envío a Notion - Tipo: {tipo}")
    
    # Validación básica
    if not api_key or not database_id:
        error_msg = "Configuración incompleta: falta NOTION_API_KEY o NOTION_DATABASE_ID"
        logger.error(error_msg)
        return {
            "error": True,
            "mensaje": error_msg
        }
    
    if not isinstance(formulario, dict) or not tipo:
        error_msg = "Datos de formulario inválidos o tipo no especificado"
        logger.error(error_msg)
        return {
            "error": True,
            "mensaje": error_msg
        }
    
    # Preparar datos para enviar a Notion
    try:
        # Formatear datos según el tipo de formulario
        nombre_completo = f"{formulario.get('nombre', '')} {formulario.get('apellido', '')}"
        email = formulario.get("email", "")
        telefono = formulario.get("telefono", "")
        mensaje = formulario.get("mensaje", formulario.get("comentarios", ""))
        costo_total = formulario.get("costoTotal", 0)
        
        # Procesar resumen de roles para cotización inteligente
        resumen_roles = None
        if tipo == "cotizacion-inteligente":
            # Primero buscar el resumen precalculado
            if "resumen_roles_texto" in formulario and formulario["resumen_roles_texto"]:
                resumen_roles = formulario["resumen_roles_texto"]
                logger.info(f"Encontrado resumen de roles precalculado: {len(resumen_roles)} caracteres")
            # Si no hay resumen precalculado, intentar generarlo
            elif "roles" in formulario and formulario["roles"]:
                try:
                    roles_data = formulario["roles"]
                    resumen_roles = generar_resumen_roles(roles_data)
                    logger.info(f"Generado resumen de roles: {len(resumen_roles)} caracteres")
                except Exception as e:
                    logger.error(f"Error al generar resumen de roles: {str(e)}")
        
        # Si tenemos resumen de roles, agregarlo al mensaje
        if resumen_roles:
            if mensaje:
                mensaje = f"{mensaje}\n\n--- RESUMEN DE ROLES ---\n{resumen_roles}"
            else:
                mensaje = f"--- RESUMEN DE ROLES ---\n{resumen_roles}"
            logger.info("Resumen de roles agregado al mensaje")
        
        # Crear payload para Notion API
        payload = {
            "parent": {"database_id": database_id},
            "properties": {
                "Nombre": {
                    "title": [
                        {
                            "text": {
                                "content": nombre_completo
                            }
                        }
                    ]
                },
                "Email": {
                    "email": email
                },
                "Teléfono": {
                    "phone_number": telefono
                },
                "Tipo de Formulario": {
                    "select": {
                        "name": tipo
                    }
                },
                "Fecha": {
                    "date": {
                        "start": datetime.utcnow().isoformat()
                    }
                }
            }
        }
        
        # Agregar mensaje si existe
        if mensaje:
            payload["properties"]["Mensaje"] = {
                "rich_text": [
                    {
                        "text": {
                            "content": mensaje[:2000] if len(mensaje) > 2000 else mensaje
                        }
                    }
                ]
            }
        
        # Agregar costo total si existe
        if costo_total and costo_total > 0:
            payload["properties"]["Costo Total"] = {
                "number": costo_total
            }
        
        # Agregar empresa si existe
        if "empresa" in formulario:
            payload["properties"]["Empresa"] = {
                "rich_text": [
                    {
                        "text": {
                            "content": formulario.get("empresa", "")
                        }
                    }
                ]
            }
            
        # Intentar también agregar el resumen de roles como propiedad separada si existe
        if resumen_roles:
            try:
                payload["properties"]["Resumen de Roles"] = {
                    "rich_text": [
                        {
                            "text": {
                                "content": resumen_roles[:2000] if len(resumen_roles) > 2000 else resumen_roles
                            }
                        }
                    ]
                }
                logger.info("Agregado resumen de roles como propiedad separada")
            except Exception as e:
                logger.warning(f"No se pudo agregar la propiedad Resumen de Roles: {str(e)}")
        
        logger.info(f"Enviando datos a Notion API - Payload: {payload}")
        
        # Hacer la solicitud a la API de Notion
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
        }
        
        async with httpx.AsyncClient() as client:
            logger.info("Iniciando solicitud HTTP a Notion API...")
            response = await client.post(
                "https://api.notion.com/v1/pages",
                json=payload,
                headers=headers,
                timeout=30.0  # Agregar timeout explícito
            )
            
            status_code = response.status_code
            logger.info(f"Respuesta de Notion API - Status Code: {status_code}")
            
            # Verificar respuesta
            if status_code == 200 or status_code == 201:  # Notion puede devolver 201 para creación exitosa
                response_data = response.json()
                logger.info(f"Éxito al enviar datos a Notion - ID: {response_data.get('id', '')}")
                return {
                    "error": False,
                    "notion_id": response_data.get("id", ""),
                    "mensaje": "Datos enviados correctamente a Notion"
                }
            else:
                error_msg = f"Error al enviar datos a Notion: Status {status_code} - {response.text}"
                logger.error(error_msg)
                return {
                    "error": True,
                    "status_code": status_code,
                    "mensaje": error_msg,
                    "response": response.text
                }
                
    except Exception as e:
        error_msg = f"Error al procesar solicitud: {str(e)}"
        logger.exception(error_msg)
        return {
            "error": True,
            "mensaje": error_msg
        } 