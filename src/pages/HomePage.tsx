import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import GallerySection from '../components/sections/GallerySection';
import { HOTEL_ADVANTAGES, HOTEL_INFO, ROOM_CATEGORIES, GUEST_REVIEWS } from '../constants';
import { MapPin, Waves, Heart, Baby, ChefHat, Map, ArrowRight, Star, Quote, Users, Calendar, Phone } from 'lucide-react';

// Мэппинг иконок
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
      {/* Hero секция */}
      <HeroSection />

      {/* О нас секция */}
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent-50 text-accent-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Почему нас выбирают
            </div>
            
            <h2 className="heading-lg mb-6">
              Отель "Абсолют" — ваш идеальный отдых
            </h2>
            <p className="body-lg max-w-3xl mx-auto">
              {HOTEL_INFO.description}
            </p>
          </div>

          {/* Простая сетка преимуществ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOTEL_ADVANTAGES.map((advantage, index) => {
              const IconComponent = iconMap[advantage.icon as keyof typeof iconMap];
              
              return (
                <div
                  key={advantage.title}
                  className="card p-8 text-center hover-lift"
                >
                  <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 text-accent-600" />
                    )}
                  </div>
                  
                  <h3 className="heading-sm mb-4">
                    {advantage.title}
                  </h3>
                  
                  <p className="body-md">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Номера секция */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6">
              Наши номера
            </h2>
            <p className="body-lg max-w-3xl mx-auto">
              От уютного стандарта до просторных апартаментов - выберите идеальный номер для вашего отдыха
            </p>
          </div>

          {/* Простая сетка номеров */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOM_CATEGORIES.slice(0, 6).map((room) => (
              <div
                key={room.id}
                className="card overflow-hidden hover-lift"
              >
                {/* Простой placeholder изображения */}
                <div className="h-48 bg-neutral-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-neutral-400">
                      <Users className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">{room.name}</p>
                    </div>
                  </div>
                  
                  {/* Скидка */}
                  {room.discount && (
                    <div className="absolute top-4 right-4 bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{room.discount}%
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="heading-sm">{room.name}</h3>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary-900">
                        {room.priceFrom.toLocaleString()}₽
                      </div>
                      <div className="text-sm text-primary-500">за ночь</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-primary-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {room.capacity}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {room.size}
                    </div>
                  </div>

                  <p className="body-md mb-6">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <div
                          key={amenity}
                          className="w-2 h-2 bg-accent-400 rounded-full"
                          title={amenity}
                        />
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-xs text-primary-500 ml-1">
                          +{room.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-2 bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors text-sm font-medium"
                    >
                      Забронировать
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: HOTEL_INFO.reviewsCount.toString(), label: 'Довольных гостей', suffix: '+', icon: Users },
              { number: HOTEL_INFO.rating.toString(), label: 'Рейтинг отеля', suffix: '/5', icon: Star },
              { number: '6', label: 'Категорий номеров', suffix: '', icon: Calendar },
              { number: '24', label: 'Часа работы', suffix: '/7', icon: Heart },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-accent-400 mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                  <span className="text-xl text-accent-400">{stat.suffix}</span>
                </div>
                <p className="text-white/80 text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Галерея отеля */}
      <GallerySection />

      {/* Отзывы гостей */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6">
              Отзывы наших гостей
            </h2>
            <p className="body-lg max-w-3xl mx-auto">
              Узнайте, что говорят о нас наши гости
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GUEST_REVIEWS.map((review) => (
              <div
                key={review.name}
                className="card p-8 hover-lift"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-accent-400 mb-4" />
                
                <p className="body-md mb-6">
                  {review.text}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-primary-900">{review.name}</div>
                    <div className="text-sm text-primary-500">Гость отеля</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="section-padding bg-accent-600 text-white">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-8">
            <Heart className="w-4 h-4" />
            Скидка -15% на все номера
          </div>

          <h2 className="heading-lg text-white mb-8">
            Готовы к незабываемому отдыху?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Забронируйте номер прямо сейчас и получите лучшие условия для вашего семейного отдыха в Витязево
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 bg-white text-accent-600 font-semibold py-4 px-8 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Забронировать сейчас
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Позвонить нам
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 