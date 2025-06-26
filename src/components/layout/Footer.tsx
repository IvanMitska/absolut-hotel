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
    <footer className="bg-primary-900 text-white">
      {/* Основной контент футера */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О отеле */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
                <span className="text-primary-900 font-bold text-xl">А</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{HOTEL_INFO.name}</h3>
                <p className="text-white/70 text-sm">Витязево</p>
              </div>
            </div>
            
            <p className="text-white/80 mb-6 leading-relaxed max-w-md">
              {HOTEL_INFO.description}
            </p>
            
            {/* Социальные сети */}
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent-400 hover:text-primary-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent-400 hover:text-primary-900 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Навигация</h4>
            <nav className="space-y-3">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="block text-white/80 hover:text-accent-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Контакты</h4>
            <div className="space-y-4">
              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center space-x-3 text-white/80 hover:text-accent-400 transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>{primaryPhone}</span>
              </a>
              
              <a
                href={`mailto:${primaryEmail}`}
                className="flex items-center space-x-3 text-white/80 hover:text-accent-400 transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>{primaryEmail}</span>
              </a>
              
              <div className="flex items-start space-x-3 text-white/80">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{HOTEL_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {currentYear} {HOTEL_INFO.name}. Все права защищены.
            </p>
            
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-white/60 hover:text-accent-400 transition-colors"
              >
                Политика конфиденциальности
              </Link>
              <Link 
                to="/terms" 
                className="text-white/60 hover:text-accent-400 transition-colors"
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