import React, { useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onNext(),
    onSwipedRight: () => onPrev(),
    trackMouse: true,
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      {...handlers}
    >
      <button
        className="absolute top-4 right-4 text-white text-3xl z-10"
        onClick={onClose}
      >
        <FaTimes />
      </button>
      <button
        className="absolute left-4 text-white text-3xl z-10"
        onClick={onPrev}
      >
        <FaChevronLeft />
      </button>
      <img
        src={images[currentIndex]}
        alt="Obra"
        className="max-w-full max-h-screen object-contain transition-all duration-300"
      />
      <button
        className="absolute right-4 text-white text-3xl z-10"
        onClick={onNext}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ImageModal;
