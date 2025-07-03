import React from 'react';
import { MapPin, Waves } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <section className="relative py-20 sm:py-28 md:py-32 flex items-center justify-center overflow-hidden bg-slate-800">
      {/* Background Image/Video can be added here */}
      <div className="absolute inset-0">
        <img
          src="/images/rooms/standard-deluxe/1.webp"
          alt="Интерьер номера отеля Абсолют"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center w-full px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-6 text-sm font-semibold text-white shadow-glass border border-white/20 animate-slide-in-up">
          <MapPin className="w-4 h-4 text-gold-300" />
          <span>Отель "Абсолют"</span>
          <Waves className="w-4 h-4 text-teal-300 animate-float" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4 text-white drop-shadow-xl animate-slide-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-cream-100 max-w-3xl mx-auto leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default PageHeader; 