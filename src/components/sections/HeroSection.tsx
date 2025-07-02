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
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/30 shadow-xl">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          Быстрое бронирование
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Забронировать сейчас
        </h3>
        <p className="text-gray-600">Лучшие цены и гарантия мест</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Даты */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Заезд
            </label>
            <input
              type="date"
              value={bookingData.checkIn}
              min={today}
              onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 transition-all duration-300 bg-white/80"
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
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 transition-all duration-300 bg-white/80"
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
            className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 transition-all duration-300 bg-white/80"
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
            className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 transition-all duration-300 bg-white/80"
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
          className="w-full"
          icon={<Calendar className="w-5 h-5" />}
          iconPosition="left"
        >
          Забронировать номер
        </Button>

        {/* Дополнительная информация */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 pt-2">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Бесплатная отмена
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Мгновенное подтверждение
          </div>
        </div>
      </form>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Находим минимальную цену
  const minPrice = Math.min(...ROOM_CATEGORIES.map(room => room.price.basePrice));

  return (
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Главный контент */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Левая часть - Основная информация */}
            <div className="text-center lg:text-left text-white">
              
              {/* Бейдж с локацией */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 text-sm font-medium">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span>Витязево • 10 минут до пляжа</span>
                <Waves className="w-4 h-4 text-blue-400" />
              </div>

              {/* Главный заголовок */}
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Отель</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Абсолют</span>
              </h1>

              {/* Подзаголовок */}
              <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                Роскошный семейный отдых в сердце черноморского побережья с подогреваемым бассейном и домашней атмосферой
              </p>

              {/* Ключевые преимущества */}
              <div className="grid grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto lg:mx-0">
                {[
                  { icon: Sun, title: 'Бассейн 26-28°C', subtitle: 'Круглый год' },
                  { icon: Heart, title: 'Семейный отдых', subtitle: 'Детская анимация' },
                  { icon: Users, title: '156+ гостей', subtitle: 'Рейтинг 4.8/5' },
                  { icon: Gift, title: 'Подарочные дни', subtitle: 'При бронировании' }
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center hover:bg-white/20 transition-all duration-300">
                    <div className="w-10 h-10 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-yellow-300" />
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-300">{item.subtitle}</p>
                  </div>
                ))}
              </div>

              {/* Цена и основные CTA */}
              <div className="space-y-6">
                {/* Блок с ценой */}
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-300 font-semibold">Специальное предложение</span>
                  </div>
                  <div className="flex items-baseline justify-center lg:justify-start gap-3 mb-2">
                    <span className="text-4xl lg:text-5xl font-bold text-white">
                      от {minPrice.toLocaleString('ru-RU')}{CURRENCY.symbol}
                    </span>
                    <span className="text-gray-300 text-lg">/сутки</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      🎁 ПОДАРОЧНЫЕ ДНИ
                    </span>
                    <span className="text-gray-300 text-sm">при длительном проживании</span>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => setShowBookingForm(!showBookingForm)}
                    variant="primary"
                    size="lg"
                    icon={<Calendar className="w-5 h-5" />}
                    iconPosition="left"
                    className="text-lg px-8 py-4 font-bold"
                  >
                    Забронировать сейчас
                  </Button>
                  
                  <Link to="/rooms">
                    <Button
                      variant="secondary"
                      size="lg"
                      icon={<ChevronRight className="w-5 h-5" />}
                      iconPosition="right"
                      className="text-lg px-8 py-4 font-semibold bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      Смотреть номера
                    </Button>
                  </Link>
                </div>

                {/* Контактная информация */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-yellow-400" />
                    <a href="tel:+79883184825" className="hover:text-white transition-colors">
                      +7(988)318-48-25
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>Рейтинг 4.8/5 • 156+ отзывов</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая часть - Форма быстрого бронирования */}
            <div className="lg:ml-8">
              {showBookingForm && (
                <QuickBookingForm />
              )}
              
              {!showBookingForm && (
                <div className="text-center lg:text-left">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Статистика отеля
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { number: HOTEL_INFO.reviewsCount, label: 'Довольных гостей', suffix: '+', icon: Users },
                        { number: HOTEL_INFO.rating, label: 'Рейтинг отеля', suffix: '/5', icon: Star },
                        { number: 6, label: 'Категорий номеров', suffix: '', icon: Calendar },
                        { number: 24, label: 'Часа работы', suffix: '/7', icon: Heart },
                      ].map((stat, index) => (
                        <div key={stat.label} className="text-center">
                          <div className="bg-white/10 p-6 rounded-2xl">
                            <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                              <stat.icon className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="text-2xl font-bold text-white mb-2">
                              {stat.number}<span className="text-yellow-300">{stat.suffix}</span>
                            </div>
                            <p className="text-gray-200 text-sm font-medium">{stat.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Стрелка прокрутки */}
      <button
        onClick={() => {
          const nextSection = document.getElementById('about');
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md w-14 h-14 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label="Прокрутить вниз"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default HeroSection; 