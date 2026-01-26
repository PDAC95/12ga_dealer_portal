import { FC, useState, useEffect } from 'react';

interface ImageSliderProps {
  images: string[];
  interval?: number;
}

export const ImageSlider: FC<ImageSliderProps> = ({
  images,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
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
          />
        </div>
      ))}
      {/* Overlay oscuro para mejor legibilidad */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Gradiente en la parte inferior para el formulario */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    </div>
  );
};
