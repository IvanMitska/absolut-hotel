import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, MessageSquare, Check } from 'lucide-react';

interface PaymentMethod {
  id: 'online' | 'whatsapp';
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'online',
    name: 'Онлайн оплата',
    description: 'Оплатите банковской картой прямо сейчас через ЮКассу',
    icon: <CreditCard className="w-6 h-6" />
  },
  {
    id: 'whatsapp',
    name: 'Бронирование через WhatsApp',
    description: 'Отправьте заявку, мы свяжемся с вами для подтверждения',
    icon: <MessageSquare className="w-6 h-6" />
  }
];

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg text-slate-800">Выберите способ оплаты</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative p-6 rounded-xl border-2 transition-all text-left
              ${value === method.id 
                ? 'border-teal-500 bg-teal-50/50' 
                : 'border-slate-200 bg-white hover:border-slate-300'
              }
            `}
          >
            {value === method.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-4">
              <div className={`
                p-3 rounded-lg
                ${value === method.id ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-600'}
              `}>
                {method.icon}
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-slate-800 mb-1">{method.name}</h4>
                <p className="text-sm text-slate-600">{method.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      {value === 'online' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <p className="text-sm text-blue-800">
            <strong>Безопасная оплата через ЮКассу</strong><br />
            Ваши платежные данные надежно защищены. Поддерживаются карты Visa, MasterCard, МИР.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;