import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-white/20'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Логотип */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
            >
              <motion.div
                className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-900 to-secondary-500 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-lg lg:text-xl">А</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className={cn(
                  'font-bold text-lg lg:text-xl transition-colors',
                  isScrolled ? 'text-primary-900' : 'text-white'
                )}>
                  {HOTEL_INFO.name}
                </h1>
                <p className={cn(
                  'text-xs lg:text-sm transition-colors',
                  isScrolled ? 'text-neutral-600' : 'text-white/80'
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
                    'relative font-medium transition-colors hover:text-accent-400',
                    isActiveLink(item.path)
                      ? 'text-accent-400'
                      : isScrolled
                      ? 'text-primary-900'
                      : 'text-white'
                  )}
                >
                  {item.label}
                  {isActiveLink(item.path) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-400 rounded-full"
                      layoutId="activeLink"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Контактная информация и кнопки */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Телефон */}
              <div className="flex items-center space-x-2">
                <Phone 
                  className={cn(
                    'w-4 h-4 transition-colors',
                    isScrolled ? 'text-primary-900' : 'text-white'
                  )} 
                />
                <a
                  href={`tel:${primaryPhone}`}
                  className={cn(
                    'font-medium hover:text-accent-400 transition-colors',
                    isScrolled ? 'text-primary-900' : 'text-white'
                  )}
                >
                  {primaryPhone}
                </a>
              </div>

              {/* Кнопка бронирования */}
              <Link to="/booking" className="ml-4">
                <Button
                  variant="secondary"
                  size="sm"
                >
                  Забронировать
                </Button>
              </Link>
            </div>

            {/* Мобильная кнопка меню */}
            <button
              onClick={toggleMenu}
              className={cn(
                'lg:hidden p-2 rounded-md transition-colors',
                isScrolled
                  ? 'text-primary-900 hover:bg-primary-50'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Открыть меню"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* Меню */}
            <motion.div
              className="fixed top-16 right-0 bottom-0 w-80 max-w-[90vw] bg-white shadow-2xl z-50 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="p-6 space-y-6">
                {/* Контактная информация */}
                <div className="border-b border-neutral-200 pb-6">
                  <h3 className="font-semibold text-primary-900 mb-4">
                    Контакты
                  </h3>
                  
                  <div className="space-y-3">
                    <a
                      href={`tel:${primaryPhone}`}
                      className="flex items-center space-x-3 text-primary-900 hover:text-accent-400 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="font-medium">{primaryPhone}</span>
                    </a>
                    
                    <div className="flex items-start space-x-3 text-neutral-600">
                      <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{HOTEL_INFO.address}</span>
                    </div>
                  </div>
                </div>

                {/* Навигация */}
                <nav className="space-y-1">
                  {NAVIGATION.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={cn(
                        'block px-4 py-3 rounded-lg font-medium transition-colors',
                        isActiveLink(item.path)
                          ? 'bg-primary-50 text-primary-900 border-l-4 border-primary-900'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-900'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Кнопка бронирования */}
                <div className="pt-4 border-t border-neutral-200">
                  <Link to="/booking">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                    >
                      Забронировать номер
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header; 