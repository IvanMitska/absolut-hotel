import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Users, Phone, Calendar, Heart, Sparkles } from 'lucide-react';
import { HOTEL_INFO, ROOM_CATEGORIES, CURRENCY } from '../../constants';
import Button from '../ui/Button';

const maxDiscount = 20; // Максимальная скидка в процентах

const HeroSectionYouTube: React.FC = () => {
  // Находим минимальную цену
  const minPrice = Math.min(...ROOM_CATEGORIES.map(room => room.price.basePrice));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* YouTube фоновое видео */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <iframe
            className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&start=0&end=0"
            title="Hotel Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
        {/* Темный оверлей для лучшей читаемости текста */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40"></div>
      </div>

      {/* Минималистичные декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
      </div>

      {/* Главный контент */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Элегантный бейдж */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 animate-fade-in-down hover:scale-105 transition-all duration-500 border border-white/20">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <div className="w-px h-4 bg-white/30"></div>
          <span className="text-sm font-medium">
            {HOTEL_INFO.rating}/5 • {HOTEL_INFO.reviewsCount} отзывов
          </span>
        </div>

        {/* Главный заголовок */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up animation-delay-200 leading-tight">
          <span className="text-white drop-shadow-2xl">
            Отель "Абсолют"
          </span>
        </h1>

        {/* Эмоциональный подзаголовок */}
        <p className="text-2xl sm:text-3xl lg:text-4xl text-white/90 leading-relaxed mb-6 max-w-4xl mx-auto animate-fade-in-up animation-delay-300 font-light">
          Ваш идеальный отдых в сердце Витязево
        </p>
        
        <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
          Современный семейный отель с подогреваемым бассейном, детской анимацией и домашней атмосферой
        </p>

        {/* Ключевые преимущества - минималистичный дизайн */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {[
            { icon: MapPin, title: '10 мин до пляжа', subtitle: 'Центр Витязево', delay: '500' },
            { icon: Heart, title: 'Семейный отдых', subtitle: 'Детская анимация', delay: '600' },
            { icon: Users, title: 'Подогрев 26-28°C', subtitle: 'Круглый год', delay: '700' },
            { icon: Sparkles, title: 'Завтрак включен', subtitle: 'Шведский стол', delay: '800' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`bg-white/10 backdrop-blur-md p-4 rounded-xl hover:bg-white/20 transition-all duration-500 animate-fade-in-up animation-delay-${item.delay} border border-white/20 hover:border-white/40 group`}
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-sm mb-1 text-white">{item.title}</h3>
              <p className="text-xs text-white/70">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Блок с ценой и спецпредложением */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl mb-12 max-w-4xl mx-auto border border-white/20 animate-fade-in-up animation-delay-600 hover:bg-white/15 transition-all duration-500">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Левая часть - цена и скидка */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-semibold">Специальное предложение</span>
              </div>
              <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-bold text-white">
                  от {minPrice.toLocaleString('ru-RU')}{CURRENCY.symbol}
                </span>
                <span className="text-white/70 text-lg">/сутки</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  -{maxDiscount}% СКИДКА
                </span>
                <span className="text-white/70 text-sm">при раннем бронировании</span>
              </div>
            </div>

            {/* Правая часть - кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Calendar className="w-5 h-5" />}
                  iconPosition="left"
                  className="min-w-[220px] h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 border-0"
                >
                  Забронировать сейчас
                </Button>
              </Link>
              
              <Link to="/rooms">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  className="min-w-[200px] h-14 text-lg bg-white/20 border-white/30 text-white hover:bg-white/30 hover:scale-105 transition-all duration-300 backdrop-blur-md"
                >
                  Смотреть номера
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Контактная информация */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm animate-fade-in-up animation-delay-700 max-w-3xl mx-auto">
          <a
            href={`tel:${HOTEL_INFO.phone}`}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-105 px-4 py-3 rounded-xl hover:bg-white/10 bg-white/5 backdrop-blur-md border border-white/20"
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium">{HOTEL_INFO.phone}</span>
          </a>
          
          <div className="hidden sm:block w-2 h-2 bg-white/40 rounded-full"></div>
          
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/20 text-white/80">
            <MapPin className="w-4 h-4" />
            <span>Витязево, Анапа</span>
          </div>
          
          <div className="hidden sm:block w-2 h-2 bg-white/40 rounded-full"></div>
          
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/20 text-white/80">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>24/7 поддержка</span>
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 animate-bounce-subtle animation-delay-900 group border border-white/20"
        aria-label="Прокрутить вниз"
      >
        <ArrowRight className="w-6 h-6 rotate-90 group-hover:translate-y-1 transition-transform duration-300" />
      </button>
    </section>
  );
};

export default HeroSectionYouTube; 