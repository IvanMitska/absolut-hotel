import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Users, Phone } from 'lucide-react';
import { HOTEL_INFO } from '../../constants';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Простой фон с изображением */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
          <div className="text-center text-neutral-400 animate-fade-in animation-delay-200">
            <div className="w-32 h-32 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <Users className="w-16 h-16 text-neutral-300" />
            </div>
            <p className="text-lg">Фото отеля будет здесь</p>
          </div>
        </div>
        {/* Простой градиент оверлей */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-bounce-subtle"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent-500/10 rounded-full blur-xl animate-bounce-subtle animation-delay-300"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/3 rounded-full blur-xl animate-bounce-subtle animation-delay-500"></div>
      </div>

      {/* Главный контент */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Простой бейдж */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-sm font-medium mb-8 animate-fade-in-down hover:scale-105 transition-all duration-300">
          <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
          Рейтинг {HOTEL_INFO.rating}/5 • {HOTEL_INFO.reviewsCount} отзывов
        </div>

        {/* Главный заголовок */}
        <h1 className="heading-xl text-white mb-6 animate-fade-in-up animation-delay-200 hover:text-gradient transition-all duration-500">
          Отель "Абсолют"
        </h1>

        {/* Подзаголовок */}
        <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
          Современный семейный отель в центре Витязево с подогреваемым бассейном и домашней атмосферой
        </p>

        {/* Ключевые особенности */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
          {[
            { icon: MapPin, text: '10 мин до пляжа', delay: '400' },
            { icon: Users, text: 'Семейный отдых', delay: '500' },
            { icon: null, text: 'Подогреваемый бассейн', delay: '600', color: 'bg-blue-400' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 glass rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-${item.delay}`}
            >
              {item.icon ? (
                <item.icon className="w-4 h-4" />
              ) : (
                <div className={`w-4 h-4 ${item.color} rounded-full animate-pulse`}></div>
              )}
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in-up animation-delay-500">
          <Link to="/booking">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="min-w-[200px] hover:shadow-2xl hover:shadow-accent-500/25 animate-pulse-glow"
            >
              Забронировать
            </Button>
          </Link>
          
          <Link to="/rooms">
            <Button
              variant="secondary"
              size="lg"
              className="min-w-[200px] glass border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              Посмотреть номера
            </Button>
          </Link>
        </div>

        {/* Контактная информация */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-white/80 animate-fade-in-up animation-delay-600">
          <a
            href={`tel:${HOTEL_INFO.phone}`}
            className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-white/10"
          >
            <Phone className="w-4 h-4" />
            {HOTEL_INFO.phone}
          </a>
          <div className="hidden sm:block w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
          <div className="flex items-center gap-2 px-3 py-2">
            <MapPin className="w-4 h-4" />
            Витязево, Анапа
          </div>
        </div>
      </div>

      {/* Анимированная кнопка прокрутки */}
      <button
        onClick={() => {
          const nextSection = document.getElementById('about');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 glass text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 animate-bounce-subtle animation-delay-700 group"
        aria-label="Прокрутить вниз"
      >
        <ArrowRight className="w-5 h-5 rotate-90 group-hover:translate-y-1 transition-transform duration-300" />
      </button>
    </section>
  );
};

export default HeroSection; 