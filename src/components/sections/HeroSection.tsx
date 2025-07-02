import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Star, 
  Users, 
  ArrowDown,
  Sparkles, 
  Gift,
  ChevronRight,
  MapPin,
  Waves
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
    const params = new URLSearchParams({
      ...bookingData,
      guests: bookingData.guests.toString()
    }).toString();
    window.location.href = `/booking?${params}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-colored-lg border border-teal-200/30">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-gold text-white rounded-full px-4 py-2 text-sm font-semibold mb-4 shadow-teal">
          <Sparkles className="w-4 h-4 animate-sparkle" />
          Быстрое бронирование
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
          Забронировать сейчас
        </h3>
        <p className="text-slate-600">Лучшие цены и гарантия мест</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Заезд
            </label>
            <input
              type="date"
              value={bookingData.checkIn}
              min={today}
              onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
              className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-teal-400 focus:ring-4 focus:ring-teal-200/30 transition-all duration-300 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Выезд
            </label>
            <input
              type="date"
              value={bookingData.checkOut}
              min={bookingData.checkIn || tomorrow}
              onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
              className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-teal-400 focus:ring-4 focus:ring-teal-200/30 transition-all duration-300 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Количество гостей
          </label>
          <select
            value={bookingData.guests}
            onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
            className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-teal-400 focus:ring-4 focus:ring-teal-200/30 transition-all duration-300 bg-white"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-6"
          icon={<Calendar className="w-5 h-5" />}
          iconPosition="left"
        >
          Забронировать номер
        </Button>
      </form>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  // Минимальная цена для акции
  const minPrice = Math.min(...ROOM_CATEGORIES.map(room => room.price.basePrice));

  return (
    <>
      {/* HERO СЕКЦИЯ - Современный минимализм 2025 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
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
          </video>
          
          {/* Современный overlay */}
          <div className="absolute inset-0 bg-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        </div>

        {/* Главный контент */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto w-full text-center">
            
            {/* Локация - современный бейдж */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-8 text-sm font-semibold text-white shadow-glass border border-white/20 animate-slide-in-up">
              <MapPin className="w-4 h-4 text-gold-300" />
              <span>Витязево • 10 минут до пляжа</span>
              <Waves className="w-4 h-4 text-teal-300 animate-float" />
            </div>

            {/* Заголовок - современная типографика */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-800 mb-6 leading-tight animate-slide-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <span className="bg-gradient-to-r from-white to-cream-100 bg-clip-text text-transparent drop-shadow-2xl">
                Отель
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-300 to-gold-300 bg-clip-text text-transparent drop-shadow-2xl">
                Абсолют
              </span>
            </h1>

            {/* Подзаголовок */}
            <p className="text-lg sm:text-xl lg:text-2xl text-cream-100 leading-relaxed mb-8 max-w-3xl mx-auto font-medium drop-shadow-md animate-slide-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              Роскошный семейный отдых в сердце черноморского побережья с подогреваемым бассейном
            </p>

            {/* КОМПАКТНАЯ АКЦИЯ - Glassmorphism */}
            <div className="relative mb-8 max-w-md mx-auto animate-slide-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <div className="bg-gradient-to-r from-gold-300/10 to-gold-400/10 p-0.5 rounded-2xl shadow-gold-lg">
                <div className="bg-slate-900/90 backdrop-blur-xl px-6 py-4 rounded-2xl text-center border border-gold-300/20 relative overflow-hidden">
                  {/* Тонкий анимированный фон */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-300/5 via-gold-400/10 to-gold-300/5 animate-pulse"></div>
                  
                  <div className="relative z-10">
                    {/* Компактный заголовок */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-gold-300 animate-sparkle" />
                      <span className="text-xs font-semibold text-gold-300 tracking-wide">СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</span>
                      <Sparkles className="w-4 h-4 text-gold-300 animate-sparkle" style={{ animationDelay: '0.5s' }} />
                    </div>
                    
                    {/* Цена */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-white">
                        от {minPrice.toLocaleString('ru-RU')}{CURRENCY.symbol}
                      </span>
                      <span className="text-sm text-cream-200">/сутки</span>
                    </div>
                    
                    {/* Подарки */}
                    <div className="flex items-center justify-center gap-1 text-xs">
                      <Gift className="w-3 h-3 text-gold-300" />
                      <span className="text-gold-200">Подарочные дни при бронировании</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA КНОПКИ - Современные компактные */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
              <Button
                onClick={() => setShowBookingForm(!showBookingForm)}
                variant="teal-gold"
                size="lg"
                icon={<Calendar className="w-5 h-5" />}
                iconPosition="left"
                className="min-w-[240px]"
              >
                Забронировать сейчас
              </Button>
              
              <Link to="/rooms">
                <Button
                  variant="glass"
                  size="lg"
                  icon={<ChevronRight className="w-5 h-5" />}
                  iconPosition="right"
                  className="min-w-[240px]"
                >
                  Смотреть номера
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Стрелка прокрутки */}
        <button
          onClick={() => {
            const nextSection = document.getElementById('stats');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20 shadow-glass animate-bounce"
          aria-label="Прокрутить вниз"
        >
          <ArrowDown className="w-6 h-6 text-gold-300" />
        </button>
      </section>

      {/* ФОРМА БРОНИРОВАНИЯ - отдельная секция */}
      {showBookingForm && (
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Забронируйте свой отдых
              </h2>
              <p className="text-lg text-slate-600">
                Заполните форму и получите подтверждение мгновенно
              </p>
            </div>
            <QuickBookingForm />
          </div>
        </section>
      )}

      {/* СТАТИСТИКА - отдельная секция */}
      <section id="stats" className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Нам доверяют
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Цифры, которые говорят о качестве нашего сервиса
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Довольных гостей', icon: Users, color: 'text-teal-500' },
              { number: '4.8', label: 'Рейтинг отеля', suffix: '/5', icon: Star, color: 'text-gold-500' },
              { number: '6', label: 'Категорий номеров', icon: Calendar, color: 'text-teal-400' },
              { number: '24/7', label: 'Поддержка гостей', icon: Star, color: 'text-gold-400' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div className="bg-white p-6 rounded-3xl hover:bg-gradient-to-br hover:from-white hover:to-slate-50 transition-all duration-500 group-hover:scale-105 shadow-sm hover:shadow-colored border border-slate-100">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                    {stat.number}<span className="text-gold-500">{stat.suffix || ''}</span>
                  </div>
                  <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ - отдельная секция */}
      <section className="py-16 bg-gradient-to-b from-ocean-600 to-ocean-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
            Свяжитесь с нами
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href="tel:+79883184825"
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 shadow-glass"
            >
              <div className="text-2xl font-bold mb-2">+7(988)318-48-25</div>
              <div className="text-cream-200">Круглосуточно</div>
            </a>
            
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-white border border-white/20 shadow-glass">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-gold-300 fill-current" />
                <span className="text-2xl font-bold">4.8/5</span>
              </div>
              <div className="text-cream-200">156+ отзывов</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection; 