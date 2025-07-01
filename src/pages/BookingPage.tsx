import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROOM_CATEGORIES, HOTEL_PROMOTIONS } from '../constants';
import { 
  Calendar,
  Users, 
  MapPin, 
  Phone,
  Mail,
  CreditCard,
  Check,
  Star,
  Clock,
  Shield,
  ArrowRight,
  ArrowLeft,
  User,
  Baby,
  Heart,
  Wifi,
  Car,
  Coffee,
  ChevronDown,
  X,
  CheckCircle,
  MessageSquare,
  Gift
} from 'lucide-react';

interface BookingForm {
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  childrenAges: number[];
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  specialRequests: string;
  agreed: boolean;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; price?: number }[];
  placeholder: string;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  icon 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  React.useEffect(() => {
    const selected = options.find(opt => opt.value === value);
    setSelectedLabel(selected?.label || placeholder);
  }, [value, options, placeholder]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl flex items-center justify-between transition-all duration-200 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 ${
          isOpen ? 'border-primary-400 ring-2 ring-primary-500/20' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-neutral-400">{icon}</span>}
          <span className={`text-sm ${value ? 'text-neutral-900' : 'text-neutral-500'}`}>
            {selectedLabel}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            <div className="py-2 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-primary-50 flex items-center justify-between ${
                    value === option.value ? 'bg-primary-50 text-primary-700' : 'text-neutral-700'
                  }`}
                >
                  <span>{option.label}</span>
                  <div className="flex items-center gap-2">
                    {option.price && (
                      <span className="text-primary-600 font-semibold">
                        {option.price.toLocaleString()}₽
                      </span>
                    )}
                    {value === option.value && (
                      <Check className="w-4 h-4 text-primary-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BookingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingForm>({
    roomId: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    childrenAges: [],
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    specialRequests: '',
    agreed: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Опции для выбора номера
  const roomOptions = ROOM_CATEGORIES.map(room => ({
    value: room.id,
    label: `${room.name} - ${room.capacity}`,
    price: room.priceFrom
  }));

  // Выбранный номер
  const selectedRoom = ROOM_CATEGORIES.find(room => room.id === formData.roomId);

  // Расчет стоимости с новой системой акций
  const calculatePrice = useMemo(() => {
    if (!selectedRoom || !formData.checkIn || !formData.checkOut) return 0;
    
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) return 0;
    
    const basePrice = selectedRoom.priceFrom * nights;
    const freeNights = HOTEL_PROMOTIONS.getFreeNights(nights);
    const promotionDescription = HOTEL_PROMOTIONS.getPromotionDescription(nights);
    
    // Если есть подарочные дни, вычитаем их стоимость
    const discountAmount = freeNights * selectedRoom.priceFrom;
    const total = basePrice - discountAmount;
    
    return {
      nights,
      basePrice,
      freeNights,
      discountAmount,
      total,
      promotionDescription
    };
  }, [selectedRoom, formData.checkIn, formData.checkOut]);

  const handleInputChange = (field: keyof BookingForm, value: any) => {
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
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: 'Выбор номера', description: 'Выберите номер и даты' },
    { number: 2, title: 'Ваши данные', description: 'Контактная информация' },
    { number: 3, title: 'Подтверждение', description: 'Проверьте детали заказа' }
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Заявка отправлена!
          </h2>
          <p className="text-neutral-600 mb-8">
            Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время для подтверждения бронирования.
          </p>
          <div className="space-y-3">
            <Link
              to="/rooms"
              className="block w-full bg-primary-600 text-white py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors"
            >
              Посмотреть другие номера
            </Link>
            <Link
              to="/"
              className="block w-full bg-neutral-100 text-neutral-700 py-3 px-6 rounded-xl hover:bg-neutral-200 transition-colors"
            >
              На главную
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero секция */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Забронировать номер
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Заполните форму ниже, и мы свяжемся с вами для подтверждения бронирования
            </p>
          </motion.div>
        </div>
      </section>

      {/* Индикатор шагов */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step.number
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}>
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-semibold ${
                      currentStep >= step.number ? 'text-primary-600' : 'text-neutral-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-neutral-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форма бронирования */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Шаг 1: Выбор номера */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white rounded-3xl shadow-soft p-8"
                >
                  <h2 className="text-2xl font-bold text-neutral-900 mb-8">
                    Выберите номер и даты
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {/* Выбор номера */}
                      <div>
                        <label className="block text-sm font-semibold text-neutral-900 mb-3">
                          Категория номера
                        </label>
                        <CustomSelect
                          value={formData.roomId}
                          onChange={(value) => handleInputChange('roomId', value)}
                          options={roomOptions}
                          placeholder="Выберите номер"
                          icon={<MapPin className="w-4 h-4" />}
                        />
                      </div>

                      {/* Даты */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-900 mb-3">
                            Заезд
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                            <input
                              type="date"
                              value={formData.checkIn}
                              onChange={(e) => handleInputChange('checkIn', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-neutral-900 mb-3">
                            Выезд
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                            <input
                              type="date"
                              value={formData.checkOut}
                              onChange={(e) => handleInputChange('checkOut', e.target.value)}
                              min={formData.checkIn || new Date().toISOString().split('T')[0]}
                              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Количество гостей */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-900 mb-3">
                            Взрослые
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                            <select
                              value={formData.adults}
                              onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                            >
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-neutral-900 mb-3">
                            Дети
                          </label>
                          <div className="relative">
                            <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                            <select
                              value={formData.children}
                              onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                              className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                            >
                              {[0, 1, 2, 3, 4].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Предварительный расчет */}
                    <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                        Детали бронирования
                      </h3>
                      
                      {selectedRoom && calculatePrice && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-neutral-900">
                                {selectedRoom.name}
                              </div>
                              <div className="text-sm text-neutral-600">
                                {selectedRoom.capacity} • {selectedRoom.size}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-primary-600">
                                {selectedRoom.priceFrom.toLocaleString()}₽
                              </div>
                              <div className="text-xs text-neutral-500">за ночь</div>
                            </div>
                          </div>

                          {calculatePrice.nights > 0 && (
                            <>
                              <div className="border-t border-neutral-200 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Количество ночей:</span>
                                  <span>{calculatePrice.nights}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Базовая стоимость:</span>
                                  <span>{calculatePrice.basePrice.toLocaleString()}₽</span>
                                </div>
                                {calculatePrice.freeNights > 0 && (
                                  <>
                                    <div className="flex justify-between text-sm text-green-600">
                                      <span className="flex items-center gap-1">
                                        <Gift className="w-3 h-3" />
                                        Подарочные дни ({calculatePrice.freeNights}):
                                      </span>
                                      <span>-{calculatePrice.discountAmount.toLocaleString()}₽</span>
                                    </div>
                                    {calculatePrice.promotionDescription && (
                                      <div className="text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                                        {calculatePrice.promotionDescription}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                              <div className="border-t border-neutral-200 pt-4 flex justify-between font-bold text-lg">
                                <span>Итого:</span>
                                <span className="text-primary-600">
                                  {calculatePrice.total.toLocaleString()}₽
                                </span>
                              </div>
                            </>
                          )}

                          <div className="mt-6 p-4 bg-accent-50 rounded-xl">
                            <div className="flex items-start gap-3">
                              <Heart className="w-5 h-5 text-accent-500 mt-0.5" />
                              <div>
                                <div className="font-semibold text-accent-800 text-sm">
                                  Включено в стоимость
                                </div>
                                <div className="text-xs text-accent-700 mt-1">
                                  Завтрак, Wi-Fi, бассейн, парковка
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Шаг 2: Контактные данные */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white rounded-3xl shadow-soft p-8"
                >
                  <h2 className="text-2xl font-bold text-neutral-900 mb-8">
                    Ваши контактные данные
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-3">
                        Имя *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                        placeholder="Введите ваше имя"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-3">
                        Фамилия *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                        placeholder="Введите вашу фамилию"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-3">
                        Телефон *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-3">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-neutral-900 mb-3">
                      Особые пожелания
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all resize-none"
                      placeholder="Расскажите о ваших пожеланиях или особых требованиях..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Шаг 3: Подтверждение */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white rounded-3xl shadow-soft p-8"
                >
                  <h2 className="text-2xl font-bold text-neutral-900 mb-8">
                    Подтверждение бронирования
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {/* Данные гостя */}
                      <div className="bg-neutral-50 rounded-2xl p-6">
                        <h3 className="font-semibold text-neutral-900 mb-4">
                          Контактные данные
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Имя:</span>
                            <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Телефон:</span>
                            <span className="font-semibold">{formData.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Email:</span>
                            <span className="font-semibold">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Гости:</span>
                            <span className="font-semibold">
                              {formData.adults} взрослых{formData.children > 0 && `, ${formData.children} детей`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Согласие */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="agreement"
                          checked={formData.agreed}
                          onChange={(e) => handleInputChange('agreed', e.target.checked)}
                          className="w-5 h-5 text-primary-600 rounded border-neutral-300 focus:ring-2 focus:ring-primary-500/20 mt-0.5"
                        />
                        <label htmlFor="agreement" className="text-sm text-neutral-600">
                          Я согласен с{' '}
                          <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                            условиями бронирования
                          </Link>
                          {' '}и{' '}
                          <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                            политикой конфиденциальности
                          </Link>
                        </label>
                      </div>
                    </div>

                    {/* Итоговая стоимость */}
                    <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                        Итоговый расчет
                      </h3>
                      
                      {selectedRoom && calculatePrice && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-neutral-900">
                                {selectedRoom.name}
                              </div>
                              <div className="text-sm text-neutral-600">
                                {formData.checkIn} - {formData.checkOut}
                              </div>
                              <div className="text-sm text-neutral-600">
                                {calculatePrice.nights} ночей
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-2xl text-primary-600">
                                {calculatePrice.total.toLocaleString()}₽
                              </div>
                              {calculatePrice.freeNights > 0 && (
                                <div className="text-sm text-green-600 flex items-center gap-1">
                                  <Gift className="w-3 h-3" />
                                  {calculatePrice.freeNights} {calculatePrice.freeNights === 1 ? 'день' : calculatePrice.freeNights < 5 ? 'дня' : 'дней'} в подарок!
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="border-t border-neutral-200 pt-4">
                            <div className="flex items-center gap-3 text-sm text-neutral-600">
                              <Shield className="w-4 h-4 text-primary-500" />
                              <span>Бронирование без предоплаты</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-neutral-600 mt-2">
                              <Clock className="w-4 h-4 text-primary-500" />
                              <span>Бесплатная отмена до 14:00 дня заезда</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Кнопки навигации */}
              <div className="flex justify-between items-center pt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                    currentStep === 1
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Назад
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && (!formData.roomId || !formData.checkIn || !formData.checkOut)) ||
                      (currentStep === 2 && (!formData.firstName || !formData.lastName || !formData.phone || !formData.email))
                    }
                    className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all disabled:bg-neutral-300 disabled:cursor-not-allowed"
                  >
                    Далее
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!formData.agreed || isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all disabled:bg-neutral-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Отправляем...
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <CreditCard className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage; 