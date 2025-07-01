import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import GallerySection from '../components/sections/GallerySection';
import { HOTEL_ADVANTAGES, HOTEL_INFO, ROOM_CATEGORIES, GUEST_REVIEWS } from '../constants';
import { MapPin, Waves, Heart, Baby, ChefHat, Map, ArrowRight, Star, Quote, Users, Calendar, Phone, Gift } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import Button from '../components/ui/Button';

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
      <section id="about" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-6 py-3 text-sm font-medium mb-6 animate-fade-in hover:scale-105 transition-all duration-300">
              <Heart className="w-5 h-5" />
              Почему нас выбирают
            </div>
            
            <h2 className="heading-lg mb-6 animate-fade-in-up animation-delay-200 text-gray-800">
              Отель "Абсолют" — ваш идеальный отдых
            </h2>
            <p className="body-lg max-w-3xl mx-auto animate-fade-in-up animation-delay-300 text-gray-600">
              {HOTEL_INFO.description}
            </p>
          </div>

          {/* Анимированная сетка преимуществ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOTEL_ADVANTAGES.map((advantage, index) => {
              const IconComponent = iconMap[advantage.icon as keyof typeof iconMap];
              
              return (
                <div
                  key={advantage.title}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up group border border-gray-100"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  
                  <h3 className="heading-sm mb-4 text-gray-800">
                    {advantage.title}
                  </h3>
                  
                  <p className="body-md text-gray-600">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Номера секция */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-6 py-3 text-sm font-medium mb-6 animate-fade-in hover:scale-105 transition-all duration-300">
              <Users className="w-5 h-5" />
              Наши номера
            </div>
            
            <h2 className="heading-lg mb-6 animate-fade-in-up text-gray-800">
              Выберите идеальный номер
            </h2>
            <p className="body-lg max-w-3xl mx-auto animate-fade-in-up animation-delay-200 text-gray-600">
              От уютного стандарта до просторных апартаментов - каждый номер создан для вашего комфорта
            </p>
          </div>

          {/* Анимированная сетка номеров */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOM_CATEGORIES.slice(0, 6).map((room, index) => (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in-up group border border-gray-100"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                {/* Анимированный placeholder изображения */}
                <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <Users className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium">{room.name}</p>
                    </div>
                  </div>
                  
                  {/* Акция */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    Акция
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="heading-sm text-gray-800">{room.name}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {room.priceFrom.toLocaleString()}₽
                      </div>
                      <div className="text-sm text-gray-500">за ночь</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {room.capacity}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {room.size}
                    </div>
                  </div>

                  <p className="body-md mb-6 text-gray-600">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <div
                          key={amenity}
                          className="w-3 h-3 bg-blue-400 rounded-full"
                          title={amenity}
                        />
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="text-xs text-gray-500 ml-1">
                          +{room.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    <Link to="/booking">
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<ArrowRight className="w-4 h-4" />}
                        iconPosition="right"
                        className="text-sm hover:scale-105 transition-transform duration-300"
                      >
                        Забронировать
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Анимированная статистика */}
      <section className="section-padding bg-gray-800 text-white overflow-hidden relative">
        <div className="container-custom relative">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-6 text-white">
              Нам доверяют
            </h2>
            <p className="body-lg text-gray-300 max-w-2xl mx-auto">
              Цифры, которые говорят о качестве нашего сервиса
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: HOTEL_INFO.reviewsCount.toString(), label: 'Довольных гостей', suffix: '+', icon: Users, color: 'text-blue-400' },
              { number: HOTEL_INFO.rating.toString(), label: 'Рейтинг отеля', suffix: '/5', icon: Star, color: 'text-yellow-400' },
              { number: '6', label: 'Категорий номеров', suffix: '', icon: Calendar, color: 'text-green-400' },
              { number: '24', label: 'Часа работы', suffix: '/7', icon: Heart, color: 'text-pink-400' },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-fade-in-up hover:scale-105 transition-all duration-300 p-6 rounded-xl hover:bg-white/5 group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                  <span className={`text-2xl ${stat.color}`}>{stat.suffix}</span>
                </div>
                <p className="text-gray-300 text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Галерея отеля */}
      <div className="animate-fade-in">
        <GallerySection />
      </div>

      {/* Отзывы гостей - компактный дизайн */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-900">
              Отзывы наших гостей
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Узнайте, что говорят о нас наши гости
            </p>
          </div>

          {/* Компактная сетка отзывов */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {GUEST_REVIEWS.map((review, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-xl p-5 hover:shadow-md transition-all duration-300 border border-neutral-100 hover:border-accent-200"
              >
                {/* Рейтинг */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Текст отзыва - компактный */}
                <p className="text-neutral-700 text-sm leading-relaxed mb-4 line-clamp-4">
                  "{review.text}"
                </p>

                {/* Автор - компактный */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900 text-sm">
                      {review.name}
                    </div>
                    <div className="text-neutral-500 text-xs">
                      Гость отеля
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Компактная статистика */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 bg-accent-50 rounded-xl px-6 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600">
                  {HOTEL_INFO.rating}
                </div>
                <div className="text-xs text-neutral-600">
                  Рейтинг
                </div>
              </div>
              <div className="w-px h-8 bg-neutral-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600">
                  {HOTEL_INFO.reviewsCount}+
                </div>
                <div className="text-xs text-neutral-600">
                  Отзывов
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="section-padding bg-accent-600 text-white relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-accent-700/20 to-transparent"></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-bounce-subtle"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-bounce-subtle animation-delay-500"></div>
        </div>
        
        <div className="container-custom text-center relative">
          <h2 className="heading-lg text-white mb-6 animate-fade-in-up">
            Готовы к незабываемому отдыху?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Забронируйте номер в отеле "Абсолют" и окунитесь в атмосферу комфорта и гостеприимства
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <Link to="/booking">
              <button className="bg-white text-accent-600 font-semibold py-3 px-8 rounded-lg hover:bg-neutral-50 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                Забронировать сейчас
                <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="flex items-center gap-2 text-white hover:text-white/90 transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <Phone className="w-5 h-5" />
              Позвонить: {HOTEL_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 