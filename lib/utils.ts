import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Verifica si una URL devuelve un código de estado 200
 * @param url La URL a verificar
 * @returns Un booleano que indica si la URL devuelve 200
 */
export async function isValidUrl(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout
    
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual', // No seguir redirecciones
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Consideramos válidas solo las URLs que devuelven 200 OK
    return response.status === 200;
  } catch (error) {
    // Manejo específico para diferentes tipos de errores
    if (error instanceof TypeError) {
      console.error(`Error de red al verificar URL ${url}: ${error.message}`);
    } else if (error instanceof DOMException && error.name === 'AbortError') {
      console.error(`Timeout al verificar URL ${url}`);
    } else {
      console.error(`Error desconocido al verificar URL ${url}:`, error);
    }
    return false;
  }
} 