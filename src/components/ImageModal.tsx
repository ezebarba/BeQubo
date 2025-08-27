import React, { useEffect } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSwipeable } from 'react-swipeable'

interface ImageModalProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
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
  })

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const current = images?.[currentIndex]

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      {...handlers}
      role="dialog"
      aria-modal="true"
      aria-label="Galería de imágenes"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white text-3xl z-10"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Cerrar"
      >
        <FaTimes />
      </button>

      {images && images.length > 1 && (
        <button
          className="absolute left-4 text-white text-3xl z-10"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Anterior"
        >
          <FaChevronLeft />
        </button>
      )}

      {current && (
        <img
          src={current}
          alt="Obra"
          className="max-w-full max-h-screen object-contain transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {images && images.length > 1 && (
        <button
          className="absolute right-4 text-white text-3xl z-10"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Siguiente"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  )
}

export default ImageModal
