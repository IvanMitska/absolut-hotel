import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Star, Users } from 'lucide-react';
import { cn } from '../../utils';
import { HOTEL_INFO, ANIMATIONS } from '../../constants';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Мок данные для слайдера (в реальном проекте будут из API или статических файлов)
  const heroSlides = [
    {
      id: 1,
      image: '/images/hero/hotel-exterior.jpg',
      title: 'Добро пожаловать в отель "Абсолют"',
      subtitle: 'Ваш идеальный отдых в сердце Витязево',
    },
    {
      id: 2,
      image: '/images/hero/pool.jpg',
      title: 'Подогреваемый бассейн круглый год',
      subtitle: 'Комфортная температура воды 26-28°C',
    },
    {
      id: 3,
      image: '/images/hero/beach.jpg',
      title: 'Первая береговая линия',
      subtitle: 'Всего 10 минут пешком до центрального пляжа',
    },
  ];

  // Автопереключение слайдов
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновые изображения */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 79, 124, 0.4), rgba(23, 162, 184, 0.3)), url(${slide.image})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Контент */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Главный заголовок */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat leading-tight">
            {heroSlides[currentSlide].title}
          </h1>

          {/* Подзаголовок */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light max-w-3xl mx-auto">
            {heroSlides[currentSlide].subtitle}
          </p>

          {/* Статистика отеля */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-accent-400 fill-current" />
              <span className="text-lg font-semibold">{HOTEL_INFO.rating}</span>
              <span className="text-white/80">({HOTEL_INFO.reviewsCount} отзывов)</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-accent-400" />
              <span className="text-white/80">Первая береговая линия</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-accent-400" />
              <span className="text-white/80">Семейный отель</span>
            </div>
          </motion.div>

          {/* Кнопки действий */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/booking">
              <Button
                variant="secondary"
                size="xl"
                className="min-w-[200px]"
              >
                Забронировать сейчас
              </Button>
            </Link>
            
            <Link to="/rooms">
              <Button
                variant="outline"
                size="xl"
                className="min-w-[200px] border-white text-white hover:bg-white hover:text-primary-900"
              >
                Посмотреть номера
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Индикаторы слайдов */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              index === currentSlide
                ? 'bg-accent-400 w-8'
                : 'bg-white/50 hover:bg-white/80'
            )}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>

      {/* Кнопка прокрутки вниз */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-accent-400 transition-colors z-20"
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        aria-label="Прокрутить вниз"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>

      {/* Плавающие элементы для дополнительного визуального эффекта */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection; 