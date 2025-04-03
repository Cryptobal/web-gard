import Image from 'next/image';
import { getCloudflareImageUrl } from '@/lib/images';

interface CloudflareImageProps {
  imageId: string;
  alt: string;
  width?: number;
  height?: number;
  variant?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  objectPosition?: string;
  imageType?: 'hero' | 'card' | 'thumbnail' | 'banner' | 'gallery' | 'avatar';
}

export default function CloudflareImage({
  imageId,
  alt,
  width,
  height,
  variant = 'public',
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality = 90,
  objectFit = 'cover',
  objectPosition = 'center',
  imageType,
}: CloudflareImageProps) {
  const imageUrl = getCloudflareImageUrl(imageId, variant);
  
  // Configuración de tamaños responsivos según el tipo de imagen
  const getSizes = () => {
    if (sizes) return sizes;
    
    switch(imageType) {
      case 'hero':
        return '100vw';
      case 'card':
        return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
      case 'banner':
        return '(max-width: 768px) 100vw, 1200px';
      case 'gallery':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
      case 'thumbnail':
        return '(max-width: 640px) 150px, 300px';
      case 'avatar':
        return '120px';
      default:
        return '100vw';
    }
  };
  
  const imageProps = {
    src: imageUrl,
    alt: alt || 'Imagen de Gard Security', // Proporcionar alt por defecto si no se proporciona
    className: `${className} ${fill ? 'object-' + objectFit + ' object-' + objectPosition.replace(' ', '-') : ''}`,
    priority,
    quality,
    sizes: getSizes(),
    loading: priority ? undefined : 'lazy' as const, // Usar 'as const' para que TypeScript reconozca el literal correcto
  };

  return fill ? (
    <div className="relative w-full h-full">
      <Image
        {...imageProps}
        fill={true}
      />
    </div>
  ) : (
    <Image
      {...imageProps}
      width={width}
      height={height}
    />
  );
} 