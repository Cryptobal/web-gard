// Definición de IDs de imágenes en Cloudflare
export const cloudflareImages = {
  // Logos e identidad
  logo: {
    default: '7661cf51-c66b-4419-9229-e6e50f76ff00',
    white: '24172844-496d-4cd1-4ef0-894b5574e700',
    icon: '89a214ef-5112-4c4e-912e-4f56514c1600',
  },
  
  // Imágenes para el Hero
  hero: {
    home: '4824f8b9-abb0-4e77-c654-efe920697b00',
    about: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00',
    services: '5eea1064-8a2d-4e8b-5606-d28775467a00',
    contact: '428c1028-8f6b-455a-e110-38421eeb5700',
    reclutamiento: '4a46b63d-0e1b-4640-b95c-7f040a288c00',
  },
  
  // Imágenes para secciones
  sections: {
    about: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00',
    services: '5eea1064-8a2d-4e8b-5606-d28775467a00',
    technologies: '678cad4f-9b0d-49e6-3bbd-0d747a2fdc00',
    team: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00',
  },
  
  // Iconos de servicios y características
  icons: {
    security: '8bc35c05-93da-4a2a-f46e-a926bd422d00',
    shield: '8bc35c05-93da-4a2a-f46e-a926bd422d00',
    lock: '7db0cea1-4eab-4c2d-65a8-6bdd50918800',
    monitoring: '4a167a19-1ef9-430d-ec5e-ffbbc3c35300',
    alert: '5c97d40c-bf3c-4413-6ead-c15f7c9aa100',
    support: '5c97d40c-bf3c-4413-6ead-c15f7c9aa100',
  },
  
  // Equipo
  team: {
    ceo: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00',
    cto: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00',
    security: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00',
    support: '7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00',
  },
  
  // Clientes y marcas
  clients: {
    client1: 'eeaf472c-ab11-448b-f5e2-d18415147800',
    client2: 'bee9d371-805c-4029-59f6-93cdfd916000',
    client3: '7db0cea1-4eab-4c2d-65a8-6bdd50918800',
    client4: '732f1a26-ecdd-4dbd-cae3-f62b3f212700',
    client5: '068a0aaa-47f0-428c-bdf0-b8f7f780cb00',
  },
};

// ID de la cuenta de Cloudflare Images
export const CLOUDFLARE_ACCOUNT_HASH = 'gGw8cfmEZedi85dYm6qcFw';

// Helper para construir la URL de Cloudflare Images
export const getCloudflareImageUrl = (
  imageId: string,
  variant: string = 'public'
): string => {
  return `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${imageId}/${variant}`;
}; 