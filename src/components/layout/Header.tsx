import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'Номера', href: '/rooms' },
    { name: 'Контакты', href: '/contacts' },
    { name: 'Бронирование', href: '/booking' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-colored border-b border-ocean-100/30' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Логотип с современным дизайном */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              {/* Glassmorphism контейнер для логотипа */}
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-500 to-teal-400 rounded-2xl shadow-colored group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-0.5 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <img 
                  src="/images/logo/logo.png" 
                  alt="Отель Абсолют" 
                  className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-display font-800">
                <span className={`transition-colors duration-300 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-ocean-600 to-teal-500 bg-clip-text text-transparent' 
                    : 'text-white drop-shadow-lg'
                }`}>
                  Отель Абсолют
                </span>
              </h1>
              <p className={`text-xs lg:text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-slate-600' : 'text-cream-200'
              }`}>
                Витязево
              </p>
            </div>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-ocean-500 to-teal-400 text-white shadow-colored'
                    : scrolled 
                      ? 'text-slate-700 hover:text-ocean-600 hover:bg-ocean-50/80 backdrop-blur-sm' 
                      : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gold-400 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Контактная информация и кнопка бронирования */}
          <div className="hidden xl:flex items-center gap-4">
            {/* Только иконка телефона с tooltip */}
            <div className="relative group">
              <a
                href="tel:+79883184825"
                className={`p-3 rounded-xl border transition-all duration-300 hover:scale-110 ${
                  scrolled
                    ? 'text-slate-700 border-ocean-200/50 hover:border-ocean-400 hover:text-ocean-600 bg-white/50'
                    : 'text-white border-white/30 hover:border-gold-400 hover:text-gold-300 bg-white/10'
                } backdrop-blur-sm shadow-sm hover:shadow-colored`}
              >
                <Phone className="w-5 h-5" />
              </a>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                +7(988)318-48-25
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
              </div>
            </div>

            {/* Кнопка бронирования - современный дизайн */}
            <Link to="/booking">
              <Button
                variant="primary"
                size="md"
                className="h-12 px-7 rounded-xl bg-gradient-to-r from-ocean-500 to-teal-400 hover:from-ocean-600 hover:to-teal-500 text-white font-semibold text-sm shadow-colored hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
              >
                Забронировать
              </Button>
            </Link>
          </div>

          {/* Мобильное меню - современная кнопка */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
              scrolled || isMenuOpen
                ? 'text-slate-700 hover:text-ocean-600 bg-white/50 backdrop-blur-sm'
                : 'text-white hover:text-gold-300 bg-white/10 backdrop-blur-sm'
            } shadow-sm`}
            aria-label="Открыть меню"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Мобильное меню - glassmorphism дизайн */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-ocean-100/30 shadow-colored">
            <div className="py-6 px-4">
              <nav className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-ocean-500 to-teal-400 text-white shadow-colored'
                        : 'text-slate-700 hover:text-ocean-600 hover:bg-ocean-50/80'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Мобильные контакты */}
              <div className="mt-8 pt-6 border-t border-ocean-100/50 space-y-4">
                <a
                  href="tel:+79883184825"
                  className="flex items-center gap-4 px-6 py-4 rounded-xl text-slate-700 hover:text-ocean-600 hover:bg-ocean-50/80 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-ocean-500 to-teal-400 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">+7(988)318-48-25</span>
                </a>

                <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full h-14 bg-gradient-to-r from-ocean-500 to-teal-400 text-white font-semibold text-base rounded-xl shadow-colored"
                  >
                    Забронировать номер
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 