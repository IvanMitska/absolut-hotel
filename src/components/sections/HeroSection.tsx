import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Users, Phone } from 'lucide-react';
import { HOTEL_INFO } from '../../constants';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Простой фон с изображением */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
          <div className="text-center text-neutral-400">
            <div className="w-32 h-32 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-16 h-16 text-neutral-300" />
            </div>
            <p className="text-lg">Фото отеля будет здесь</p>
          </div>
        </div>
        {/* Простой градиент оверлей */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      </div>

      {/* Главный контент */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Простой бейдж */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-8">
          <Star className="w-4 h-4 text-yellow-400" />
          Рейтинг {HOTEL_INFO.rating}/5 • {HOTEL_INFO.reviewsCount} отзывов
        </div>

        {/* Главный заголовок */}
        <h1 className="heading-xl text-white mb-6">
          Отель "Абсолют"
        </h1>

        {/* Подзаголовок */}
        <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
          Современный семейный отель в центре Витязево с подогреваемым бассейном и домашней атмосферой
        </p>

        {/* Ключевые особенности */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">10 мин до пляжа</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">Семейный отдых</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
            <span className="text-sm">Подогреваемый бассейн</span>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link to="/booking">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="min-w-[200px]"
            >
              Забронировать
            </Button>
          </Link>
          
          <Link to="/rooms">
            <Button
              variant="secondary"
              size="lg"
              className="min-w-[200px] bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Посмотреть номера
            </Button>
          </Link>
        </div>

        {/* Контактная информация */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-white/80">
          <a
            href={`tel:${HOTEL_INFO.phone}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            {HOTEL_INFO.phone}
          </a>
          <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Витязево, Анапа
          </div>
        </div>
      </div>

      {/* Простая кнопка прокрутки */}
      <button
        onClick={() => {
          const nextSection = document.getElementById('about');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Прокрутить вниз"
      >
        <ArrowRight className="w-5 h-5 rotate-90" />
      </button>
    </section>
  );
};

export default HeroSection; 