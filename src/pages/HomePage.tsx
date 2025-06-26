import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import GallerySection from '../components/sections/GallerySection';
import { HOTEL_ADVANTAGES, HOTEL_INFO, ROOM_CATEGORIES, GUEST_REVIEWS } from '../constants';
import { MapPin, Waves, Heart, Baby, ChefHat, Map, ArrowRight, Star, Quote, Users, Calendar } from 'lucide-react';

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
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero секция */}
      <HeroSection />

      {/* О нас секция - современный Bento Grid */}
      <section id="about" className="section-padding bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-16 w-24 h-24 bg-accent-400/10 rounded-full blur-2xl"></div>
        
        <div className="container-custom">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-primary-500/10 rounded-full px-6 py-2 text-sm font-medium text-primary-600 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heart className="w-4 h-4" />
              Почему нас выбирают
            </motion.div>
            
            <h2 className="section-title text-gradient mb-8">
              Отель "Абсолют" — ваш идеальный отдых
            </h2>
            <p className="body-text max-w-4xl mx-auto">
              {HOTEL_INFO.description}
            </p>
          </motion.div>

          {/* Современная симметричная сетка для преимуществ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {HOTEL_ADVANTAGES.map((advantage, index) => {
              const IconComponent = iconMap[advantage.icon as keyof typeof iconMap];
              
              return (
                <motion.div
                  key={advantage.title}
                  className="group card-modern card-hover min-h-[280px]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="relative h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-20 h-20 bg-ocean-gradient rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 mb-6">
                        {IconComponent && (
                          <IconComponent className="w-10 h-10 text-white" />
                        )}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="headline-text text-xl mb-4 text-neutral-900">
                          {advantage.title}
                        </h3>
                        
                        <p className="text-neutral-600 leading-relaxed">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Decorative element */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400/20 rounded-full group-hover:scale-150 group-hover:bg-accent-400/30 transition-all duration-500"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Номера секция - современные карточки */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-primary-100/50 relative">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title text-neutral-900 mb-6">
              Наши номера
            </h2>
            <p className="body-text text-neutral-600 max-w-3xl mx-auto">
              От уютного стандарта до просторных апартаментов - выберите идеальный номер для вашего отдыха
            </p>
          </motion.div>

          {/* Сетка номеров */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOM_CATEGORIES.slice(0, 6).map((room, index) => (
              <motion.div
                key={room.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-700 hover:-translate-y-2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Image placeholder */}
                <div className="h-64 bg-gradient-to-br from-primary-400 to-primary-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-ocean-gradient opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-60" />
                      <p className="text-lg font-semibold">{room.name}</p>
                    </div>
                  </div>
                  
                  {/* Discount badge */}
                  {room.discount && (
                    <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{room.discount}%
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-neutral-900">{room.name}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        {room.priceFrom.toLocaleString()}₽
                      </div>
                      <div className="text-sm text-neutral-500">за ночь</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {room.capacity}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {room.size}
                    </div>
                  </div>

                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <div
                          key={amenity}
                          className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center border-2 border-white"
                          title={amenity}
                        >
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        </div>
                      ))}
                      {room.amenities.length > 3 && (
                        <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center border-2 border-white text-xs font-medium text-neutral-600">
                          +{room.amenities.length - 3}
                        </div>
                      )}
                    </div>

                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors group"
                    >
                      Забронировать
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Статистика - современный дизайн */}
      <section className="section-padding bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: HOTEL_INFO.reviewsCount.toString(), label: 'Довольных гостей', suffix: '+', icon: Users },
              { number: HOTEL_INFO.rating.toString(), label: 'Рейтинг отеля', suffix: '/5', icon: Star },
              { number: '6', label: 'Категорий номеров', suffix: '', icon: Calendar },
              { number: '24', label: 'Часа работы', suffix: '/7', icon: Heart },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <stat.icon className="w-8 h-8 text-accent-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  >
                    {stat.number}
                  </motion.span>
                  <span className="text-2xl md:text-3xl text-accent-400">{stat.suffix}</span>
                </div>
                <p className="text-white/80 text-sm md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Галерея отеля */}
      <GallerySection />

      {/* Отзывы гостей */}
      <section className="section-padding bg-gradient-to-br from-white to-neutral-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title text-neutral-900 mb-6">
              Отзывы наших гостей
            </h2>
            <p className="body-text text-neutral-600 max-w-3xl mx-auto">
              Узнайте, что говорят о нас наши гости
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GUEST_REVIEWS.map((review, index) => (
              <motion.div
                key={review.name}
                className="card-modern card-hover relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="absolute -top-2 -left-2 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary-600" />
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    {review.text}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">{review.name}</div>
                    <div className="text-sm text-neutral-500">Гость отеля</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция - современный дизайн */}
      <section className="section-padding bg-ocean-gradient text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
        </div>

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heart className="w-4 h-4 text-accent-400" />
              Скидка -15% на все номера
            </motion.div>

            <h2 className="display-text mb-8">
              Готовы к незабываемому отдыху?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Забронируйте номер прямо сейчас и получите лучшие условия для вашего семейного отдыха в Витязево
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-3 bg-white text-primary-900 font-bold py-5 px-10 rounded-2xl hover:bg-neutral-100 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  Забронировать сейчас
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="tel:+7(988)318-48-25"
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold py-5 px-10 rounded-2xl hover:bg-white/20 transition-all duration-300 group"
                >
                  Позвонить нам
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 