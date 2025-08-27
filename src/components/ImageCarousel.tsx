import { useEffect, useState } from 'react'

interface ImageCarouselProps {
  images: string[]
  height?: string // Ej: 'h-80'
}

const ImageCarousel = ({ images, height = 'h-80' }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [images])

  const current = images?.[currentIndex]

  return (
    <div className={`relative w-full overflow-hidden ${height}`}>
      {current ? (
        <img
          src={current}
          alt={`Imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded" />
      )}

      {images && images.length > 1 && (
        <div className="absolute bottom-2 right-2 bg-white/70 text-xs px-2 py-1 rounded">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </div>
  )
}

export default ImageCarousel
