import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
          'glass-header'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Логотип */}
            <Link
              to="/"
              className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={LOGO.main}
                  alt={`${HOTEL_INFO.name} логотип`}
                  className="w-14 h-14 lg:w-16 lg:h-16 object-contain transition-all duration-300 group-hover:rotate-12"
                  onError={(e) => {
                    // Fallback на текст если логотип не загрузился
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-white font-bold text-lg lg:text-xl bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg px-3 py-1 shadow-lg">А</span>
                {/* Анимированное свечение вокруг логотипа */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className={cn(
                  'font-bold text-lg lg:text-xl transition-all duration-300 text-gradient-primary',
                  'group-hover:scale-105'
                )}>
                  {HOTEL_INFO.name}
                </h1>
                <p className={cn(
                  'text-xs lg:text-sm transition-all duration-300',
                  'text-gray-600 group-hover:text-purple-600'
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
                      ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg'
                      : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400'
                  )}
                >
                  {item.label}
                  {isActiveLink(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Контактная информация и кнопки */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Телефон */}
              <div className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 glass-card",
                "hover:scale-105 hover:shadow-lg group"
              )}>
                <Phone 
                  className={cn(
                    'w-5 h-5 transition-all duration-300 text-purple-600',
                    'group-hover:scale-110 group-hover:text-pink-600'
                  )} 
                />
                <a
                  href={`tel:${primaryPhone}`}
                  className={cn(
                    'font-medium transition-all duration-300 text-gray-700',
                    'group-hover:text-purple-700 group-hover:scale-105'
                  )}
                >
                  {primaryPhone}
                </a>
              </div>

              {/* Кнопка бронирования */}
              <Link to="/booking" className="ml-4">
                <button className="btn-gradient-primary text-sm px-6 py-3 relative group overflow-hidden shadow-lg hover:shadow-xl">
                  <span className="relative z-10">Забронировать</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </Link>
            </div>

            {/* Мобильная кнопка меню */}
            <button
              onClick={toggleMenu}
              className={cn(
                'lg:hidden p-3 rounded-xl transition-all duration-300 hover:scale-110 glass-card group',
                'text-gray-700 hover:text-purple-600'
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
          "absolute top-16 right-0 bottom-0 w-80 max-w-[90vw] glass-card shadow-2xl transition-all duration-300 ease-out bg-gradient-to-b from-white/95 to-white/90",
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
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:text-purple-700'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Контактная информация */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-800 mb-4 text-gradient-primary">
                Контакты
              </h3>
              
              <div className="space-y-3">
                <a
                  href={`tel:${primaryPhone}`}
                  className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-105 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-medium">{primaryPhone}</span>
                </a>
                
                <div className="flex items-start space-x-3 text-gray-500 p-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
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