import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACTS, HOTEL_INFO, WORKING_HOURS } from '../constants';
import { SEO } from '../components/SEO';
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Car,
  Plane,
  Train,
  Navigation,
  ExternalLink,
  Users,
  Calendar,
  Star,
  Wifi,
  Coffee,
  Waves,
  Shield,
  ChevronRight
} from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactsPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Сброс формы через 3 секунды
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <>
      <SEO 
        title="Контакты"
        description="Контакты отеля Абсолют: адрес, телефоны, email. Удобное расположение в центре города. Круглосуточная стойка регистрации. Схема проезда и парковка."
        keywords="контакты отель абсолют, адрес отеля, телефон отеля, как добраться, схема проезда, парковка отеля"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero секция */}
      <section className="bg-gradient-to-br from-ocean-600 via-teal-600 to-ocean-700 text-white py-24 relative overflow-hidden">
        {/* Премиум декоративные элементы */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-ocean-700/20 to-transparent"></div>
          <div className="absolute top-20 right-20 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-sm font-semibold mb-8 shadow-glass"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Phone className="w-5 h-5 text-gold-300" />
              Всегда на связи
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Свяжитесь с нами
            </h1>
            <p className="text-xl text-cream-100 leading-relaxed max-w-3xl mx-auto">
              Мы здесь, чтобы ответить на любые ваши вопросы и помочь с бронированием вашего идеального отдыха.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Основная информация */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Контактная информация */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                  Контактная информация
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Выберите удобный для вас способ связи. Мы отвечаем быстро!
                </p>
              </div>

              {/* Контакты */}
              <div className="space-y-6">
                {CONTACTS.map((contact, index) => (
                  <motion.a
                    key={contact.type + contact.value}
                    href={
                      contact.type === 'phone' ? `tel:${contact.value}` :
                      contact.type === 'email' ? `mailto:${contact.value}` :
                      contact.type === 'whatsapp' ? `https://wa.me/${contact.value.replace(/\D/g, '')}` :
                      '#'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-5 p-5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-colored hover:shadow-colored-lg transition-all duration-300 border border-slate-100/50 hover:scale-105"
                  >
                    <div className={`p-4 rounded-xl shadow-lg ${
                      contact.primary 
                        ? 'bg-gradient-to-br from-teal-400 to-ocean-500 text-white shadow-teal' 
                        : 'bg-gradient-to-br from-gold-400 to-gold-500 text-white shadow-gold'
                    }`}>
                      {contact.type === 'phone' && <Phone className="w-6 h-6" />}
                      {contact.type === 'email' && <Mail className="w-6 h-6" />}
                      {contact.type === 'whatsapp' && <MessageSquare className="w-6 h-6" />}
                      {contact.type === 'address' && <MapPin className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 text-lg mb-1">
                        {contact.label}
                      </h3>
                      <div className="text-slate-600 text-base">
                        {contact.value}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-ocean-500 transition-colors" />
                  </motion.a>
                ))}
              </div>

              {/* Режим работы */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-colored border border-slate-100/50">
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-teal-500" />
                  Режим работы
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Стойка регистрации:</span>
                    <span className="font-semibold text-slate-800">{WORKING_HOURS.reception}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Завтрак:</span>
                    <span className="font-semibold text-slate-800">{WORKING_HOURS.breakfast}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Бассейн:</span>
                    <span className="font-semibold text-slate-800">{WORKING_HOURS.pool}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Анимация:</span>
                    <span className="font-semibold text-slate-800">{WORKING_HOURS.animation}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Форма обратной связи */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-colored p-8 border border-slate-100/50"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Напишите нам
              </h2>
              <p className="text-slate-600 mb-8">
                Мы ответим вам в кратчайшие сроки!
              </p>
              
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-ocean-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-teal">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Сообщение отправлено!
                  </h3>
                  <p className="text-lg text-slate-600">
                    Спасибо! Мы свяжемся с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                        placeholder="Иван"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                        placeholder="example@mail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                      placeholder="+7 (999) 999-99-99"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Тема
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                      placeholder="Вопрос по бронированию"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Сообщение *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                      placeholder="Ваше сообщение..."
                    ></textarea>
                  </div>
                  
                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-white bg-gradient-to-r from-ocean-500 to-teal-400 rounded-xl shadow-colored hover:shadow-colored-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить'}
                      {!isSubmitting && <Send className="w-5 h-5" />}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Карта и как добраться */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-ocean-500 to-teal-400 text-white rounded-full px-6 py-3 text-sm font-semibold mb-8 shadow-colored">
              <Navigation className="w-5 h-5" />
              Мы на карте
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-4">
              Как до нас добраться
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Мы находимся в удобном месте с хорошей транспортной доступностью.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Карта */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-colored overflow-hidden border border-slate-100/50">
              <iframe 
                src={HOTEL_INFO.mapUrl} 
                width="100%" 
                height="500" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-t-3xl"
              ></iframe>
              <div className="p-6 bg-white/80 backdrop-blur-sm">
                <h3 className="font-bold text-slate-800 text-lg mb-2">
                  {HOTEL_INFO.name}
                </h3>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-teal-500" />
                  <span>{HOTEL_INFO.address}</span>
                </div>
              </div>
            </div>

            {/* Способы */}
            <div className="space-y-6">
              {[
                { 
                  icon: Car, 
                  title: 'На автомобиле', 
                  description: 'Следуйте по навигатору до указанного адреса. У отеля есть парковка.',
                  link: `https://yandex.ru/maps/?rtext=~${HOTEL_INFO.coordinates.lat},${HOTEL_INFO.coordinates.lng}`
                },
                { 
                  icon: Plane, 
                  title: 'На самолете', 
                  description: 'Ближайший аэропорт — Витязево (AAQ). Оттуда можно доехать на такси (15 минут).',
                  link: `https://yandex.ru/maps/1107/anapa/routes/?rtext=~${HOTEL_INFO.coordinates.lat},${HOTEL_INFO.coordinates.lng}`
                },
                { 
                  icon: Train, 
                  title: 'На поезде', 
                  description: 'Ближайший вокзал — Анапа. Оттуда можно доехать на такси или автобусе.',
                  link: `https://yandex.ru/maps/1107/anapa/routes/?rtext=~${HOTEL_INFO.coordinates.lat},${HOTEL_INFO.coordinates.lng}`
                },
              ].map((item, index) => (
                <a 
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-colored hover:shadow-colored-lg transition-all duration-300 border border-slate-100/50 hover:scale-105"
                >
                  <div className="p-3 bg-gradient-to-br from-teal-400 to-ocean-500 text-white rounded-xl shadow-teal">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
                      {item.title}
                      <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default ContactsPage; 