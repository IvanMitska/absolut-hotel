import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDown,
  Sparkles, 
  Gift,
  ChevronRight,
  MapPin,
  Waves,
  Calendar,
  Users,
  Star
} from 'lucide-react';
import { ROOM_CATEGORIES, CURRENCY, HOTEL_INFO } from '../../constants';
import Button from '../ui/Button';

interface HeroSectionProps {
  nextSectionRef: React.RefObject<HTMLElement>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ nextSectionRef }) => {
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
          
          {/* Усиленный overlay для лучшей читаемости */}
          <div className="absolute inset-0 bg-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-slate-900/40" />
        </div>

        {/* Главный контент */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto w-full text-center">
            
            {/* Локация - современный бейдж */}
            <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-2 rounded-full mb-8 text-sm font-semibold text-white shadow-glass border border-white/40">
              <MapPin className="w-4 h-4 text-gold-300" />
              <span>Витязево • 10 минут до пляжа</span>
              <Waves className="w-4 h-4 text-teal-300" />
            </div>

            {/* Заголовок - современная типографика с улучшенным контрастом */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-800 mb-6 leading-tight">
              <span className="text-white drop-shadow-2xl" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                Отель
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-300 to-gold-300 bg-clip-text text-transparent drop-shadow-2xl" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                Абсолют
              </span>
            </h1>

            {/* Подзаголовок с лучшим контрастом */}
            <p className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed mb-8 max-w-3xl mx-auto font-medium drop-shadow-md" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
              Роскошный семейный отдых в сердце черноморского побережья с подогреваемым бассейном
            </p>

            {/* КОМПАКТНАЯ АКЦИЯ - Glassmorphism */}
            <div className="relative mb-8 max-w-md mx-auto">
              <div className="bg-gradient-to-r from-gold-300/10 to-gold-400/10 p-0.5 rounded-2xl shadow-gold-lg">
                <div className="bg-slate-900/90 backdrop-blur-xl px-6 py-4 rounded-2xl text-center border border-gold-300/20 relative overflow-hidden">
                  {/* Тонкий фон */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-300/5 via-gold-400/10 to-gold-300/5"></div>
                  
                  <div className="relative z-10">
                    {/* Компактный заголовок */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-gold-300" />
                      <span className="text-xs font-semibold text-gold-300 tracking-wide">СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</span>
                      <Sparkles className="w-4 h-4 text-gold-300" />
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/booking">
                <Button
                  variant="teal-gold"
                  size="lg"
                  icon={<Calendar className="w-5 h-5" />}
                  iconPosition="left"
                  className="min-w-[240px]"
                >
                  Забронировать сейчас
                </Button>
              </Link>
              
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
        <div 
          className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
        >
          <button
            onClick={() => {
              nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white/10 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20 shadow-glass animate-bounce"
            aria-label="Прокрутить вниз"
          >
            <ArrowDown className="w-6 h-6 text-gold-300" />
          </button>
        </div>
      </section>

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