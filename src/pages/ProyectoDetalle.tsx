import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import proyectos from "../resources/proyectos.json";
import { FaChevronLeft, FaChevronRight, FaChevronLeft as FaArrowBack } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

type Caracteristica = {
  icono: string;
  descripcion: string;
};

type Proyecto = {
  slug: string;
  nombre: string;
  direccion: string;
  imagenes: string[];
  caracteristicas: Caracteristica[];
  mapEmbedUrl: string;
};

const ProyectoDetalle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const proyecto = (proyectos as Proyecto[]).find((p) => p.slug === slug);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navegación dentro del modal
  const goToNext = useCallback(() => {
    if (!proyecto) return;
    setCurrentIndex((prev) => (prev + 1) % proyecto.imagenes.length);
  }, [proyecto]);

  const goToPrev = useCallback(() => {
    if (!proyecto) return;
    setCurrentIndex((prev) =>
      prev === 0 ? proyecto.imagenes.length - 1 : prev - 1
    );
  }, [proyecto]);

  // Teclado en modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, goToNext, goToPrev]);

  // Swipe en modal (touch)
  useEffect(() => {
    if (!isModalOpen) return;
    let startX = 0;
    let endX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.changedTouches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (diff > 50) goToNext();
      if (diff < -50) goToPrev();
    };

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isModalOpen, goToNext, goToPrev]);

  if (!proyecto) {
    return <div className="p-8 text-center">Proyecto no encontrado.</div>;
  }

  return (
    <div className="bg-[#f2f2f2] text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link to="/proyectos" className="flex items-center text-primary mb-4">
          <FaArrowBack className="mr-2" /> Volver a Proyectos
        </Link>

        <h1 className="text-4xl font-primary text-primary mb-4">
          {proyecto.nombre}
        </h1>
        <p className="text-gray-600 mb-8">{proyecto.direccion}</p>

        {/* Carrusel (shadcn/Embla) */}
        <Carousel className="relative mb-8">
          <CarouselContent>
            {proyecto.imagenes.map((src, idx) => (
              <CarouselItem key={idx} className="basis-full">
                <img
                  src={src}
                  alt={`${proyecto.nombre} imagen ${idx + 1}`}
                  className="w-full h-[800px] object-cover object-bottom cursor-pointer rounded-lg"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsModalOpen(true);
                  }}
                  loading="lazy"
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

        {/* Características */}
        {proyecto.caracteristicas?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {proyecto.caracteristicas.map((c, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                {c.icono && (
                  <img src={c.icono} alt={c.descripcion} className="h-12 mb-2" />
                )}
                <p className="text-sm">{c.descripcion}</p>
              </div>
            ))}
          </div>
        )}

        {/* Mapa */}
        {proyecto.mapEmbedUrl && (
          <div className="mb-8">
            <iframe
              src={proyecto.mapEmbedUrl}
              width="100%"
              height="350"
              allowFullScreen
              loading="lazy"
              className="rounded shadow"
              style={{ border: 0 }}
              title={`Mapa de ${proyecto.nombre}`}
            />
          </div>
        )}
      </div>

      {/* Modal con navegación, teclado, swipe y contador */}
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
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
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
    </div>
  );
};

export default ProyectoDetalle;
