import React, { useEffect, useState } from 'react';
import obrasData from '../resources/listaproyectos.json';
import ImageModal from '../components/ImageModal';

interface Obra {
  id: number;
  name: string;
  location: string;
  images: {
    id: string;
    url: string;
    constructionId: number;
  }[];
}

const Obras: React.FC = () => {
  const [obras, setObras] = useState<Obra[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setObras(obrasData);
  }, []);

  const openModal = (images: string[], index: number) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % selectedImages.length);
  };

  const showPrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Proyectos</h1>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {obras.map((obra) => (
          <div key={obra.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="relative group h-60 overflow-hidden">
            <div
              className={`absolute inset-0 flex transition-transform duration-300 ${
                obra.images.length > 1 ? 'group-hover:translate-x-[-100%]' : ''
              }`}
            >
                {obra.images.map((image, index) => (
                  <img
                    key={image.id}
                    src={image.url}
                    alt={obra.name}
                    className="w-full h-60 object-cover flex-shrink-0 cursor-pointer"
                    onClick={() =>
                      openModal(
                        obra.images.map((img) => img.url),
                        index
                      )
                    }
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold text-primary mb-2">{obra.name}</h2>
              <p className="text-gray-600">{obra.location}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ImageModal
          images={selectedImages}
          currentIndex={selectedImageIndex}
          onClose={closeModal}
          onNext={showNext}
          onPrev={showPrev}
        />
      )}
    </div>
  );
};

export default Obras;
