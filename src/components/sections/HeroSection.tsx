import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin, Star, Users, ArrowRight, Sparkles, Waves } from 'lucide-react';
import { cn } from '../../utils';
import { HOTEL_INFO, ANIMATIONS } from '../../constants';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -150]);
  
  // Современные слайды с улучшенным контентом
  const heroSlides = [
    {
      id: 1,
      image: '/images/hero/hotel-exterior.jpg',
      title: 'Добро пожаловать в отель "Абсолют"',
      subtitle: 'Ваш идеальный семейный отдых в самом центре Витязево',
      accent: 'Скидка -15% на все номера',
    },
    {
      id: 2,
      image: '/images/hero/pool.jpg',
      title: 'Подогреваемый бассейн круглый год',
      subtitle: 'Комфортная температура воды 26-28°C с циркуляцией и фильтрацией',
      accent: 'Работает с 8:00 до 21:00',
    },
    {
      id: 3,
      image: '/images/hero/beach.jpg',
      title: 'Центр курортного поселка',
      subtitle: 'Всего 10 минут пешком до пляжа. Все развлечения в шаговой доступности',
      accent: 'Магазины, кафе, аптеки рядом',
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating blobs background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob-gradient absolute -top-10 -left-10 w-72 h-72"></div>
        <div className="blob-gradient absolute top-20 -right-16 w-96 h-96 animation-delay-2000"></div>
        <div className="blob-gradient absolute -bottom-16 left-20 w-80 h-80 animation-delay-4000"></div>
      </div>

      {/* Фоновые изображения с современным эффектом */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.05,
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(
                  135deg,
                  rgba(20, 184, 166, 0.4) 0%,
                  rgba(45, 212, 191, 0.3) 50%,
                  rgba(245, 158, 11, 0.2) 100%
                ), url(${slide.image})`,
              }}
            />
            {/* Glass overlay */}
            <div className="absolute inset-0 glass-morphism"></div>
          </motion.div>
        ))}
      </div>

      {/* Главный контент */}
      <motion.div 
        className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl"
        style={{ y: yParallax }}
      >
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Акцентная метка */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4 text-accent-400" />
            {heroSlides[currentSlide].accent}
          </motion.div>

          {/* Главный заголовок */}
          <h1 className="hero-title text-gradient-sunset">
            {heroSlides[currentSlide].title}
          </h1>

          {/* Подзаголовок */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto leading-relaxed">
            {heroSlides[currentSlide].subtitle}
          </p>

          {/* Статистика отеля в современном стиле */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mt-12 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: Star, value: HOTEL_INFO.rating, label: `(${HOTEL_INFO.reviewsCount} отзывов)`, suffix: '/5' },
              { icon: MapPin, value: '10', label: 'минут до пляжа', suffix: '' },
              { icon: Users, value: '2018', label: 'год открытия', suffix: '' },
              { icon: Waves, value: '26-28', label: 'температура бассейна', suffix: '°C' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card p-4 md:p-6 text-center min-w-[140px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <stat.icon className="w-6 h-6 text-accent-400 mx-auto mb-2" />
                <div className="text-lg md:text-xl font-bold">
                  {stat.value}
                  <span className="text-sm">{stat.suffix}</span>
                </div>
                <p className="text-white/80 text-xs md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Кнопки действий в современном стиле */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link to="/booking">
              <Button
                variant="secondary"
                size="xl"
                className="group min-w-[220px] bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-600 hover:to-accent-500"
              >
                Забронировать сейчас
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/rooms">
              <Button
                variant="glass"
                size="xl"
                className="min-w-[220px] group"
              >
                Посмотреть номера
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Дополнительная информация */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
              Завтрак включен
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
              Детская анимация
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
              Wi-Fi бесплатно
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Современные индикаторы слайдов */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-500',
              index === currentSlide
                ? 'w-12 bg-accent-400 shadow-glow'
                : 'w-2 bg-white/40 hover:bg-white/60'
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>

      {/* Анимированная кнопка прокрутки */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass-card p-3 rounded-full hover:scale-110 transition-all duration-300 z-20 group"
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        whileHover={{ y: 0 }}
        aria-label="Прокрутить вниз"
      >
        <ChevronDown className="w-6 h-6 text-white group-hover:text-accent-400 transition-colors" />
      </motion.button>

      {/* Floating particles для дополнительного эффекта */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </section>
  );
  };
  
export default HeroSection; 