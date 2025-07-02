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
    <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          Быстрое бронирование
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Забронировать сейчас
        </h3>
        <p className="text-gray-600 text-sm">Лучшие цены и гарантия мест</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Даты */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Заезд
            </label>
            <input
              type="date"
              value={bookingData.checkIn}
              min={today}
              onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 transition-all duration-300 bg-white text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Выезд
            </label>
            <input
              type="date"
              value={bookingData.checkOut}
              min={bookingData.checkIn || tomorrow}
              onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 transition-all duration-300 bg-white text-base"
            />
          </div>
        </div>

        {/* Количество гостей */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Количество гостей
          </label>
          <select
            value={bookingData.guests}
            onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
            className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 transition-all duration-300 bg-white text-base"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
              </option>
            ))}
          </select>
        </div>

        {/* Тип номера */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Тип номера
          </label>
          <select
            value={bookingData.roomType}
            onChange={(e) => setBookingData(prev => ({ ...prev, roomType: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 transition-all duration-300 bg-white text-base"
          >
            <option value="">Любой номер</option>
            {ROOM_CATEGORIES.map(room => (
              <option key={room.id} value={room.id}>
                {room.name} - от {room.price.basePrice.toLocaleString()}₽
              </option>
            ))}
          </select>
        </div>

        {/* Кнопка бронирования */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full text-base py-4 font-bold mt-6"
          icon={<Calendar className="w-5 h-5" />}
          iconPosition="left"
        >
          Забронировать номер
        </Button>

        {/* Дополнительная информация */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-600 pt-2">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Бесплатная отмена</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Мгновенное подтверждение</span>
          </div>
        </div>
      </form>
    </div>
  );
};

// Статистический блок
const StatsSection: React.FC = () => {
  const stats = [
    { number: HOTEL_INFO.reviewsCount, label: 'Довольных гостей', suffix: '+', icon: Users },
    { number: HOTEL_INFO.rating, label: 'Рейтинг отеля', suffix: '/5', icon: Star },
    { number: 6, label: 'Категорий номеров', suffix: '', icon: Calendar },
    { number: 24, label: 'Часа работы', suffix: '/7', icon: Heart },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div key={stat.label} className="text-center">
          <div className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-2xl hover:bg-white/20 transition-all duration-300">
            <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
              <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-white mb-1 lg:mb-2">
              {stat.number}<span className="text-yellow-300">{stat.suffix}</span>
            </div>
            <p className="text-gray-200 text-xs lg:text-sm font-medium">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Блок услуг
const ServicesSection: React.FC = () => {
  const services = [
    { icon: Sun, title: 'Бассейн 26-28°C', subtitle: 'Круглый год', color: 'text-yellow-300' },
    { icon: Heart, title: 'Семейный отдых', subtitle: 'Детская анимация', color: 'text-pink-300' },
    { icon: Waves, title: '10 мин до пляжа', subtitle: 'Черное море', color: 'text-blue-300' },
    { icon: Gift, title: 'Подарочные дни', subtitle: 'При бронировании', color: 'text-orange-300' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {services.map((service, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 rounded-xl text-center hover:bg-white/20 transition-all duration-300 group">
          <div className="w-12 h-12 lg:w-14 lg:h-14 mx-auto mb-3 lg:mb-4 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <service.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${service.color}`} />
          </div>
          <h4 className="font-semibold text-sm lg:text-base mb-1 text-white">{service.title}</h4>
          <p className="text-xs lg:text-sm text-gray-300">{service.subtitle}</p>
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
      {/* HERO БЛОК - Только заголовок и основная CTA */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
        
        {/* Видео фон */}
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
          
          {/* Оверлей */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Главный контент - только заголовок и CTA */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full text-center">
            
            {/* Бейдж с локацией */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 lg:px-6 py-2 lg:py-3 rounded-full mb-6 lg:mb-8 text-sm lg:text-base font-medium text-white">
              <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
              <span>Витязево • 10 минут до пляжа</span>
              <Waves className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
            </div>

            {/* Главный заголовок */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold mb-4 lg:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Отель</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Абсолют</span>
            </h1>

            {/* Подзаголовок */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed mb-8 lg:mb-12 max-w-3xl mx-auto px-4">
              Роскошный семейный отдых в сердце черноморского побережья с подогреваемым бассейном и домашней атмосферой
            </p>

            {/* ГЛАВНОЕ СПЕЦПРЕДЛОЖЕНИЕ - выделено */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-1 rounded-3xl mb-8 lg:mb-12 max-w-lg mx-auto animate-pulse">
              <div className="bg-black/80 backdrop-blur-sm p-6 lg:p-8 rounded-3xl text-center relative overflow-hidden">
                {/* Анимированный фон */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 animate-pulse"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 animate-bounce" />
                    <span className="text-yellow-300 font-bold text-sm lg:text-base">СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</span>
                    <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                  </div>
                  
                  <div className="flex items-baseline justify-center gap-2 mb-3">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                      от {minPrice.toLocaleString('ru-RU')}{CURRENCY.symbol}
                    </span>
                    <span className="text-gray-300 text-lg lg:text-xl">/сутки</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm lg:text-base">
                    <Gift className="w-4 h-4 lg:w-5 lg:h-5 text-orange-300" />
                    <span className="text-orange-200 font-medium">ПОДАРОЧНЫЕ ДНИ при длительном проживании</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Основные CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-8 lg:mb-12">
              <Button
                onClick={() => setShowBookingForm(!showBookingForm)}
                variant="primary"
                size="xl"
                icon={<Calendar className="w-6 h-6" />}
                iconPosition="left"
                className="text-lg lg:text-xl px-8 lg:px-12 py-4 lg:py-5 font-bold min-w-[280px] shadow-2xl"
              >
                Забронировать сейчас
              </Button>
              
              <Link to="/rooms">
                <Button
                  variant="secondary"
                  size="xl"
                  icon={<ChevronRight className="w-6 h-6" />}
                  iconPosition="right"
                  className="text-lg lg:text-xl px-8 lg:px-12 py-4 lg:py-5 font-semibold bg-white/20 border-white/30 text-white hover:bg-white/30 min-w-[280px]"
                >
                  Смотреть номера
                </Button>
              </Link>
            </div>

            {/* Контактная информация */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 lg:gap-8 text-sm lg:text-base text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
                <a href="tel:+79883184825" className="hover:text-white transition-colors font-medium">
                  +7(988)318-48-25
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
                <span>Рейтинг 4.8/5 • 156+ отзывов</span>
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
          aria-label="Прокрутить вниз"
        >
          <ArrowDown className="w-5 h-5 lg:w-6 lg:h-6 animate-bounce" />
        </button>
      </section>

      {/* ФОРМА БРОНИРОВАНИЯ - отдельная секция */}
      {showBookingForm && (
        <section className="py-12 lg:py-20 bg-gradient-to-b from-gray-900 to-blue-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuickBookingForm />
          </div>
        </section>
      )}

      {/* УСЛУГИ - отдельная секция */}
      <section id="services" className="py-12 lg:py-20 bg-gradient-to-b from-blue-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
              Уникальные преимущества отеля "Абсолют" для незабываемого отдыха
            </p>
          </div>
          
          <ServicesSection />
        </div>
      </section>

      {/* СТАТИСТИКА - отдельная секция */}
      <section className="py-12 lg:py-20 bg-gradient-to-b from-gray-800 to-blue-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Наши достижения
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
              Цифры, которые говорят о качестве нашего сервиса
            </p>
          </div>
          
          <StatsSection />
        </div>
      </section>
    </>
  );
};

export default HeroSection; 