import { useEffect, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  height?: string; // Ej: 'h-80'
}

const ImageCarousel = ({ images, height = "h-80" }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`relative w-full overflow-hidden ${height}`}>
      <img
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded"
      />
      {images.length > 1 && (
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-60 text-xs px-2 py-1 rounded">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
