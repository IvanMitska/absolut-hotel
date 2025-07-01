import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Users, Phone, Calendar, Gift, Sparkles, Clock, Heart } from 'lucide-react';
import { HOTEL_INFO, ROOM_CATEGORIES, CURRENCY } from '../../constants';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  // Находим минимальную цену
  const minPrice = Math.min(...ROOM_CATEGORIES.map(room => room.priceFrom));
  const maxDiscount = Math.max(...ROOM_CATEGORIES.map(room => room.discount || 0));

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Фоновое видео */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
          poster="/images/hero/hotel-exterior.jpg"
        >
          <source src="/videos/hotel-hero.mp4" type="video/mp4" />
          <source src="/videos/hotel-hero.webm" type="video/webm" />
          {/* Fallback для браузеров без поддержки видео */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <div className="text-center text-blue-400">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-16 h-16 text-blue-400" />
              </div>
              <p className="text-lg">Видео не поддерживается</p>
            </div>
          </div>
        </video>
        {/* Светлый градиент оверлей */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/60 to-white/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 via-transparent to-white/30"></div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-bounce-subtle"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-accent-200/25 to-yellow-200/25 rounded-full blur-2xl animate-bounce-subtle animation-delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-200/20 to-red-200/20 rounded-full blur-xl animate-bounce-subtle animation-delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-xl animate-bounce-subtle animation-delay-700"></div>
      </div>

      {/* Главный контент */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Элегантный бейдж */}
        <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 mb-8 animate-fade-in-down hover:scale-105 transition-all duration-500 border border-yellow-200/50 shadow-lg">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <span className="text-sm font-semibold text-gray-700">
            {HOTEL_INFO.rating}/5 • {HOTEL_INFO.reviewsCount} отзывов
          </span>
          <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
        </div>

        {/* Главный заголовок */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up animation-delay-200">
          <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
            Отель "Абсолют"
          </span>
        </h1>

        {/* Эмоциональный подзаголовок */}
        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 leading-relaxed mb-4 max-w-4xl mx-auto animate-fade-in-up animation-delay-300 font-light">
          Ваш идеальный отдых в сердце Витязево
        </p>
        
        <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
          Современный семейный отель с подогреваемым бассейном, детской анимацией и домашней атмосферой
        </p>

        {/* Ключевые преимущества в светлом стиле */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          {[
            { icon: MapPin, title: '10 мин до пляжа', subtitle: 'Центр Витязево', color: 'from-blue-400 to-cyan-400', delay: '500' },
            { icon: Heart, title: 'Семейный отдых', subtitle: 'Детская анимация', color: 'from-pink-400 to-red-400', delay: '600' },
            { icon: Users, title: 'Подогрев 26-28°C', subtitle: 'Круглый год', color: 'from-green-400 to-blue-400', delay: '700' },
            { icon: Gift, title: 'Завтрак включен', subtitle: 'Шведский стол', color: 'from-yellow-400 to-orange-400', delay: '800' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-${item.delay} border border-white/50 hover:border-blue-200 group shadow-lg hover:shadow-xl`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm mb-1 text-gray-800">{item.title}</h3>
              <p className="text-xs text-gray-600">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Блок с ценой и спецпредложением - светлый дизайн */}
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl mb-12 max-w-4xl mx-auto border border-blue-100 animate-fade-in-up animation-delay-600 hover:scale-[1.02] transition-all duration-500 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Левая часть - цена и скидка */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <Clock className="w-5 h-5 text-blue-500 animate-pulse" />
                <span className="text-blue-600 font-semibold">Специальное предложение</span>
              </div>
              <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  от {minPrice.toLocaleString('ru-RU')}{CURRENCY.symbol}
                </span>
                <span className="text-gray-600 text-lg">/сутки</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  -{maxDiscount}% СКИДКА
                </span>
                <span className="text-gray-500 text-sm">при раннем бронировании</span>
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
                  className="min-w-[200px] h-14 text-lg bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Смотреть номера
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm animate-fade-in-up animation-delay-700 max-w-3xl mx-auto">
          <a
            href={`tel:${HOTEL_INFO.phone}`}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 px-4 py-3 rounded-xl hover:bg-white/50 bg-white/30 backdrop-blur-sm border border-white/40"
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium">{HOTEL_INFO.phone}</span>
          </a>
          
          <div className="hidden sm:block w-2 h-2 bg-gray-400 rounded-full"></div>
          
          <div className="flex items-center gap-2 px-4 py-3 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 text-gray-700">
            <MapPin className="w-4 h-4" />
            <span>Витязево, Анапа</span>
          </div>
          
          <div className="hidden sm:block w-2 h-2 bg-gray-400 rounded-full"></div>
          
          <div className="flex items-center gap-2 px-4 py-3 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 text-gray-700">
            <Sparkles className="w-4 h-4 text-blue-500" />
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-white/80 backdrop-blur-sm text-gray-600 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 animate-bounce-subtle animation-delay-900 group border border-gray-200 shadow-lg"
        aria-label="Прокрутить вниз"
      >
        <ArrowRight className="w-6 h-6 rotate-90 group-hover:translate-y-1 transition-transform duration-300" />
      </button>
    </section>
  );
};

export default HeroSection; 