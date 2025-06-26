import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACTS, HOTEL_INFO, WORKING_HOURS } from '../constants';
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
  Shield
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero секция */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-16 w-24 h-24 bg-accent-400/20 rounded-full blur-2xl animate-pulse"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MapPin className="w-4 h-4" />
              Витязево, Анапа
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Контакты и расположение
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Мы находимся в самом центре курортного поселка Витязево. Свяжитесь с нами любым удобным способом!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Основная информация */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Контактная информация */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                  Как с нами связаться
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed">
                  Наша дружелюбная команда готова ответить на все ваши вопросы и помочь с бронированием.
                </p>
              </div>

              {/* Контакты */}
              <div className="space-y-6">
                {CONTACTS.map((contact, index) => (
                  <motion.div
                    key={contact.type + contact.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`p-3 rounded-xl ${
                      contact.primary 
                        ? 'bg-primary-100 text-primary-600' 
                        : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {contact.type === 'phone' && <Phone className="w-5 h-5" />}
                      {contact.type === 'email' && <Mail className="w-5 h-5" />}
                      {contact.type === 'whatsapp' && <MessageSquare className="w-5 h-5" />}
                      {contact.type === 'address' && <MapPin className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {contact.label}
                      </h3>
                      <div className="text-neutral-600">
                        {contact.type === 'phone' || contact.type === 'whatsapp' ? (
                          <a 
                            href={`tel:${contact.value}`}
                            className="hover:text-primary-600 transition-colors"
                          >
                            {contact.value}
                          </a>
                        ) : contact.type === 'email' ? (
                          <a 
                            href={`mailto:${contact.value}`}
                            className="hover:text-primary-600 transition-colors"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <span>{contact.value}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Режим работы */}
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  Режим работы
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Стойка регистрации:</span>
                    <span className="font-semibold text-primary-600">{WORKING_HOURS.reception}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Завтрак:</span>
                    <span className="font-semibold">{WORKING_HOURS.breakfast}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Бассейн:</span>
                    <span className="font-semibold">{WORKING_HOURS.pool}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Анимация:</span>
                    <span className="font-semibold">{WORKING_HOURS.animation}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Форма обратной связи */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-soft p-8"
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Напишите нам
              </h2>
              
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    Сообщение отправлено!
                  </h3>
                  <p className="text-neutral-600">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                        placeholder="Введите ваше имя"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Тема
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                      >
                        <option value="">Выберите тему</option>
                        <option value="booking">Бронирование</option>
                        <option value="info">Информация об отеле</option>
                        <option value="services">Услуги</option>
                        <option value="complaint">Жалоба</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Сообщение *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all resize-none"
                      placeholder="Расскажите, чем мы можем вам помочь..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl hover:bg-primary-700 transition-all disabled:bg-neutral-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Отправить сообщение
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Карта */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Наше расположение
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Отель "Абсолют" расположен в самом центре курортного поселка Витязево, 
              всего в 10 минутах ходьбы от центрального пляжа.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Карта */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                <div className="h-96 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-60" />
                    <p className="text-lg font-semibold">Яндекс Карта</p>
                    <p className="text-white/80 mt-2">Интеграция с картой будет добавлена</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {HOTEL_INFO.name}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {HOTEL_INFO.address}
                      </p>
                    </div>
                    <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      <Navigation className="w-4 h-4" />
                      Маршрут
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Как добраться */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-neutral-900">
                Как добраться
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">
                        Из аэропорта Анапы
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        15 км, 20 минут на такси или трансфере. 
                        Можем организовать встречу.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <Train className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">
                        Ж/д вокзал Анапы
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        12 км, 15 минут на автобусе №114 
                        или такси до остановки "Витязево".
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">
                        На автомобиле
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        Бесплатная парковка на территории. 
                        Гарантированное место для номеров Люкс.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Преимущества расположения */}
              <div className="bg-gradient-to-br from-accent-50 to-white rounded-2xl p-6">
                <h4 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent-500" />
                  Рядом с отелем
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-primary-500" />
                    <span>Центральный пляж — 10 мин пешком</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-accent-500" />
                    <span>Кафе и рестораны — 2 мин</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>Аквапарк "Олимпия" — 5 мин</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>Аптека и магазины — 1 мин</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactsPage; 