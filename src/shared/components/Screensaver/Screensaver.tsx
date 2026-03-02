import { FC, useState, useEffect, useCallback } from 'react';
import { useIdleTimer } from '../../hooks/useIdleTimer';
import { apiClient } from '../../../lib/axios';

const CLOUDINARY_BASE =
  'https://res.cloudinary.com/dzwmrurhg/image/upload/w_1920,h_1080,c_fill,f_auto,q_auto';

const LOGO_URL =
  'https://res.cloudinary.com/dzwmrurhg/image/upload/v1767629522/12-Ga-no-V-Logo_axzh7o.png';

const FALLBACK_IMAGES = [
  `${CLOUDINARY_BASE}/twelve-ga-customs/trucks/peterbilt-389-dave-gillis-main`,
  `${CLOUDINARY_BASE}/twelve-ga-customs/trucks/wes-riley-main`,
  `${CLOUDINARY_BASE}/twelve-ga-customs/trucks/davis-pete-main`,
];

interface Truck {
  _id: string;
  image: string;
  title: string;
}

interface ScreensaverProps {
  timeout?: number; // tiempo en segundos
  enabled?: boolean;
  imageInterval?: number; // intervalo entre imágenes en ms
}

export const Screensaver: FC<ScreensaverProps> = ({
  timeout = 60,
  enabled = true,
  imageInterval = 6000,
}) => {
  const [images, setImages] = useState<string[]>(FALLBACK_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Cargar imágenes de featured trucks
  const loadFeaturedTrucks = useCallback(async () => {
    if (imagesLoaded) return;

    try {
      const response = await apiClient.get('/api/trucks', {
        params: { featured: true, limit: 10 },
      });

      if (response.data.success && response.data.data.length > 0) {
        const truckImages = response.data.data.map((truck: Truck) => {
          const imagePath = truck.image.startsWith('http')
            ? truck.image
            : `${CLOUDINARY_BASE}/${truck.image}`;
          return imagePath;
        });
        setImages(truckImages);
      }
      setImagesLoaded(true);
    } catch (error) {
      console.error('Error loading featured trucks for screensaver:', error);
      setImagesLoaded(true);
    }
  }, [imagesLoaded]);

  // Hook de inactividad
  const { isIdle } = useIdleTimer({
    timeout: timeout * 1000,
    enabled,
    onIdle: () => {
      loadFeaturedTrucks();
      setIsVisible(true);
    },
    onActive: () => {
      setIsVisible(false);
    },
  });

  // Rotación de imágenes
  useEffect(() => {
    if (!isVisible || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, imageInterval);

    return () => clearInterval(timer);
  }, [isVisible, images.length, imageInterval]);

  // Cerrar con cualquier interacción mientras está visible
  const handleDismiss = useCallback(() => {
    if (isVisible) {
      setIsVisible(false);
    }
  }, [isVisible]);

  // No renderizar si no está visible
  if (!isVisible || !isIdle) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black cursor-pointer"
      onClick={handleDismiss}
      onMouseMove={handleDismiss}
      onKeyDown={handleDismiss}
      onTouchStart={handleDismiss}
      tabIndex={0}
    >
      {/* Imágenes del carrusel */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Logo */}
      <div className="absolute bottom-8 left-8">
        <img
          src={LOGO_URL}
          alt="12GA Customs"
          className="h-12 opacity-60"
        />
      </div>

      {/* Indicadores de imagen */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white/80 w-4' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Hint to dismiss */}
      <div className="absolute top-8 right-8 text-white/40 text-xs">
        Move to continue
      </div>
    </div>
  );
};
