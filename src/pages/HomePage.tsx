import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import { HOTEL_ADVANTAGES, HOTEL_INFO } from '../constants';
import { MapPin, Waves, Heart, Baby, ChefHat, Map } from 'lucide-react';

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
      <section id="about" className="section-padding bg-gradient-to-b from-white to-primary-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-6 font-montserrat">
              Почему выбирают нас
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              {HOTEL_INFO.description}
            </p>
          </motion.div>

          {/* Преимущества отеля */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOTEL_ADVANTAGES.map((advantage, index) => {
              const IconComponent = iconMap[advantage.icon as keyof typeof iconMap];
              
              return (
                <motion.div
                  key={advantage.title}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 card-hover"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-900 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      {IconComponent && (
                        <IconComponent className="w-8 h-8 text-white" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-primary-900 mb-4">
                      {advantage.title}
                    </h3>
                    
                    <p className="text-neutral-600 leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Статистика отеля */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '127', label: 'Довольных гостей', suffix: '+' },
              { number: '4.5', label: 'Рейтинг отеля', suffix: '/5' },
              { number: '60', label: 'Номеров', suffix: '+' },
              { number: '24', label: 'Часа работы', suffix: '/7' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-400 mb-2">
                  {stat.number}
                  <span className="text-2xl md:text-3xl">{stat.suffix}</span>
                </div>
                <p className="text-white/80 text-sm md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="section-padding bg-gradient-to-r from-primary-900 to-secondary-500 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-montserrat">
              Готовы к незабываемому отдыху?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Забронируйте номер прямо сейчас и получите лучшие условия для вашего отдыха
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/booking"
                className="btn-secondary inline-flex items-center justify-center min-w-[200px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Забронировать сейчас
              </motion.a>
              
              <motion.a
                href="tel:+7 (861) 234-56-78"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-900 inline-flex items-center justify-center min-w-[200px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Позвонить нам
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 