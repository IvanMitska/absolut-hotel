import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { HOTEL_INFO, CONTACTS, NAVIGATION, SOCIAL_LINKS } from '../../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const primaryPhone = CONTACTS.find(contact => 
    contact.type === 'phone' && contact.primary
  )?.value;
  
  const primaryEmail = CONTACTS.find(contact => 
    contact.type === 'email' && contact.primary
  )?.value;

  return (
    <footer className="bg-gradient-to-br from-ocean-600 via-teal-600 to-ocean-700 text-cream-100 relative overflow-hidden">
      {/* Премиум декоративные элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-ocean-700/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Основной контент футера */}
      <div className="container-custom py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* О отеле */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-24 h-24 md:w-16 md:h-16 mb-4">
              <img 
                src="/images/logo/logo-original.png" 
                alt="Отель Абсолют" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{HOTEL_INFO.name}</h3>
            <p className="text-cream-200 text-sm mb-6">Витязево</p>
            
            <p className="text-sm text-cream-200 mb-8 leading-relaxed max-w-md">
              {HOTEL_INFO.description}
            </p>
            
            {/* Социальные сети */}
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 hover:text-gold-300 border border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 hover:text-gold-300 border border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-0 md:mt-4">
            <h4 className="text-xl font-semibold mb-6 text-white">Навигация</h4>
            <nav className="space-y-4">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="block text-cream-200 hover:text-gold-300 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Контакты */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-0 md:mt-4">
            <h4 className="text-xl font-semibold mb-6 text-white">Контакты</h4>
            <div className="space-y-5">
              <a
                href={`tel:${primaryPhone}`}
                className="inline-flex items-center space-x-3 group text-cream-200 hover:text-gold-300 transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0 group-hover:text-gold-300" />
                <span>{primaryPhone}</span>
              </a>
              
              <a
                href={`mailto:${primaryEmail}`}
                className="inline-flex items-center space-x-3 group text-cream-200 hover:text-gold-300 transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0 group-hover:text-gold-300" />
                <span>{primaryEmail}</span>
              </a>
              
              <div className="inline-flex items-start space-x-3 text-cream-200">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span className="text-sm">{HOTEL_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="border-t border-white/10 relative">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-cream-300 text-sm text-center md:text-left">
              © {currentYear} {HOTEL_INFO.name}. Все права защищены.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-cream-300 hover:text-gold-300 transition-colors"
              >
                Политика конфиденциальности
              </Link>
              <Link 
                to="/terms" 
                className="text-cream-300 hover:text-gold-300 transition-colors"
              >
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 