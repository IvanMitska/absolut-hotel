import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import GallerySection from '../components/sections/GallerySection';
import ReviewsSection from '../components/sections/ReviewsSection';
import { HOTEL_ADVANTAGES, HOTEL_INFO, ROOM_CATEGORIES, GUEST_REVIEWS } from '../constants';
import { 
  MapPin, Waves, Heart, Baby, ChefHat, Map, ArrowRight, Star, Quote, Users, 
  Calendar, Phone, Gift, Sparkles, CheckCircle, Shield, Crown, Zap 
} from 'lucide-react';
import Button from '../components/ui/Button';

// Мэппинг иконок с современными альтернативами
const iconMap = {
  'map-pin': MapPin,
  'waves': Waves,
  'heart': Heart,
  'baby': Baby,
  'chef-hat': ChefHat,
  'map': Map,
};

const HomePage: React.FC = () => {
  const aboutSectionRef = useRef<HTMLElement | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero секция */}
      <HeroSection nextSectionRef={aboutSectionRef} />

      {/* О НАС СЕКЦИЯ - Современный glassmorphism дизайн */}
      <section id="about" ref={aboutSectionRef} className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-gold text-white rounded-full px-6 py-3 text-sm font-semibold mb-8 shadow-teal">
              <Heart className="w-5 h-5" />
              Почему нас выбирают
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-800">
              Отель "Абсолют" — ваш идеальный отдых
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {HOTEL_INFO.description}
            </p>
          </div>

          {/* Современная сетка преимуществ с glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOTEL_ADVANTAGES.map((advantage, index) => {
              const IconComponent = iconMap[advantage.icon as keyof typeof iconMap];
              
              return (
                <div
                  key={advantage.title}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-colored hover:shadow-colored-lg transition-all duration-500 group border border-slate-100/50 hover:scale-105 hover:-translate-y-2"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-ocean-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-teal">
                    {IconComponent && (
                      <IconComponent className="w-10 h-10 text-white" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-slate-800 text-center">
                    {advantage.title}
                  </h3>
                  
                  <p className="text-slate-600 text-center leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* НОМЕРА СЕКЦИЯ - Premium glassmorphism карточки */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-ocean-500 to-teal-400 text-white rounded-full px-6 py-3 text-sm font-semibold mb-8 shadow-colored">
              <Users className="w-5 h-5" />
              Наши номера
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-800">
              Выберите идеальный номер
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              От уютного стандарта до просторных апартаментов — каждый номер создан для вашего комфорта
            </p>
          </div>

          {/* Premium сетка номеров */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOM_CATEGORIES.slice(0, 6).map((room, index) => (
              <div
                key={room.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-colored hover:shadow-colored-lg transition-all duration-500 overflow-hidden group border border-slate-100/50 hover:scale-105 hover:-translate-y-2"
              >
                {/* Реальное изображение номера */}
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={room.images[0]} 
                    alt={`${room.name} - фото номера`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  

                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-slate-800">{room.name}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-ocean-600 bg-clip-text text-transparent">
                        {room.price.basePrice.toLocaleString()}₽
                      </div>
                      <div className="text-sm text-slate-500 font-medium">за ночь</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-500" />
                      <span className="font-medium">{room.capacity.total} гостей</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold-500" />
                      <span className="font-medium">{room.size} м²</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <div
                          key={amenity}
                          className="w-3 h-3 bg-gradient-to-r from-teal-400 to-ocean-400 rounded-full shadow-sm"
                          title={amenity}
                        />
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-xs text-slate-500 ml-1 font-medium">
                          +{room.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    <Link to="/booking">
                      <Button
                        variant="teal-gold"
                        size="md"
                        icon={<ArrowRight className="w-4 h-4" />}
                        iconPosition="right"
                        className="text-sm"
                      >
                        Забронировать
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Современная CTA для всех номеров */}
          <div className="text-center mt-16">
            <Link to="/rooms">
              <Button
                variant="outline"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="text-base px-12"
              >
                Посмотреть все номера
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* СТАТИСТИКА - отдельная секция */}
      <section id="stats" className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Нам доверяют
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Цифры, которые говорят о качестве нашего сервиса
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Довольных гостей', icon: Users, color: 'text-teal-500' },
              { number: '4.8', label: 'Рейтинг отеля', suffix: '/5', icon: Star, color: 'text-gold-500' },
              { number: '6', label: 'Категорий номеров', icon: Calendar, color: 'text-teal-400' },
              { number: '24/7', label: 'Поддержка гостей', icon: Star, color: 'text-gold-400' },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="bg-white p-6 rounded-3xl hover:bg-gradient-to-br hover:from-white hover:to-slate-50 transition-all duration-500 group-hover:scale-105 shadow-sm hover:shadow-colored border border-slate-100">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                    {stat.number}<span className="text-gold-500">{stat.suffix || ''}</span>
                  </div>
                  <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ - отдельная секция (обновлённый стиль) */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-12">
            Свяжитесь с нами
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Блок телефона */}
            <a
              href="tel:+79883184825"
              className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl flex flex-col items-center justify-center shadow-colored border border-slate-100/60 transition-all duration-300 hover:shadow-colored-lg hover:-translate-y-1"
            >
              <div className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-ocean-600 transition-colors duration-300">
                +7(988)318-48-25
              </div>
              <div className="text-slate-500 font-medium">Круглосуточно</div>
            </a>

            {/* Блок рейтинга */}
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl flex flex-col items-center justify-center shadow-colored border border-slate-100/60 transition-all duration-300 hover:shadow-colored-lg hover:-translate-y-1">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 text-gold-400 fill-current" />
                <span className="text-2xl font-bold text-slate-800">4.8/5</span>
              </div>
              <div className="text-slate-500 font-medium">156+ отзывов</div>
            </div>
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ */}
      <GallerySection />

      {/* CTA СЕКЦИЯ - Финальный призыв */}
      <section className="py-20 bg-gradient-to-br from-ocean-600 via-teal-600 to-ocean-700 relative overflow-hidden">
        {/* Премиум декоративные элементы */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-ocean-700/20 to-transparent"></div>
          <div className="absolute top-20 right-20 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-gold-300 mx-auto mb-6" />
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Готовы к незабываемому отдыху?
            </h2>
            <p className="text-xl lg:text-2xl text-cream-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Забронируйте номер в отеле "Абсолют" и окунитесь в атмосферу комфорта и гостеприимства
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/booking">
              <Button
                variant="glass"
                size="xl"
                icon={<Calendar className="w-6 h-6" />}
                iconPosition="left"
                className="min-w-[280px] text-lg bg-white/20 hover:bg-white/30 border-2 border-white/30 hover:border-white/50"
              >
                Забронировать сейчас
              </Button>
            </Link>
            
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="group flex items-center gap-3 text-white hover:text-gold-300 transition-all duration-300 hover:scale-105 px-8 py-4 rounded-2xl hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-gold-300/50 min-w-[280px] justify-center"
            >
              <Phone className="w-6 h-6" />
              <span className="text-lg font-semibold">Позвонить: {HOTEL_INFO.phone}</span>
            </a>
          </div>

          {/* Дополнительные гарантии */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: CheckCircle, text: 'Бесплатная отмена' },
              { icon: Shield, text: 'Безопасное бронирование' },
              { icon: Crown, text: 'Лучшие цены' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-3 text-cream-100">
                <item.icon className="w-5 h-5 text-gold-300" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ - в конце перед футером */}
      <ReviewsSection />
    </div>
  );
};

export default HomePage;