import React, { useState } from 'react';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  MapPin
} from 'lucide-react';

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
    <section className="section-padding bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-float animation-delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl animate-float animation-delay-1000"></div>
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 glass-card text-purple-700 rounded-full px-6 py-3 text-sm font-medium mb-6 bg-gradient-to-r from-white/80 to-white/60 hover:scale-105 transition-all duration-300">
            <Camera className="w-5 h-5 animate-pulse" />
            Фотогалерея отеля
          </div>

          <h2 className="heading-lg mb-6 text-gradient-primary">
            Посмотрите на наш отель
          </h2>
          <p className="body-lg max-w-3xl mx-auto text-gray-600">
            Современные номера, подогреваемый бассейн, уютная территория и прекрасное расположение в центре Витязево
          </p>
        </div>

        {/* Основное изображение */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-110"
              onClick={() => openModal(galleryImages[0], 0)}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-end justify-between">
                <div>
                  <span className="inline-block btn-gradient-primary px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
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
                  className="glass-card text-white p-4 rounded-2xl hover:scale-110 transition-all duration-300 bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 group/btn"
                >
                  <Camera className="w-6 h-6 group-hover/btn:rotate-12 transition-transform duration-300" />
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
              className="relative aspect-square rounded-2xl overflow-hidden transition-all duration-500 hover:scale-110 hover:rotate-2 hover:shadow-2xl group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Иконка камеры при ховере */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center bg-white/20">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Кнопка "Показать больше" */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 glass-card rounded-3xl p-8 border border-white/20 bg-gradient-to-r from-white/80 to-white/60 hover:scale-105 transition-all duration-500 group shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Camera className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
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
            <button className="btn-gradient-primary px-8 py-4 relative group/btn overflow-hidden shadow-lg">
              <span className="relative z-10 flex items-center gap-3 font-semibold">
                Все фото
                <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
              </span>
            </button>
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