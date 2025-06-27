import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { cn } from '../../utils';
import { NAVIGATION, HOTEL_INFO, CONTACTS } from '../../constants';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Отслеживание скролла для изменения стиля хедера
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200/50'
            : 'bg-transparent'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Логотип */}
            <Link
              to="/"
              className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-105"
            >
              <div className={cn(
                "w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                isScrolled 
                  ? "bg-accent-600 shadow-md" 
                  : "bg-white/20 backdrop-blur-sm border border-white/30"
              )}>
                <span className="text-white font-bold text-lg lg:text-xl">А</span>
              </div>
              <div className="hidden sm:block">
                <h1 className={cn(
                  'font-bold text-lg lg:text-xl transition-all duration-300',
                  isScrolled ? 'text-primary-900' : 'text-white drop-shadow-md'
                )}>
                  {HOTEL_INFO.name}
                </h1>
                <p className={cn(
                  'text-xs lg:text-sm transition-all duration-300',
                  isScrolled ? 'text-primary-500' : 'text-white/90 drop-shadow-sm'
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
                    'relative font-medium transition-all duration-300 hover:text-accent-600 hover:scale-105',
                    isActiveLink(item.path)
                      ? 'text-accent-600'
                      : isScrolled
                      ? 'text-primary-900'
                      : 'text-white drop-shadow-sm'
                  )}
                >
                  {item.label}
                  {isActiveLink(item.path) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-600 rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Контактная информация и кнопки */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Телефон */}
              <div className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300",
                isScrolled 
                  ? "hover:bg-primary-50" 
                  : "hover:bg-white/10 backdrop-blur-sm"
              )}>
                <Phone 
                  className={cn(
                    'w-4 h-4 transition-colors duration-300',
                    isScrolled ? 'text-primary-900' : 'text-white drop-shadow-sm'
                  )} 
                />
                <a
                  href={`tel:${primaryPhone}`}
                  className={cn(
                    'font-medium hover:text-accent-600 transition-all duration-300 hover:scale-105',
                    isScrolled ? 'text-primary-900' : 'text-white drop-shadow-sm'
                  )}
                >
                  {primaryPhone}
                </a>
              </div>

              {/* Кнопка бронирования */}
              <Link to="/booking" className="ml-4">
                <Button
                  variant="primary"
                  size="sm"
                  className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Забронировать
                </Button>
              </Link>
            </div>

            {/* Мобильная кнопка меню */}
            <button
              onClick={toggleMenu}
              className={cn(
                'lg:hidden p-2 rounded-md transition-all duration-300 hover:scale-110',
                isScrolled
                  ? 'text-primary-900 hover:bg-primary-50'
                  : 'text-white hover:bg-white/20 backdrop-blur-sm drop-shadow-sm'
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
            {/* Контактная информация */}
            <div className="border-b border-neutral-200 pb-6">
              <h3 className="font-semibold text-primary-900 mb-4">
                Контакты
              </h3>
              
              <div className="space-y-3">
                <a
                  href={`tel:${primaryPhone}`}
                  className="flex items-center space-x-3 text-primary-900 hover:text-accent-600 transition-all duration-200 hover:scale-105 p-2 rounded-lg hover:bg-accent-50"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">{primaryPhone}</span>
                </a>
                
                <div className="flex items-start space-x-3 text-primary-500 p-2">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{HOTEL_INFO.address}</span>
                </div>
              </div>
            </div>

            {/* Навигация */}
            <nav className="space-y-2">
              {NAVIGATION.map((item, index) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    'block px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105',
                    'animate-fade-in-up',
                    isActiveLink(item.path)
                      ? 'bg-accent-50 text-accent-700 border-l-4 border-accent-600 shadow-sm'
                      : 'text-primary-700 hover:bg-neutral-50 hover:text-primary-900 hover:shadow-sm'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Кнопка бронирования */}
            <div className="pt-6 border-t border-neutral-200">
              <Link to="/booking" onClick={toggleMenu}>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Забронировать номер
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 