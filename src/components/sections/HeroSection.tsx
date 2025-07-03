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
  nextSectionRef: React.RefObject<HTMLElement | null>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ nextSectionRef }) => {
  // Минимальная цена для акции
  const minPrice = Math.min(...ROOM_CATEGORIES.map(room => room.price.basePrice));

  return (
    <>
      {/* HERO СЕКЦИЯ - Современный минимализм 2025 */}
      <section className="relative h-screen flex items-start justify-center overflow-hidden">
        
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
        <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40">
          <div className="max-w-4xl mx-auto w-full text-center">
            
            {/* Локация - современный бейдж */}
            <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-2 rounded-full mb-6 text-sm font-semibold text-white shadow-glass border border-white/40">
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
              <span className="text-white drop-shadow-2xl" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                Абсолют
              </span>
            </h1>

            {/* Подзаголовок с лучшим контрастом */}
            <p className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed mb-16 sm:mb-12 max-w-3xl mx-auto font-medium drop-shadow-md" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
              Роскошный семейный отдых в сердце черноморского побережья с подогреваемым бассейном
            </p>

            {/* КОМПАКТНАЯ АКЦИЯ - Glassmorphism */}
            <div className="relative mt-6 sm:mt-8 mb-10 sm:mb-12 max-w-md mx-auto">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 sm:mb-24">
              <div className="flex-1 max-w-[280px] relative z-30">
                <Link to="/booking">
                  <Button
                    variant="teal-gold"
                    size="lg"
                    icon={<Calendar className="w-5 h-5" />}
                    iconPosition="left"
                    className="w-full"
                  >
                    Забронировать сейчас
                  </Button>
                </Link>
              </div>
              
              <div className="flex-1 max-w-[280px] relative z-30">
                <Link to="/rooms">
                  <Button
                    variant="glass"
                    size="lg"
                    icon={<ChevronRight className="w-5 h-5" />}
                    iconPosition="right"
                    className="w-full"
                  >
                    Смотреть номера
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Стрелка прокрутки */}
        <div 
          className="absolute bottom-24 left-0 right-0 flex justify-center z-20"
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
    </>
  );
};

export default HeroSection; 