import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Star, 
  Users, 
  Phone, 
  MapPin, 
  Sparkles, 
  ChevronRight, 
  Waves,
  Sun,
  Heart,
  Gift,
  ArrowDown,
  CheckCircle
} from 'lucide-react';
import { ROOM_CATEGORIES, CURRENCY, HOTEL_INFO } from '../../constants';
import Button from '../ui/Button';

// Быстрая форма бронирования
const QuickBookingForm: React.FC = () => {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    roomType: ''
  });

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Перенаправляем на страницу бронирования с данными
    const params = new URLSearchParams({
      ...bookingData,
      guests: bookingData.guests.toString()
    }).toString();
    window.location.href = `/booking?${params}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-cream-100/98 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-ocean-lg border border-ocean-200/30">
      <div className="mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-ocean-gradient text-white rounded-full px-4 py-2 text-sm font-bold mb-4 shadow-ocean">
          <Sparkles className="w-4 h-4 animate-bounce-gentle text-gold-300" />
          Быстрое бронирование
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
          Забронировать сейчас
        </h3>
        <p className="text-slate-600 text-base">Лучшие цены и гарантия мест</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* Даты */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-base font-semibold text-slate-800 mb-3">
              Заезд
            </label>
            <input
              type="date"
              value={bookingData.checkIn}
              min={today}
              onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
              className="w-full px-4 py-4 rounded-2xl border-2 border-ocean-200 focus:border-ocean-500 focus:ring-4 focus:ring-ocean-200/30 transition-all duration-300 bg-white text-base font-medium min-h-[48px]"
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-slate-800 mb-3">
              Выезд
            </label>
            <input
              type="date"
              value={bookingData.checkOut}
              min={bookingData.checkIn || tomorrow}
              onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
              className="w-full px-4 py-4 rounded-2xl border-2 border-ocean-200 focus:border-ocean-500 focus:ring-4 focus:ring-ocean-200/30 transition-all duration-300 bg-white text-base font-medium min-h-[48px]"
            />
          </div>
        </div>

        {/* Количество гостей */}
        <div>
          <label className="block text-base font-semibold text-slate-800 mb-3">
            Количество гостей
          </label>
          <select
            value={bookingData.guests}
            onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
            className="w-full px-4 py-4 rounded-2xl border-2 border-ocean-200 focus:border-ocean-500 focus:ring-4 focus:ring-ocean-200/30 transition-all duration-300 bg-white text-base font-medium min-h-[48px]"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
              </option>
            ))}
          </select>
        </div>

        {/* Кнопка бронирования */}
        <Button
          type="submit"
          variant="primary"
          size="xl"
          className="w-full text-lg font-bold py-4 min-h-[56px] mt-8 bg-ocean-gradient hover:shadow-ocean-lg hover:scale-105 transition-all duration-300"
          icon={<Calendar className="w-6 h-6" />}
          iconPosition="left"
        >
          Забронировать номер
        </Button>

        {/* Дополнительная информация */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-base text-slate-600 pt-4 border-t border-ocean-100">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-ocean-500" />
            <span className="font-medium">Бесплатная отмена</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-ocean-500" />
            <span className="font-medium">Мгновенное подтверждение</span>
          </div>
        </div>
      </form>
    </div>
  );
};

// Статистический блок
const StatsSection: React.FC = () => {
  const stats = [
    { number: HOTEL_INFO.reviewsCount, label: 'Довольных гостей', suffix: '+', icon: Users, color: 'text-ocean-400' },
    { number: HOTEL_INFO.rating, label: 'Рейтинг отеля', suffix: '/5', icon: Star, color: 'text-gold-400' },
    { number: 6, label: 'Категорий номеров', suffix: '', icon: Calendar, color: 'text-ocean-300' },
    { number: 24, label: 'Часа работы', suffix: '/7', icon: Heart, color: 'text-gold-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
      {stats.map((stat, index) => (
        <div key={stat.label} className="text-center group">
          <div className="bg-white/15 backdrop-blur-sm p-5 lg:p-8 rounded-3xl hover:bg-white/25 transition-all duration-500 group-hover:scale-105 hover:shadow-ocean">
            <div className="w-14 h-14 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-white/25 rounded-3xl flex items-center justify-center group-hover:animate-float">
              <stat.icon className={`w-7 h-7 lg:w-10 lg:h-10 ${stat.color}`} />
            </div>
            <div className="text-2xl lg:text-4xl font-bold text-white mb-2 lg:mb-3">
              {stat.number}<span className="text-gold-400">{stat.suffix}</span>
            </div>
            <p className="text-cream-100 text-sm lg:text-base font-medium leading-relaxed">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Блок услуг
const ServicesSection: React.FC = () => {
  const services = [
    { icon: Sun, title: 'Бассейн 26-28°C', subtitle: 'Круглый год', color: 'text-gold-400', bgColor: 'bg-gold-500/10' },
    { icon: Heart, title: 'Семейный отдых', subtitle: 'Детская анимация', color: 'text-gold-300', bgColor: 'bg-gold-400/10' },
    { icon: Waves, title: '10 мин до пляжа', subtitle: 'Черное море', color: 'text-ocean-300', bgColor: 'bg-ocean-400/10' },
    { icon: Gift, title: 'Подарочные дни', subtitle: 'При бронировании', color: 'text-gold-500', bgColor: 'bg-gold-600/10' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
      {services.map((service, index) => (
        <div key={index} className="bg-white/15 backdrop-blur-sm p-5 lg:p-8 rounded-3xl text-center hover:bg-white/25 transition-all duration-500 group hover:scale-105 hover:shadow-ocean">
          <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 ${service.bgColor} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <service.icon className={`w-8 h-8 lg:w-10 lg:h-10 ${service.color}`} />
          </div>
          <h4 className="font-bold text-base lg:text-lg mb-2 text-white leading-tight">{service.title}</h4>
          <p className="text-sm lg:text-base text-cream-200 font-medium">{service.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Находим минимальную цену
  const minPrice = Math.min(...ROOM_CATEGORIES.map(room => room.price.basePrice));

  return (
    <>
      {/* HERO БЛОК - Сбалансированная морская тематика */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-marine">
        
        {/* Видео фон с нейтральным оверлеем */}
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
          </video>
          
          {/* Нейтральный оверлей для лучшей читаемости */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        </div>

        {/* Главный контент */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-5 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full text-center">
            
            {/* Бейдж с локацией */}
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 lg:px-8 py-3 lg:py-4 rounded-full mb-8 lg:mb-12 text-base lg:text-lg font-bold text-white shadow-ocean-lg border border-gold-300/30">
              <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-gold-400 animate-bounce-gentle" />
              <span>Витязево • 10 минут до пляжа</span>
              <Waves className="w-5 h-5 lg:w-6 lg:h-6 text-ocean-300 animate-float" />
            </div>

            {/* Главный заголовок - адаптивный */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold mb-6 lg:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent drop-shadow-lg">Отель</span>
              <br />
              <span className="bg-gradient-to-r from-ocean-400 to-ocean-600 bg-clip-text text-transparent drop-shadow-lg">Абсолют</span>
            </h1>

            {/* Подзаголовок */}
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-cream-100 leading-relaxed mb-8 lg:mb-12 max-w-4xl mx-auto px-4 font-medium drop-shadow-md">
              Роскошный семейный отдых в сердце черноморского побережья с подогреваемым бассейном и домашней атмосферой
            </p>

            {/* КОМПАКТНОЕ СПЕЦПРЕДЛОЖЕНИЕ - в 2 раза меньше */}
            <div className="relative mb-8 lg:mb-12 max-w-xl mx-auto">
              {/* Тонкая золотая рамка с glow эффектом */}
              <div className="bg-gradient-to-r from-gold-500 to-gold-600 p-0.5 rounded-2xl shadow-gold-lg hover:shadow-gold animate-glow">
                <div className="bg-gradient-to-br from-slate-900/96 to-slate-800/96 backdrop-blur-xl px-6 py-4 lg:px-8 lg:py-5 rounded-2xl text-center relative overflow-hidden border border-gold-300/20">
                  {/* Тонкий анимированный фон */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-gold-400/10 to-gold-500/5 animate-pulse"></div>
                  
                  <div className="relative z-10">
                    {/* Компактный заголовок */}
                    <div className="flex items-center justify-center gap-2 mb-2 lg:mb-3">
                      <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-gold-400 animate-bounce" />
                      <span className="text-gold-300 font-bold text-sm lg:text-base tracking-wide">СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</span>
                      <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-gold-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                    </div>
                    
                    {/* Горизонтальное расположение на мобильном */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2 lg:mb-3">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white drop-shadow-lg">
                        от {minPrice.toLocaleString('ru-RU')}{CURRENCY.symbol}
                      </span>
                      <span className="text-cream-200 text-base lg:text-lg font-bold">/сутки</span>
                    </div>
                    
                    {/* Компактное описание подарков */}
                    <div className="flex items-center justify-center gap-2 text-sm lg:text-base">
                      <Gift className="w-4 h-4 lg:w-5 lg:h-5 text-gold-400 animate-float" />
                      <span className="text-gold-200 font-semibold">
                        ПОДАРОЧНЫЕ ДНИ при длительном проживании
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Основные CTA кнопки - с золотыми акцентами */}
            <div className="flex flex-col sm:flex-row gap-5 lg:gap-8 justify-center items-center mb-12 lg:mb-16">
              <Button
                onClick={() => setShowBookingForm(!showBookingForm)}
                variant="primary"
                size="xl"
                icon={<Calendar className="w-6 h-6 lg:w-7 lg:h-7" />}
                iconPosition="left"
                className="w-full sm:w-auto text-xl lg:text-2xl px-10 lg:px-16 py-5 lg:py-6 font-black min-w-[300px] min-h-[64px] bg-ocean-gradient hover:shadow-ocean-lg hover:scale-105 transition-all duration-300 rounded-2xl"
              >
                Забронировать сейчас
              </Button>
              
              <Link to="/rooms">
                <Button
                  variant="secondary"
                  size="xl"
                  icon={<ChevronRight className="w-6 h-6 lg:w-7 lg:h-7" />}
                  iconPosition="right"
                  className="w-full sm:w-auto text-xl lg:text-2xl px-10 lg:px-16 py-5 lg:py-6 font-bold min-w-[300px] min-h-[64px] bg-white/20 border-2 border-gold-300/40 text-white hover:bg-white/30 hover:border-gold-400/60 hover:scale-105 transition-all duration-300 rounded-2xl backdrop-blur-md"
                >
                  Смотреть номера
                </Button>
              </Link>
            </div>

            {/* Контактная информация - с золотыми акцентами */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 lg:gap-12 text-base lg:text-lg">
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-4 py-3 rounded-2xl border border-gold-300/20 hover:border-gold-400/40 transition-colors duration-300">
                <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-gold-400" />
                <a href="tel:+79883184825" className="text-white hover:text-gold-300 transition-colors font-bold">
                  +7(988)318-48-25
                </a>
              </div>
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-4 py-3 rounded-2xl border border-gold-300/20 hover:border-gold-400/40 transition-colors duration-300">
                <Star className="w-5 h-5 lg:w-6 lg:h-6 text-gold-400" />
                <span className="text-white font-bold">Рейтинг 4.8/5 • 156+ отзывов</span>
              </div>
            </div>
          </div>
        </div>

        {/* Стрелка прокрутки */}
        <button
          onClick={() => {
            const nextSection = document.getElementById('services');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 border-2 border-gold-300/30 shadow-ocean"
          aria-label="Прокрутить вниз"
        >
          <ArrowDown className="w-6 h-6 lg:w-8 lg:h-8 animate-bounce text-gold-300" />
        </button>
      </section>

      {/* ФОРМА БРОНИРОВАНИЯ - отдельная секция */}
      {showBookingForm && (
        <section className="py-16 lg:py-24 bg-gradient-to-b from-ocean-900 to-ocean-800">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Забронируйте свой отдых
              </h2>
              <p className="text-xl text-cream-200">
                Заполните форму и получите подтверждение мгновенно
              </p>
            </div>
            <QuickBookingForm />
          </div>
        </section>
      )}

      {/* УСЛУГИ - отдельная секция с золотыми акцентами */}
      <section id="services" className="py-16 lg:py-24 bg-gradient-to-b from-ocean-800 to-ocean-700">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Почему выбирают нас
            </h2>
            <p className="text-xl lg:text-2xl text-cream-200 max-w-3xl mx-auto leading-relaxed">
              Уникальные преимущества отеля "Абсолют" для незабываемого морского отдыха
            </p>
          </div>
          
          <ServicesSection />
        </div>
      </section>

      {/* СТАТИСТИКА - отдельная секция */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ocean-700 to-ocean-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Наши достижения
            </h2>
            <p className="text-xl lg:text-2xl text-cream-200 max-w-3xl mx-auto leading-relaxed">
              Цифры, которые говорят о качестве нашего сервиса и заботе о гостях
            </p>
          </div>
          
          <StatsSection />
        </div>
      </section>
    </>
  );
};

export default HeroSection; 