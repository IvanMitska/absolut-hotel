import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import GallerySection from '../components/sections/GallerySection';
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
  return (
    <div className="min-h-screen">
      {/* Hero секция - уже современная */}
      <HeroSection />

      {/* О НАС СЕКЦИЯ - Современный glassmorphism дизайн */}
      <section id="about" className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-gold text-white rounded-full px-6 py-3 text-sm font-semibold mb-8 shadow-teal animate-slide-in-up">
              <Heart className="w-5 h-5" />
              Почему нас выбирают
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-800 animate-slide-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Отель "Абсолют" — ваш идеальный отдых
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
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
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-colored hover:shadow-colored-lg transition-all duration-500 animate-slide-in-up group border border-slate-100/50 hover:scale-105 hover:-translate-y-2"
                  style={{ animationDelay: `${0.6 + index * 0.1}s`, animationFillMode: 'both' }}
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-ocean-500 to-teal-400 text-white rounded-full px-6 py-3 text-sm font-semibold mb-8 shadow-colored animate-slide-in-up">
              <Users className="w-5 h-5" />
              Наши номера
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-800 animate-slide-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Выберите идеальный номер
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              От уютного стандарта до просторных апартаментов — каждый номер создан для вашего комфорта
            </p>
          </div>

          {/* Premium сетка номеров */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOM_CATEGORIES.slice(0, 6).map((room, index) => (
              <div
                key={room.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-colored hover:shadow-colored-lg transition-all duration-500 overflow-hidden animate-slide-in-up group border border-slate-100/50 hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${0.6 + index * 0.1}s`, animationFillMode: 'both' }}
              >
                {/* Premium изображение placeholder */}
                <div className="h-64 bg-gradient-to-br from-slate-100 via-teal-50 to-ocean-50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-slate-500 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-colored">
                        <Users className="w-10 h-10 text-teal-500" />
                      </div>
                      <p className="text-base font-semibold">{room.name}</p>
                    </div>
                  </div>
                  
                  {/* Premium акция бейдж */}
                  <div className="absolute top-6 right-6 bg-gold-gradient text-slate-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-gold">
                    <Gift className="w-4 h-4" />
                    Акция
                  </div>
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

      {/* СТАТИСТИКА - Премиум дизайн */}
      <section className="py-20 bg-gradient-to-b from-ocean-600 to-ocean-700 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gold-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Нам доверяют
            </h2>
            <p className="text-lg lg:text-xl text-cream-200 max-w-3xl mx-auto leading-relaxed">
              Цифры, которые говорят о качестве нашего сервиса
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: HOTEL_INFO.reviewsCount.toString(), label: 'Довольных гостей', suffix: '+', icon: Users, color: 'text-teal-300', bgColor: 'from-teal-500/20 to-teal-600/20' },
              { number: HOTEL_INFO.rating.toString(), label: 'Рейтинг отеля', suffix: '/5', icon: Star, color: 'text-gold-300', bgColor: 'from-gold-500/20 to-gold-600/20' },
              { number: '6', label: 'Категорий номеров', suffix: '', icon: Calendar, color: 'text-teal-300', bgColor: 'from-teal-500/20 to-ocean-600/20' },
              { number: '24', label: 'Часа работы', suffix: '/7', icon: Heart, color: 'text-gold-300', bgColor: 'from-gold-500/20 to-gold-600/20' },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center group"
              >
                <div className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl p-8 rounded-3xl hover:scale-105 transition-all duration-500 border border-white/10 shadow-glass hover:shadow-colored`}>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-3">
                    {stat.number}
                    <span className={`text-xl ${stat.color}`}>{stat.suffix}</span>
                  </div>
                  <p className="text-cream-200 text-sm font-medium leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ - с обновленным стилем */}
      <div className="animate-slide-in-up">
        <GallerySection />
      </div>

      {/* ОТЗЫВЫ - Современный glassmorphism дизайн */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-800 rounded-full px-6 py-3 text-sm font-semibold mb-8 shadow-gold">
              <Quote className="w-5 h-5" />
              Отзывы гостей
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-800">
              Что говорят о нас
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Узнайте, что говорят о нас наши гости
            </p>
          </div>

          {/* Premium сетка отзывов */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GUEST_REVIEWS.map((review, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 hover:shadow-colored transition-all duration-500 border border-slate-100/50 group hover:scale-105 hover:-translate-y-1"
              >
                {/* Рейтинг с золотыми звездами */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating 
                          ? 'text-gold-400 fill-current' 
                          : 'text-slate-300'
                      } transition-colors duration-300`}
                    />
                  ))}
                </div>

                {/* Текст отзыва */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-teal-200" />
                  <p className="text-slate-700 leading-relaxed pl-4">
                    {review.text}
                  </p>
                </div>

                {/* Автор - премиум дизайн */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-ocean-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-teal">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">
                      {review.author}
                    </div>
                    <div className="text-slate-500 text-sm font-medium">
                      Гость отеля
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium статистика отзывов */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 bg-white/80 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-colored border border-slate-100/50">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-ocean-600 bg-clip-text text-transparent">
                  {HOTEL_INFO.rating}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  Рейтинг
                </div>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                  {HOTEL_INFO.reviewsCount}+
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  Отзывов
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA СЕКЦИЯ - Финальный призыв */}
      <section className="py-20 bg-gradient-to-br from-ocean-600 via-teal-600 to-ocean-700 relative overflow-hidden">
        {/* Премиум декоративные элементы */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-ocean-700/20 to-transparent"></div>
          <div className="absolute top-20 right-20 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-gold-300 mx-auto mb-6 animate-sparkle" />
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
              <Phone className="w-6 h-6 group-hover:animate-bounce" />
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
    </div>
  );
};

export default HomePage; 