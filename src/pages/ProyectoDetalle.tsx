import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import proyectos from '../resources/proyectos.json';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const ProyectoDetalle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const proyecto = proyectos.find((p) => p.slug === slug);

  const [modalOpen, setModalOpen] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);

  if (!proyecto) {
    return <div className="p-8 text-center">Proyecto no encontrado.</div>;
  }

  const abrirModal = (index: number) => {
    setImagenActual(index);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % proyecto.imagenes.length);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) =>
      prev === 0 ? proyecto.imagenes.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-[#f2f2f2] text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link to="/proyectos" className="flex items-center text-primary mb-4">
          <FaChevronLeft className="mr-2" /> Volver a Proyectos
        </Link>

        <h1 className="text-4xl font-primary text-primary mb-4">{proyecto.nombre}</h1>
        <p className="text-gray-600 mb-8">{proyecto.direccion}</p>

        {/* Galería con recorte desde arriba */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {proyecto.imagenes.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${proyecto.nombre} imagen ${idx + 1}`}
              className="w-full h-[800px] object-cover object-bottom cursor-pointer rounded"
              onClick={() => abrirModal(idx)}
            />
          ))}
        </div>

        {/* Características */}
        <h1 className="text-3xl font-bold text-primary mb-6 font-primary text-center">Características Principales</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {proyecto.caracteristicas.map((c, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <img src={c.icono} alt={c.descripcion} className="h-12 mb-2" />
              <p className="text-sm">{c.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Mapa */}
        <h1 className="text-3xl font-bold text-primary mb-6 font-primary text-center">Ubicación</h1>
        <div className="mb-8">
          <iframe
            src={proyecto.mapEmbedUrl}
            width="100%"
            height="350"
            allowFullScreen
            loading="lazy"
            className="rounded shadow"
            style={{ border: 0 }}
          />
        </div>
      </div>

      {/* Modal de imagen ampliada con navegación */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={cerrarModal}
            aria-label="Cerrar"
          >
            <FaTimes />
          </button>

          <button
            onClick={anteriorImagen}
            className="absolute left-4 text-white text-3xl bg-black bg-opacity-40 hover:bg-opacity-60 rounded-full p-2"
            aria-label="Anterior"
          >
            <FaChevronLeft />
          </button>

          <img
            src={proyecto.imagenes[imagenActual]}
            alt={`Imagen ampliada ${imagenActual + 1}`}
            className="max-h-[90vh] max-w-full rounded shadow-xl"
          />

          <button
            onClick={siguienteImagen}
            className="absolute right-4 text-white text-3xl bg-black bg-opacity-40 hover:bg-opacity-60 rounded-full p-2"
            aria-label="Siguiente"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProyectoDetalle;
