import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROOM_CATEGORIES, HOTEL_PROMOTIONS } from '../constants';
import { 
  Calendar, Users, Check, ChevronDown, X, CheckCircle, ArrowRight, ArrowLeft, User, Baby, MessageSquare, Gift, CreditCard
} from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import Button from '../components/ui/Button';

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

const CustomSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; price?: number }[];
  placeholder: string;
  icon?: React.ReactNode;
}> = ({ value, onChange, options, placeholder, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = useMemo(() => options.find(opt => opt.value === value)?.label || placeholder, [value, options, placeholder]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white/50 border border-slate-200/50 rounded-xl flex items-center justify-between transition-all duration-200 hover:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-slate-500">{icon}</span>}
          <span className={`text-sm ${value ? 'text-slate-800' : 'text-slate-500'}`}>{selectedLabel}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200/50 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            <div className="py-2 max-h-60 overflow-y-auto">
              {options.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => { onChange(option.value); setIsOpen(false); }}
                  className="w-full px-4 py-3 text-left text-sm transition-colors hover:bg-teal-50 flex items-center justify-between text-slate-700"
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="w-4 h-4 text-teal-600" />}
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
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const roomOptions = ROOM_CATEGORIES.map(room => ({
    value: room.id,
    label: `${room.name} - ${room.capacity.total} гостей`,
    price: room.price.basePrice
  }));

  useEffect(() => {
    if (formData.roomId) {
      const room = ROOM_CATEGORIES.find(r => r.id === formData.roomId);
      setSelectedRoom(room || null);
    } else {
      setSelectedRoom(null);
    }
  }, [formData.roomId]);

  useEffect(() => {
    if (currentStep === 1) {
      setFormData(prev => ({
        ...prev,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        specialRequests: '',
        agreed: false
      }));
    }
  }, [currentStep]);

  const priceDetails = useMemo(() => {
    if (!selectedRoom || !formData.checkIn || !formData.checkOut) return null;

    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) return null;
    
    const basePrice = selectedRoom.price.basePrice;
    const totalNights = nights;
    const freeNights = HOTEL_PROMOTIONS.getFreeNights(totalNights);
    const promotionDescription = HOTEL_PROMOTIONS.getPromotionDescription(totalNights);
    const discountAmount = freeNights * basePrice;
    const total = basePrice * (totalNights - freeNights);

    return { 
      nights: totalNights,
      basePrice: basePrice * totalNights,
      freeNights,
      discountAmount,
      total,
      promotionDescription
    };
  }, [selectedRoom, formData.checkIn, formData.checkOut]);

  const handleInputChange = (field: keyof BookingForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Пожалуйста, согласитесь с условиями обработки данных.');
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };
  
  const nextStep = () => setCurrentStep(s => Math.min(s + 1, 3));
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  const steps = useMemo(() => [
    { number: 1, name: 'Выбор номера' },
    { number: 2, name: 'Контактные данные' },
    { number: 3, name: 'Проверка и оплата' },
  ], []);

  const canProceedToNextStep = useMemo(() => {
    if (currentStep === 1) {
      return formData.roomId && formData.checkIn && formData.checkOut;
    }
    if (currentStep === 2) {
      return formData.firstName && formData.lastName && formData.phone && formData.email;
    }
    return true;
  }, [currentStep, formData]);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-colored border border-slate-100/50 p-8 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-ocean-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Заявка отправлена!</h2>
          <p className="text-slate-600 mb-8">Спасибо! Мы свяжемся с вами в ближайшее время для подтверждения бронирования.</p>
          <div className="space-y-3">
            <Link to="/"><Button variant="teal-gold" className="w-full">На главную</Button></Link>
            <Link to="/rooms"><Button variant="outline" className="w-full">Посмотреть другие номера</Button></Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      <PageHeader title="Бронирование номера" subtitle="Заполните форму, чтобы забронировать ваш идеальный отдых" />
      <div className="relative -mt-16">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
            <div className="mb-12">
              <div className="flex justify-between items-start max-w-sm mx-auto">
                {steps.map((step) => (
                  <div key={step.number} className="text-center w-1/3 px-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mx-auto mb-2 font-medium
                      ${currentStep >= step.number ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-600'}`}
                    >
                      {step.number}
                    </div>
                    <p className="text-xs leading-snug font-medium text-slate-600">
                      {step.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-start">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentStep === 1 && (
                        <div className="space-y-6 bg-white/50 p-8 rounded-2xl border border-slate-200/50">
                          <h3 className="font-bold text-xl text-slate-800">1. Выбор номера и дат</h3>
                          <div>
                            <label className="font-medium text-sm text-slate-600 mb-2 block">Выберите номер</label>
                            <CustomSelect options={roomOptions} value={formData.roomId} onChange={v => handleInputChange('roomId', v)} placeholder="Выберите категорию номера..." icon={<Users size={16}/>}/>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="font-medium text-sm text-slate-600 mb-2 block">Дата заезда</label>
                              <input type="date" value={formData.checkIn} onChange={e => handleInputChange('checkIn', e.target.value)} className="w-full p-3 border border-slate-200/50 rounded-xl bg-white/50 focus:ring-2 focus:ring-teal-500/50" />
                            </div>
                            <div>
                              <label className="font-medium text-sm text-slate-600 mb-2 block">Дата выезда</label>
                              <input type="date" value={formData.checkOut} onChange={e => handleInputChange('checkOut', e.target.value)} className="w-full p-3 border border-slate-200/50 rounded-xl bg-white/50 focus:ring-2 focus:ring-teal-500/50" />
                            </div>
                          </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="font-medium text-sm text-slate-600 mb-2 block">Взрослые</label>
                                 <input type="number" min="1" value={formData.adults} onChange={e => handleInputChange('adults', +e.target.value)} className="w-full p-3 border border-slate-200/50 rounded-xl bg-white/50" />
                              </div>
                              <div>
                                <label className="font-medium text-sm text-slate-600 mb-2 block">Дети</label>
                                 <input type="number" min="0" value={formData.children} onChange={e => handleInputChange('children', +e.target.value)} className="w-full p-3 border border-slate-200/50 rounded-xl bg-white/50" />
                              </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-6 bg-white/50 p-8 rounded-2xl border border-slate-200/50">
                           <h3 className="font-bold text-xl text-slate-800">2. Ваши данные</h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <input type="text" placeholder="Имя" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className="w-full p-3 border border-slate-200/50 rounded-xl bg-white/50" />
                              <input type="text" placeholder="Фамилия" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className="w-full p-3 border border-slate-200/50 rounded-xl bg-white/50" />
                           </div>
                           <input type="email" placeholder="Email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="w-full p-3 border border-slate-200/50 rounded-xl bg-white/50" />
                           <input type="tel" placeholder="Телефон" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full p-3 border border-slate-200/50 rounded-xl bg-white/50" />
                           <textarea placeholder="Особые пожелания..." value={formData.specialRequests} onChange={e => handleInputChange('specialRequests', e.target.value)} className="w-full p-3 border border-slate-200/50 rounded-xl bg-white/50 h-24"></textarea>
                        </div>
                      )}
                      
                      {currentStep === 3 && priceDetails && (
                         <div className="space-y-6 bg-white/50 p-8 rounded-2xl border border-slate-200/50">
                            <h3 className="font-bold text-xl text-slate-800">3. Подтверждение</h3>
                            <p>Пожалуйста, проверьте детали вашего бронирования перед подтверждением.</p>
                            <div className="border-t border-b border-slate-200/50 my-4 py-4 space-y-2">
                               <div className="flex justify-between"><span className="text-slate-600">Номер:</span> <span className="font-bold">{selectedRoom?.name}</span></div>
                               <div className="flex justify-between"><span className="text-slate-600">Заезд:</span> <span className="font-bold">{formData.checkIn}</span></div>
                               <div className="flex justify-between"><span className="text-slate-600">Выезд:</span> <span className="font-bold">{formData.checkOut}</span></div>
                               <div className="flex justify-between"><span className="text-slate-600">Гости:</span> <span className="font-bold">{formData.adults} взр. + {formData.children} реб.</span></div>
                            </div>
                             <div className="flex items-start space-x-3">
                               <input type="checkbox" id="agreement" checked={formData.agreed} onChange={e => handleInputChange('agreed', e.target.checked)} className="mt-1 h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                               <label htmlFor="agreement" className="text-sm text-slate-600">Я согласен с <a href="#" className="text-teal-600 hover:underline">условиями обработки персональных данных</a>.</label>
                             </div>
                         </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex justify-between items-center">
                    <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Назад
                    </Button>
                    {currentStep < 3 ? (
                      <Button 
                        type="button" 
                        variant="teal-gold" 
                        onClick={nextStep} 
                        disabled={!canProceedToNextStep}
                      >
                        Далее <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button type="submit" variant="teal-gold" disabled={isSubmitting || !formData.agreed}>
                        {isSubmitting ? 'Отправка...' : 'Подтвердить и забронировать'}
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-24">
                   {selectedRoom && priceDetails ? (
                     <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-colored border border-slate-100/50">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Детали бронирования</h3>
                        <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="rounded-xl mb-4" />
                        <h4 className="font-bold text-lg">{selectedRoom.name}</h4>

                        <div className="my-6 space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-slate-600">Стоимость за {priceDetails.nights} ночей</span><span>{priceDetails.basePrice.toLocaleString()}₽</span></div>
                            {priceDetails.freeNights > 0 && (
                              <div className="flex justify-between text-teal-600 font-bold">
                                <span>Акция: "{priceDetails.promotionDescription}"</span>
                                <span>-{priceDetails.discountAmount.toLocaleString()}₽</span>
                              </div>
                            )}
                        </div>

                        <div className="border-t border-slate-200/50 pt-4 mt-4 flex justify-between items-center">
                          <span className="text-lg font-bold">Итого</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-ocean-600 bg-clip-text text-transparent">{priceDetails.total.toLocaleString()}₽</span>
                        </div>
                     </div>
                   ) : (
                     <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-colored border border-slate-100/50 text-center">
                        <Calendar className="mx-auto h-12 w-12 text-slate-400 mb-4"/>
                        <h3 className="font-bold text-slate-800">Выберите номер и даты</h3>
                        <p className="text-sm text-slate-500 mt-2">Чтобы увидеть расчет стоимости вашего проживания.</p>
                     </div>
                   )}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingPage; 