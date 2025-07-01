import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Users, Phone, Calendar, Heart, Sparkles } from 'lucide-react';
import { HOTEL_INFO, ROOM_CATEGORIES, CURRENCY } from '../../constants';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  // Находим минимальную цену
  const minPrice = Math.min(...ROOM_CATEGORIES.map(room => room.priceFrom));
  const maxDiscount = Math.max(...ROOM_CATEGORIES.map(room => room.discount || 0));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновое видео с улучшенным оверлеем */}
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
          {/* Fallback с градиентом */}
          <div className="w-full h-full bg-animated-gradient flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 glass-card flex items-center justify-center mx-auto mb-4 animate-float">
                <Users className="w-16 h-16 text-white" />
              </div>
              <p className="text-lg">Добро пожаловать в отель Абсолют</p>
            </div>
          </div>
        </video>
        
        {/* Многослойный градиентный оверлей */}
        <div className="absolute inset-0 bg-hero-gradient"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-purple-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/20 to-purple-900/40"></div>
      </div>

      {/* Плавающие декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-2xl animate-float animation-delay-300"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-2xl animate-float animation-delay-500"></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-xl animate-float animation-delay-700"></div>
      </div>

      {/* Главный контент */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-24 pb-8">
        {/* Главный заголовок с градиентом */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up animation-delay-200 leading-tight">
          <span className="text-gradient-hotel drop-shadow-2xl">
            Отель Абсолют
          </span>
        </h1>

        {/* Эмоциональный подзаголовок */}
        <p className="text-2xl sm:text-3xl lg:text-4xl text-white/95 leading-relaxed mb-6 max-w-4xl mx-auto animate-fade-in-up animation-delay-300 font-light">
          ✨ Ваш идеальный отдых в сердце Витязево ✨
        </p>
        
        <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
          Современный семейный отель с подогреваемым бассейном, детской анимацией и домашней атмосферой
        </p>

        {/* Ключевые преимущества с градиентными карточками */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
          {[
            { icon: MapPin, title: '10 мин до пляжа', subtitle: 'Центр Витязево', delay: '500', gradient: 'from-blue-500/20 to-cyan-500/20' },
            { icon: Heart, title: 'Семейный отдых', subtitle: 'Детская анимация', delay: '600', gradient: 'from-pink-500/20 to-rose-500/20' },
            { icon: Users, title: 'Подогрев 26-28°C', subtitle: 'Круглый год', delay: '700', gradient: 'from-purple-500/20 to-violet-500/20' },
            { icon: Sparkles, title: 'Завтрак включен', subtitle: 'Шведский стол', delay: '800', gradient: 'from-amber-500/20 to-orange-500/20' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`glass-card p-5 hover:scale-110 transition-all duration-500 animate-fade-in-up animation-delay-${item.delay} group bg-gradient-to-br ${item.gradient} hover:shadow-2xl`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center mb-3 mx-auto group-hover:scale-125 transition-all duration-300 animate-glow">
                <item.icon className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-white drop-shadow-md">{item.title}</h3>
              <p className="text-xs text-white/80">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Блок с ценой и спецпредложением - улучшенный дизайн */}
        <div className="glass-card p-8 mb-16 max-w-5xl mx-auto animate-fade-in-up animation-delay-600 hover:scale-105 transition-all duration-500 bg-gradient-to-r from-white/10 via-white/15 to-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Левая часть - цена и скидка */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                <span className="text-gradient-secondary font-bold text-lg">Специальное предложение</span>
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse animation-delay-300" />
              </div>
              <div className="flex items-baseline justify-center lg:justify-start gap-3 mb-3">
                <span className="text-5xl sm:text-6xl font-bold text-white drop-shadow-lg">
                  от {minPrice.toLocaleString('ru-RU')}{CURRENCY.symbol}
                </span>
                <span className="text-white/80 text-xl">/сутки</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="btn-gradient-secondary px-4 py-2 rounded-full text-sm font-bold animate-shimmer">
                  -{maxDiscount}% СКИДКА
                </span>
                <span className="text-white/80 text-sm">при раннем бронировании</span>
              </div>
            </div>

            {/* Правая часть - кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking">
                <button className="btn-gradient-primary min-w-[240px] h-16 text-lg font-bold shadow-2xl relative group overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Calendar className="w-6 h-6" />
                    Забронировать сейчас
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </Link>
              
              <Link to="/rooms">
                <button className="btn-glass min-w-[220px] h-16 text-lg group relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Смотреть номера
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Дополнительная информация с иконками */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in-up animation-delay-800">
          <div className="flex items-center gap-2 text-white/90">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">Рейтинг 4.8/5</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">156+ довольных гостей</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Phone className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">24/7 поддержка</span>
          </div>
        </div>
      </div>

      {/* Анимированная кнопка прокрутки с градиентом */}
      <button
        onClick={() => {
          const nextSection = document.getElementById('about');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 glass-card text-white rounded-full flex items-center justify-center transition-all duration-500 hover:scale-125 animate-float animation-delay-900 group bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/20"
        aria-label="Прокрутить вниз"
      >
        <ArrowRight className="w-7 h-7 rotate-90 group-hover:translate-y-1 transition-transform duration-300 drop-shadow-lg" />
      </button>
    </section>
  );
};

export default HeroSection; 