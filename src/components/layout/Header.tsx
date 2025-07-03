import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { useMobileMenu } from '../../contexts/MobileMenuContext';

const Header: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useMobileMenu();
  const location = useLocation();

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'Номера', href: '/rooms' },
    { name: 'Контакты', href: '/contacts' },
    { name: 'Бронирование', href: '/booking' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const closeMenu = () => {
    toggleMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm border-b border-slate-200/60 transform-gpu will-change-transform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex justify-between items-center h-20">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 lg:w-16 lg:h-16">
              <img 
                src="/images/logo/logo-original.png" 
                alt="Отель Абсолют" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-800">
                Отель Абсолют
              </h1>
              <p className="text-sm font-medium text-slate-500">
                Витязево
              </p>
            </div>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-semibold text-slate-700 hover:text-teal-600 transition-colors duration-200 relative pb-2 ${
                  isActive(item.href) ? 'text-teal-600' : ''
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-yellow-400 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Контактная информация и кнопка бронирования */}
          <div className="hidden xl:flex items-center gap-6">
            <div className="relative group">
              <a href="tel:+79883184825" className="p-3 rounded-full hover:bg-slate-100 transition-colors duration-300">
                <Phone className="w-5 h-5 text-transparent bg-gradient-to-r from-teal-500 to-yellow-400 bg-clip-text" />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 
                             bg-slate-800 text-white text-sm rounded-md 
                             opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
                             transition-all duration-200 origin-bottom pointer-events-none z-[90]">
                +7(988)318-48-25
                <div className="absolute top-full left-1/2 -ml-1 h-0 w-0 border-x-4 border-x-transparent border-t-[5px] border-t-slate-800"></div>
              </div>
            </div>

            <Link to="/booking">
              <Button
                variant="teal-gold"
                size="md"
                className="font-semibold"
              >
                Забронировать
              </Button>
            </Link>
          </div>

          {/* Мобильное меню - кнопка */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-slate-700 hover:text-teal-600 relative z-[110]"
            aria-label="Открыть меню"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Мобильное меню - содержимое */}
        {isMenuOpen && (
          <>
            <div 
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[105]"
              onClick={closeMenu}
            />
            
            <div className="lg:hidden absolute top-full left-0 right-0 mx-4 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/50 z-[110]">
              <div className="py-4 px-4">
                <nav className="flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={closeMenu}
                      className={`px-4 py-3 rounded-lg font-semibold text-base transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-teal-500/10 to-yellow-400/10 text-teal-600'
                          : 'text-slate-700 hover:bg-slate-100/70'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-4">
                  <div className="relative h-10">
                    <a
                      href="tel:+79883184825"
                      className="absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-2 py-2 hover:bg-slate-100/70 transition-colors duration-200 rounded-lg"
                    >
                      <Phone className="w-5 h-5 text-transparent bg-gradient-to-r from-teal-500 to-yellow-400 bg-clip-text"/>
                      <span className="text-transparent bg-gradient-to-r from-teal-500 to-yellow-400 bg-clip-text font-semibold whitespace-nowrap">
                        +7(988)318-48-25
                      </span>
                    </a>
                  </div>

                  <Link to="/booking" onClick={closeMenu} className="block">
                    <Button
                      variant="teal-gold"
                      size="lg"
                      className="w-full font-semibold"
                    >
                      Забронировать
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 