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
  sizes = '100vw',
  quality = 90,
  objectFit = 'cover',
  objectPosition = 'center',
}: CloudflareImageProps) {
  const imageUrl = getCloudflareImageUrl(imageId, variant);
  
  const imageProps = {
    src: imageUrl,
    alt,
    className: `${className} ${fill ? 'object-' + objectFit + ' object-' + objectPosition.replace(' ', '-') : ''}`,
    priority,
    quality,
    sizes,
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