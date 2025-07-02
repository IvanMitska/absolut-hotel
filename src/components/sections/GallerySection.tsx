import React, { useState } from 'react';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  MapPin,
  Images
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

  // Премиум галерея для главной страницы
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
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-ocean-500 text-white rounded-full px-6 py-3 text-sm font-semibold mb-8 shadow-teal animate-slide-in-up">
            <Camera className="w-5 h-5" />
            Фотогалерея отеля
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-800 animate-slide-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Посмотрите на наш отель
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            Современные номера, подогреваемый бассейн, уютная территория и прекрасное расположение в центре Витязево
          </p>
        </div>

        {/* Премиум основное изображение */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 shadow-colored hover:shadow-colored-lg transition-all duration-500 group">
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-110"
              onClick={() => openModal(galleryImages[0], 0)}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-end justify-between">
                <div>
                  <span className="inline-block bg-gold-gradient text-slate-800 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-gold">
                    {galleryImages[0].category}
                  </span>
                  <h3 className="text-white text-3xl lg:text-4xl font-bold mb-3 drop-shadow-lg">
                    {galleryImages[0].title}
                  </h3>
                  <p className="text-cream-100 text-lg drop-shadow-md">
                    Отель Абсолют, Витязево
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(galleryImages[0], 0);
                  }}
                  className="bg-white/20 backdrop-blur-xl text-white p-6 rounded-2xl hover:bg-white/30 hover:scale-110 transition-all duration-300 group/btn shadow-glass border border-white/20"
                >
                  <Camera className="w-8 h-8 group-hover/btn:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Премиум миниатюры */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openModal(image, index)}
              className="relative aspect-square rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-colored group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Премиум иконка при ховере */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-glass">
                  <Camera className="w-8 h-8 text-teal-600" />
                </div>
              </div>

              {/* Категория бейдж */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-2 rounded-full text-xs font-semibold shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                {image.category}
              </div>
            </button>
          ))}
        </div>

        {/* Премиум кнопка "Показать больше" */}
        <div className="text-center">
          <div className="inline-flex items-center gap-8 bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-slate-100/50 hover:scale-105 transition-all duration-500 group shadow-colored">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-ocean-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-teal">
                <Images className="w-10 h-10 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-800 text-xl mb-2">
                  Больше фотографий
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Посмотрите все номера и территорию
                </p>
              </div>
            </div>
            <Button
              variant="teal-gold"
              size="lg"
              icon={<ExternalLink className="w-5 h-5" />}
              iconPosition="right"
              className="px-12 py-4 text-base"
            >
              Все фото
            </Button>
          </div>
        </div>
      </div>

      {/* Премиум модальное окно */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-ocean-900/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="max-w-5xl w-full max-h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Премиум заголовок модального окна */}
            <div className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-xl rounded-t-3xl border border-white/20">
              <div className="flex items-center gap-6">
                <h3 className="text-white font-bold text-xl">
                  {selectedImage.title}
                </h3>
                <span className="text-cream-200 text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  {currentImageIndex + 1} из {galleryImages.length}
                </span>
              </div>
              
              <button
                onClick={closeModal}
                className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Премиум изображение */}
            <div className="relative flex-1 bg-black rounded-b-3xl overflow-hidden border-x border-b border-white/20">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
              />

              {/* Премиум навигация */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-glass"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-2xl transition-all duration-300 hover:scale-110 shadow-glass"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Премиум информация об изображении */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ocean-900/90 to-transparent p-8">
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-teal-300" />
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-1">
                      {selectedImage.title}
                    </h3>
                    <p className="text-cream-200 text-lg">
                      {selectedImage.category} • Отель "Абсолют"
                    </p>
                  </div>
                </div>
              </div>

              {/* Премиум индикаторы */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setSelectedImage(galleryImages[index]);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-gold-400 scale-125 shadow-gold'
                        : 'bg-white/40 hover:bg-white/60 hover:scale-110'
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