// src/pages/ProyectoDetalle.tsx
import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import proyectos from '../resources/proyectos.json'
import { FaChevronLeft, FaChevronRight, FaChevronLeft as FaArrowBack } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../components/ui/carousel'
import { motion, useReducedMotion } from 'framer-motion'

type Caracteristica = { icono: string; descripcion: string }
type Proyecto = {
  slug: string
  nombre: string
  direccion: string
  imagenes: string[]
  caracteristicas: Caracteristica[]
  mapEmbedUrl: string
}

/** Línea verde que se expande desde el centro cuando entra en vista */
function AnimatedDivider() {
  const prefersReduced = useReducedMotion()
  const variants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  }
  return (
    <motion.hr
      className="my-10 h-0.5 w-full bg-verde border-0 rounded origin-center"
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.5, margin: '-80px' }}
      variants={variants}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '50% 50%' }}
    />
  )
}

export default function ProyectoDetalle() {
  const { slug } = useParams<{ slug: string }>()
  const proyecto = (proyectos as Proyecto[]).find((p) => p.slug === slug)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = useCallback(() => {
    if (!proyecto) return
    setCurrentIndex((prev) => (prev + 1) % proyecto.imagenes.length)
  }, [proyecto])

  const goToPrev = useCallback(() => {
    if (!proyecto) return
    setCurrentIndex((prev) => (prev === 0 ? proyecto.imagenes.length - 1 : prev - 1))
  }, [proyecto])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, goToNext, goToPrev])

  useEffect(() => {
    if (!isModalOpen) return
    let startX = 0
    let endX = 0
    const onTouchStart = (e: TouchEvent) => { startX = e.changedTouches[0].clientX }
    const onTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX
      const diff = startX - endX
      if (diff > 50) goToNext()
      if (diff < -50) goToPrev()
    }
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isModalOpen, goToNext, goToPrev])

  if (!proyecto) return <div className="p-8 text-center">Proyecto no encontrado.</div>

  const heroImg = proyecto.imagenes?.[0] || '/images/proyectos_hero.png'
  const ogImage = heroImg

  return (
    <main className="bg-[#f2f2f2] text-gray-800 min-h-screen">
      <Seo
        title={proyecto.nombre}
        description={`${proyecto.nombre} – ${proyecto.direccion}`}
        canonical={`https://www.bequbo.com.ar/proyecto/${proyecto.slug}`}
        image={ogImage}
      />

      {/* Hero */}
      <section className="relative w-full h-[44vh] md:h-[54vh] overflow-hidden">
        <img
          src={heroImg}
          alt={`Hero de ${proyecto.nombre}`}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-verde" />
        <div className="absolute bottom-8 left-6 md:left-10 text-crudo">
          <h1 className="text-3xl md:text-5xl font-semibold drop-shadow">{proyecto.nombre}</h1>
          <p className="opacity-90 mt-1">{proyecto.direccion}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <Link to="/proyectos" className="inline-flex items-center text-lila hover:underline mb-6">
          <FaArrowBack className="mr-2" /> Volver a Proyectos
        </Link>

        {/* Galería */}
        <Carousel className="relative mb-0">
          <CarouselContent>
            {proyecto.imagenes.map((src, idx) => (
              <CarouselItem key={idx} className="basis-full">
                <img
                  src={src}
                  alt={`${proyecto.nombre} imagen ${idx + 1}`}
                  className="w-full h-[800px] max-h-[80vh] object-cover object-bottom cursor-pointer rounded-lg"
                  onClick={() => { setCurrentIndex(idx); setIsModalOpen(true) }}
                  loading="lazy"
                  decoding="async"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {proyecto.imagenes.length > 1 && (
            <>
              <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
              <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
            </>
          )}
        </Carousel>

        {/* separador animado a todo el ancho */}
        <AnimatedDivider />

        {/* Características: tarjeta con borde lila */}
        {proyecto.caracteristicas?.length > 0 && (
          <>
            <div className="bg-white/90 border-l-4 border-lila rounded-r-xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Características</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {proyecto.caracteristicas.map((c, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    {c.icono && (
                      <img
                        src={c.icono}
                        alt={c.descripcion}
                        className="h-12 mb-2"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <p className="text-sm">{c.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* separador animado a todo el ancho */}
            <AnimatedDivider />
          </>
        )}

        {/* Ubicación: también en tarjeta con borde lila */}
        {proyecto.mapEmbedUrl && (
          <div className="bg-white/90 border-l-4 border-lila rounded-r-xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">Ubicación</h2>
            <div className="rounded overflow-hidden shadow ring-1 ring-zinc-200">
              <iframe
                src={proyecto.mapEmbedUrl}
                width="100%"
                height="350"
                allowFullScreen
                loading="lazy"
                className="block"
                style={{ border: 0 }}
                title={`Mapa de ${proyecto.nombre}`}
              />
            </div>
          </div>
        )}
      </section>

      {/* Modal de imágenes */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl"
            aria-label="Cerrar"
          >
            <IoMdClose />
          </button>

          {proyecto.imagenes.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev() }}
              className="absolute left-4 text-white text-3xl p-2 bg-black/40 hover:bg-black/60 rounded-full"
              aria-label="Anterior"
            >
              <FaChevronLeft />
            </button>
          )}

          <img
            src={proyecto.imagenes[currentIndex]}
            alt={`${proyecto.nombre} imagen ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {proyecto.imagenes.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext() }}
              className="absolute right-4 text-white text-3xl p-2 bg-black/40 hover:bg-black/60 rounded-full"
              aria-label="Siguiente"
            >
              <FaChevronRight />
            </button>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
            {currentIndex + 1} / {proyecto.imagenes.length}
          </div>
        </div>
      )}
    </main>
  )
}
