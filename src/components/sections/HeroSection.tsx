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
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Фоновое видео */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero/hotel-exterior.jpg"
        >
          <source src="/videos/hotel-hero.mp4" type="video/mp4" />
          <source src="/videos/hotel-hero.webm" type="video/webm" />
          {/* Fallback для браузеров без поддержки видео */}
          <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
            <div className="text-center text-neutral-400">
              <div className="w-32 h-32 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-16 h-16 text-neutral-300" />
              </div>
              <p className="text-lg">Видео не поддерживается</p>
            </div>
          </div>
        </video>
        {/* Современный градиент оверлей */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-bounce-subtle"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-accent-500/15 to-yellow-400/15 rounded-full blur-2xl animate-bounce-subtle animation-delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400/10 to-red-400/10 rounded-full blur-xl animate-bounce-subtle animation-delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-xl animate-bounce-subtle animation-delay-700"></div>
      </div>

      {/* Главный контент */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Премиум бейдж */}
        <div className="inline-flex items-center gap-3 glass-premium rounded-full px-8 py-4 mb-8 animate-fade-in-down hover:scale-105 transition-all duration-500 border border-white/20">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
          <div className="w-px h-4 bg-white/30"></div>
          <span className="text-sm font-semibold bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-transparent">
            {HOTEL_INFO.rating}/5 • {HOTEL_INFO.reviewsCount} отзывов
          </span>
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
        </div>

        {/* Главный заголовок */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up animation-delay-200">
          <span className="bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent drop-shadow-2xl">
            Отель "Абсолют"
          </span>
        </h1>

        {/* Эмоциональный подзаголовок */}
        <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 leading-relaxed mb-4 max-w-4xl mx-auto animate-fade-in-up animation-delay-300 font-light">
          Ваш идеальный отдых в сердце Витязево
        </p>
        
        <p className="text-lg text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
          Современный семейный отель с подогреваемым бассейном, детской анимацией и домашней атмосферой
        </p>

        {/* Ключевые преимущества в современном стиле */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          {[
            { icon: MapPin, title: '10 мин до пляжа', subtitle: 'Центр Витязево', color: 'from-blue-400 to-cyan-400', delay: '500' },
            { icon: Heart, title: 'Семейный отдых', subtitle: 'Детская анимация', color: 'from-pink-400 to-red-400', delay: '600' },
            { icon: Users, title: 'Подогрев 26-28°C', subtitle: 'Круглый год', color: 'from-green-400 to-blue-400', delay: '700' },
            { icon: Gift, title: 'Завтрак включен', subtitle: 'Шведский стол', color: 'from-yellow-400 to-orange-400', delay: '800' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`glass-premium p-4 rounded-2xl hover:scale-105 transition-all duration-500 animate-fade-in-up animation-delay-${item.delay} border border-white/10 hover:border-white/30 group`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-white/70">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Блок с ценой и спецпредложением */}
        <div className="glass-premium p-8 rounded-3xl mb-12 max-w-4xl mx-auto border border-white/20 animate-fade-in-up animation-delay-600 hover:scale-[1.02] transition-all duration-500">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Левая часть - цена и скидка */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <Clock className="w-5 h-5 text-accent-400 animate-pulse" />
                <span className="text-accent-300 font-semibold">Специальное предложение</span>
              </div>
              <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                  от {minPrice.toLocaleString('ru-RU')}{CURRENCY.symbol}
                </span>
                <span className="text-white/70 text-lg">/сутки</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  -{maxDiscount}% СКИДКА
                </span>
                <span className="text-white/60 text-sm">при раннем бронировании</span>
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
                  className="min-w-[220px] h-14 text-lg font-bold bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-2xl shadow-accent-500/30 hover:shadow-accent-500/50 transform hover:scale-105 transition-all duration-300 animate-pulse-glow border-2 border-accent-400/50"
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
                  className="min-w-[200px] h-14 text-lg glass-premium border-white/40 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
                >
                  Смотреть номера
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-white/80 animate-fade-in-up animation-delay-700 max-w-3xl mx-auto">
          <a
            href={`tel:${HOTEL_INFO.phone}`}
            className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:scale-105 px-4 py-3 rounded-xl hover:bg-white/10 glass-premium"
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium">{HOTEL_INFO.phone}</span>
          </a>
          
          <div className="hidden sm:block w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
          
          <div className="flex items-center gap-2 px-4 py-3 glass-premium rounded-xl">
            <MapPin className="w-4 h-4" />
            <span>Витязево, Анапа</span>
          </div>
          
          <div className="hidden sm:block w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
          
          <div className="flex items-center gap-2 px-4 py-3 glass-premium rounded-xl">
            <Sparkles className="w-4 h-4 text-accent-400" />
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-14 h-14 glass-premium text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 animate-bounce-subtle animation-delay-900 group border border-white/20"
        aria-label="Прокрутить вниз"
      >
        <ArrowRight className="w-6 h-6 rotate-90 group-hover:translate-y-1 transition-transform duration-300" />
      </button>
    </section>
  );
};

export default HeroSection; 