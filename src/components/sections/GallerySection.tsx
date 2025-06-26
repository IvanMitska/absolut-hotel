import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Star,
  MapPin,
  Play,
  Pause
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Компактная галерея для главной страницы - уменьшено до 4 изображений
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

  // Автопрокрутка слайдера
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryImages.length]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? galleryImages.length - 1 : prev - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-6 py-3 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Camera className="w-4 h-4" />
            Фотогалерея отеля
          </motion.div>

          <h2 className="section-title text-neutral-900 mb-6">
            Посмотрите на наш отель
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
            Современные номера, подогреваемый бассейн, уютная территория и прекрасное расположение в центре Витязево
          </p>
        </motion.div>

        {/* Слайдер */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto mb-12"
        >
          {/* Контейнер слайдера */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[16/9] bg-neutral-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
                onClick={() => openModal(galleryImages[currentSlide], currentSlide)}
              >
                <img
                  src={galleryImages[currentSlide].src}
                  alt={galleryImages[currentSlide].alt}
                  className="w-full h-full object-cover cursor-pointer"
                />
                
                {/* Градиентный оверлей */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Информация о слайде */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-end justify-between"
                  >
                    <div>
                      <span className="inline-block bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
                        {galleryImages[currentSlide].category}
                      </span>
                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                        {galleryImages[currentSlide].title}
                      </h3>
                      <p className="text-white/80 text-lg">
                        Отель "Абсолют", Витязево
                      </p>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(galleryImages[currentSlide], currentSlide);
                      }}
                      className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
                    >
                      <Camera className="w-6 h-6" />
                    </button>
                  </motion.div>
                </div>

                {/* Бейдж для первого слайда */}
                {currentSlide === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="absolute top-6 left-6 bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                  >
                    <Star className="w-4 h-4" />
                    Популярное
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Навигационные стрелки */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Управление автопрокруткой */}
            <button
              onClick={toggleAutoPlay}
              className="absolute top-6 right-6 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all backdrop-blur-sm"
            >
              {isAutoPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Индикаторы слайдов */}
          <div className="flex justify-center gap-3 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-primary-600'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              >
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 bg-primary-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4, ease: "linear" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Миниатюры */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12"
        >
          {galleryImages.map((image, index) => (
            <motion.button
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                index === currentSlide
                  ? 'ring-4 ring-primary-500 scale-105'
                  : 'hover:scale-105 hover:shadow-lg'
              }`}
              whileHover={{ y: -2 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary-500/20'
                  : 'bg-black/0 hover:bg-black/10'
              }`} />
              
              {index === currentSlide && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Кнопка "Показать больше" */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-neutral-900">
                  Больше фотографий
                </h3>
                <p className="text-neutral-600 text-sm">
                  Посмотрите все номера и территорию
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors">
              <span>Все фото</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Модальное окно */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full max-h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Заголовок модального окна */}
              <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-t-2xl">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection; 