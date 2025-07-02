import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Star, MapPin } from 'lucide-react';
import { cn } from '../../utils';
import { NAVIGATION, HOTEL_INFO, CONTACTS, LOGO } from '../../constants';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Отслеживание скролла для изменения стиля хедера
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрытие меню при изменении роута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const primaryPhone = CONTACTS.find(contact => 
    contact.type === 'phone' && contact.primary
  )?.value;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
          isScrolled || isMenuOpen
            ? 'bg-white/95 backdrop-blur-xl shadow-ocean-lg border-b border-ocean-100'
            : 'bg-transparent'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Логотип */}
            <Link
              to="/"
              className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-ocean-gradient rounded-2xl flex items-center justify-center shadow-ocean group-hover:scale-105 transition-transform duration-300">
                <img
                  src={LOGO.main}
                  alt={`${HOTEL_INFO.name} логотип`}
                  className="w-8 h-8 lg:w-12 lg:h-12 object-contain filter brightness-0 invert"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className={cn(
                  'font-bold text-lg lg:text-xl transition-all duration-300',
                  'text-gray-800'
                )}>
                  <span className="bg-gradient-to-r from-ocean-600 to-ocean-500 bg-clip-text text-transparent">
                    {HOTEL_INFO.name}
                  </span>
                </h1>
                <p className={cn(
                  'text-xs lg:text-sm transition-all duration-300',
                  'text-gray-600'
                )}>
                  Витязево
                </p>
              </div>
            </Link>

            {/* Десктопная навигация */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    'relative font-medium transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg',
                    isActiveLink(item.path)
                      ? 'text-ocean-600 bg-ocean-100 shadow-md'
                      : `${isScrolled ? 'text-slate-700 hover:text-ocean-600' : 'text-white hover:text-gold-300'} hover:bg-white/10 backdrop-blur-sm`
                  )}
                >
                  {item.label}
                  {isActiveLink(item.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gold-500 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Контактная информация и кнопки */}
            <div className="hidden xl:flex items-center space-x-4">
              {/* Телефон */}
              <div className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300",
                isScrolled
                  ? 'text-slate-700 border-ocean-200 hover:border-ocean-400 hover:text-ocean-600'
                  : 'text-white border-white/30 hover:border-gold-400 hover:text-gold-300'
              )}>
                <Phone 
                  className={cn(
                    'w-4 h-4 transition-all duration-300 text-gold-400'
                  )} 
                />
                <a
                  href={`tel:${primaryPhone}`}
                  className={cn(
                    'font-semibold transition-all duration-300',
                    'group-hover:text-ocean-600'
                  )}
                >
                  {primaryPhone}
                </a>
              </div>

              {/* Рейтинг */}
              <div className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300",
                isScrolled
                  ? 'text-slate-700 border-ocean-200'
                  : 'text-white border-white/30'
              )}>
                <Star className={cn(
                  'w-4 h-4 text-gold-400 fill-current'
                )} />
                <span className={cn(
                  'font-semibold text-sm',
                  isScrolled ? 'text-slate-700' : 'text-gold-300'
                )}
                >
                  4.8/5
                </span>
              </div>

              {/* Кнопка бронирования */}
              <Link to="/booking" className="ml-4">
                <Button
                  variant="primary"
                  size="md"
                  className="bg-ocean-gradient hover:shadow-ocean-lg hover:scale-105 transition-all duration-300 text-white font-bold"
                >
                  Забронировать
                </Button>
              </Link>
            </div>

            {/* Мобильная кнопка меню */}
            <button
              onClick={toggleMenu}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors duration-300',
                isScrolled || isMenuOpen
                  ? 'text-slate-700 hover:text-ocean-600'
                  : 'text-white hover:text-gold-300'
              )}
              aria-label="Открыть меню"
            >
              <div className="relative w-6 h-6">
                <Menu className={cn(
                  "w-6 h-6 absolute transition-all duration-300",
                  isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                )} />
                <X className={cn(
                  "w-6 h-6 absolute transition-all duration-300",
                  isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                )} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div className={cn(
        "fixed inset-0 z-40 lg:hidden transition-all duration-300",
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMenu}
        />

        {/* Меню */}
        <div className={cn(
          "absolute top-16 right-0 bottom-0 w-80 max-w-[90vw] bg-white shadow-2xl transition-all duration-300 ease-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="p-6 space-y-6 h-full overflow-y-auto">
            {/* Навигация */}
            <div className="space-y-3">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    'block px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105',
                    isActiveLink(item.path)
                      ? 'bg-ocean-600 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-ocean-50 hover:text-ocean-600'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Контактная информация */}
            <div className="border-t border-ocean-100 pt-6">
              <h3 className="font-semibold text-ocean-800 mb-4">
                Контакты
              </h3>
              
              <div className="space-y-3">
                <a
                  href={`tel:${primaryPhone}`}
                  className="flex items-center space-x-3 text-slate-700 hover:text-ocean-600 transition-all duration-300 hover:scale-105 p-3 rounded-xl hover:bg-ocean-50 group"
                >
                  <div className="w-10 h-10 bg-ocean-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-ocean-600" />
                  </div>
                  <span className="font-medium">{primaryPhone}</span>
                </a>
                
                <div className="flex items-start space-x-3 text-slate-500 p-3">
                  <div className="w-10 h-10 bg-ocean-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-ocean-600" />
                  </div>
                  <span className="text-sm">{HOTEL_INFO.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 