import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';

interface PaymentInfo {
  id: string;
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';
  paid: boolean;
  amount: {
    value: string;
    currency: string;
  };
  description: string;
  metadata?: {
    bookingData?: string;
  };
}

const PaymentResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    if (!paymentId) {
      setError('ID платежа не найден');
      setLoading(false);
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`/.netlify/functions/payment-status?paymentId=${paymentId}`);
        setPaymentInfo(response.data);
      } catch (err) {
        console.error('Error checking payment status:', err);
        setError('Не удалось получить информацию о платеже');
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [paymentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Проверяем статус платежа...</p>
        </motion.div>
      </div>
    );
  }

  const isSuccess = paymentInfo?.status === 'succeeded' && paymentInfo?.paid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-colored border border-slate-100/50 p-8 text-center"
      >
        {error ? (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Ошибка</h2>
            <p className="text-slate-600 mb-8">{error}</p>
          </>
        ) : isSuccess ? (
          <>
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-ocean-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Оплата успешна!</h2>
            <p className="text-slate-600 mb-2">Спасибо за ваш платеж!</p>
            <p className="text-2xl font-bold text-teal-600 mb-6">
              {paymentInfo?.amount.value} ₽
            </p>
            <p className="text-sm text-slate-500 mb-8">
              Номер платежа: {paymentInfo?.id}
            </p>
            <p className="text-slate-600 mb-8">
              Мы отправили подтверждение на вашу электронную почту. 
              В ближайшее время с вами свяжется наш администратор для подтверждения бронирования.
            </p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Платеж не завершен</h2>
            <p className="text-slate-600 mb-8">
              К сожалению, платеж не был завершен. Вы можете попробовать еще раз или связаться с нами для бронирования.
            </p>
          </>
        )}

        <div className="space-y-3">
          <Link to="/">
            <Button variant="teal-gold" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              На главную
            </Button>
          </Link>
          <Link to="/booking">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к бронированию
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentResultPage;