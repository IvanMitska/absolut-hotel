import React, { useState } from 'react';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  MapPin
} from 'lucide-react';
import Button from '../ui/Button';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
}

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Простая галерея для главной страницы
  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop',
      alt: 'Подогреваемый бассейн',
      title: 'Бассейн с подогревом',
      category: 'Бассейн'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      alt: 'Номер Стандарт',
      title: 'Уютные номера',
      category: 'Номера'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      alt: 'Фасад отеля',
      title: 'Современное здание',
      category: 'Территория'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      alt: 'Ресторан',
      title: 'Уютный ресторан',
      category: 'Ресторан'
    }
  ];

  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 rounded-full px-6 py-3 text-sm font-medium mb-6 hover:scale-105 transition-all duration-300">
            <Camera className="w-5 h-5" />
            Фотогалерея отеля
          </div>

          <h2 className="heading-lg mb-6 text-gray-800">
            Посмотрите на наш отель
          </h2>
          <p className="body-lg max-w-3xl mx-auto text-gray-600">
            Современные номера, подогреваемый бассейн, уютная территория и прекрасное расположение в центре Витязево
          </p>
        </div>

        {/* Основное изображение */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-full object-cover cursor-pointer transition-all duration-300 group-hover:scale-105"
              onClick={() => openModal(galleryImages[0], 0)}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-end justify-between">
                <div>
                  <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
                    {galleryImages[0].category}
                  </span>
                  <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
                    {galleryImages[0].title}
                  </h3>
                  <p className="text-white/90 drop-shadow-md">
                    Отель Абсолют, Витязево
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(galleryImages[0], 0);
                  }}
                  className="bg-white/20 backdrop-blur-md text-white p-4 rounded-xl hover:bg-white/30 hover:scale-110 transition-all duration-300 group/btn"
                >
                  <Camera className="w-6 h-6 group-hover/btn:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Миниатюры */}
        <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openModal(image, index)}
              className="relative aspect-square rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
              
              {/* Иконка камеры при ховере */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <Camera className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Кнопка "Показать больше" */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 bg-white rounded-2xl p-8 border border-gray-200 hover:scale-105 transition-all duration-300 group shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  Больше фотографий
                </h3>
                <p className="text-gray-600 text-sm">
                  Посмотрите все номера и территорию
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              icon={<ExternalLink className="w-5 h-5" />}
              iconPosition="right"
              className="px-8 py-4 font-semibold"
            >
              Все фото
            </Button>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="max-w-4xl w-full max-h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок модального окна */}
            <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-t-2xl">
              <div className="flex items-center gap-4">
                <h3 className="text-white font-semibold text-lg">
                  {selectedImage.title}
                </h3>
                <span className="text-white/60 text-sm">
                  {currentImageIndex + 1} из {galleryImages.length}
                </span>
              </div>
              
              <button
                onClick={closeModal}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Изображение */}
            <div className="relative flex-1 bg-black rounded-b-2xl overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
              />

              {/* Навигация */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Информация об изображении */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-white/80" />
                  <div>
                    <h3 className="text-white text-xl font-semibold">
                      {selectedImage.title}
                    </h3>
                    <p className="text-white/80">
                      {selectedImage.category} • Отель "Абсолют"
                    </p>
                  </div>
                </div>
              </div>

              {/* Индикаторы */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setSelectedImage(galleryImages[index]);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection; 